import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { WhereDialog } from "@/components/where-dialog";
import { marketById } from "@/data/lagos";
import {
  minutesBetween,
  placeById,
  spokenCode,
  stallByCode,
  t,
  ui,
  waLink,
  walkSteps,
} from "@/data/market";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/walk/$code")({
  component: WalkPage,
});

function WalkPage() {
  const { code } = Route.useParams();
  const stall = stallByCode(code);
  const hereId = useMarket((state) => state.hereId);
  const setHere = useMarket((state) => state.setHere);
  const lang = useMarket((state) => state.lang);
  const [index, setIndex] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [whereOpen, setWhereOpen] = useState(false);

  useEffect(() => {
    setIndex(0);
    setArrived(false);
  }, [hereId, stall?.id]);

  if (!stall) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="font-display text-4xl">{t(ui.missing, lang)}</h1>
        <Link to="/" className="mt-4 inline-flex font-semibold text-clay">
          {t(ui.backHome, lang)}
        </Link>
      </main>
    );
  }

  const market = marketById(stall.marketId ?? "balogun");
  if (!market.lanes) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="font-display text-4xl text-ink">This market uses the street pin.</h1>
        <p className="mt-2 text-muted">
          Lane walking is set up for Balogun. Open the stall and use Google Maps to reach {stall.code}.
        </p>
        <Link
          to="/stall/$code"
          params={{ code: stall.code }}
          className="mt-4 inline-flex font-semibold text-clay"
        >
          Back to the stall
        </Link>
      </main>
    );
  }

  const steps = walkSteps(hereId, stall);
  const safeIndex = Math.min(index, steps.length - 1);
  const step = steps[safeIndex]!;
  const minutes = minutesBetween(hereId, stall);
  const here = placeById(hereId);
  const last = safeIndex === steps.length - 1;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col px-4 pt-4 pb-36">
      <div className="flex items-center justify-between gap-3 text-sm">
        <Link to="/stall/$code" params={{ code: stall.code }} className="font-medium text-indigo">
          {stall.code}
        </Link>
        <span className="text-muted">
          {t(ui.about, lang)} {minutes} {t(ui.minWalk, lang)}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold text-clay">
        {t(ui.step, lang)} {safeIndex + 1} {t(ui.of, lang)} {steps.length}
      </p>
      <div className="mt-2 flex gap-1">
        {steps.map((item, itemIndex) => (
          <span
            key={item.key}
            className={
              itemIndex <= safeIndex ? "h-1 flex-1 rounded-full bg-clay" : "h-1 flex-1 rounded-full bg-line"
            }
          />
        ))}
      </div>

      {arrived ? (
        <section className="mt-4">
          <img
            src={stall.photo}
            alt={stall.business}
            className="aspect-4/3 w-full rounded-2xl object-cover"
          />
          <p className="mt-4 text-sm font-medium text-indigo">{stall.business}</p>
          <h1 className="font-display text-5xl text-ink">{stall.code}</h1>
          <p className="mt-2 text-lg text-ink">{t(ui.thisIsIt, lang)}</p>
          <p className="mt-2 text-muted">{t(stall.shutter, lang)}</p>
          <p className="mt-2 text-sm text-muted">{spokenCode(stall)}</p>
          <div className="mt-5 grid gap-2">
            <a
              href={waLink(stall)}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-clay font-semibold text-sheet"
            >
              <MessageCircle className="size-4" aria-hidden />
              {t(ui.whatsapp, lang)}
            </a>
            <Link
              to="/stall/$code"
              params={{ code: stall.code }}
              className="flex h-12 items-center justify-center rounded-2xl border border-line bg-sheet font-semibold"
            >
              {t(ui.viewStall, lang)}
            </Link>
            <button
              type="button"
              onClick={() => {
                setArrived(false);
                setIndex(0);
              }}
              className="h-11 font-medium text-muted"
            >
              {t(ui.tryAgain, lang)}
            </button>
          </div>
        </section>
      ) : (
        <section key={step.key} className="animate-in fade-in mt-4 duration-300">
          <img
            src={step.photo}
            alt={step.alt}
            className="aspect-4/3 w-full rounded-2xl object-cover"
          />
          <p className="mt-4 text-sm font-medium text-muted">
            {t(ui.from, lang)} {step.fromName}
          </p>
          <h1 className="mt-1 font-display text-4xl text-ink">
            {t(ui.next, lang)} {step.placeName}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink">{t(step.body, lang)}</p>
        </section>
      )}

      {!arrived ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setWhereOpen(true)}
              className="text-left text-sm font-medium text-indigo"
            >
              {t(ui.lost, lang)}
              <span className="block text-xs font-normal text-muted">{here.name}</span>
            </button>
          </div>
          <div className="mx-auto mt-2 grid w-full max-w-xl grid-cols-[7rem_1fr] gap-2">
            <button
              type="button"
              disabled={safeIndex === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              className="h-12 rounded-2xl border border-line bg-sheet font-semibold disabled:opacity-40"
            >
              {t(ui.back, lang)}
            </button>
            <button
              type="button"
              onClick={() => {
                if (last) setArrived(true);
                else setIndex((value) => value + 1);
              }}
              className="h-12 rounded-2xl bg-clay font-semibold text-sheet"
            >
              {last ? t(ui.arrivedBtn, lang) : t(ui.seeIt, lang)}
            </button>
          </div>
        </div>
      ) : null}

      <WhereDialog
        open={whereOpen}
        onOpenChange={setWhereOpen}
        hereId={hereId}
        lang={lang}
        onPick={(id) => {
          setHere(id);
          setWhereOpen(false);
        }}
      />
    </main>
  );
}
