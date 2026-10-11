import type { Lang } from "@/data/market";

type AccountCopy = {
  joinTitle: string;
  joinLede: string;
  loginTitle: string;
  email: string;
  password: string;
  business: string;
  yourName: string;
  phone: string;
  phoneNote: string;
  stallCode: string;
  about: string;
  register: string;
  login: string;
  have: string;
  need: string;
  deskTitle: string;
  hidden: string;
  showNumber: string;
  hideNumber: string;
  product: string;
  price: string;
  add: string;
  enquiries: string;
  noEnquiries: string;
  evidence: string;
  evidenceNote: string;
  sendEvidence: string;
  plans: string;
  notLive: string;
};

const en: AccountCopy = {
  joinTitle: "Register the business",
  joinLede: "Free Starter. Your mobile stays hidden unless you choose to publish it. Registration is not verification.",
  loginTitle: "Log in",
  email: "Email",
  password: "Password",
  business: "Business name",
  yourName: "Your name",
  phone: "Mobile",
  phoneNote: "Buyers do not see this number.",
  stallCode: "Stall code",
  about: "About the stall",
  register: "Sign up",
  login: "Log in",
  have: "Already registered? Log in",
  need: "New business? Sign up",
  deskTitle: "Your business",
  hidden: "Number hidden from buyers",
  showNumber: "Publish my number",
  hideNumber: "Hide my number",
  product: "Product",
  price: "Price",
  add: "Add product",
  enquiries: "Enquiries",
  noEnquiries: "No enquiries yet.",
  evidence: "Ask for a check",
  evidenceNote: "A reference number is saved as pending. Oja does not call CAC or NAFDAC, and this is not approval.",
  sendEvidence: "Save as pending",
  plans: "Plans",
  notLive: "Not for sale",
};

export const accountCopy: Record<Lang, AccountCopy> = {
  en,
  pg: {
    ...en,
    joinTitle: "Register the business",
    joinLede: "Free Starter. Your number dey hidden until you publish am. Register no be verification.",
    phoneNote: "Buyer no go see this number.",
    hidden: "Number dey hidden from buyer",
    evidenceNote: "The number go stay pending. Oja no call CAC or NAFDAC. This no be approval.",
  },
  yo: {
    ...en,
    joinTitle: "Forúkọsílẹ̀ òwò",
    joinLede: "Bẹ̀rẹ̀ lọ́fẹ̀ẹ́. Nọ́mbà rẹ kò hàn àyàfi bí o bá fẹ́ hàn án. Fíforúkọsílẹ̀ kì í ṣe ìmúdájú.",
    loginTitle: "Wọlé",
    email: "Ímeèlì",
    password: "Ọ̀rọ̀ aṣínà",
    business: "Orúkọ òwò",
    yourName: "Orúkọ rẹ",
    phone: "Nọ́mbà",
    phoneNote: "Oníraja kò rí nọ́mbà yìí.",
    stallCode: "Kóòdù àkòóde",
    about: "Nípa àkòóde",
    register: "Dá òwò sílẹ̀",
    login: "Wọlé",
    have: "O ti forúkọsílẹ̀? Wọlé",
    need: "Òwò tuntun? Forúkọsílẹ̀",
    deskTitle: "Òwò rẹ",
    hidden: "Nọ́mbà pamọ́ fún oníraja",
    showNumber: "Fi nọ́mbà hàn",
    hideNumber: "Pa nọ́mbà mọ́",
    product: "Ọjà",
    price: "Owó",
    add: "Fi ọjà kún",
    enquiries: "Ìbéèrè",
    noEnquiries: "Kò sí ìbéèrè.",
    evidence: "Bèrè ìṣàyẹ̀wò",
    evidenceNote: "A ó fi nọ́mbà ìtọ́kasí pamọ́ gẹ́gẹ́ bí ẹ̀tò. Oja kò pe CAC tàbí NAFDAC. Èyí kì í ṣe ìfọwọ́sí.",
    sendEvidence: "Fi pamọ́ bí ẹ̀tò",
    plans: "Ètò",
    notLive: "Kò sí títà",
  },
  ig: {
    ...en,
    joinTitle: "Debanye azụmahịa",
    joinLede: "Malite n’efu. Nọmba gị anaghị apụta ma ị chọghị. Ndebanye abụghị nkwenye.",
    loginTitle: "Banye",
    business: "Aha azụmahịa",
    yourName: "Aha gị",
    phone: "Nọmba",
    phoneNote: "Ndị na-azụ ahịa anaghị ahụ nọmba a.",
    stallCode: "Koodu ụlọ ahịa",
    register: "Mepụta azụmahịa",
    login: "Banye",
    have: "Ị debanyela? Banye",
    need: "Azụmahịa ọhụrụ? Debanye",
    deskTitle: "Azụmahịa gị",
    hidden: "Nọmba zoro ezo",
    evidenceNote: "Nọmba a na-eche. Oja anaghị akpọ CAC ma ọ bụ NAFDAC. Nke a abụghị nkwenye.",
  },
  ha: {
    ...en,
    joinTitle: "Yi rijistar kasuwanci",
    joinLede: "Fara kyauta. Ba a nuna lambar ba sai ka yarda. Rijista ba tantancewa ba ce.",
    loginTitle: "Shiga",
    business: "Sunan kasuwanci",
    yourName: "Sunanka",
    phone: "Lamba",
    phoneNote: "Masu saya ba su gan lambar ba.",
    stallCode: "Lambar rumfa",
    register: "Ƙirƙiri kasuwanci",
    login: "Shiga",
    have: "Ka riga ka yi rijista? Shiga",
    need: "Sabon kasuwanci? Yi rijista",
    deskTitle: "Kasuwanci naka",
    hidden: "An ɓoye lambar",
    evidenceNote: "Ana ajiye lambar a matsayin jira. Oja ba ya kiran CAC ko NAFDAC. Wannan ba amincewa ba ne.",
  },
};
