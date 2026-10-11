import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posh9ja")({
  component: PoshPage,
});

const details = [
  ["Office", "31 Ilori Street, off Ijegun Road, Ikotun Egbe, Alimosho, Lagos"],
  ["Email", "Posh9jaexport@gmail.com"],
  ["WhatsApp", "+234 811 365 7972"],
  ["Also published", "+234 904 090 1073 · +234 909 930 1751 · UK +44 7435 856181"],
];

const sites = [
  ["Foodstuff shipping", "https://posh9ja-export-logistics.vercel.app/"],
  ["Company site", "https://site-tqbvu9b8p.godaddysites.com/"],
];

function PoshPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">Founder · Ikotun · not verified</p>
      <img
        src="/posh9ja-logo.png"
        alt="POSH9JA Export and Logistics"
        className="mt-3 w-full max-w-sm rounded-2xl"
      />
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">POSH9JA EXPORT AND LOGISTICS</h1>
      <p className="mt-3 text-ink">
        POSH9JA packs foodstuff and cargo in Lagos and ships it by air or sea. Garri, flours, oils, spices,
        dried fish, and other freight, with the customs paperwork, to the UK, the USA, Canada, and Europe.
      </p>
      <p className="mt-3 text-muted">
        This is the company building Oja. The Ikotun office is not a Balogun stall. Oja has not verified the
        business, and a pilot delivery quote is not a POSH9JA booking. posh9jaexport.com does not open, so the
        links below are the sites that do.
      </p>
      <ul className="mt-4 grid gap-2">
        {sites.map(([label, href]) => (
          <li key={href} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            <p className="text-muted">{label}</p>
            <a href={href} className="mt-1 block font-medium break-all text-indigo">
              {href.replace("https://", "")}
            </a>
          </li>
        ))}
        {details.map(([label, value]) => (
          <li key={label} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            <p className="text-muted">{label}</p>
            <p className="mt-1 font-medium text-ink">{value}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">No CAC number is on file. The business stays off the Balogun shop list.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="https://wa.me/2348113657972"
          className="inline-flex h-12 items-center rounded-2xl bg-clay px-4 text-sm font-semibold text-sheet"
        >
          WhatsApp the business
        </a>
        <Link to="/" className="inline-flex h-12 items-center rounded-2xl border border-line bg-sheet px-4 text-sm font-semibold">
          Back to the pilot
        </Link>
      </div>
    </main>
  );
}
