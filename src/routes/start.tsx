import { createFileRoute, Link } from "@tanstack/react-router";
import { useMarket } from "@/lib/market-store";

export const Route = createFileRoute("/start")({
  component: StartPage,
});

const copy = {
  en: {
    kicker: "For traders",
    title: "How to put your stall on Oja",
    lede: "Sign up with your email. A phone number is optional and is not the account.",
    steps: [
      {
        n: "1",
        title: "Open your market",
        body: "Buyers start from the market, not a street address.",
      },
      {
        n: "2",
        title: "Open the stall",
        body: "For this lesson, use Kemi Lace House, code A1-04. On a real stall you would open yours.",
      },
      {
        n: "3",
        title: "Save your mobile",
        body: "Scroll to Stall owner. Type the number buyers already call, like 0803 000 0000, and tap Save phone. Orders open on that WhatsApp.",
      },
      {
        n: "4",
        title: "List what you sell",
        body: "Add the product and the price. Remove anything you do not sell. The price is listed. Stock is not live — you still confirm each order.",
      },
      {
        n: "5",
        title: "Fix the photo and the pin",
        body: "If the directory picture or the map pin is wrong, change them. Buyers see what you save.",
      },
      {
        n: "6",
        title: "Share the shop",
        body: "Tap Share shop and send the link on your WhatsApp status. That is how a buyer finds you.",
      },
      {
        n: "7",
        title: "Confirm, then hand over",
        body: "An enquiry can be saved on this pilot. It does not open WhatsApp, book a rider, or take a fee. You keep the whole sample price, because Oja does not collect it.",
      },
    ],
    does: "What it does now",
    doesItems: [
      "Saves an enquiry against the stall code when someone places a sample order.",
      "Hides the phone number unless you publish it.",
      "Shows a delivery quote on screen. It does not book a rider.",
      "Does not take a fee.",
    ],
    not: "What it does not do",
    notItems: [
      "It does not take NIN or BVN.",
      "It does not move money. There is no live payment or refund.",
      "A sample listing is not a verified business.",
      "A stall saved on this phone does not replace a sample. Sign up with that stall code to do that.",
    ],
    helps: "How the day gets simpler",
    helpItems: [
      "You stop repeating your location. The code and the pin do that.",
      "You stop retyping the price list for every customer.",
      "The rider is not guessing which shutter.",
      "You can see what you keep before you hand the goods over.",
    ],
    markets: "Choose a market",
    stall: "Open the sample stall",
    desk: "Go to Stall owner",
    mapped: "Are the stalls mapped?",
    mappedBody:
      "Partly. Each market has a street pin near the real market, and every stall opens in Google Maps. Balogun also has a lane walk: turn at the landmark, then use the stall code. The pin is not a surveyed door. If yours is wrong, nudge it under Stall owner. About 15 metres a tap.",
  },
  pg: {
    kicker: "For traders",
    title: "How you go put your stall for Oja",
    lede: "Sign up with your email. Phone number no be the account.",
    steps: [
      {
        n: "1",
        title: "Open your market",
        body: "Buyer dey start from the market, no be street address.",
      },
      {
        n: "2",
        title: "Open the stall",
        body: "For this lesson, use Kemi Lace House, code A1-04. For real stall, you go open your own.",
      },
      {
        n: "3",
        title: "Save your number",
        body: "Scroll go Stall owner. Type the number wey buyer dey call, like 0803 000 0000, then tap Save phone. Order go open for that WhatsApp.",
      },
      {
        n: "4",
        title: "List wetin you dey sell",
        body: "Add the product and the price. Remove wetin you no dey sell. The price na listed price. Stock no be live — you still go confirm each order.",
      },
      {
        n: "5",
        title: "Correct the photo and the pin",
        body: "If the picture or the map pin no correct, change am. Buyer go see wetin you save.",
      },
      {
        n: "6",
        title: "Share the shop",
        body: "Tap Share shop and send the link for your WhatsApp status. Na so buyer go find you.",
      },
      {
        n: "7",
        title: "Confirm, then give am",
        body: "Enquiry fit save for this pilot. E no open WhatsApp, e no book rider, and e no take fee. You keep the sample price, because Oja no collect am.",
      },
    ],
    does: "Wetin e dey do now",
    doesItems: [
      "E save enquiry for the stall code when person place sample order.",
      "E hide the phone number until you publish am.",
      "E show delivery quote for screen. E no book rider.",
      "E no take fee.",
    ],
    not: "Wetin e no dey do",
    notItems: [
      "E no collect NIN or BVN.",
      "E no move money. No live payment or refund.",
      "Sample listing no be verified business.",
      "Stall wey you save for this phone no replace sample. Sign up with the stall code.",
    ],
    helps: "How the day go easy",
    helpItems: [
      "You no go dey repeat your location. The code and the pin go do am.",
      "You no go dey type the price list for every customer.",
      "The rider no go dey guess which shutter.",
      "You fit see wetin you go keep before you hand the goods over.",
    ],
    markets: "Choose market",
    stall: "Open the sample stall",
    desk: "Go Stall owner",
    mapped: "The stall dem don map?",
    mappedBody:
      "Small. Every market get street pin near the real market, and every stall fit open for Google Maps. Balogun get lane waka: turn for the landmark, then use the stall code. The pin no be measured door. If your own no correct, shift am under Stall owner. About 15 metres for one tap.",
  },
} as const;

function StartPage() {
  const lang = useMarket((state) => state.lang);
  const text = lang === "pg" ? copy.pg : copy.en;

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <p className="text-sm font-medium text-indigo">{text.kicker}</p>
      <h1 className="mt-1 font-display text-4xl text-ink">{text.title}</h1>
      <p className="mt-2 text-muted">{text.lede}</p>
      <Link to="/join" className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-clay">
        Sign up
      </Link>
      <p className="mt-4 rounded-2xl border border-line bg-sheet px-4 py-4 text-sm text-ink">
        A stall is added by signing up. A form on this phone does not register a business.
      </p>
      <Link to="/open" className="mt-3 inline-flex text-sm font-semibold text-indigo">
        {lang === "pg" ? "Advertise, export, or partner." : "Advertise, export, or partner."}
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to="/markets"
          className="inline-flex h-11 items-center rounded-full bg-indigo px-4 text-sm font-semibold text-sheet"
        >
          {text.markets}
        </Link>
        <Link
          to="/stall/$code"
          params={{ code: "A1-04" }}
          hash="owner"
          className="inline-flex h-11 items-center rounded-full bg-clay px-4 text-sm font-semibold text-sheet"
        >
          {text.desk}
        </Link>
      </div>

      <ol className="mt-6 grid gap-3">
        {text.steps.map((step) => (
          <li key={step.n} className="rounded-2xl border border-line bg-sheet px-4 py-4">
            <p className="font-display text-3xl leading-none text-clay">{step.n}</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{step.title}</h2>
            <p className="mt-1 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-8 rounded-2xl bg-indigo px-4 py-4 text-sheet">
        <h2 className="font-display text-3xl">{text.mapped}</h2>
        <p className="mt-2 text-sm text-indigo-soft">{text.mappedBody}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.does}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink">
          {text.doesItems.map((item) => (
            <li key={item} className="rounded-2xl border border-line bg-sheet px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.helps}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink">
          {text.helpItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-ink">{text.not}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted">
          {text.notItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Link
        to="/stall/$code"
        params={{ code: "A1-04" }}
        className="mt-6 inline-flex h-12 items-center rounded-2xl border border-line bg-sheet px-4 text-sm font-semibold"
      >
        {text.stall}
      </Link>
    </main>
  );
}
