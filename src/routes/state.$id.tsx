import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StreetMap } from "@/components/street-map";
import { lgasIn } from "@/data/lgas";
import { marketsInState, stateById } from "@/data/nigeria";

export const Route = createFileRoute("/state/$id")({
  component: StatePage,
});

function StatePage() {
  const { id } = Route.useParams();
  const state = stateById(id);
  const [query, setQuery] = useState("");
  const lgas = lgasIn(id);
  const shown = useMemo(() => {
    const words = query.trim().toLowerCase();
    const list = words ? lgas.filter((name) => name.toLowerCase().includes(words)) : lgas.slice(0, 12);
    return list;
  }, [lgas, query]);

  if (!state) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="font-display text-4xl text-ink">That state is not listed.</h1>
        <Link to="/markets" className="mt-4 inline-flex font-semibold text-indigo">
          All states
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">{state.zone}</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">{state.name}</h1>
      <p className="mt-2 text-muted">
        {state.market}, {state.city}. Capital: {state.capital}.
      </p>
      <p className="mt-3 max-w-xl text-sm text-ink">{state.note}</p>
      <p className="mt-2 max-w-xl text-sm text-muted">
        {state.id === "lagos"
          ? "Balogun is the only market in this pilot. The other Lagos names are places."
          : "This state is named so a business can say where it is. It is not part of the working pilot. The pilot is Balogun."}
      </p>
      <h2 className="mt-6 font-display text-3xl text-ink">Markets</h2>
      <ul className="mt-3 grid gap-2">
        {marketsInState(state.id).map((market) => (
          <li key={`${market.name}-${market.city}`} className="rounded-2xl border border-line bg-sheet px-3 py-3 text-sm">
            <p className="font-semibold">{market.name}</p>
            <p className="text-muted">{market.city}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-6 font-display text-3xl text-ink">{lgas.length} local governments</h2>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find a local government"
        className="mt-3 h-12 w-full rounded-2xl border border-line bg-sheet px-3"
      />
      <ul className="mt-3 flex flex-wrap gap-2">
        {shown.map((name) => (
          <li key={name} className="rounded-full border border-line bg-sheet px-3 py-1 text-sm">
            {name}
          </li>
        ))}
      </ul>
      {!query ? <p className="mt-2 text-sm text-muted">Showing 12. Type to see the rest.</p> : null}
      <div className="mt-4">
        <StreetMap lat={state.lat} lng={state.lng} label={state.market} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/join"
          search={{ state: state.id }}
          className="inline-flex h-12 items-center rounded-2xl bg-clay px-4 text-sm font-semibold text-sheet"
        >
          Locate a business here
        </Link>
        {state.id === "lagos" ? (
          <Link to="/markets" className="inline-flex h-12 items-center rounded-2xl border border-line bg-sheet px-4 text-sm font-semibold">
            Lagos markets
          </Link>
        ) : null}
      </div>
    </main>
  );
}
