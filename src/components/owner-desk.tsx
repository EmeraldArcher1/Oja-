import { useState } from "react";
import type { Stall } from "@/data/market";
import { naira } from "@/data/market";
import { showPhone, tidyPhone, type LiveStall } from "@/data/trade";
import { useMarket } from "@/lib/market-store";

export function OwnerDesk({ stall, live }: { stall: Stall; live: LiveStall }) {
  const patchStall = useMarket((state) => state.patchStall);
  const clearPin = useMarket((state) => state.clearPin);
  const [phone, setPhone] = useState("");
  const [slip, setSlip] = useState("");
  const [goodsName, setGoodsName] = useState("");
  const [goodsPrice, setGoodsPrice] = useState("");
  const [message, setMessage] = useState("");

  function savePhone() {
    const tidy = tidyPhone(phone);
    if (!tidy) {
      setMessage("Use a Nigerian mobile, like 0803 000 0000.");
      return;
    }
    patchStall(stall.id, { phone: tidy, verify: "pending" });
    setPhone("");
    setMessage("Phone saved on this phone. The stall stays a sample listing.");
  }

  function confirmStall() {
    const tidy = tidyPhone(live.phone);
    if (!tidy || slip.trim().length < 4) {
      setMessage("Add the stall phone and an association slip of at least 4 characters.");
      return;
    }
    patchStall(stall.id, { verify: "sample", slip: slip.trim() });
    setMessage("Slip saved on this phone only. It does not verify the business.");
  }

  function addGoods() {
    const name = goodsName.trim();
    const price = Number(goodsPrice.replace(/,/g, ""));
    if (name.length < 2 || !Number.isFinite(price) || price <= 0) {
      setMessage("Add a product name and a price in naira.");
      return;
    }
    patchStall(stall.id, {
      catalogue: [...live.catalogue, { name, price: Math.round(price), unit: "piece" }],
    });
    setGoodsName("");
    setGoodsPrice("");
    setMessage("Product listed.");
  }

  function nudge(latStep: number, lngStep: number) {
    patchStall(stall.id, {
      lat: live.lat + latStep,
      lng: live.lng + lngStep,
      movedNote: "Owner moved the pin.",
    });
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Choose a photo.");
      return;
    }
    const data = await resizePhoto(file);
    if (!data) {
      setMessage("That photo is too heavy. Try another one.");
      return;
    }
    patchStall(stall.id, { photo: data });
    setMessage("Stall photo updated. Buyers see this instead of the directory picture.");
  }

  return (
    <section id="owner" className="mt-8 rounded-2xl border border-line bg-sheet p-4">
      <h2 className="font-display text-3xl text-ink">Stall owner</h2>
      <p className="mt-1 text-sm text-muted">
        Change the phone, the products, the photo, or the pin. Buyers use whatever you save here.
        This sample does not collect NIN or BVN.
      </p>
      <p className="mt-3 text-sm text-ink">
        Order line now: <span className="font-semibold">{showPhone(live.phone)}</span>
      </p>

      <label className="mt-4 block text-sm font-medium">
        Your mobile
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          inputMode="tel"
          placeholder="0803 000 0000"
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      <button
        type="button"
        onClick={savePhone}
        className="mt-2 h-11 rounded-full bg-indigo px-4 text-sm font-semibold text-sheet"
      >
        Save phone
      </button>

      <div className="mt-5">
        <p className="text-sm font-medium">Products</p>
        <ul className="mt-2 divide-y divide-line">
          {live.catalogue.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span>
                {item.name}
                <span className="text-muted"> · {naira(item.price)}</span>
              </span>
              <button
                type="button"
                className="font-semibold text-clay"
                onClick={() =>
                  patchStall(stall.id, {
                    catalogue: live.catalogue.filter((entry) => entry.name !== item.name),
                  })
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-[1fr_7rem] gap-2">
          <input
            value={goodsName}
            onChange={(event) => setGoodsName(event.target.value)}
            placeholder="Product"
            className="h-11 rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
          />
          <input
            value={goodsPrice}
            onChange={(event) => setGoodsPrice(event.target.value)}
            inputMode="numeric"
            placeholder="Price"
            className="h-11 rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
          />
        </div>
        <button
          type="button"
          onClick={addGoods}
          className="mt-2 h-11 rounded-full border border-line px-4 text-sm font-semibold"
        >
          Add product
        </button>
      </div>

      <label className="mt-5 block text-sm font-medium">
        Stall photo
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm"
          onChange={(event) => void onPhoto(event.target.files?.[0])}
        />
      </label>

      <div className="mt-5">
        <p className="text-sm font-medium">Pin</p>
        <p className="mt-1 text-sm text-muted">
          Nudge it if the stall is not where the directory put it. About 15 metres a tap.
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <span />
          <Move label="North" onClick={() => nudge(0.00015, 0)} />
          <span />
          <Move label="West" onClick={() => nudge(0, -0.00015)} />
          <Move label="Reset" onClick={() => clearPin(stall.id)} />
          <Move label="East" onClick={() => nudge(0, 0.00015)} />
          <span />
          <Move label="South" onClick={() => nudge(-0.00015, 0)} />
        </div>
      </div>

      <label className="mt-5 block text-sm font-medium">
        Association slip
        <input
          value={slip}
          onChange={(event) => setSlip(event.target.value)}
          placeholder="BM-2041"
          className="mt-1 h-12 w-full rounded-2xl border border-line bg-paper px-3 text-base outline-none focus-visible:border-indigo"
        />
      </label>
      <button
        type="button"
        onClick={confirmStall}
        className="mt-2 h-11 rounded-full border border-line px-4 text-sm font-semibold"
      >
        Save a note
      </button>
      {message ? <p className="mt-3 text-sm text-ink">{message}</p> : null}
    </section>
  );
}

function Move({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-2xl border border-line text-sm font-semibold"
    >
      {label}
    </button>
  );
}

async function resizePhoto(file: File): Promise<string | null> {
  const url = URL.createObjectURL(file);
  try {
    const image = await loadImage(url);
    const scale = Math.min(1, 800 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/jpeg", 0.72);
    if (data.length > 500_000) return null;
    return data;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image"));
    image.src = url;
  });
}
