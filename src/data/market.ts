import { extraStalls, marketById } from "@/data/lagos";
import { phrases } from "@/data/phrases";

export type Lang = "en" | "pg" | "yo" | "ig" | "ha";

export type Copy = { en: string; pg: string };

export type IconKey =
  | "gate"
  | "clock"
  | "basket"
  | "droplets"
  | "umbrella"
  | "office"
  | "cold";

export type Place = {
  id: string;
  name: string;
  mapLabel: string;
  kind: "gate" | "landmark" | "block";
  x: number;
  y: number;
  icon: IconKey;
  photo: string;
  spot: Copy;
  letter?: string;
};

export type Edge = {
  a: string;
  b: string;
  steps: number;
  aToB: Copy;
  bToA: Copy;
};

export const categories = [
  { id: "fabric", label: "Fabric & lace" },
  { id: "ankara", label: "Ankara & aso-oke" },
  { id: "food", label: "Foodstuff" },
  { id: "beauty", label: "Beauty" },
  { id: "phones", label: "Phones" },
  { id: "home", label: "Household" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type CatalogueItem = {
  name: string;
  price: number;
  unit: string;
};

export type Stall = {
  id: string;
  code: string;
  block: string;
  row: number;
  stallNo: number;
  business: string;
  trader: string;
  category: CategoryId;
  blurb: string;
  keywords: string[];
  languages: string[];
  hours: string;
  photo: string;
  whatsapp: string;
  shutter: Copy;
  catalogue: CatalogueItem[];
  note: { name: string; text: string };
  marketId?: string;
  lat?: number;
  lng?: number;
  verified?: "sample" | "pending";
};

export const places: Place[] = [
  {
    id: "dosunmu",
    name: "Dosunmu Gate",
    mapLabel: "Dosunmu",
    kind: "gate",
    x: 50,
    y: 8,
    icon: "gate",
    photo: "/market/gate.jpg",
    spot: {
      en: "The wide opening onto the street, between painted pillars.",
      pg: "The wide opening wey face the street, between painted pillars.",
    },
  },
  {
    id: "clock",
    name: "Clock kiosk",
    mapLabel: "Clock",
    kind: "landmark",
    x: 50,
    y: 20,
    icon: "clock",
    photo: "/market/clock.jpg",
    spot: {
      en: "A wooden stand with a round clock, where the lane splits three ways.",
      pg: "Wooden stand with round clock, where the road split into three.",
    },
  },
  {
    id: "block-a",
    name: "Block A · Fabric",
    mapLabel: "A Fabric",
    kind: "block",
    x: 16,
    y: 34,
    icon: "gate",
    letter: "A",
    photo: "/market/lace.jpg",
    spot: {
      en: "Lace and george hanging at head height.",
      pg: "Lace and george dey hang for head level.",
    },
  },
  {
    id: "block-b",
    name: "Block B · Ankara",
    mapLabel: "B Ankara",
    kind: "block",
    x: 36,
    y: 36,
    icon: "gate",
    letter: "B",
    photo: "/market/ankara.jpg",
    spot: {
      en: "Printed cloth stacked to the roof.",
      pg: "Printed cloth wey dem stack reach roof.",
    },
  },
  {
    id: "pepper",
    name: "Red pepper sellers",
    mapLabel: "Pepper",
    kind: "landmark",
    x: 82,
    y: 18,
    icon: "basket",
    photo: "/market/pepper.jpg",
    spot: {
      en: "Wide basins of red pepper at the mouth of the food row.",
      pg: "Wide basin of red pepper for the mouth of the food line.",
    },
  },
  {
    id: "block-c",
    name: "Block C · Food",
    mapLabel: "C Food",
    kind: "block",
    x: 82,
    y: 36,
    icon: "gate",
    letter: "C",
    photo: "/market/provisions.jpg",
    spot: {
      en: "Wooden foodstuff shutters just behind the pepper basins.",
      pg: "Wooden foodstuff shutter wey dey behind the pepper basin.",
    },
  },
  {
    id: "tank",
    name: "Blue water tank",
    mapLabel: "Tank",
    kind: "landmark",
    x: 50,
    y: 50,
    icon: "droplets",
    photo: "/market/tank.jpg",
    spot: {
      en: "A big blue plastic tank standing in the middle lane.",
      pg: "Big blue plastic tank wey stand for middle road.",
    },
  },
  {
    id: "block-d",
    name: "Block D · Beauty",
    mapLabel: "D Beauty",
    kind: "block",
    x: 16,
    y: 58,
    icon: "gate",
    letter: "D",
    photo: "/market/beauty.jpg",
    spot: {
      en: "Mirrors, cream cartons, and the smell of pomade.",
      pg: "Mirror, cream carton, and pomade smell.",
    },
  },
  {
    id: "umbrella",
    name: "Yellow umbrellas",
    mapLabel: "Yellow",
    kind: "landmark",
    x: 60,
    y: 60,
    icon: "umbrella",
    photo: "/market/umbrellas.jpg",
    spot: {
      en: "A cluster of yellow umbrellas over phone cables.",
      pg: "Yellow umbrella dem dey cover phone wire.",
    },
  },
  {
    id: "block-e",
    name: "Block E · Phones",
    mapLabel: "E Phones",
    kind: "block",
    x: 82,
    y: 72,
    icon: "gate",
    letter: "E",
    photo: "/market/umbrellas.jpg",
    spot: {
      en: "Phone cases and chargers under and behind the umbrellas.",
      pg: "Phone case and charger dey under and behind the umbrella.",
    },
  },
  {
    id: "association",
    name: "Association office",
    mapLabel: "Office",
    kind: "landmark",
    x: 34,
    y: 74,
    icon: "office",
    photo: "/market/association.jpg",
    spot: {
      en: "A shed with a green notice board and a bench outside.",
      pg: "Shed wey get green notice board and bench outside.",
    },
  },
  {
    id: "martins",
    name: "Martins Gate",
    mapLabel: "Martins",
    kind: "gate",
    x: 16,
    y: 90,
    icon: "gate",
    photo: "/market/gate.jpg",
    spot: {
      en: "The narrower exit toward the side street and the bus stop.",
      pg: "The smaller exit wey face the side street and bus stop.",
    },
  },
  {
    id: "block-f",
    name: "Block F · Household",
    mapLabel: "F Home",
    kind: "block",
    x: 48,
    y: 90,
    icon: "gate",
    letter: "F",
    photo: "/market/plastics.jpg",
    spot: {
      en: "Basins, kegs, and coolers along the back lane.",
      pg: "Basin, keg, and cooler for the back road.",
    },
  },
  {
    id: "cold",
    name: "Cold room",
    mapLabel: "Cold",
    kind: "landmark",
    x: 82,
    y: 90,
    icon: "cold",
    photo: "/market/cold.jpg",
    spot: {
      en: "A humming metal door with crates beside it.",
      pg: "Metal door wey dey hum, crate dey e side.",
    },
  },
];

export const edges: Edge[] = [
  {
    a: "dosunmu",
    b: "clock",
    steps: 80,
    aToB: {
      en: "Walk in through Dosunmu Gate, straight under the zinc roof. Stop where the lane splits three ways — a round clock sits on a wooden kiosk.",
      pg: "Enter from Dosunmu Gate, waka straight under the zinc roof. Stop where the road split into three. Round clock dey on top wooden kiosk.",
    },
    bToA: {
      en: "Turn back toward the bright street. Dosunmu Gate is the wide opening onto the road, between the painted pillars.",
      pg: "Turn back face the bright street. Dosunmu Gate na the wide opening wey dey face the road, between the painted pillars.",
    },
  },
  {
    a: "clock",
    b: "block-a",
    steps: 45,
    aToB: {
      en: "Take the left shed row. Block A is fabric — lace and george hanging at head height.",
      pg: "Take the left shed line. Block A na fabric — lace and george dey hang for head level.",
    },
    bToA: {
      en: "Walk back up the fabric lane toward the open split. The clock kiosk is where the three lanes meet.",
      pg: "Waka back up the fabric line reach the open junction. Clock kiosk dey where the three road meet.",
    },
  },
  {
    a: "clock",
    b: "block-b",
    steps: 40,
    aToB: {
      en: "Take the middle row, just left of the pepper smell. Block B is ankara and aso-oke stacked to the roof.",
      pg: "Take the middle line, small to the left of the pepper smell. Block B na ankara and aso-oke wey dem stack reach roof.",
    },
    bToA: {
      en: "Leave the cloth stacks and walk toward the brighter junction. Stop at the clock kiosk.",
      pg: "Comot from the cloth stacks, waka face the brighter junction. Stop for the clock kiosk.",
    },
  },
  {
    a: "clock",
    b: "pepper",
    steps: 60,
    aToB: {
      en: "Bear right. Follow the smell of dried crayfish until you see wide basins of red pepper. That junction is the mouth of the foodstuff row.",
      pg: "Bend right. Follow the smell of dried crayfish until you see wide basin of red pepper. That junction na the mouth of the foodstuff line.",
    },
    bToA: {
      en: "With the pepper basins behind you, walk toward the fabric in the distance. The clock kiosk is the wooden stand where the lane splits.",
      pg: "Make the pepper basin dey your back, waka face the fabric wey dey far. Clock kiosk na the wooden stand where the road split.",
    },
  },
  {
    a: "pepper",
    b: "block-c",
    steps: 30,
    aToB: {
      en: "Step past the pepper basins. Block C is the row of wooden foodstuff shutters just behind them.",
      pg: "Pass the pepper basin. Block C na the wooden foodstuff shutters wey dey just behind them.",
    },
    bToA: {
      en: "Walk back to the lane mouth. You are there when the red pepper basins fill the walkway.",
      pg: "Waka back reach the mouth of the line. You don reach when red pepper basin full the road.",
    },
  },
  {
    a: "pepper",
    b: "tank",
    steps: 50,
    aToB: {
      en: "From the pepper sellers, walk left, away from the food shutters, about forty paces. Stop at the big blue plastic water tank.",
      pg: "From the pepper people, waka left, comot from the food shutters, like forty steps. Stop for the big blue plastic water tank.",
    },
    bToA: {
      en: "Face away from the tank, toward the food smell. The red pepper basins sit at the next junction.",
      pg: "Face comot from the tank, follow the food smell. Red pepper basin dey the next junction.",
    },
  },
  {
    a: "tank",
    b: "block-b",
    steps: 45,
    aToB: {
      en: "From the blue tank, walk toward the tall stacks of printed cloth. That is Block B.",
      pg: "From the blue tank, waka face the tall stack of printed cloth. Na Block B be that.",
    },
    bToA: {
      en: "Leave the cloth and walk deeper into the market, toward the blue plastic tank in the middle lane.",
      pg: "Comot from the cloth, waka enter inside the market, face the blue plastic tank for middle road.",
    },
  },
  {
    a: "tank",
    b: "block-d",
    steps: 40,
    aToB: {
      en: "From the tank, the beauty lane is on your left — mirrors, cream cartons, and the smell of pomade.",
      pg: "From the tank, beauty line dey your left — mirror, cream carton, and pomade smell.",
    },
    bToA: {
      en: "Walk up the beauty lane until it opens out. The blue water tank stands in that opening.",
      pg: "Waka up the beauty line until e open. Blue water tank dey stand for that open place.",
    },
  },
  {
    a: "tank",
    b: "umbrella",
    steps: 50,
    aToB: {
      en: "From the tank, follow the extension cords along the ground. They end under a cluster of yellow umbrellas.",
      pg: "From the tank, follow the extension wire on the ground. E go end under yellow umbrella dem.",
    },
    bToA: {
      en: "Leave the umbrellas and follow the cables backward. They lead to the blue water tank.",
      pg: "Comot from the umbrella, follow the wire go back. E go lead you reach the blue water tank.",
    },
  },
  {
    a: "umbrella",
    b: "block-e",
    steps: 35,
    aToB: {
      en: "The phone stalls are under the yellow umbrellas and one row behind them. That is Block E.",
      pg: "Phone stalls dey under the yellow umbrella and one line behind them. Na Block E.",
    },
    bToA: {
      en: "Step out of the phone row to the yellow umbrellas at the lane mouth.",
      pg: "Comot from the phone line reach the yellow umbrella for the mouth of the road.",
    },
  },
  {
    a: "block-a",
    b: "block-d",
    steps: 55,
    aToB: {
      en: "Keep walking down the fabric lane. After the seamstresses’ machines it becomes Block D, the beauty row.",
      pg: "Continue to waka down the fabric line. After the tailor machines, e turn to Block D, the beauty line.",
    },
    bToA: {
      en: "Walk toward the brighter entrance. The cream cartons give way to lace and george. That is Block A.",
      pg: "Waka face the brighter entrance. Cream carton go change to lace and george. Na Block A be that.",
    },
  },
  {
    a: "block-d",
    b: "association",
    steps: 40,
    aToB: {
      en: "Go to the end of the beauty lane. The association office has a green notice board and a bench outside.",
      pg: "Reach the end of the beauty line. Association office get green notice board and one bench outside.",
    },
    bToA: {
      en: "With the bench behind you, take the lane of cream cartons and mirrors. That is Block D.",
      pg: "Make the bench dey your back, take the line wey get cream carton and mirror. Na Block D.",
    },
  },
  {
    a: "association",
    b: "martins",
    steps: 35,
    aToB: {
      en: "Pass the association bench toward the bus noise. Martins Gate is the narrower exit onto the side street.",
      pg: "Pass the association bench, face the bus noise. Martins Gate na the smaller exit wey face the side street.",
    },
    bToA: {
      en: "Come in through Martins Gate and walk straight. The association office is the shed with the green board and the bench.",
      pg: "Enter from Martins Gate, waka straight. Association office na the shed wey get green board and bench.",
    },
  },
  {
    a: "association",
    b: "block-f",
    steps: 40,
    aToB: {
      en: "From the office, cross the back lane. Block F is household goods — basins, kegs, and coolers.",
      pg: "From the office, cross the back road. Block F na household — basin, keg, and cooler.",
    },
    bToA: {
      en: "Leave the plastics and cross back over the lane. The association bench and green board are straight ahead.",
      pg: "Comot from the plastics, cross the road back. Association bench and green board dey your front.",
    },
  },
  {
    a: "block-f",
    b: "cold",
    steps: 45,
    aToB: {
      en: "Walk to the far end of the household row. The cold room is the metal door that hums, with crates beside it.",
      pg: "Waka reach the far end of the household line. Cold room na the metal door wey dey hum, crate dey e side.",
    },
    bToA: {
      en: "Put the cold-room door behind you and walk back along the plastic basins. That whole row is Block F.",
      pg: "Make the cold room door dey your back, waka back along the plastic basin. The whole line na Block F.",
    },
  },
  {
    a: "block-e",
    b: "cold",
    steps: 90,
    aToB: {
      en: "From the phone row, walk toward the generator noise at the back. The cold room is the humming metal door on your right.",
      pg: "From the phone line, waka face the generator noise for back. Cold room na the metal door wey dey hum for your right.",
    },
    bToA: {
      en: "Leave the cold room and walk away from the generator, toward the yellow umbrellas. The phone stalls are Block E.",
      pg: "Comot from the cold room, waka comot from the generator, face the yellow umbrella. Phone stalls na Block E.",
    },
  },
];

function stall(
  partial: Omit<Stall, "id"> & { id?: string },
): Stall {
  return { verified: "sample", ...partial, id: partial.code.toLowerCase() };
}

export const stalls: Stall[] = [
  stall({
    code: "A1-04",
    block: "block-a",
    row: 1,
    stallNo: 4,
    business: "Kemi Lace House",
    trader: "Kemi Adeyemi",
    category: "fabric",
    blurb: "Cord lace and george for owambe, sold by the bundle.",
    keywords: ["lace", "cord lace", "swiss", "george", "owambe", "white lace", "gold", "fabric", "material"],
    languages: ["Yoruba", "English", "Pidgin"],
    hours: "Mon–Sat, 8am–6pm",
    photo: "/market/lace.jpg",
    whatsapp: "2348113657987",
    shutter: {
      en: "Third wooden shutter on the left, with a blue plastic chair outside. A1-04 is painted in white on the frame. Ask for Kemi.",
      pg: "Third wooden shutter for your left. Blue plastic chair dey outside. A1-04 dey paint with white for the frame. Ask for Kemi.",
    },
    catalogue: [
      { name: "Cord lace, 5 yards", price: 28000, unit: "bundle" },
      { name: "Swiss lace, 5 yards", price: 45000, unit: "bundle" },
      { name: "George, 5 yards", price: 36000, unit: "bundle" },
    ],
    note: {
      name: "Bisi",
      text: "She sent a video of three laces before I left Yaba. The bundle matched.",
    },
  }),
  stall({
    code: "A2-11",
    block: "block-a",
    row: 2,
    stallNo: 11,
    business: "Bolaji George & Gele",
    trader: "Bolaji Adeniran",
    category: "fabric",
    blurb: "Ready gele and george pieces, tied if you need it on the spot.",
    keywords: ["gele", "headtie", "george", "auto gele", "tie", "head tie", "fabric"],
    languages: ["Yoruba", "English"],
    hours: "Mon–Sat, 8:30am–6pm",
    photo: "/market/lace.jpg",
    whatsapp: "2348113657973",
    shutter: {
      en: "Look up: gele are pinned across the top of the stall. A2-11 is chalked on the lintel. Bolaji sits on a low stool.",
      pg: "Look up: gele dey pin across the top of the stall. A2-11 dey write for the lintel. Bolaji dey sit on short stool.",
    },
    catalogue: [
      { name: "Auto gele", price: 12000, unit: "piece" },
      { name: "George wrapper", price: 32000, unit: "5 yards" },
      { name: "Gele tying", price: 3000, unit: "head" },
    ],
    note: {
      name: "Tola",
      text: "Gele was still firm at the reception. She tied it while I waited.",
    },
  }),
  stall({
    code: "A3-02",
    block: "block-a",
    row: 3,
    stallNo: 2,
    business: "Iya Risi Aso-ebi",
    trader: "Risikat Adewale",
    category: "fabric",
    blurb: "Group aso-ebi in one print, plus a tailor two stalls down.",
    keywords: ["aso ebi", "asoebi", "aso-ebi", "bulk", "uniform", "party", "ankara", "tailor"],
    languages: ["Yoruba", "Pidgin", "English"],
    hours: "Mon–Sat, 8am–5:30pm",
    photo: "/market/ankara.jpg",
    whatsapp: "2348113657974",
    shutter: {
      en: "End of row 3, next to a humming sewing machine. A3-02 is on a piece of cardboard wired to the post.",
      pg: "End of row 3, near sewing machine wey dey hum. A3-02 dey on cardboard wey dem tie for the post.",
    },
    catalogue: [
      { name: "Aso-ebi ankara, 6 yards", price: 8500, unit: "bundle" },
      { name: "Extra yard, same print", price: 1600, unit: "yard" },
      { name: "Simple blouse, sewn", price: 4500, unit: "piece" },
    ],
    note: {
      name: "Yetunde",
      text: "Forty bundles, one print, no stories. She held the rest for a day.",
    },
  }),
  stall({
    code: "B1-06",
    block: "block-b",
    row: 1,
    stallNo: 6,
    business: "Adire House",
    trader: "Funmilayo Baiyewu",
    category: "ankara",
    blurb: "Indigo adire and kampala, folded so you can see the pattern.",
    keywords: ["adire", "indigo", "kampala", "tie dye", "tie-dye", "yoruba", "cloth", "batik"],
    languages: ["Yoruba", "English"],
    hours: "Mon–Sat, 9am–6pm",
    photo: "/market/adire.jpg",
    whatsapp: "2348113657975",
    shutter: {
      en: "The stall with deep blue cloth on the table, not the wax prints. B1-06 is stitched into a small cloth tag on the upright.",
      pg: "The stall wey get deep blue cloth on the table, no be the wax print. B1-06 dey sew on small cloth tag for the wood.",
    },
    catalogue: [
      { name: "Adire cotton, 5 yards", price: 15000, unit: "piece" },
      { name: "Kampala", price: 8000, unit: "5 yards" },
      { name: "Adire scarf", price: 4500, unit: "piece" },
    ],
    note: {
      name: "Dele",
      text: "Pattern was the one in the photo. She refused to swap it for a faded one.",
    },
  }),
  stall({
    code: "B2-15",
    block: "block-b",
    row: 2,
    stallNo: 15,
    business: "Obi Aso-oke",
    trader: "Chinedu Obi",
    category: "ankara",
    blurb: "Woven aso-oke sets and fila caps, gold and wine mostly.",
    keywords: ["aso-oke", "asooke", "aso oke", "fila", "cap", "traditional", "woven", "agbada"],
    languages: ["Igbo", "Yoruba", "English", "Pidgin"],
    hours: "Mon–Sat, 8:30am–6pm",
    photo: "/market/asooke.jpg",
    whatsapp: "2348113657976",
    shutter: {
      en: "Narrow stall, cloth in strips rather than wide prints. B2-15 is painted low, near the floor, in white.",
      pg: "Narrow stall, cloth dey as strip, no be wide print. B2-15 dey paint near the floor, with white.",
    },
    catalogue: [
      { name: "Aso-oke set", price: 65000, unit: "set" },
      { name: "Fila cap", price: 8000, unit: "cap" },
      { name: "Shoulder strip", price: 12000, unit: "piece" },
    ],
    note: {
      name: "Ifeanyi",
      text: "Set was complete: agbada, fila, and the strip. No missing piece at home.",
    },
  }),
  stall({
    code: "B4-03",
    block: "block-b",
    row: 4,
    stallNo: 3,
    business: "Zainab Prints",
    trader: "Zainab Bello",
    category: "ankara",
    blurb: "Everyday ankara and a few hollandais, six yards ready.",
    keywords: ["ankara", "wax", "print", "hollandais", "java", "6 yards", "six yards", "fabric"],
    languages: ["Hausa", "Yoruba", "Pidgin", "English"],
    hours: "Daily, 8am–6pm",
    photo: "/market/ankara.jpg",
    whatsapp: "2348113657977",
    shutter: {
      en: "Prints stacked to the roof, a red stool in the aisle. B4-03 is on a metal plate nailed at eye level.",
      pg: "Print dem stack reach roof, red stool dey for aisle. B4-03 dey on metal plate wey dem nail for eye level.",
    },
    catalogue: [
      { name: "Ankara, 6 yards", price: 7500, unit: "bundle" },
      { name: "Hollandais, 6 yards", price: 18000, unit: "bundle" },
      { name: "Offcut, 2 yards", price: 2000, unit: "piece" },
    ],
    note: {
      name: "Amina",
      text: "Price on WhatsApp was the price at the stall. No ‘market price’ later.",
    },
  }),
  stall({
    code: "C1-02",
    block: "block-c",
    row: 1,
    stallNo: 2,
    business: "Sade Pepper & Crayfish",
    trader: "Sade Balogun",
    category: "food",
    blurb: "Ata rodo, dried crayfish, and iru, measured into your nylon.",
    keywords: ["pepper", "ata", "ata rodo", "crayfish", "iru", "ogbono", "locust", "spice"],
    languages: ["Yoruba", "Pidgin"],
    hours: "Daily, 6:30am–5pm",
    photo: "/market/pepper.jpg",
    whatsapp: "2348113657978",
    shutter: {
      en: "First shutter behind the open pepper basins. C1-02 is written on the basin itself, in white paint.",
      pg: "First shutter behind the open pepper basin. C1-02 dey write on the basin, with white paint.",
    },
    catalogue: [
      { name: "Ata rodo", price: 3500, unit: "paint" },
      { name: "Dried crayfish", price: 12000, unit: "congo" },
      { name: "Iru", price: 2000, unit: "wrap" },
    ],
    note: {
      name: "Mama Tosin",
      text: "Crayfish was dry, not the damp one. She let me smell it first.",
    },
  }),
  stall({
    code: "C2-09",
    block: "block-c",
    row: 2,
    stallNo: 9,
    business: "Mama Chinyere Provisions",
    trader: "Chinyere Okonkwo",
    category: "food",
    blurb: "Rice, garri, and palm oil. She will send a boy to Martins Gate.",
    keywords: ["rice", "garri", "gari", "palm oil", "provision", "provisions", "beans", "seasoning", "maggi"],
    languages: ["Igbo", "Pidgin", "English"],
    hours: "Mon–Sat, 7am–6pm",
    photo: "/market/provisions.jpg",
    whatsapp: "2348113657979",
    shutter: {
      en: "Sacks stacked twice a person’s height, red oil bottles on the shelf. C2-09 is stencilled on the sack at the front.",
      pg: "Bag dem stack pass person height, red oil bottle dey for shelf. C2-09 dey stencil on the bag for front.",
    },
    catalogue: [
      { name: "Rice", price: 82000, unit: "50kg" },
      { name: "Palm oil", price: 9800, unit: "5 litres" },
      { name: "Garri", price: 24000, unit: "bag" },
    ],
    note: {
      name: "Ngozi",
      text: "Boy met me at Martins Gate with the rice. Oil was full, seal intact.",
    },
  }),
  stall({
    code: "C4-08",
    block: "block-c",
    row: 4,
    stallNo: 8,
    business: "Tunde Tomato Basin",
    trader: "Tunde Alabi",
    category: "food",
    blurb: "Fresh tomatoes, onions, and tatashe, sold by the paint or bag.",
    keywords: ["tomato", "tomatoes", "onion", "tatashe", "fresh", "salad", "pepper"],
    languages: ["Yoruba", "Pidgin", "English"],
    hours: "Daily, 6:30am–4pm",
    photo: "/market/pepper.jpg",
    whatsapp: "2348113657980",
    shutter: {
      en: "Row 4, the basin stall, not a shutter. C4-08 is painted on the wooden leg of the table. Tunde wears a green apron.",
      pg: "Row 4, the basin stall, no be shutter. C4-08 dey paint on the wooden leg of the table. Tunde dey wear green apron.",
    },
    catalogue: [
      { name: "Tomatoes", price: 4500, unit: "paint" },
      { name: "Onions", price: 18000, unit: "bag" },
      { name: "Tatashe", price: 2500, unit: "paint" },
    ],
    note: {
      name: "Kemi",
      text: "Tomatoes were firm. He changed two soft ones without argument.",
    },
  }),
  stall({
    code: "D2-05",
    block: "block-d",
    row: 2,
    stallNo: 5,
    business: "Glow by Amaka",
    trader: "Amaka Eze",
    category: "beauty",
    blurb: "Shea pomade, black soap, and plain body oil. No mix-mix creams.",
    keywords: ["cream", "pomade", "shea", "soap", "lotion", "hair", "black soap", "oil", "beauty"],
    languages: ["Igbo", "Pidgin", "English"],
    hours: "Mon–Sat, 9am–6pm",
    photo: "/market/beauty.jpg",
    whatsapp: "2348113657981",
    shutter: {
      en: "Jars in straight rows, a hand mirror hanging from a nail. D2-05 is written on the mirror frame.",
      pg: "Jar dem dey straight line, hand mirror dey hang for nail. D2-05 dey write on the mirror frame.",
    },
    catalogue: [
      { name: "Shea pomade", price: 2500, unit: "jar" },
      { name: "Black soap", price: 1500, unit: "bar" },
      { name: "Body oil", price: 4000, unit: "bottle" },
    ],
    note: {
      name: "Chioma",
      text: "Pomade smelled like shea, not perfume covering something else.",
    },
  }),
  stall({
    code: "D3-12",
    block: "block-d",
    row: 3,
    stallNo: 12,
    business: "Musa Oils",
    trader: "Musa Abdullahi",
    category: "beauty",
    blurb: "Fragrance oils and incense. He will dab a drop on a strip of paper.",
    keywords: ["perfume", "oil", "incense", "turaren", "fragrance", "attar", "deodorant", "scent"],
    languages: ["Hausa", "English", "Pidgin"],
    hours: "Mon–Sat, 9am–6:30pm",
    photo: "/market/beauty.jpg",
    whatsapp: "2348113657982",
    shutter: {
      en: "Small dark bottles, not cream tubs. D3-12 is on a brass-coloured tag tied to the shelf.",
      pg: "Small dark bottle, no be cream tub. D3-12 dey on brass-colour tag wey dem tie for the shelf.",
    },
    catalogue: [
      { name: "Fragrance oil", price: 3000, unit: "dram" },
      { name: "Incense", price: 2000, unit: "pack" },
      { name: "Body splash", price: 5500, unit: "bottle" },
    ],
    note: {
      name: "Hauwa",
      text: "He let me test on paper first. The bottle was full to the shoulder.",
    },
  }),
  stall({
    code: "E1-07",
    block: "block-e",
    row: 1,
    stallNo: 7,
    business: "Chike Accessories",
    trader: "Chike Nwosu",
    category: "phones",
    blurb: "Cases, chargers, and earpieces. He tests the charger before you pay.",
    keywords: ["phone", "case", "charger", "earpiece", "cable", "android", "iphone", "power bank", "accessory"],
    languages: ["Igbo", "Pidgin", "English"],
    hours: "Daily, 8am–7pm",
    photo: "/market/umbrellas.jpg",
    whatsapp: "2348113657983",
    shutter: {
      en: "Under the left yellow umbrella, cases in a hanging rack. E1-07 is markered on the umbrella pole.",
      pg: "Under the left yellow umbrella, case dey for hanging rack. E1-07 dey mark for the umbrella pole.",
    },
    catalogue: [
      { name: "Phone case", price: 2500, unit: "piece" },
      { name: "Fast charger", price: 4500, unit: "set" },
      { name: "Earpiece", price: 3500, unit: "pair" },
    ],
    note: {
      name: "Seyi",
      text: "Charger worked on his power bank before I paid. Case fit the phone.",
    },
  }),
  stall({
    code: "E2-19",
    block: "block-e",
    row: 2,
    stallNo: 19,
    business: "Screen Clinic",
    trader: "Emeka Okafor",
    category: "phones",
    blurb: "Cracked screens and tired batteries. Price depends on the model.",
    keywords: ["screen", "repair", "crack", "cracked", "battery", "phone repair", "unlock", "glass"],
    languages: ["Igbo", "English", "Pidgin"],
    hours: "Mon–Sat, 9am–6:30pm",
    photo: "/market/umbrellas.jpg",
    whatsapp: "2348113657984",
    shutter: {
      en: "One row behind the umbrellas, a desk lamp and a blue parts tray. E2-19 is taped to the lamp.",
      pg: "One line behind the umbrella, desk lamp and blue tray dey there. E2-19 dey tape for the lamp.",
    },
    catalogue: [
      { name: "Screen replacement", price: 15000, unit: "from" },
      { name: "Battery swap", price: 8000, unit: "from" },
      { name: "Charging port", price: 7000, unit: "from" },
    ],
    note: {
      name: "Tobi",
      text: "He quoted before opening the phone. Screen was ready the same afternoon.",
    },
  }),
  stall({
    code: "F1-03",
    block: "block-f",
    row: 1,
    stallNo: 3,
    business: "Iya Bose Plastics",
    trader: "Bose Ajayi",
    category: "home",
    blurb: "Basins, jerry cans, and nylon rolls. Prices are marked on the rim.",
    keywords: ["basin", "nylon", "keg", "jerry can", "jerrycan", "rubber", "plastic", "bucket", "household"],
    languages: ["Yoruba", "Pidgin"],
    hours: "Mon–Sat, 8am–5:30pm",
    photo: "/market/plastics.jpg",
    whatsapp: "2348113657985",
    shutter: {
      en: "The tallest stack of coloured basins on the back lane. F1-03 is scratched into the red basin at the bottom.",
      pg: "The tallest stack of colour basin for the back road. F1-03 dey scratch on the red basin for bottom.",
    },
    catalogue: [
      { name: "Wash basin", price: 1800, unit: "piece" },
      { name: "Jerry can, 25L", price: 3500, unit: "piece" },
      { name: "Nylon roll", price: 2200, unit: "roll" },
    ],
    note: {
      name: "Shade",
      text: "Basin price on the rim was what she collected. No extra for nylon.",
    },
  }),
  stall({
    code: "F3-10",
    block: "block-f",
    row: 3,
    stallNo: 10,
    business: "Seyi Coolers",
    trader: "Seyi Lawal",
    category: "home",
    blurb: "Picnic coolers and flasks. He will close the lid so you can hear the seal.",
    keywords: ["cooler", "flask", "ice", "picnic", "cold box", "freezer", "household"],
    languages: ["Yoruba", "English", "Pidgin"],
    hours: "Mon–Sat, 8:30am–6pm",
    photo: "/market/plastics.jpg",
    whatsapp: "2348113657986",
    shutter: {
      en: "Coolers stacked like bricks, past the basins. F3-10 is on a paper tag tied to the top handle.",
      pg: "Cooler dem stack like brick, after the basin. F3-10 dey on paper tag wey dem tie for the top handle.",
    },
    catalogue: [
      { name: "Cooler, 30L", price: 14500, unit: "piece" },
      { name: "Cooler, 50L", price: 22000, unit: "piece" },
      { name: "Flask", price: 6000, unit: "piece" },
    ],
    note: {
      name: "Lara",
      text: "Seal was tight. He carried it to the association bench for my rider.",
    },
  }),
];

export const ui = {
  searchPlaceholder: {
    en: "Who sells lace, pepper, chargers…",
    pg: "Who dey sell lace, pepper, charger…",
  },
  walk: { en: "Walk me there", pg: "Waka me go" },
  where: { en: "You are at", pg: "You dey for" },
  change: { en: "Change", pg: "Change am" },
  seeIt: { en: "I see it", pg: "I don see am" },
  arrivedBtn: { en: "I’m at the stall", pg: "I don reach the stall" },
  back: { en: "Back", pg: "Go back" },
  saved: { en: "Saved", pg: "Saved" },
  map: { en: "Map", pg: "Map" },
  search: { en: "Search", pg: "Find" },
  stalls: { en: "Stalls", pg: "Stalls" },
  noResult: {
    en: "Nothing in this sample matches. Try lace, ankara, pepper, charger, or cooler.",
    pg: "This sample no get that one. Try lace, ankara, pepper, charger, or cooler.",
  },
  whatsapp: { en: "WhatsApp", pg: "WhatsApp" },
  sampleNumber: { en: "Sample number", pg: "Na sample number" },
  copy: { en: "Copy code", pg: "Copy code" },
  copied: { en: "Copied", pg: "E don copy" },
  minWalk: { en: "min walk", pg: "min waka" },
  prototype: {
    en: "This is a pilot. The stalls you can open are samples, not shops that have joined. Prices are examples. No payment, delivery, or verification runs here.",
    pg: "Na pilot. The stalls wey you fit open na sample, no be shop wey don join. Price na example. No payment, no delivery, no verification dey run here.",
  },
  catalogue: { en: "Catalogue", pg: "Wetin dem get" },
  giveCode: {
    en: "No street address. Give this code to a rider or anyone meeting you.",
    pg: "This market no get street address. Give this code to rider or anybody wey go meet you.",
  },
  lost: { en: "I’m somewhere else", pg: "I dey another place" },
  from: { en: "From", pg: "From" },
  next: { en: "Look for", pg: "Look for" },
  about: { en: "About", pg: "Like" },
  emptySaved: {
    en: "Save a stall from search and it stays on this phone.",
    pg: "Save one stall from search, e go stay for this phone.",
  },
  whereTitle: { en: "Where are you now?", pg: "Where you dey now?" },
  whereHelp: {
    en: "GPS is weak under the zinc. Pick the landmark you can see.",
    pg: "GPS no dey work well under the zinc. Pick the landmark wey you fit see.",
  },
  gates: { en: "Gates and landmarks", pg: "Gate and landmark" },
  blocks: { en: "I am inside a block", pg: "I dey inside one block" },
  ask: { en: "Ask on WhatsApp", pg: "Ask for WhatsApp" },
  askOpen: { en: "Ask if open", pg: "Ask if dem open" },
  shop: { en: "WhatsApp shop", pg: "WhatsApp shop" },
  shopHelp: {
    en: "Add the goods. The order goes to the stall phone on WhatsApp, with the code the rider needs.",
    pg: "Add the goods. The order go reach the stall phone for WhatsApp, with the code wey the rider need.",
  },
  add: { en: "Add", pg: "Add am" },
  sendOrder: { en: "Send on WhatsApp", pg: "Send for WhatsApp" },
  orderNote: { en: "Note for the trader", pg: "Message for the trader" },
  orderNotePlaceholder: {
    en: "I’ll pick up after 2, or send a rider to this code.",
    pg: "I go come after 2, or make rider come this code.",
  },
  total: { en: "Total", pg: "Total" },
  shareShop: { en: "Share shop", pg: "Share shop" },
  shopCopied: { en: "Shop link copied", pg: "Shop link don copy" },
  sampleOrder: {
    en: "Sample stall numbers. The message opens in WhatsApp.",
    pg: "Na sample stall number. The message go open for WhatsApp.",
  },
  note: { en: "Sample buyer note", pg: "Sample note from buyer" },
  languages: { en: "Speaks", pg: "E dey speak" },
  hours: { en: "Hours", pg: "Time" },
  how: { en: "How to spot the stall", pg: "How you go see the stall" },
  showMap: { en: "Show on the map", pg: "Show am for map" },
  onTheWay: { en: "On the way", pg: "For the road" },
  you: { en: "You", pg: "You" },
  step: { en: "Step", pg: "Step" },
  of: { en: "of", pg: "of" },
  thisIsIt: { en: "This should be the stall.", pg: "This one suppose be the stall." },
  viewStall: { en: "Stall details", pg: "Stall details" },
  tryAgain: { en: "Walk it again", pg: "Waka am again" },
  north: { en: "North · street", pg: "North · street" },
  south: { en: "South · back lane", pg: "South · back road" },
  mapHelp: {
    en: "Tap a landmark if you are standing there. Tap a block to see who sells inside it.",
    pg: "Tap landmark if you dey stand there. Tap block to see who dey sell inside.",
  },
  inBlock: { en: "In this block", pg: "For this block" },
  nothingHere: { en: "No sample stall in this block.", pg: "No sample stall for this block." },
  missing: {
    en: "That stall code is not in this sample.",
    pg: "That stall code no dey inside this sample.",
  },
  backHome: { en: "Back to search", pg: "Go back find" },
} as const;

type Adj = { to: string; steps: number; text: Copy };

function adjacency(): Map<string, Adj[]> {
  const adj = new Map<string, Adj[]>();
  const push = (from: string, to: string, steps: number, text: Copy) => {
    const list = adj.get(from) ?? [];
    list.push({ to, steps, text });
    adj.set(from, list);
  };
  for (const edge of edges) {
    push(edge.a, edge.b, edge.steps, edge.aToB);
    push(edge.b, edge.a, edge.steps, edge.bToA);
  }
  return adj;
}

const graph = adjacency();

export type Leg = {
  fromId: string;
  toId: string;
  steps: number;
  text: Copy;
};

export function placeById(id: string): Place {
  return places.find((place) => place.id === id) ?? places[0]!;
}

let registeredStalls: Stall[] = [];

export function setRegisteredStalls(next: Stall[]) {
  registeredStalls = next;
}

export function stallByCode(code: string | undefined): Stall | undefined {
  if (!code) return undefined;
  const key = decodeURIComponent(code).trim().toLowerCase();
  return everyStall().find((stall) => stall.code.toLowerCase() === key);
}

export function everyStall(): Stall[] {
  return [...stalls, ...extraStalls, ...registeredStalls];
}

export function stallsInMarket(marketId: string): Stall[] {
  return everyStall().filter((stall) => (stall.marketId ?? "balogun") === marketId);
}

export function stallsInBlock(blockId: string): Stall[] {
  return everyStall().filter((stall) => stall.block === blockId);
}

export function categoryLabel(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function t(copy: Copy, lang: Lang): string {
  if (lang === "pg") return copy.pg;
  if (lang === "en") return copy.en;
  return phrases[copy.en]?.[lang] ?? copy.en;
}

export function naira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function spokenCode(stall: Stall): string {
  const place = places.find((item) => item.id === stall.block);
  const no = String(stall.stallNo).padStart(2, "0");
  if (place?.letter) return `Block ${place.letter}, row ${stall.row}, stall ${no}`;
  return `${marketById(stall.marketId ?? "balogun").name}, stall ${no}`;
}

export function findLegs(fromId: string, toId: string): Leg[] {
  if (fromId === toId) return [];
  const dist = new Map<string, number>([[fromId, 0]]);
  const prev = new Map<string, { from: string; steps: number; text: Copy }>();
  const pending = new Set<string>([fromId]);

  while (pending.size > 0) {
    let current = "";
    let best = Infinity;
    for (const id of pending) {
      const weight = dist.get(id) ?? Infinity;
      if (weight < best) {
        best = weight;
        current = id;
      }
    }
    pending.delete(current);
    if (current === toId) break;
    for (const leg of graph.get(current) ?? []) {
      const next = (dist.get(current) ?? Infinity) + leg.steps;
      if (next < (dist.get(leg.to) ?? Infinity)) {
        dist.set(leg.to, next);
        prev.set(leg.to, { from: current, steps: leg.steps, text: leg.text });
        pending.add(leg.to);
      }
    }
  }

  if (!prev.has(toId) && fromId !== toId) return [];
  const legs: Leg[] = [];
  let cursor = toId;
  while (cursor !== fromId) {
    const step = prev.get(cursor);
    if (!step) return legs.reverse();
    legs.push({
      fromId: step.from,
      toId: cursor,
      steps: step.steps,
      text: step.text,
    });
    cursor = step.from;
  }
  return legs.reverse();
}

export type WalkStep = {
  key: string;
  fromName: string;
  placeId: string;
  placeName: string;
  body: Copy;
  photo: string;
  alt: string;
};

export function walkSteps(fromId: string, stall: Stall): WalkStep[] {
  const legs = findLegs(fromId, stall.block);
  const steps: WalkStep[] = legs.map((leg) => {
    const place = placeById(leg.toId);
    return {
      key: `${leg.fromId}>${leg.toId}`,
      fromName: placeById(leg.fromId).name,
      placeId: place.id,
      placeName: place.name,
      body: leg.text,
      photo: place.photo,
      alt: place.name,
    };
  });
  const origin =
    legs.length > 0 ? placeById(legs[legs.length - 1]!.toId).name : placeById(fromId).name;
  steps.push({
    key: `stall-${stall.id}`,
    fromName: origin,
    placeId: stall.block,
    placeName: stall.code,
    body: stall.shutter,
    photo: stall.photo,
    alt: `${stall.business}, stall ${stall.code}`,
  });
  return steps;
}

export function totalSteps(fromId: string, stall: Stall): number {
  const legs = findLegs(fromId, stall.block);
  return legs.reduce((sum, leg) => sum + leg.steps, 0) + 24;
}

export function minutesBetween(fromId: string, stall: Stall): number {
  return Math.max(1, Math.round(totalSteps(fromId, stall) / 90));
}

export function pathIds(fromId: string, stall: Stall): string[] {
  const legs = findLegs(fromId, stall.block);
  return [fromId, ...legs.map((leg) => leg.toId)];
}

export function filterStalls(
  query: string,
  category: CategoryId | "all",
  marketId?: string,
): Stall[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return everyStall().filter((item) => {
    const home = item.marketId ?? "balogun";
    if (marketId && home !== marketId) return false;
    if (category !== "all" && item.category !== category) return false;
    if (words.length === 0) return true;
    const market = marketById(home);
    const hay = [
      item.code,
      item.business,
      item.trader,
      item.blurb,
      spokenCode(item),
      categoryLabel(item.category),
      market.name,
      market.area,
      ...item.keywords,
      ...item.catalogue.map((entry) => entry.name),
      ...item.languages,
    ]
      .join(" ")
      .toLowerCase();
    return words.every((word) => hay.includes(word));
  });
}

export function waLink(stall: Stall, item?: string): string {
  const text = item
    ? `Hello ${stall.trader}, I found ${stall.business} on Oja (${stall.code}). Is ${item} available today?`
    : `Hello ${stall.trader}, I found ${stall.business} on Oja. Stall code ${stall.code} — ${spokenCode(stall)}. Are you at the stall today?`;
  return `https://wa.me/${stall.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type OrderLine = {
  name: string;
  qty: number;
  price: number;
  unit: string;
};

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
}

export function orderLink(stall: Stall, lines: OrderLine[], note: string): string {
  const chosen = lines.filter((line) => line.qty > 0);
  const rows = chosen.map(
    (line) => `${line.qty} × ${line.name} (${line.unit}) — ${naira(line.price * line.qty)}`,
  );
  const parts = [
    `Hello ${stall.trader}, order from Oja.`,
    "",
    stall.business,
    `Code ${stall.code} — ${spokenCode(stall)}`,
    marketById(stall.marketId ?? "balogun").name,
    "",
    ...rows,
    "",
    `Total: ${naira(orderTotal(chosen))}`,
  ];
  const trimmed = note.trim();
  if (trimmed) parts.push("", `Note: ${trimmed}`);
  parts.push("", "Please confirm it is available. I can meet you at the stall code.");
  return `https://wa.me/${stall.whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
}

export function anchors(): Place[] {
  return places.filter((place) => place.kind !== "block");
}

export function blocks(): Place[] {
  return places.filter((place) => place.kind === "block");
}
