import CompatibilityChecker from "./CompatibilityChecker.jsx";

export default function App() {
  return (
    <>
      <header className="relative overflow-hidden bg-navy-900 text-white">
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow-rule animate-fade-in text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Mobile accessories
          </p>
          <h1 className="mt-4 animate-fade-up text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-4xl">
            Product compatibility checker
          </h1>
          <p className="mt-5 max-w-2xl animate-fade-up text-base leading-[1.7] text-ink-300 sm:text-lg">
            Look up a handset and see which back covers and tempered glass SKUs fit it,
            which are shared with a neighbouring model, and which are still in sampling.
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden="true"
        />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <CompatibilityChecker />
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-12 text-xs text-ink-500 sm:px-6">
        Sample data for demonstration. Built by{" "}
        <a className="font-semibold text-brand-600" href="https://pethupraveen.github.io/">
          Praveen Kumar Pethumanickam
        </a>
        .
      </footer>
    </>
  );
}
