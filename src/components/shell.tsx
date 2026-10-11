import { Link, useRouterState } from "@tanstack/react-router";
import { Bike, Bookmark, Search, Store, Tag } from "lucide-react";
import { useEffect } from "react";
import { VoiceNav } from "@/components/voice-nav";
import { t, ui, type Lang } from "@/data/market";
import { useMarket } from "@/lib/market-store";

export function Shell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const lang = useMarket((state) => state.lang);
  const setLang = useMarket((state) => state.setLang);
  const walking = path.startsWith("/walk");

  useEffect(() => {
    void useMarket.persist.rehydrate();
  }, []);

  useEffect(() => {
    const code = lang === "pg" ? "pcm" : lang;
    document.documentElement.lang = code;
  }, [lang]);

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <a
        href="#content"
        className="skip-link"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-3xl leading-none tracking-tight text-indigo">Oja</span>
            <span className="text-sm text-muted">Naija</span>
          </Link>
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Pages">
              <TopLink to="/" exact label={t(ui.search, lang)} />
              <TopLink to="/markets" label={t({ en: "Markets", pg: "Markets" }, lang)} />
              <TopLink to="/start" label={t({ en: "Sell", pg: "Sell" }, lang)} />
              <TopLink to="/join" label={t({ en: "Sign up", pg: "Sign up" }, lang)} />
              <TopLink to="/orders" label={t({ en: "Orders", pg: "Orders" }, lang)} />
              <TopLink to="/open" label={t({ en: "Open", pg: "Open" }, lang)} />
              <TopLink to="/map" label={t(ui.map, lang)} />
              <TopLink to="/saved" label={t(ui.saved, lang)} />
            </nav>
            <VoiceNav />
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>
      <div id="content" tabIndex={-1} className={walking ? "outline-none" : "pb-24 outline-none lg:pb-10"}>
        {children}
      </div>
      {!walking ? (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-sheet lg:hidden" aria-label="Main">
          <div className="mx-auto grid max-w-lg grid-cols-5">
            <Tab to="/" exact icon={Search} label={t(ui.search, lang)} />
            <Tab to="/markets" icon={Store} label={t({ en: "Markets", pg: "Markets" }, lang)} />
            <Tab to="/start" icon={Tag} label={t({ en: "Sell", pg: "Sell" }, lang)} />
            <Tab to="/orders" icon={Bike} label={t({ en: "Orders", pg: "Orders" }, lang)} />
            <Tab to="/saved" icon={Bookmark} label={t(ui.saved, lang)} />
          </div>
        </nav>
      ) : null}
    </div>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <select
      value={lang}
      onChange={(event) => setLang(event.target.value as Lang)}
      className="h-11 rounded-full border border-line bg-sheet px-3 text-sm font-medium text-ink"
      aria-label="Language"
    >
        <option value="en">English</option>
        <option value="yo">Yorùbá</option>
        <option value="ig">Igbo</option>
        <option value="ha">Hausa</option>
        <option value="pg">Pidgin</option>
      </select>
  );
}

function TopLink({
  to,
  label,
  exact,
}: {
  to: "/" | "/map" | "/saved" | "/markets" | "/orders" | "/start" | "/open" | "/join" | "/login" | "/business";
  label: string;
  exact?: boolean;
}) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const active = exact ? path === to : path === to || path.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      activeOptions={{ exact: exact ?? false }}
      aria-current={active ? "page" : undefined}
      className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors data-[status=active]:bg-indigo-soft data-[status=active]:text-indigo"
    >
      {label}
    </Link>
  );
}

function Tab({
  to,
  label,
  icon: Icon,
  exact,
}: {
  to: "/" | "/map" | "/saved" | "/markets" | "/orders" | "/start" | "/open" | "/join" | "/login" | "/business";
  label: string;
  icon: typeof Search;
  exact?: boolean;
}) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const active = exact ? path === to : path === to || path.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      activeOptions={{ exact: exact ?? false }}
      aria-current={active ? "page" : undefined}
      className="flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-muted data-[status=active]:text-indigo"
    >
      <Icon className="size-5" aria-hidden />
      {label}
    </Link>
  );
}
