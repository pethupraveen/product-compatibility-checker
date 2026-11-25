export function Card({ children, hover = false, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-100",
        hover &&
          "transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-brand-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

const PILL_TONES = {
  neutral: "bg-ink-50 text-ink-700 ring-ink-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function Pill({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${PILL_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function FilterBar({ children }) {
  return (
    <div className="flex flex-wrap items-end gap-x-8 gap-y-4 rounded-2xl border border-ink-100 bg-ink-50 p-4">
      {children}
    </div>
  );
}

const LABEL =
  "mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500";

export function SelectFilter({ label, value, onChange, options, id }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-navy-900 shadow-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SearchFilter({ label, value, onChange, placeholder, id }) {
  return (
    <div className="min-w-[14rem] flex-1">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-navy-900 shadow-sm placeholder:text-ink-300"
      />
    </div>
  );
}
