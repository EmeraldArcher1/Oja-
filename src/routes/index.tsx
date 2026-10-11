import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { StallCard } from "@/components/stall-card";
import { WhereDialog } from "@/components/where-dialog";
import { markets } from "@/data/lagos";
import {
  categories,
  filterStalls,
  minutesBetween,
  placeById,
  t,
  ui,
  type CategoryId,
} from "@/data/market";
import { listPublicBusinesses, type PublicBusiness } from "@/lib/market/api";
import { inPilot } from "@/lib/market/trust";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const lang = useMarket((state) => state.lang);
  const hereId = useMarket((state) => state.hereId);
  const setHere = useMarket((state) => state.setHere);
  const saved = useMarket((state) => state.saved);
  const toggleSaved = useMarket((state) => state.toggleSaved);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [whereOpen, setWhereOpen] = useState(false);
  const [registered, setRegistered] = useState<PublicBusiness[]>([]);

  useEffect(() => {
    void listPublicBusinesses().then(setRegistered);
  }, []);

  const results = useMemo(() => {
    const marketId = query.trim() ? undefined : "balogun";
    const base = filterStalls(query, category, marketId);
    return base.sort((a, b) => {
      if (marketId) return minutesBetween(hereId, a) - minutesBetween(hereId, b);
      return a.business.localeCompare(b.business);
    });
  }, [query, category, hereId]);

  const pilotShops = useMemo(() => registered.filter((business) => inPilot(business.marketId)), [registered]);
  const claimed = useMemo(
    () => new Set(pilotShops.map((business) => business.stallCode.toUpperCase())),
    [pilotShops],
  );

  const businesses = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return pilotShops.filter((business) => {
      if (category !== "all" && business.category !== category) return false;
      if (words.length === 0) return true;
      const hay = `${business.name} ${business.trader} ${business.stallCode} ${business.about} ${business.category}`.toLowerCase();
      return words.every((word) => hay.includes(word));
    });
  }, [pilotShops, query, category]);

  const here = placeById(hereId);

  return (
    <main className="mx-auto grid w-full max-w-6xl px-4 py-5 lg:grid-cols-5 lg:gap-8 lg:py-8">
      <div className="min-w-0 lg:col-span-3">
        <p className="text-sm font-medium text-indigo">Balogun pilot</p>
        <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">One market first.</h1>
        <p className="mt-2 max-w-xl text-muted">{t(ui.prototype, lang)}</p>
        <p className="mt-2 max-w-xl text-sm text-muted">
          The working pilot is Balogun. Other states are names of places, not open shops. A sample stall
          stays a sample until a Balogun trader signs up with that exact code. Joining is free. A check
          can be requested only after a buyer has written, and it does not become a badge. No fee is charged.
        </p>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["1", "Walk a Balogun sample"],
            ["2", "Sign up, free"],
            ["3", "Answer an enquiry"],
            ["4", "Count the answers"],
          ].map(([step, label]) => (
            <li key={step} className="rounded-2xl border border-line bg-sheet px-3 py-3">
              <span className="font-display text-2xl leading-none text-clay">{step}</span>
              <span className="mt-1 block text-sm font-medium text-ink">{label}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          <Link to="/join" className="inline-flex h-11 items-center text-sm font-semibold text-clay">
            Sign up
          </Link>
          <Link to="/markets" className="inline-flex h-11 items-center text-sm font-semibold text-indigo">
            36 states and the FCT
          </Link>
        </div>

        <div className="mt-4 w-full min-w-0 overflow-x-auto">
          <div className="flex w-max gap-2 pb-1">
            {markets.map((market) => (
              <Link
                key={market.id}
                to="/market/$id"
                params={{ id: market.id }}
                className="w-40 shrink-0 overflow-hidden rounded-2xl border border-line bg-sheet"
              >
                <img src={market.photo} alt="" className="aspect-video w-full object-cover" />
                <span className="block px-2.5 py-2">
                  <span className="block truncate text-sm font-semibold text-ink">{market.name}</span>
                  <span className="block truncate text-xs text-muted">{market.area}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <label className="mt-4 block">
          <span className="sr-only">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(ui.searchPlaceholder, lang)}
            className="h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
          />
        </label>
        <div className="mt-3 w-full min-w-0 overflow-x-auto">
          <div className="flex w-max gap-2 pb-1">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={category === "all" ? "h-10 rounded-full bg-indigo px-3 text-sm font-semibold text-sheet" : "h-10 rounded-full border border-line bg-sheet px-3 text-sm font-semibold"}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={category === item.id ? "h-10 rounded-full bg-indigo px-3 text-sm font-semibold text-sheet" : "h-10 rounded-full border border-line bg-sheet px-3 text-sm font-semibold"}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6">
          <h2 className="font-display text-3xl text-ink">Balogun businesses</h2>
          {businesses.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              None yet. A shop appears here only after someone signs up for Balogun. Samples below are not shops.
            </p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {businesses.map((business) => (
                <li key={business.id}>
                  <Link
                    to="/shop/$code"
                    params={{ code: business.stallCode }}
                    className="block rounded-2xl border border-line bg-sheet px-4 py-3"
                  >
                    <p className="font-semibold">{business.name}</p>
                    <p className="text-sm text-muted">
                      {business.stallCode} · {business.identityStatus === "pending" ? "CAC check pending" : "Not verified"}
                      {business.phone ? "" : " · Number hidden"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <h2 className="mt-6 text-sm font-semibold tracking-wide text-muted uppercase">
          {results.filter((stall) => !claimed.has(stall.code.toUpperCase())).length} sample {t(ui.stalls, lang)}
        </h2>
        <ul className="mt-3 grid gap-2">
          {results
            .filter((stall) => !claimed.has(stall.code.toUpperCase()))
            .map((stall) => (
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
        {results.length === 0 ? <p className="mt-3 text-sm text-muted">{t(ui.noResult, lang)}</p> : null}
      </div>
      <aside className="mt-8 min-w-0 lg:col-span-2 lg:mt-0">
        <button
          type="button"
          onClick={() => setWhereOpen(true)}
          className="w-full rounded-2xl border border-line bg-sheet px-4 py-4 text-left"
        >
          <span className="text-sm text-muted">{t(ui.where, lang)}</span>
          <span className="mt-1 block font-display text-3xl text-ink">{here.name}</span>
          <span className="mt-1 block text-sm font-semibold text-indigo">{t(ui.change, lang)}</span>
        </button>
      </aside>
      <WhereDialog open={whereOpen} onOpenChange={setWhereOpen} hereId={hereId} lang={lang} onPick={setHere} />
    </main>
  );
}
