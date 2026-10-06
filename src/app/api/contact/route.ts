import { google } from "googleapis";

export const runtime = "nodejs";

const MAX_REQUEST_SIZE = 16_384;
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function getHttpStatus(error: unknown): number | undefined {
  if (
    typeof error !== "object" ||
    error === null ||
    !("response" in error) ||
    typeof error.response !== "object" ||
    error.response === null ||
    !("status" in error.response) ||
    typeof error.response.status !== "number"
  ) {
    return undefined;
  }

  return error.response.status;
}

type ContactSubmission = {
  name: string;
  businessName: string;
  email: string;
  contactNumber: string;
  details: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isContactSubmission(value: unknown): value is ContactSubmission {
  if (!isRecord(value)) return false;
  if (
    typeof value.name !== "string" ||
    typeof value.businessName !== "string" ||
    typeof value.email !== "string" ||
    typeof value.contactNumber !== "string" ||
    typeof value.details !== "string"
  ) {
    return false;
  }

  const name = value.name.trim();
  const businessName = value.businessName.trim();
  const email = value.email.trim();
  const contactNumber = value.contactNumber.trim();
  const details = value.details.trim();

  return (
    name.length >= 2 &&
    name.length <= 80 &&
    /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name) &&
    businessName.length >= 2 &&
    businessName.length <= 100 &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    /^\+\d{1,3}\s\d{4,14}$/.test(contactNumber) &&
    contactNumber.replace(/\D/g, "").length <= 15 &&
    details.length >= 10 &&
    details.length <= 1000
  );
}

function getSheetConfig() {
  const config = {
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim() ?? "",
    privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim() ?? "",
    spreadsheetId: process.env.GOOGLE_SHEET_ID?.trim() ?? "",
    tabName: process.env.GOOGLE_SHEET_TAB_NAME?.trim() ?? "",
  };
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(
      `Contact form Google Sheets configuration is missing: ${missing.join(", ")}`
    );
    return null;
  }

  return {
    ...config,
    privateKey: config.privateKey.replace(/\\n/g, "\n"),
  };
}

function toSheetDateTimeSerial(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const partValues = new Map(parts.map(({ type, value }) => [type, value]));
  const year = Number(partValues.get("year"));
  const month = Number(partValues.get("month"));
  const day = Number(partValues.get("day"));
  const hour = Number(partValues.get("hour"));
  const minute = Number(partValues.get("minute"));
  const second = Number(partValues.get("second"));

  if ([year, month, day, hour, minute, second].some(Number.isNaN)) {
    throw new Error("Unable to format the contact timestamp for Google Sheets.");
  }

  const localDateAsUtc = Date.UTC(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    date.getUTCMilliseconds()
  );
  const sheetsEpoch = Date.UTC(1899, 11, 30);
  return (localDateAsUtc - sheetsEpoch) / 86_400_000;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_REQUEST_SIZE) {
    return Response.json({ error: "The submitted form is too large." }, { status: 413 });
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return Response.json({ error: "Unable to read the submitted form." }, { status: 400 });
  }

  if (body.length > MAX_REQUEST_SIZE) {
    return Response.json({ error: "The submitted form is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "The submitted form is not valid JSON." }, { status: 400 });
  }

  if (!isContactSubmission(payload)) {
    return Response.json(
      { error: "Check the form fields and try again." },
      { status: 400 }
    );
  }

  const config = getSheetConfig();
  if (!config) {
    return Response.json(
      { error: "The enquiry service is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.clientEmail,
        private_key: config.privateKey,
      },
      scopes: [SHEETS_SCOPE],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const range = `'${config.tabName.replace(/'/g, "''")}'!A:F`;
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: config.spreadsheetId,
      fields: "properties.timeZone,sheets.properties(sheetId,title)",
    });
    const sheet = spreadsheet.data.sheets?.find(
      ({ properties }) => properties?.title === config.tabName
    );
    const timeZone = spreadsheet.data.properties?.timeZone;
    const sheetId = sheet?.properties?.sheetId;

    if (!timeZone || sheetId === undefined) {
      throw new Error(
        `Google Sheets tab "${config.tabName}" or spreadsheet timezone could not be found.`
      );
    }

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: config.spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: { sheetId, startColumnIndex: 0, endColumnIndex: 1 },
              cell: {
                userEnteredFormat: {
                  numberFormat: {
                    type: "DATE_TIME",
                    pattern: "yyyy-mm-dd hh:mm:ss",
                  },
                },
              },
              fields: "userEnteredFormat.numberFormat",
            },
          },
        ],
      },
    });
    const timestamp = toSheetDateTimeSerial(new Date(), timeZone);

    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            timestamp,
            payload.name.trim(),
            payload.businessName.trim(),
            payload.email.trim(),
            payload.contactNumber.trim(),
            payload.details.trim(),
          ],
        ],
      },
    });
    const appendedRow = appendResult.data.updates?.updatedRange?.match(
      /!A(\d+):F\d+$/
    );

    if (!appendedRow) {
      throw new Error("Google Sheets did not return the appended row range.");
    }

    const rowIndex = Number(appendedRow[1]) - 1;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: config.spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: rowIndex,
                endRowIndex: rowIndex + 1,
                startColumnIndex: 0,
                endColumnIndex: 6,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: { bold: false },
                },
              },
              fields: "userEnteredFormat.textFormat.bold",
            },
          },
        ],
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    const status = getHttpStatus(error);
    console.error(
      "Failed to append a contact submission to Google Sheets.",
      status ? `HTTP ${status}.` : "",
      error instanceof Error ? error.message : "Unknown Google Sheets error"
    );
    return Response.json(
      {
        error:
          status === 403
            ? "Google Sheets denied access. Share the spreadsheet with the configured service account as an Editor, and confirm the Google Sheets API is enabled."
            : "We could not save your enquiry. Please try again shortly.",
      },
      { status: 502 }
    );
  }
}
