import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posh9ja")({
  component: PoshPage,
});

const details = [
  ["Office", "31 Ilori Street, off Ijegun Road, Ikotun Egbe, Alimosho, Lagos"],
  ["Email", "Posh9jaexport@gmail.com"],
  ["WhatsApp", "+234 811 365 7972"],
  ["Other numbers the business publishes", "+234 904 090 1073 · +234 909 930 1751 · UK +44 7435 856181"],
  ["What the business says it does", "Foodstuff export, air and sea freight, customs paperwork, and door-to-door shipping"],
];

function PoshPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">Founder · not a Balogun stall</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">POSH9JA EXPORT AND LOGISTICS</h1>
      <p className="mt-3 text-muted">
        This is the founder’s own company. It is listed so people can see who is building Oja. It is not verified.
        Oja does not book its riders, and a delivery quote in the pilot is not an order with POSH9JA.
      </p>
      <p className="mt-3 rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
        Not verified. No CAC number is on file here. These details are what the business already publishes. Oja has not checked them.
      </p>
      <ul className="mt-4 grid gap-2">
        {details.map(([label, value]) => (
          <li key={label} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            <p className="text-muted">{label}</p>
            <p className="mt-1 font-medium text-ink">{value}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        The office is in Ikotun, not inside Balogun. It stays off the Balogun shop list for that reason.
      </p>
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
