import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { LaneMap } from "@/components/lane-map";
import { StallCard } from "@/components/stall-card";
import {
  pathIds,
  placeById,
  places,
  stallByCode,
  stallsInBlock,
  t,
  ui,
} from "@/data/market";
import { useMarket } from "@/lib/market-store";

const searchSchema = z.object({
  stall: z.string().optional(),
  place: z.string().optional(),
});

export const Route = createFileRoute("/map")({
  validateSearch: searchSchema,
  component: MapPage,
});

function MapPage() {
  const search = Route.useSearch();
  const hereId = useMarket((state) => state.hereId);
  const setHere = useMarket((state) => state.setHere);
  const lang = useMarket((state) => state.lang);
  const saved = useMarket((state) => state.saved);
  const toggleSaved = useMarket((state) => state.toggleSaved);
  const registered = useMarket((state) => state.registered);
  const target = stallByCode(search.stall);
  const initial = search.place && places.some((place) => place.id === search.place)
    ? search.place
    : target?.block;
  const [activeId, setActiveId] = useState<string | undefined>(initial);
  const active = activeId ? placeById(activeId) : undefined;
  const blockStalls = useMemo(() => {
    if (active?.kind !== "block") return [];
    const listed = stallsInBlock(active.id);
    const ids = new Set(listed.map((stall) => stall.id));
    const mine = registered.filter((stall) => stall.block === active.id && !ids.has(stall.id));
    return [...mine, ...listed];
  }, [active, registered]);
  const route = target ? pathIds(hereId, target) : [];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-5">
      <h1 className="font-display text-4xl text-ink">Lane map</h1>
      <p className="mt-2 text-muted">{t(ui.mapHelp, lang)}</p>
      {target ? (
        <p className="mt-3 rounded-2xl bg-clay-soft px-4 py-3 text-sm text-ink">
          {t(ui.onTheWay, lang)} · {target.code} {target.business}.{" "}
          <Link
            to="/walk/$code"
            params={{ code: target.code }}
            className="font-semibold text-clay"
          >
            {t(ui.walk, lang)}
          </Link>
        </p>
      ) : null}
      <div className="mx-auto mt-4 w-full max-w-sm">
        <LaneMap
          hereId={hereId}
          pathIds={route.length > 1 ? route : []}
          activeId={activeId}
          lang={lang}
          onPlace={(id) => {
            const place = placeById(id);
            setActiveId(id);
            if (place.kind !== "block") setHere(id);
          }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-indigo" /> {t(ui.you, lang)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-clay" /> {t(ui.onTheWay, lang)}
        </span>
      </div>
      {active?.kind === "block" ? (
        <section className="mt-6">
          <h2 className="font-display text-2xl text-ink">
            {active.name}
            <span className="mt-1 block text-sm font-sans font-normal text-muted">
              {t(ui.inBlock, lang)}
            </span>
          </h2>
          {blockStalls.length === 0 ? (
            <p className="mt-3 text-muted">{t(ui.nothingHere, lang)}</p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {blockStalls.map((stall) => (
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
          )}
        </section>
      ) : active ? (
        <p className="mt-4 text-sm text-muted">
          {t(ui.you, lang)}: {active.name}. {t(active.spot, lang)}
        </p>
      ) : null}
    </main>
  );
}
