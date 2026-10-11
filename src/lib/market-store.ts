import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Lang, Stall } from "@/data/market";
import { setRegisteredStalls } from "@/data/market";
import { jobDone, type Job, type StallOverride } from "@/data/trade";
import type { Lead } from "@/data/leads";

type Buyer = { name: string; phone: string };

type MarketState = {
  hereId: string;
  lang: Lang;
  saved: string[];
  overrides: Record<string, StallOverride>;
  jobs: Job[];
  tokens: number;
  buyer: Buyer | null;
  registered: Stall[];
  leads: Lead[];
  setHere: (id: string) => void;
  setLang: (lang: Lang) => void;
  toggleSaved: (id: string) => void;
  patchStall: (id: string, patch: StallOverride) => void;
  clearPin: (id: string) => void;
  placeJob: (job: Job) => void;
  patchJob: (id: string, patch: Partial<Job>) => void;
  setBuyer: (buyer: Buyer) => void;
  registerStall: (stall: Stall) => void;
  addLead: (lead: Lead) => void;
};

export const useMarket = create<MarketState>()(
  persist(
    (set, get) => ({
      hereId: "dosunmu",
      lang: "en",
      saved: [],
      overrides: {},
      jobs: [],
      tokens: 0,
      buyer: null,
      registered: [],
      leads: [],
      setHere: (hereId) => set({ hereId }),
      setLang: (lang) => set({ lang }),
      toggleSaved: (id) => {
        const saved = get().saved;
        set({
          saved: saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id],
        });
      },
      patchStall: (id, patch) => {
        const current = get().overrides[id] ?? {};
        set({ overrides: { ...get().overrides, [id]: { ...current, ...patch } } });
      },
      clearPin: (id) => {
        const current = { ...(get().overrides[id] ?? {}) };
        delete current.lat;
        delete current.lng;
        delete current.movedNote;
        set({ overrides: { ...get().overrides, [id]: current } });
      },
      placeJob: (job) => set({ jobs: [job, ...get().jobs] }),
      patchJob: (id, patch) => {
        const prev = get().jobs.find((job) => job.id === id);
        if (!prev || jobDone(prev)) return;
        const next = { ...prev, ...patch };
        const add = !jobDone(prev) && jobDone(next) ? prev.token : 0;
        set({
          jobs: get().jobs.map((job) => (job.id === id ? next : job)),
          tokens: get().tokens + add,
        });
      },
      setBuyer: (buyer) => set({ buyer }),
      registerStall: (stall) => set({ registered: [stall, ...get().registered] }),
      addLead: (lead) => set({ leads: [lead, ...(get().leads ?? [])] }),
    }),
    {
      name: "oja-v1",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

useMarket.subscribe((state) => {
  setRegisteredStalls(state.registered);
});
