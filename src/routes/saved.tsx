import { createFileRoute, Link } from "@tanstack/react-router";
import { StallCard } from "@/components/stall-card";
import { stallByCode, stalls, t, ui } from "@/data/market";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
});

function SavedPage() {
  const hereId = useMarket((state) => state.hereId);
  const lang = useMarket((state) => state.lang);
  const saved = useMarket((state) => state.saved);
  const toggleSaved = useMarket((state) => state.toggleSaved);
  const items = saved
    .map((id) => stalls.find((stall) => stall.id === id) ?? stallByCode(id))
    .filter((stall) => stall !== undefined);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <h1 className="font-display text-4xl text-ink">{t(ui.saved, lang)}</h1>
      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-sheet px-4 py-8">
          <p className="text-muted">{t(ui.emptySaved, lang)}</p>
          <Link to="/" className="mt-4 inline-flex h-11 items-center font-semibold text-clay">
            {t(ui.backHome, lang)}
          </Link>
        </div>
      ) : (
        <ul className="mt-4 grid gap-2">
          {items.map((stall) => (
            <li key={stall.id}>
              <StallCard
                stall={stall}
                hereId={hereId}
                lang={lang}
                saved
                onToggleSaved={() => toggleSaved(stall.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
