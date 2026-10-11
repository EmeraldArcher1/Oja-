import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { accountCopy } from "@/data/account-copy";
import { markets } from "@/data/lagos";
import { categories, type CategoryId } from "@/data/market";
import { lgasIn } from "@/data/lgas";
import { stateById, states } from "@/data/nigeria";
import { registerBusiness } from "@/lib/market/api";
import { useMarket } from "@/lib/market-store";

const searchSchema = z.object({
  state: z.string().optional(),
});

export const Route = createFileRoute("/join")({
  validateSearch: searchSchema,
  component: JoinPage,
});

function JoinPage() {
  const lang = useMarket((state) => state.lang);
  const text = accountCopy[lang];
  const navigate = useNavigate();
  const search = Route.useSearch();
  const initialState = stateById(search.state ?? "") ? search.state! : "lagos";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [trader, setTrader] = useState("");
  const [phone, setPhone] = useState("");
  const [stallCode, setStallCode] = useState("");
  const [about, setAbout] = useState("");
  const [stateId, setStateId] = useState(initialState);
  const [lga, setLga] = useState("");
  const [marketId, setMarketId] = useState("balogun");
  const [category, setCategory] = useState<CategoryId>("food");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const result = await registerBusiness({
      data: {
        email,
        password,
        name,
        trader,
        phone,
        stallCode,
        about,
        marketId: stateId === "lagos" ? marketId : stateId,
        lga,
        category,
      },
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    void navigate({ to: "/business" });
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-5">
      <h1 className="font-display text-4xl text-ink">{text.joinTitle}</h1>
      <p className="mt-2 text-muted">{text.joinLede}</p>
      <form onSubmit={(event) => void submit(event)} className="mt-4 grid gap-3">
        <Field
          label={text.email}
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="name@email.com"
          autoComplete="email"
          required
        />
        <p className="-mt-2 text-sm text-muted">This email is how you sign up and log in.</p>
        <Field
          label={text.password}
          value={password}
          onChange={setPassword}
          type="password"
          autoComplete="new-password"
          required
        />
        <Field label={text.business} value={name} onChange={setName} />
        <Field label={text.yourName} value={trader} onChange={setTrader} />
        <label className="text-sm font-medium">
          State
          <select
            value={stateId}
            onChange={(event) => {
              setStateId(event.target.value);
              setLga("");
            }}
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3"
          >
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Local government
          <select
            value={lga}
            onChange={(event) => setLga(event.target.value)}
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3"
          >
            <option value="">Choose</option>
            {lgasIn(stateId).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        {stateId === "lagos" ? (
          <label className="text-sm font-medium">
            Lagos market
            <select
              value={marketId}
              onChange={(event) => setMarketId(event.target.value)}
              className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3"
            >
              {markets.map((market) => (
                <option key={market.id} value={market.id}>
                  {market.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="text-sm text-muted">
            You can record {stateById(stateId)?.name}. Buyers on the home page will not see it. The working pilot is Balogun only.
          </p>
        )}
        {stateId === "lagos" && marketId !== "balogun" ? (
          <p className="text-sm text-muted">
            This Lagos market is not the pilot. The shop will be saved and kept off the Balogun list.
          </p>
        ) : null}
        <label className="text-sm font-medium">
          {text.product}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as CategoryId)}
            className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3"
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <Field label={text.stallCode} value={stallCode} onChange={setStallCode} placeholder="BA01" />
        <Field label={`${text.phone} (optional)`} value={phone} onChange={setPhone} placeholder="0803 000 0000" type="tel" autoComplete="tel" />
        <p className="-mt-2 text-sm text-muted">{text.phoneNote}</p>
        <Field label={text.about} value={about} onChange={setAbout} />
        {error ? <p className="text-sm font-medium text-clay">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-2xl bg-clay text-sm font-semibold text-sheet disabled:opacity-60"
        >
          {text.register}
        </button>
      </form>
      <Link to="/login" className="mt-4 inline-flex text-sm font-semibold text-indigo">
        {text.have}
      </Link>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-12 w-full rounded-2xl border border-line bg-sheet px-3 text-base outline-none focus-visible:border-indigo"
      />
    </label>
  );
}
