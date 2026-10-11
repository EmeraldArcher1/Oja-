import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { StreetMap } from "@/components/street-map";
import { StallCard } from "@/components/stall-card";
import { marketById } from "@/data/lagos";
import { stallsInMarket, t, ui } from "@/data/market";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/market/$id")({
  component: MarketPage,
});

function MarketPage() {
  const { id } = Route.useParams();
  const market = marketById(id);
  const known = market.id === id;
  const hereId = useMarket((state) => state.hereId);
  const lang = useMarket((state) => state.lang);
  const saved = useMarket((state) => state.saved);
  const toggleSaved = useMarket((state) => state.toggleSaved);
  const registered = useMarket((state) => state.registered);
  const stalls = useMemo(() => {
    const listed = stallsInMarket(id);
    const ids = new Set(listed.map((stall) => stall.id));
    const mine = registered.filter(
      (stall) => (stall.marketId ?? "balogun") === id && !ids.has(stall.id),
    );
    return [...mine, ...listed];
  }, [id, registered]);

  if (!known) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="font-display text-4xl text-ink">That market is not in this directory.</h1>
        <Link to="/markets" className="mt-4 inline-flex font-semibold text-clay">
          All markets
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">{market.area}</p>
      <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">{market.name}</h1>
      <p className="mt-2 text-muted">{market.blurb}</p>
      <img src={market.photo} alt="" className="mt-4 aspect-video w-full rounded-2xl object-cover" />
      <div className="mt-4">
        <StreetMap lat={market.lat} lng={market.lng} label={market.name} />
      </div>
      {market.lanes ? (
        <Link
          to="/map"
          className="mt-3 inline-flex h-11 items-center font-semibold text-indigo"
        >
          {t(ui.showMap, lang)}
        </Link>
      ) : null}
      <h2 className="mt-6 text-sm font-semibold tracking-wide text-muted uppercase">
        {stalls.length} {t(ui.stalls, lang)}
      </h2>
      <ul className="mt-3 grid gap-2">
        {stalls.map((stall) => (
          <li key={stall.id}>
            <StallCard
              stall={stall}
              hereId={hereId}
              lang={lang}
              saved={saved.includes(stall.id)}
              onToggleSaved={() => toggleSaved(stall.id)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
