import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { marketById } from "@/data/lagos";
import {
  categoryLabel,
  minutesBetween,
  spokenCode,
  t,
  ui,
  type Lang,
  type Stall,
} from "@/data/market";
import { listingLabel, presentStall } from "@/data/trade";
import { cn } from "@/lib/cn";
import { useMarket } from "@/lib/market-store";

export function StallCard({
  stall,
  hereId,
  lang,
  saved,
  onToggleSaved,
}: {
  stall: Stall;
  hereId: string;
  lang: Lang;
  saved: boolean;
  onToggleSaved: () => void;
}) {
  const market = marketById(stall.marketId ?? "balogun");
  const minutes = minutesBetween(hereId, stall);
  const live = presentStall(stall, useMarket((state) => state.overrides[stall.id]));
  const badge = listingLabel(live.verified);
  return (
    <article className="flex gap-2 rounded-2xl border border-line bg-sheet p-2.5">
      <Link
        to="/stall/$code"
        params={{ code: stall.code }}
        className="flex min-w-0 flex-1 gap-3 rounded-xl"
      >
        <img
          src={live.photo}
          alt=""
          className="size-20 shrink-0 rounded-xl object-cover"
        />
        <span className="min-w-0 py-0.5">
          <span className="font-display text-xl leading-none text-indigo">{stall.code}</span>
          <span className="mt-1 block truncate font-semibold text-ink">{stall.business}</span>
          <span className="block truncate text-sm text-muted">
            {stall.trader} · {categoryLabel(stall.category)}
          </span>
          <span className="mt-1 block text-sm text-ink">
            <span>{market.lanes ? `${minutes} ${t(ui.minWalk, lang)}` : market.area}</span>
            <span className="text-muted"> · {spokenCode(stall)}</span>
            <span className="text-muted"> · {badge}</span>
          </span>
        </span>
      </Link>
      <button
        type="button"
        onClick={onToggleSaved}
        className="grid size-11 shrink-0 place-items-center self-start rounded-full text-indigo"
        aria-pressed={saved}
        aria-label={saved ? `Unsave ${stall.business}` : `Save ${stall.business}`}
      >
        <Bookmark className={cn("size-5", saved && "fill-indigo")} aria-hidden />
      </button>
    </article>
  );
}
