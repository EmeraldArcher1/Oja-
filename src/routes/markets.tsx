import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { markets } from "@/data/lagos";
import { stallsInMarket } from "@/data/market";
import { states } from "@/data/nigeria";

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
});

function MarketsPage() {
  const [query, setQuery] = useState("");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const stateList = useMemo(() => {
    return states.filter((state) => {
      if (words.length === 0) return true;
      const hay = `${state.name} ${state.zone} ${state.capital} ${state.market} ${state.city}`.toLowerCase();
      return words.every((word) => hay.includes(word));
    });
  }, [words]);
  const list = useMemo(() => {
    return markets.filter((market) => {
      if (words.length === 0) return true;
      const hay = `${market.name} ${market.area} ${market.blurb} lagos`.toLowerCase();
      return words.every((word) => hay.includes(word));
    });
  }, [words]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">Oja Naija</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">Every state.</h1>
      <p className="mt-2 max-w-xl text-muted">
        The working pilot is Balogun Market. The other names are places. A business saved outside Balogun is not shown as an open shop.
      </p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Kano, Onitsha, Makoko, Ondo…"
        className="mt-4 h-12 w-full max-w-md rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
      />
      <ul className="mt-5 flex flex-wrap gap-2">
        {stateList.map((state) => (
          <li key={state.id}>
            <Link
              to="/state/$id"
              params={{ id: state.id }}
              className="inline-flex h-10 items-center rounded-full border border-line bg-sheet px-3 text-sm font-semibold text-ink"
            >
              {state.name}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-display text-3xl text-ink">Lagos markets</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Balogun has lane directions. The other Lagos pins, including Makoko, are places, not surveyed doors.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((market) => (
          <li key={market.id}>
            <Link
              to="/market/$id"
              params={{ id: market.id }}
              className="block overflow-hidden rounded-2xl border border-line bg-sheet"
            >
              <img src={market.photo} alt="" className="aspect-video w-full object-cover" />
              <span className="block px-3 py-3">
                <span className="block font-display text-2xl leading-none text-ink">{market.name}</span>
                <span className="mt-1 block text-sm text-muted">
                  {market.area} · {stallsInMarket(market.id).length} listed
                  {market.lanes ? " · lane walk" : ""}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
