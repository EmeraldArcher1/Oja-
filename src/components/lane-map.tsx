import {
  Clock,
  DoorOpen,
  Droplets,
  Megaphone,
  ShoppingBasket,
  Snowflake,
  Umbrella,
} from "lucide-react";
import { edges, places, t, ui, type IconKey, type Lang } from "@/data/market";
import { cn } from "@/lib/cn";

const icons: Record<IconKey, typeof Clock> = {
  gate: DoorOpen,
  clock: Clock,
  basket: ShoppingBasket,
  droplets: Droplets,
  umbrella: Umbrella,
  office: Megaphone,
  cold: Snowflake,
};

export function LaneMap({
  hereId,
  pathIds = [],
  activeId,
  lang,
  onPlace,
}: {
  hereId: string;
  pathIds?: string[];
  activeId?: string;
  lang: Lang;
  onPlace: (id: string) => void;
}) {
  const pathSet = new Set(pathIds);
  const byId = new Map(places.map((place) => [place.id, place]));

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-indigo-soft">
      <div className="px-3 py-2 text-xs font-medium text-indigo">
        North is the street. South is the back lane.
      </div>
      <div className="relative aspect-3/4">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {edges.map((edge) => {
            const a = byId.get(edge.a);
            const b = byId.get(edge.b);
            if (!a || !b) return null;
            return (
              <line
                key={`${edge.a}-${edge.b}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-indigo)"
                strokeOpacity={0.35}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {pathIds.length > 1 ? (
            <polyline
              points={pathIds
                .map((id) => {
                  const place = byId.get(id);
                  return place ? `${place.x},${place.y}` : "";
                })
                .filter(Boolean)
                .join(" ")}
              fill="none"
              stroke="var(--color-clay)"
              strokeWidth={3.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>
        {places.map((place) => {
          const here = place.id === hereId;
          const onPath = pathSet.has(place.id);
          const active = place.id === activeId;
          const Icon = place.kind === "block" ? null : icons[place.icon];
          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onPlace(place.id)}
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
              className={cn(
                "absolute z-10 w-14 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-0.5 py-1 text-center transition-colors",
                active
                  ? "border-clay bg-clay text-sheet"
                  : here
                    ? "border-indigo bg-indigo text-sheet"
                    : onPath
                      ? "border-clay bg-clay-soft text-ink"
                      : "border-line bg-sheet text-ink",
              )}
              aria-pressed={here || active}
              aria-label={`${place.name}${here ? `, ${t(ui.you, lang)}` : ""}`}
            >
              {Icon ? <Icon className="mx-auto mb-0.5 size-3.5" aria-hidden /> : null}
              <span
                className={cn(
                  "block text-xs leading-tight font-semibold",
                  place.kind === "block" && "font-display text-sm leading-none",
                )}
              >
                {place.mapLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
