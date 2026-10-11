import { useNavigate } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { routeFor, type VoiceDest } from "@/lib/voice-route";

type Rec = {
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
};

function recognition(): Rec | null {
  const host = window as Window & {
    SpeechRecognition?: new () => Rec;
    webkitSpeechRecognition?: new () => Rec;
  };
  const Ctor = host.SpeechRecognition ?? host.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-NG";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function pageWords(): string {
  const root = document.getElementById("content");
  if (!root) return "This page has nothing to read.";
  const bits = [...root.querySelectorAll("h1, h2, p")]
    .map((node) => node.textContent?.trim() ?? "")
    .filter(Boolean)
    .slice(0, 4);
  return bits.join(". ") || "This page has nothing to read.";
}

const help = "Say markets, sell, orders, saved, map, sign up, a stall code, or read.";

export function VoiceNav() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [note, setNote] = useState("");
  const heard = useRef<Rec | null>(null);
  const canHear =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    return () => {
      heard.current?.abort();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function go(dest: VoiceDest, said: string) {
    if (dest === "help") {
      setNote(help);
      speak(help);
      return;
    }
    if (dest === "read") {
      const words = pageWords();
      setNote(words);
      speak(words);
      return;
    }
    const label =
      typeof dest === "object"
        ? `stall ${dest.stall}`
        : dest === "/"
          ? "search"
          : dest === "/join"
            ? "sign up"
            : dest.slice(1);
    setNote(said ? `Heard “${said}”. Opening ${label}.` : `Opening ${label}.`);
    speak(`Opening ${label}.`);
    if (typeof dest === "object") {
      void navigate({ to: "/stall/$code", params: { code: dest.stall } });
      return;
    }
    void navigate({ to: dest });
  }

  function listen() {
    const next = recognition();
    if (!next) {
      go("read", "");
      return;
    }
    heard.current?.abort();
    heard.current = next;
    next.lang = "en-NG";
    next.onresult = (event) => {
      const said = event.results[0]?.[0]?.transcript ?? "";
      const dest = routeFor(said);
      if (!dest) {
        setNote(`Heard “${said}”. ${help}`);
        speak(`I heard ${said}. ${help}`);
        return;
      }
      go(dest, said);
    };
    next.onerror = (event) => {
      const message =
        event.error === "not-allowed"
          ? "The microphone is blocked. Allow it in the phone settings, or tap again to read the page."
          : "No speech heard. Tap the microphone and try again.";
      setNote(message);
      setListening(false);
    };
    next.onend = () => setListening(false);
    setListening(true);
    setNote("Listening. Say a place, or say read.");
    next.start();
  }

  return (
    <>
      <button
        type="button"
        onClick={listen}
        aria-pressed={listening}
        aria-label={canHear ? "Voice navigation" : "Read this page aloud"}
        className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-sheet text-indigo data-[on=true]:bg-indigo data-[on=true]:text-sheet"
        data-on={listening}
      >
        <Mic className="size-5" aria-hidden />
      </button>
      {note ? (
        <p
          role="status"
          className="fixed inset-x-0 top-16 z-40 border-b border-line bg-indigo px-4 py-2 text-sm text-sheet"
        >
          {note}
        </p>
      ) : null}
    </>
  );
}
