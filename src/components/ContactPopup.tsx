"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "";
const OPEN_CONTACT_FORM_EVENT = "100cp:open-contact-form";

const COUNTRY_CALLING_CODES = [
  ["Afghanistan", "+93"],
  ["Albania", "+355"],
  ["Algeria", "+213"],
  ["Åland Islands", "+358"],
  ["Antarctica", "+672"],
  ["American Samoa", "+1"],
  ["Andorra", "+376"],
  ["Angola", "+244"],
  ["Anguilla", "+1"],
  ["Antigua and Barbuda", "+1"],
  ["Argentina", "+54"],
  ["Armenia", "+374"],
  ["Aruba", "+297"],
  ["Australia", "+61"],
  ["Austria", "+43"],
  ["Azerbaijan", "+994"],
  ["Bahamas", "+1"],
  ["Bahrain", "+973"],
  ["Bangladesh", "+880"],
  ["Barbados", "+1"],
  ["Belarus", "+375"],
  ["Belgium", "+32"],
  ["Belize", "+501"],
  ["Benin", "+229"],
  ["Bermuda", "+1"],
  ["Bhutan", "+975"],
  ["Bolivia", "+591"],
  ["Bonaire, Sint Eustatius and Saba", "+599"],
  ["Bosnia and Herzegovina", "+387"],
  ["Botswana", "+267"],
  ["Brazil", "+55"],
  ["British Virgin Islands", "+1"],
  ["British Indian Ocean Territory", "+246"],
  ["Brunei", "+673"],
  ["Bulgaria", "+359"],
  ["Burkina Faso", "+226"],
  ["Burundi", "+257"],
  ["Cambodia", "+855"],
  ["Cameroon", "+237"],
  ["Canada", "+1"],
  ["Cape Verde", "+238"],
  ["Cayman Islands", "+1"],
  ["Central African Republic", "+236"],
  ["Chad", "+235"],
  ["Chile", "+56"],
  ["China", "+86"],
  ["Christmas Island", "+61"],
  ["Cocos Islands", "+61"],
  ["Colombia", "+57"],
  ["Comoros", "+269"],
  ["Congo", "+242"],
  ["Cook Islands", "+682"],
  ["Costa Rica", "+506"],
  ["Croatia", "+385"],
  ["Cuba", "+53"],
  ["Curaçao", "+599"],
  ["Cyprus", "+357"],
  ["Czechia", "+420"],
  ["Democratic Republic of the Congo", "+243"],
  ["Denmark", "+45"],
  ["Djibouti", "+253"],
  ["Dominica", "+1"],
  ["Dominican Republic", "+1"],
  ["Ecuador", "+593"],
  ["Egypt", "+20"],
  ["El Salvador", "+503"],
  ["Equatorial Guinea", "+240"],
  ["Eritrea", "+291"],
  ["Estonia", "+372"],
  ["Eswatini", "+268"],
  ["Ethiopia", "+251"],
  ["Falkland Islands", "+500"],
  ["Faroe Islands", "+298"],
  ["Fiji", "+679"],
  ["Finland", "+358"],
  ["France", "+33"],
  ["French Guiana", "+594"],
  ["French Polynesia", "+689"],
  ["Gabon", "+241"],
  ["Gambia", "+220"],
  ["Georgia", "+995"],
  ["Germany", "+49"],
  ["Ghana", "+233"],
  ["Gibraltar", "+350"],
  ["Greece", "+30"],
  ["Greenland", "+299"],
  ["Grenada", "+1"],
  ["Guadeloupe", "+590"],
  ["Guam", "+1"],
  ["Guatemala", "+502"],
  ["Guernsey", "+44"],
  ["Guinea", "+224"],
  ["Guinea-Bissau", "+245"],
  ["Guyana", "+592"],
  ["Haiti", "+509"],
  ["Honduras", "+504"],
  ["Hong Kong", "+852"],
  ["Hungary", "+36"],
  ["Iceland", "+354"],
  ["India", "+91"],
  ["Indonesia", "+62"],
  ["Iran", "+98"],
  ["Iraq", "+964"],
  ["Ireland", "+353"],
  ["Isle of Man", "+44"],
  ["Israel", "+972"],
  ["Italy", "+39"],
  ["Jamaica", "+1"],
  ["Japan", "+81"],
  ["Jersey", "+44"],
  ["Jordan", "+962"],
  ["Kazakhstan", "+7"],
  ["Kenya", "+254"],
  ["Kiribati", "+686"],
  ["Kosovo", "+383"],
  ["Kuwait", "+965"],
  ["Kyrgyzstan", "+996"],
  ["Laos", "+856"],
  ["Latvia", "+371"],
  ["Lebanon", "+961"],
  ["Lesotho", "+266"],
  ["Liberia", "+231"],
  ["Libya", "+218"],
  ["Liechtenstein", "+423"],
  ["Lithuania", "+370"],
  ["Luxembourg", "+352"],
  ["Macao", "+853"],
  ["Madagascar", "+261"],
  ["Malawi", "+265"],
  ["Malaysia", "+60"],
  ["Maldives", "+960"],
  ["Mali", "+223"],
  ["Malta", "+356"],
  ["Marshall Islands", "+692"],
  ["Martinique", "+596"],
  ["Mauritania", "+222"],
  ["Mauritius", "+230"],
  ["Mayotte", "+262"],
  ["Mexico", "+52"],
  ["Micronesia", "+691"],
  ["Moldova", "+373"],
  ["Monaco", "+377"],
  ["Mongolia", "+976"],
  ["Montenegro", "+382"],
  ["Montserrat", "+1"],
  ["Morocco", "+212"],
  ["Mozambique", "+258"],
  ["Myanmar", "+95"],
  ["Namibia", "+264"],
  ["Nauru", "+674"],
  ["Nepal", "+977"],
  ["Netherlands", "+31"],
  ["New Caledonia", "+687"],
  ["New Zealand", "+64"],
  ["Nicaragua", "+505"],
  ["Niger", "+227"],
  ["Nigeria", "+234"],
  ["Niue", "+683"],
  ["Norfolk Island", "+672"],
  ["North Korea", "+850"],
  ["North Macedonia", "+389"],
  ["Northern Mariana Islands", "+1"],
  ["Norway", "+47"],
  ["Oman", "+968"],
  ["Pakistan", "+92"],
  ["Palau", "+680"],
  ["Palestine", "+970"],
  ["Panama", "+507"],
  ["Papua New Guinea", "+675"],
  ["Paraguay", "+595"],
  ["Peru", "+51"],
  ["Philippines", "+63"],
  ["Poland", "+48"],
  ["Portugal", "+351"],
  ["Puerto Rico", "+1"],
  ["Qatar", "+974"],
  ["Réunion", "+262"],
  ["Romania", "+40"],
  ["Russia", "+7"],
  ["Rwanda", "+250"],
  ["Saint Barthélemy", "+590"],
  ["Saint Helena", "+290"],
  ["Ascension Island", "+247"],
  ["Saint Kitts and Nevis", "+1"],
  ["Saint Lucia", "+1"],
  ["Saint Martin", "+590"],
  ["Saint Pierre and Miquelon", "+508"],
  ["Saint Vincent and the Grenadines", "+1"],
  ["Samoa", "+685"],
  ["San Marino", "+378"],
  ["São Tomé and Príncipe", "+239"],
  ["Saudi Arabia", "+966"],
  ["Senegal", "+221"],
  ["Serbia", "+381"],
  ["Seychelles", "+248"],
  ["Sierra Leone", "+232"],
  ["Singapore", "+65"],
  ["Sint Maarten", "+1"],
  ["Slovakia", "+421"],
  ["Slovenia", "+386"],
  ["Solomon Islands", "+677"],
  ["Somalia", "+252"],
  ["South Africa", "+27"],
  ["South Korea", "+82"],
  ["South Sudan", "+211"],
  ["South Georgia and the South Sandwich Islands", "+500"],
  ["Spain", "+34"],
  ["Sri Lanka", "+94"],
  ["Sudan", "+249"],
  ["Suriname", "+597"],
  ["Sweden", "+46"],
  ["Switzerland", "+41"],
  ["Svalbard and Jan Mayen", "+47"],
  ["Syria", "+963"],
  ["Taiwan", "+886"],
  ["Tajikistan", "+992"],
  ["Tanzania", "+255"],
  ["Thailand", "+66"],
  ["Timor-Leste", "+670"],
  ["Togo", "+228"],
  ["Tokelau", "+690"],
  ["Tonga", "+676"],
  ["Trinidad and Tobago", "+1"],
  ["Tunisia", "+216"],
  ["Türkiye", "+90"],
  ["Turkmenistan", "+993"],
  ["Turks and Caicos Islands", "+1"],
  ["Tuvalu", "+688"],
  ["Uganda", "+256"],
  ["Ukraine", "+380"],
  ["United Arab Emirates", "+971"],
  ["United Kingdom", "+44"],
  ["United States", "+1"],
  ["Uruguay", "+598"],
  ["Uzbekistan", "+998"],
  ["Vanuatu", "+678"],
  ["Vatican City", "+39"],
  ["Venezuela", "+58"],
  ["Vietnam", "+84"],
  ["Wallis and Futuna", "+681"],
  ["Western Sahara", "+212"],
  ["Yemen", "+967"],
  ["Zambia", "+260"],
  ["Zimbabwe", "+263"],
] as const;

type ContactValues = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  details: string;
};

type ContactField = keyof ContactValues;
type ContactErrors = Partial<Record<ContactField, string>>;

const EMPTY_VALUES: ContactValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  details: "",
};

function validateField(
  field: ContactField,
  value: string,
  countryCode = ""
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Enter your name.";
      if (trimmed.length < 2 || trimmed.length > 80) {
        return "Your name must be between 2 and 80 characters.";
      }
      if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(trimmed)) {
        return "Use letters, spaces, apostrophes, periods, or hyphens.";
      }
      return undefined;
    case "businessName":
      if (!trimmed) return "Enter your business name.";
      if (trimmed.length < 2 || trimmed.length > 100) {
        return "Your business name must be between 2 and 100 characters.";
      }
      return undefined;
    case "email":
      if (!trimmed) return "Enter your email address.";
      if (
        trimmed.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
      ) {
        return "Enter a valid email address.";
      }
      return undefined;
    case "phone": {
      if (!trimmed) return "Enter your contact number.";
      if (!/^\d+$/.test(trimmed) || trimmed.length < 4 || trimmed.length > 14) {
        return "Enter 4 to 14 digits without spaces or symbols.";
      }
      if (trimmed.length + countryCode.replace(/\D/g, "").length > 15) {
        return "The number must not exceed 15 digits, including the country code.";
      }
      return undefined;
    }
    case "details":
      if (!trimmed) return "Tell us what you need.";
      if (trimmed.length < 10 || trimmed.length > 1000) {
        return "Details must be between 10 and 1,000 characters.";
      }
      return undefined;
  }
}

function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [countryCode, setCountryCode] = useState("+65");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const focusInvalidField = useRef(false);

  useEffect(() => {
    if (focusInvalidField.current) {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
      focusInvalidField.current = false;
    }
  }, [errors]);

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setStatus("");
    if (showErrors || errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value, countryCode),
      }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    const nextErrors = Object.fromEntries(
      (Object.keys(values) as ContactField[])
        .map((field) => [field, validateField(field, values[field], countryCode)])
        .filter(([, error]) => error)
    ) as ContactErrors;

    setErrors(nextErrors);
    setStatus("");

    if (Object.keys(nextErrors).length > 0) {
      focusInvalidField.current = true;
      return;
    }

    if (!CONTACT_EMAIL) {
      setStatus("Your details are valid. Add a contact email to enable sending.");
      return;
    }

    const body = [
      `Name: ${values.name.trim()}`,
      `Business: ${values.businessName.trim()}`,
      `Email: ${values.email.trim()}`,
      `Contact number: ${countryCode} ${values.phone.trim()}`,
      "",
      "What they need:",
      values.details.trim(),
    ].join("\n");
    const subject = `Website enquiry from ${values.name.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function renderError(field: ContactField) {
    return errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;
  }

  const inputClassName =
    "mt-1.5 block min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate-500 focus:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 aria-invalid:border-red-700 aria-invalid:focus-visible:ring-red-700/20";
  const labelClassName = "text-sm font-semibold text-ink";

  return (
    <form
      ref={formRef}
      className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className={labelClassName}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              name: validateField("name", values.name),
            }))
          }
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClassName}
        />
        {renderError("name")}
      </div>

      <div>
        <label htmlFor="contact-business" className={labelClassName}>
          Business Name
        </label>
        <input
          id="contact-business"
          name="businessName"
          autoComplete="organization"
          required
          value={values.businessName}
          onChange={(event) => updateField("businessName", event.target.value)}
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              businessName: validateField("businessName", values.businessName),
            }))
          }
          aria-invalid={Boolean(errors.businessName)}
          aria-describedby={errors.businessName ? "businessName-error" : undefined}
          className={inputClassName}
        />
        {renderError("businessName")}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          Email ID
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              email: validateField("email", values.email),
            }))
          }
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClassName}
        />
        {renderError("email")}
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClassName}>
          Contact Number
        </label>
        <div className="mt-1.5 flex min-w-0 gap-2">
          <select
            aria-label="Country calling code"
            autoComplete="tel-country-code"
            value={countryCode}
            onChange={(event) => {
              const nextCountryCode = event.target.value;
              setCountryCode(nextCountryCode);
              setStatus("");
              if (showErrors || errors.phone) {
                setErrors((current) => ({
                  ...current,
                  phone: validateField("phone", values.phone, nextCountryCode),
                }));
              }
            }}
            className="min-h-12 w-[26%] min-w-0 rounded-lg border border-slate-300 bg-white px-2 text-sm text-ink outline-none focus:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 sm:w-[26%]"
          >
            {COUNTRY_CALLING_CODES.map(([country, code], index) => (
              <option key={`${country}-${index}`} value={code} aria-label={`${country} ${code}`}>
                {code}
              </option>
            ))}
          </select>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={14}
            pattern="[0-9]{4,14}"
            required
            value={values.phone}
            onChange={(event) =>
              updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 14))
            }
            onBlur={() =>
              setErrors((current) => ({
                ...current,
                phone: validateField("phone", values.phone, countryCode),
              }))
            }
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClassName, "mt-0 min-w-0 flex-1")}
          />
        </div>
        {renderError("phone")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="contact-details" className={labelClassName}>
          Tell us what you need
        </label>
        <textarea
          id="contact-details"
          name="details"
          rows={3}
          maxLength={1000}
          required
          value={values.details}
          onChange={(event) => updateField("details", event.target.value)}
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              details: validateField("details", values.details),
            }))
          }
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? "details-error" : "details-count"}
          className={cn(inputClassName, "min-h-24 resize-y")}
        />
        {renderError("details")}
        <p id="details-count" className="mt-1 text-right text-xs text-slate-600">
          {values.details.length}/1,000
        </p>
      </div>

      <div className="sm:col-span-2">
        {status && (
          <p role="status" className="mb-3 rounded-lg bg-sky px-3.5 py-3 text-sm font-medium text-navy">
            {status}
          </p>
        )}
        <button
          type="submit"
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-[15px] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(229_35_47/0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-red-bright active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:w-auto"
        >
          Send Enquiry
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

export function ContactTrigger({
  children,
  className,
  showArrow = false,
  onClick,
  outsideDialog = false,
}: {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  outsideDialog?: boolean;
}) {
  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (outsideDialog) {
    return (
      <button
        type="button"
        onClick={() => {
          window.dispatchEvent(new Event(OPEN_CONTACT_FORM_EVENT));
          onClick?.();
        }}
        className={className}
      >
        {content}
      </button>
    );
  }

  return (
    <Dialog.Trigger
      type="button"
      onClick={onClick}
      className={className}
    >
      {content}
    </Dialog.Trigger>
  );
}

export default function ContactPopup({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openContactForm = () => setOpen(true);
    window.addEventListener(OPEN_CONTACT_FORM_EVENT, openContactForm);
    return () => window.removeEventListener(OPEN_CONTACT_FORM_EVENT, openContactForm);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {children}
      <Dialog.Portal keepMounted>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 text-ink shadow-[0_24px_70px_-24px_rgb(7_59_120/0.4)] outline-none transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-5 pr-8">
            <div>
              <Dialog.Title className="font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-[1.75rem]">
                Let&apos;s talk
              </Dialog.Title>
              <Dialog.Description className="mt-2 max-w-lg text-sm leading-relaxed text-ink/80">
                Share a few details and our team can learn how to help your business.
              </Dialog.Description>
            </div>
          </div>
          <Dialog.Close
            aria-label="Close contact form"
            className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <X aria-hidden className="size-5" />
          </Dialog.Close>
          <ContactForm />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
