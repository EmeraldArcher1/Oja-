import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { anchors, blocks, placeById, t, ui, type Lang } from "@/data/market";
import { cn } from "@/lib/cn";

export function WhereDialog({
  open,
  onOpenChange,
  hereId,
  lang,
  onPick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hereId: string;
  lang: Lang;
  onPick: (id: string) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-sheet p-4 shadow-lg sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-2xl text-ink">
                {t(ui.whereTitle, lang)}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {t(ui.whereHelp, lang)}
              </Dialog.Description>
            </div>
            <Dialog.Close className="grid size-10 place-items-center rounded-full border border-line text-ink">
              <X className="size-4" aria-hidden />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
          <PlaceGroup
            title={t(ui.gates, lang)}
            ids={anchors().map((place) => place.id)}
            hereId={hereId}
            lang={lang}
            onPick={onPick}
          />
          <PlaceGroup
            title={t(ui.blocks, lang)}
            ids={blocks().map((place) => place.id)}
            hereId={hereId}
            lang={lang}
            onPick={onPick}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PlaceGroup({
  title,
  ids,
  hereId,
  lang,
  onPick,
}: {
  title: string;
  ids: string[];
  hereId: string;
  lang: Lang;
  onPick: (id: string) => void;
}) {
  return (
    <section className="mt-5">
      <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">{title}</h3>
      <ul className="mt-2 grid gap-2">
        {ids.map((id) => {
          const place = placeById(id);
          const here = id === hereId;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onPick(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left",
                  here ? "border-indigo bg-indigo-soft" : "border-line bg-paper",
                )}
              >
                <img
                  src={place.photo}
                  alt=""
                  className="size-12 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block font-medium text-ink">{place.name}</span>
                  <span className="block text-sm text-muted">{t(place.spot, lang)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
