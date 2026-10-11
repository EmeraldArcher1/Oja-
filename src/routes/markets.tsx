import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { markets } from "@/data/lagos";
import { stallsInMarket } from "@/data/market";

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
});

function MarketsPage() {
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return markets.filter((market) => {
      if (words.length === 0) return true;
      const hay = `${market.name} ${market.area} ${market.blurb}`.toLowerCase();
      return words.every((word) => hay.includes(word));
    });
  }, [query]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">Lagos</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">Every major market.</h1>
      <p className="mt-2 max-w-xl text-muted">
        Island, mainland, and the expressway markets. Balogun has lane directions. The rest open on a
        street pin the stall owner can move.
      </p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Ikeja, Mile 12, lace…"
        className="mt-4 h-12 w-full max-w-md rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
      />
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
