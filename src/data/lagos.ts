import type { CatalogueItem, CategoryId, Stall } from "@/data/market";

export type Market = {
  id: string;
  name: string;
  area: string;
  blurb: string;
  lat: number;
  lng: number;
  photo: string;
  lanes: boolean;
};

export const markets: Market[] = [
  {
    id: "balogun",
    name: "Balogun Market",
    area: "Lagos Island",
    blurb: "Lace, ankara, and provisions under the zinc. The lanes have stall codes.",
    lat: 6.4547,
    lng: 3.3896,
    photo: "/market/gate.jpg",
    lanes: true,
  },
  {
    id: "idumota",
    name: "Idumota Market",
    area: "Lagos Island",
    blurb: "Cloth, books, and cosmetics along the Island streets.",
    lat: 6.4652,
    lng: 3.3874,
    photo: "/market/ankara.jpg",
    lanes: false,
  },
  {
    id: "jankara",
    name: "Jankara Market",
    area: "Lagos Island",
    blurb: "Adire and traditional cloth near the Island centre.",
    lat: 6.4618,
    lng: 3.3904,
    photo: "/market/adire.jpg",
    lanes: false,
  },
  {
    id: "ebute-ero",
    name: "Ebute Ero Market",
    area: "Lagos Island",
    blurb: "Fish, rice, and provisions by the water.",
    lat: 6.4672,
    lng: 3.3851,
    photo: "/market/provisions.jpg",
    lanes: false,
  },
  {
    id: "computer-village",
    name: "Computer Village",
    area: "Ikeja",
    blurb: "Phones, chargers, and repairs. Ask for the line, not a house number.",
    lat: 6.6012,
    lng: 3.3426,
    photo: "/market/umbrellas.jpg",
    lanes: false,
  },
  {
    id: "tejuosho",
    name: "Tejuosho Market",
    area: "Yaba",
    blurb: "The complex for fabric, tailoring, and household goods.",
    lat: 6.5092,
    lng: 3.3712,
    photo: "/market/lace.jpg",
    lanes: false,
  },
  {
    id: "oshodi",
    name: "Oshodi Market",
    area: "Oshodi-Isolo",
    blurb: "Foodstuff and clothes beside the interchange.",
    lat: 6.555,
    lng: 3.3438,
    photo: "/market/oshodi.jpg",
    lanes: false,
  },
  {
    id: "ladipo",
    name: "Ladipo Market",
    area: "Mushin",
    blurb: "Motor spare parts. Riders use the gate name, not a street number.",
    lat: 6.5455,
    lng: 3.3472,
    photo: "/market/plastics.jpg",
    lanes: false,
  },
  {
    id: "ojuwoye",
    name: "Ojuwoye Market",
    area: "Mushin",
    blurb: "Cloth and provisions in the Mushin grid.",
    lat: 6.5282,
    lng: 3.3518,
    photo: "/market/ankara.jpg",
    lanes: false,
  },
  {
    id: "mile-12",
    name: "Mile 12 Market",
    area: "Kosofe",
    blurb: "The big food market. Pepper, tomatoes, yam, rice.",
    lat: 6.6074,
    lng: 3.3961,
    photo: "/market/mile12.jpg",
    lanes: false,
  },
  {
    id: "ketu",
    name: "Ketu Market",
    area: "Kosofe",
    blurb: "Daily food and household goods along Ikorodu Road.",
    lat: 6.5958,
    lng: 3.3848,
    photo: "/market/provisions.jpg",
    lanes: false,
  },
  {
    id: "oyingbo",
    name: "Oyingbo Market",
    area: "Ebute Metta",
    blurb: "Provisions and produce between the Island and the mainland.",
    lat: 6.4791,
    lng: 3.3882,
    photo: "/market/oyingbo.jpg",
    lanes: false,
  },
  {
    id: "alaba",
    name: "Alaba International",
    area: "Ojo",
    blurb: "Electronics and appliances. Confirm the line before a rider sets out.",
    lat: 6.4648,
    lng: 3.1912,
    photo: "/market/alaba.jpg",
    lanes: false,
  },
  {
    id: "aspanda",
    name: "Aspanda Trade Fair",
    area: "Ojo",
    blurb: "Wholesale imports. Most buyers send a bus or a truck.",
    lat: 6.4678,
    lng: 3.2104,
    photo: "/market/tradefair.jpg",
    lanes: false,
  },
  {
    id: "agege",
    name: "Agege Market",
    area: "Agege",
    blurb: "Bread, foodstuff, and household goods.",
    lat: 6.6218,
    lng: 3.3255,
    photo: "/market/pepper.jpg",
    lanes: false,
  },
  {
    id: "iyana-ipaja",
    name: "Iyana Ipaja Market",
    area: "Alimosho",
    blurb: "A junction market for food and clothes.",
    lat: 6.6112,
    lng: 3.2934,
    photo: "/market/provisions.jpg",
    lanes: false,
  },
  {
    id: "ikotun",
    name: "Ikotun Market",
    area: "Alimosho",
    blurb: "Fabric and provisions on the Alimosho side.",
    lat: 6.5478,
    lng: 3.2712,
    photo: "/market/asooke.jpg",
    lanes: false,
  },
  {
    id: "katangowa",
    name: "Katangowa Market",
    area: "Abule Egba",
    blurb: "Second-hand clothes. The bale yard first, then the stall code.",
    lat: 6.6405,
    lng: 3.2918,
    photo: "/market/katangowa.jpg",
    lanes: false,
  },
  {
    id: "ajah",
    name: "Ajah Market",
    area: "Eti-Osa",
    blurb: "Neighbourhood stalls for the Lekki–Ajah road.",
    lat: 6.4675,
    lng: 3.5708,
    photo: "/market/beauty.jpg",
    lanes: false,
  },
  {
    id: "bariga",
    name: "Bariga Market",
    area: "Shomolu",
    blurb: "Beauty, food, and household goods.",
    lat: 6.5348,
    lng: 3.3832,
    photo: "/market/beauty.jpg",
    lanes: false,
  },
  {
    id: "aguda",
    name: "Aguda Market",
    area: "Surulere",
    blurb: "Surulere’s neighbourhood market for cloth and food.",
    lat: 6.5016,
    lng: 3.3594,
    photo: "/market/lace.jpg",
    lanes: false,
  },
];

const shift: Record<string, [number, number]> = {
  "block-a": [-0.0007, -0.00045],
  "block-b": [-0.00035, -0.00015],
  "block-c": [0.0002, 0.0004],
  "block-d": [0.0005, -0.0001],
  "block-e": [0.00015, 0.0006],
  "block-f": [-0.00025, 0.00075],
};

export function marketById(id: string): Market {
  return markets.find((market) => market.id === id) ?? markets[0]!;
}

export function basePin(stall: Stall): { lat: number; lng: number } {
  if (stall.lat != null && stall.lng != null) return { lat: stall.lat, lng: stall.lng };
  const market = marketById(stall.marketId ?? "balogun");
  const [dLat, dLng] = shift[stall.block] ?? [0.0002, 0.00015];
  return {
    lat: market.lat + dLat,
    lng: market.lng + dLng,
  };
}

function listed(
  marketId: string,
  code: string,
  business: string,
  trader: string,
  category: CategoryId,
  photo: string,
  phone: string,
  goods: CatalogueItem[],
  blurb: string,
  verify: "sample" | "pending" = "sample",
): Stall {
  const stallNo = Number(code.replace(/\D/g, "").slice(-2)) || 1;
  return {
    id: code.toLowerCase(),
    code,
    marketId,
    block: marketId,
    row: 1,
    stallNo,
    business,
    trader,
    category,
    blurb,
    keywords: [business, trader, blurb, marketId, ...goods.map((item) => item.name)],
    languages: ["Yoruba", "English", "Pidgin"],
    hours: "Mon–Sat, 8am–6pm",
    photo,
    whatsapp: phone,
    verified: verify,
    lat: marketById(marketId).lat + 0.00025,
    lng: marketById(marketId).lng + 0.0002,
    shutter: {
      en: `Ask for ${trader} and quote ${code}. Meet at the street pin if you cannot see the shutter yet.`,
      pg: `Ask for ${trader} and quote ${code}. Meet for the street pin if you never see the shutter yet.`,
    },
    catalogue: goods,
    note: {
      name: "Directory",
      text: "Listed so buyers can find the stall. The owner can change the phone, photo, products, and pin.",
    },
  };
}

export const extraStalls: Stall[] = [
  listed("idumota", "ID-12", "Mama Titi Textiles", "Titi Balogun", "fabric", "/market/lace.jpg", "2348090001012", [
    { name: "Guinea brocade, 5 yards", price: 18000, unit: "bundle" },
    { name: "Velvet, 5 yards", price: 14000, unit: "bundle" },
  ], "Brocade and velvet for aso-ebi."),
  listed("jankara", "JK-03", "Iya Adire", "Funke Ajayi", "ankara", "/market/adire.jpg", "2348090002003", [
    { name: "Adire eleko", price: 12000, unit: "piece" },
    { name: "Kampala, 6 yards", price: 9000, unit: "bundle" },
  ], "Hand-dyed adire, folded on the table."),
  listed("ebute-ero", "EE-07", "Ebute Fish Stall", "Rasheed Afolabi", "food", "/market/provisions.jpg", "2348090003007", [
    { name: "Croaker, medium", price: 4500, unit: "piece" },
    { name: "Dry stockfish", price: 8000, unit: "piece" },
  ], "Morning fish. Ice is in the blue basin."),
  listed("computer-village", "CV-18", "Otigba Chargers", "Chinedu Okafor", "phones", "/market/umbrellas.jpg", "2348090004018", [
    { name: "Type-C cable", price: 2500, unit: "piece" },
    { name: "20W charger", price: 4500, unit: "piece" },
    { name: "Screen guard", price: 1500, unit: "piece" },
  ], "Cables and chargers under the yellow umbrellas."),
  listed("tejuosho", "TJ-09", "Yaba Lace Room", "Sade Okonkwo", "fabric", "/market/lace.jpg", "2348090005009", [
    { name: "Cord lace, 5 yards", price: 26000, unit: "bundle" },
    { name: "Sequins, 5 yards", price: 22000, unit: "bundle" },
  ], "Upstairs fabric, third shop after the stairs."),
  listed("oshodi", "OS-15", "Oshodi Pepper", "Iya Ramota", "food", "/market/oshodi.jpg", "2348090006015", [
    { name: "Tomatoes, basket", price: 18000, unit: "basket" },
    { name: "Tatase, bag", price: 7000, unit: "bag" },
    { name: "Onions, bag", price: 35000, unit: "bag" },
  ], "Pepper and tomatoes facing the bridge."),
  listed("ladipo", "LD-21", "Ladipo Brake Line", "Musa Garba", "home", "/market/plastics.jpg", "2348090007021", [
    { name: "Brake pad, set", price: 8500, unit: "set" },
    { name: "Oil filter", price: 3500, unit: "piece" },
  ], "Spare parts. Tell the rider the gate, then LD-21."),
  listed("ojuwoye", "OJ-05", "Mushin Ankara", "Blessing Eze", "ankara", "/market/ankara.jpg", "2348090008005", [
    { name: "Ankara, 6 yards", price: 6500, unit: "bundle" },
    { name: "Plain cotton, 6 yards", price: 4000, unit: "bundle" },
  ], "Prints stacked to the ceiling."),
  listed("mile-12", "M12-04", "Mile 12 Yam", "Alhaji Sule", "food", "/market/mile12.jpg", "2348090009004", [
    { name: "Yam tuber", price: 2500, unit: "tuber" },
    { name: "Rice, 50kg", price: 72000, unit: "bag" },
    { name: "Palm oil, 5L", price: 14000, unit: "keg" },
  ], "Wholesale food. A rider can take a keg, not a 50kg bag alone."),
  listed("ketu", "KT-02", "Ketu Provisions", "Ngozi Umeh", "food", "/market/provisions.jpg", "2348090010002", [
    { name: "Garri, paint", price: 3500, unit: "bucket" },
    { name: "Groundnut oil, 3.8L", price: 12000, unit: "keg" },
  ], "Everyday provisions on Ikorodu Road."),
  listed("oyingbo", "OY-06", "Oyingbo Rice", "Hajia Amina", "food", "/market/oyingbo.jpg", "2348090011006", [
    { name: "Rice, 5kg", price: 9000, unit: "bag" },
    { name: "Beans, paint", price: 8000, unit: "bucket" },
  ], "Measured rice and beans, tied in nylon."),
  listed("alaba", "AL-22", "Alaba Sound", "Emeka Nwosu", "phones", "/market/alaba.jpg", "2348090012022", [
    { name: "Bluetooth speaker", price: 18500, unit: "piece" },
    { name: "Home theatre, used", price: 45000, unit: "set" },
  ], "Speakers. Test it before the rider leaves."),
  listed("aspanda", "AS-09", "Aspanda Plastics", "Mr. Kunle", "home", "/market/tradefair.jpg", "2348090013009", [
    { name: "Jerry can, 25L", price: 2800, unit: "piece" },
    { name: "Basin, large", price: 3500, unit: "piece" },
  ], "Wholesale plastic. Minimum is one carton for some lines."),
  listed("agege", "AG-11", "Agege Bread & More", "Iya Wura", "food", "/market/pepper.jpg", "2348090014011", [
    { name: "Agege bread", price: 1500, unit: "loaf" },
    { name: "Eggs, crate", price: 5500, unit: "crate" },
  ], "Bread in the morning, eggs all day."),
  listed("iyana-ipaja", "IP-08", "Ipaja Tomatoes", "Adesuwa", "food", "/market/pepper.jpg", "2348090015008", [
    { name: "Tomatoes, small basket", price: 6000, unit: "basket" },
    { name: "Pepper, bag", price: 4000, unit: "bag" },
  ], "Junction stall. The rider should call before the bridge."),
  listed("ikotun", "IK-14", "Ikotun Aso-oke", "Mrs. Folake", "ankara", "/market/asooke.jpg", "2348090016014", [
    { name: "Aso-oke, strip", price: 15000, unit: "bundle" },
    { name: "Fila", price: 8000, unit: "piece" },
  ], "Woven cloth. She ties fila on the spot."),
  listed("katangowa", "KG-21", "Okrika Bales", "John Paul", "fabric", "/market/adire.jpg", "2348090017021", [
    { name: "Shirt bale, opened", price: 3500, unit: "piece" },
    { name: "Jean, selected", price: 4000, unit: "piece" },
  ], "Selected okrika, not a closed bale.", "pending"),
  listed("ajah", "AJ-19", "Ajah Beauty Table", "Amaka", "beauty", "/market/beauty.jpg", "2348090018019", [
    { name: "Hair cream", price: 3500, unit: "jar" },
    { name: "Edge brush set", price: 2000, unit: "set" },
  ], "Beauty products for the Ajah road."),
  listed("bariga", "BG-10", "Bariga Soap", "Iya Bose", "beauty", "/market/beauty.jpg", "2348090019010", [
    { name: "Black soap, wrap", price: 1500, unit: "wrap" },
    { name: "Shea butter", price: 2500, unit: "cup" },
  ], "Local soap and shea, weighed in a cup."),
  listed("aguda", "SU-16", "Aguda Lace", "Kemi George", "fabric", "/market/lace.jpg", "2348090020016", [
    { name: "Net lace, 5 yards", price: 20000, unit: "bundle" },
    { name: "Gele", price: 7000, unit: "piece" },
  ], "Surulere lace. Evening pickup is easier after 4."),
];
