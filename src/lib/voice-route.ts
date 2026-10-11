export type VoiceDest =
  | "/"
  | "/markets"
  | "/start"
  | "/join"
  | "/login"
  | "/business"
  | "/orders"
  | "/saved"
  | "/map"
  | "/open"
  | "read"
  | "help"
  | { stall: string };

export function routeFor(said: string): VoiceDest | null {
  const text = said.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
  const code = text.match(/\b([a-z]{1,4}-?\d{2,4})\b/);
  if (code?.[1] && /\d/.test(code[1])) return { stall: code[1].toUpperCase() };
  if (/\b(help|commands|wetin)\b/.test(text)) return "help";
  if (/\b(read|where)\b/.test(text)) return "read";
  if (/\b(register|join|sign up|signup)\b/.test(text)) return "/join";
  if (/\b(login|log in)\b/.test(text)) return "/login";
  if (/\b(business|my stall|my shop)\b/.test(text)) return "/business";
  if (/\bmarkets?\b/.test(text)) return "/markets";
  if (/\b(sell|start)\b/.test(text)) return "/start";
  if (/\borders?\b/.test(text)) return "/orders";
  if (/\bsaved\b/.test(text)) return "/saved";
  if (/\bmap\b/.test(text)) return "/map";
  if (/\b(partner|advert|advertise|export)\b/.test(text)) return "/open";
  if (/\b(home|search|find|oja)\b/.test(text)) return "/";
  return null;
}
