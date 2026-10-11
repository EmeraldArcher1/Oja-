import { googlePin } from "@/data/trade";

export function StreetMap({
  lat,
  lng,
  label,
  moved,
}: {
  lat: number;
  lng: number;
  label: string;
  moved?: string;
}) {
  const zoom = 16;
  const span = 2 ** zoom;
  const fx = ((lng + 180) / 360) * span;
  const latRad = (lat * Math.PI) / 180;
  const fy =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * span;
  const x0 = Math.floor(fx) - 1;
  const y0 = Math.floor(fy) - 1;
  const cols = 3;
  const rows = 2;

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-sheet">
      <div className="relative grid h-56 grid-cols-3 grid-rows-2 bg-indigo-soft">
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => (
            <img
              key={`${row}-${col}`}
              alt=""
              src={`https://tile.openstreetmap.org/${zoom}/${x0 + col}/${y0 + row}.png`}
              className="h-full w-full object-cover"
            />
          )),
        )}
        <span
          className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sheet bg-clay shadow"
          style={{ left: `${((fx - x0) / cols) * 100}%`, top: `${((fy - y0) / rows) * 100}%` }}
          aria-hidden
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3">
        <p className="max-w-sm text-sm text-muted">
          {moved
            ? `The owner moved this pin. ${moved}`
            : "Directory pin on the street map. The stall photo stays until the owner changes it. Open Google Maps for satellite and street view."}
          <span className="mt-1 block text-xs">© OpenStreetMap</span>
        </p>
        <a
          href={googlePin(lat, lng)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center rounded-full bg-indigo px-4 text-sm font-semibold text-sheet"
        >
          Google Maps
        </a>
      </div>
      <p className="sr-only">
        Street map for {label} at {lat.toFixed(5)}, {lng.toFixed(5)}.
      </p>
    </section>
  );
}