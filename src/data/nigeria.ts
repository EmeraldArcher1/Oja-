export type StatePresence = {
  id: string;
  name: string;
  zone: string;
  capital: string;
  market: string;
  city: string;
  lat: number;
  lng: number;
  note: string;
};

/** City pins for all 36 states and the FCT. Not surveyed stall doors. */
export const states: StatePresence[] = [
  { id: "abia", name: "Abia", zone: "South East", capital: "Umuahia", market: "Ariaria International Market", city: "Aba", lat: 5.1167, lng: 7.3667, note: "Aba is the trading city. Umuahia is the capital." },
  { id: "adamawa", name: "Adamawa", zone: "North East", capital: "Yola", market: "Jimeta Main Market", city: "Yola", lat: 9.2035, lng: 12.4954, note: "City presence in Yola." },
  { id: "akwa-ibom", name: "Akwa Ibom", zone: "South South", capital: "Uyo", market: "Uyo Main Market", city: "Uyo", lat: 5.0377, lng: 7.9128, note: "City presence in Uyo." },
  { id: "anambra", name: "Anambra", zone: "South East", capital: "Awka", market: "Onitsha Main Market", city: "Onitsha", lat: 6.1498, lng: 6.7857, note: "Awka is the capital. Onitsha is the market city." },
  { id: "bauchi", name: "Bauchi", zone: "North East", capital: "Bauchi", market: "Wunti Market", city: "Bauchi", lat: 10.3158, lng: 9.8442, note: "City presence in Bauchi." },
  { id: "bayelsa", name: "Bayelsa", zone: "South South", capital: "Yenagoa", market: "Yenagoa Main Market", city: "Yenagoa", lat: 4.9267, lng: 6.2676, note: "City presence in Yenagoa." },
  { id: "benue", name: "Benue", zone: "North Central", capital: "Makurdi", market: "Wurukum Market", city: "Makurdi", lat: 7.7322, lng: 8.5391, note: "City presence in Makurdi." },
  { id: "borno", name: "Borno", zone: "North East", capital: "Maiduguri", market: "Monday Market", city: "Maiduguri", lat: 11.8311, lng: 13.151, note: "City presence in Maiduguri." },
  { id: "cross-river", name: "Cross River", zone: "South South", capital: "Calabar", market: "Watt Market", city: "Calabar", lat: 4.9757, lng: 8.3417, note: "City presence in Calabar." },
  { id: "delta", name: "Delta", zone: "South South", capital: "Asaba", market: "Warri Main Market", city: "Warri", lat: 5.5544, lng: 5.7932, note: "Asaba is the capital. Warri is the market city." },
  { id: "ebonyi", name: "Ebonyi", zone: "South East", capital: "Abakaliki", market: "Abakpa Market", city: "Abakaliki", lat: 6.3249, lng: 8.1137, note: "City presence in Abakaliki." },
  { id: "edo", name: "Edo", zone: "South South", capital: "Benin City", market: "Oba Market", city: "Benin City", lat: 6.335, lng: 5.6037, note: "City presence in Benin City." },
  { id: "ekiti", name: "Ekiti", zone: "South West", capital: "Ado-Ekiti", market: "Oja Oba", city: "Ado-Ekiti", lat: 7.6233, lng: 5.2209, note: "City presence in Ado-Ekiti." },
  { id: "enugu", name: "Enugu", zone: "South East", capital: "Enugu", market: "Ogbete Market", city: "Enugu", lat: 6.4402, lng: 7.4943, note: "City presence in Enugu." },
  { id: "fct", name: "FCT", zone: "North Central", capital: "Abuja", market: "Wuse Market", city: "Abuja", lat: 9.0579, lng: 7.4951, note: "City presence in Abuja." },
  { id: "gombe", name: "Gombe", zone: "North East", capital: "Gombe", market: "Gombe Main Market", city: "Gombe", lat: 10.2897, lng: 11.1673, note: "City presence in Gombe." },
  { id: "imo", name: "Imo", zone: "South East", capital: "Owerri", market: "Eke Onunwa Market", city: "Owerri", lat: 5.4836, lng: 7.0332, note: "City presence in Owerri." },
  { id: "jigawa", name: "Jigawa", zone: "North West", capital: "Dutse", market: "Dutse Main Market", city: "Dutse", lat: 11.7564, lng: 9.3386, note: "City presence in Dutse." },
  { id: "kaduna", name: "Kaduna", zone: "North West", capital: "Kaduna", market: "Kaduna Central Market", city: "Kaduna", lat: 10.5222, lng: 7.4383, note: "City presence in Kaduna." },
  { id: "kano", name: "Kano", zone: "North West", capital: "Kano", market: "Kurmi Market", city: "Kano", lat: 12.0022, lng: 8.592, note: "City presence in Kano." },
  { id: "katsina", name: "Katsina", zone: "North West", capital: "Katsina", market: "Katsina Central Market", city: "Katsina", lat: 12.9855, lng: 7.6006, note: "City presence in Katsina." },
  { id: "kebbi", name: "Kebbi", zone: "North West", capital: "Birnin Kebbi", market: "Birnin Kebbi Central Market", city: "Birnin Kebbi", lat: 12.4539, lng: 4.1975, note: "City presence in Birnin Kebbi." },
  { id: "kogi", name: "Kogi", zone: "North Central", capital: "Lokoja", market: "Lokoja International Market", city: "Lokoja", lat: 7.8023, lng: 6.743, note: "City presence in Lokoja." },
  { id: "kwara", name: "Kwara", zone: "North Central", capital: "Ilorin", market: "Oja Oba", city: "Ilorin", lat: 8.4799, lng: 4.5418, note: "City presence in Ilorin." },
  { id: "lagos", name: "Lagos", zone: "South West", capital: "Ikeja", market: "Balogun Market", city: "Lagos", lat: 6.4547, lng: 3.3896, note: "The only state with sample stalls and a lane walk. Makoko is on the Lagos lagoon, not in Ondo." },
  { id: "nasarawa", name: "Nasarawa", zone: "North Central", capital: "Lafia", market: "Lafia Modern Market", city: "Lafia", lat: 8.49, lng: 8.52, note: "City presence in Lafia." },
  { id: "niger", name: "Niger", zone: "North Central", capital: "Minna", market: "Minna Central Market", city: "Minna", lat: 9.6139, lng: 6.5569, note: "City presence in Minna." },
  { id: "ogun", name: "Ogun", zone: "South West", capital: "Abeokuta", market: "Kuto Market", city: "Abeokuta", lat: 7.1557, lng: 3.3451, note: "City presence in Abeokuta." },
  { id: "ondo", name: "Ondo", zone: "South West", capital: "Akure", market: "Oja Oba", city: "Akure", lat: 7.2571, lng: 5.2058, note: "Ondo is its own state. Makoko is not here." },
  { id: "osun", name: "Osun", zone: "South West", capital: "Osogbo", market: "Oja Oba", city: "Osogbo", lat: 7.7827, lng: 4.5418, note: "City presence in Osogbo." },
  { id: "oyo", name: "Oyo", zone: "South West", capital: "Ibadan", market: "Bodija Market", city: "Ibadan", lat: 7.3775, lng: 3.947, note: "City presence in Ibadan." },
  { id: "plateau", name: "Plateau", zone: "North Central", capital: "Jos", market: "Terminus Market", city: "Jos", lat: 9.8965, lng: 8.8583, note: "City presence in Jos." },
  { id: "rivers", name: "Rivers", zone: "South South", capital: "Port Harcourt", market: "Mile One Market", city: "Port Harcourt", lat: 4.8156, lng: 7.0498, note: "City presence in Port Harcourt." },
  { id: "sokoto", name: "Sokoto", zone: "North West", capital: "Sokoto", market: "Sokoto Central Market", city: "Sokoto", lat: 13.0059, lng: 5.2476, note: "City presence in Sokoto." },
  { id: "taraba", name: "Taraba", zone: "North East", capital: "Jalingo", market: "Jalingo Main Market", city: "Jalingo", lat: 8.8937, lng: 11.3594, note: "City presence in Jalingo." },
  { id: "yobe", name: "Yobe", zone: "North East", capital: "Damaturu", market: "Damaturu Main Market", city: "Damaturu", lat: 11.7466, lng: 11.966, note: "City presence in Damaturu." },
  { id: "zamfara", name: "Zamfara", zone: "North West", capital: "Gusau", market: "Gusau Central Market", city: "Gusau", lat: 12.1704, lng: 6.6641, note: "City presence in Gusau." },
];

export function stateById(id: string): StatePresence | undefined {
  return states.find((state) => state.id === id);
}

export function isStateId(id: string): boolean {
  return states.some((state) => state.id === id);
}

export type KnownMarket = {
  stateId: string;
  name: string;
  city: string;
};

/** Named markets. A directory of places, not a list of verified stalls. */
export const knownMarkets: KnownMarket[] = [
  { stateId: "abia", name: "Ariaria International Market", city: "Aba" },
  { stateId: "abia", name: "Ekeoha Market", city: "Aba" },
  { stateId: "adamawa", name: "Jimeta Main Market", city: "Yola" },
  { stateId: "akwa-ibom", name: "Itam Market", city: "Uyo" },
  { stateId: "akwa-ibom", name: "Uyo Main Market", city: "Uyo" },
  { stateId: "anambra", name: "Onitsha Main Market", city: "Onitsha" },
  { stateId: "anambra", name: "Ochanja Market", city: "Onitsha" },
  { stateId: "anambra", name: "Nkwo Nnewi", city: "Nnewi" },
  { stateId: "bauchi", name: "Wunti Market", city: "Bauchi" },
  { stateId: "bauchi", name: "Muda Lawal Market", city: "Bauchi" },
  { stateId: "bayelsa", name: "Swali Market", city: "Yenagoa" },
  { stateId: "benue", name: "Wurukum Market", city: "Makurdi" },
  { stateId: "benue", name: "Modern Market", city: "Makurdi" },
  { stateId: "borno", name: "Monday Market", city: "Maiduguri" },
  { stateId: "cross-river", name: "Watt Market", city: "Calabar" },
  { stateId: "cross-river", name: "Marian Market", city: "Calabar" },
  { stateId: "delta", name: "Warri Main Market", city: "Warri" },
  { stateId: "delta", name: "Ogbeogonogo Market", city: "Asaba" },
  { stateId: "ebonyi", name: "Abakpa Market", city: "Abakaliki" },
  { stateId: "edo", name: "Oba Market", city: "Benin City" },
  { stateId: "edo", name: "New Benin Market", city: "Benin City" },
  { stateId: "ekiti", name: "Oja Oba", city: "Ado-Ekiti" },
  { stateId: "enugu", name: "Ogbete Market", city: "Enugu" },
  { stateId: "enugu", name: "Kenyatta Market", city: "Enugu" },
  { stateId: "enugu", name: "Artisan Market", city: "Enugu" },
  { stateId: "fct", name: "Wuse Market", city: "Abuja" },
  { stateId: "fct", name: "Utako Market", city: "Abuja" },
  { stateId: "fct", name: "Dei-Dei Market", city: "Abuja" },
  { stateId: "gombe", name: "Gombe Main Market", city: "Gombe" },
  { stateId: "imo", name: "Eke Onunwa Market", city: "Owerri" },
  { stateId: "imo", name: "Relief Market", city: "Owerri" },
  { stateId: "jigawa", name: "Dutse Main Market", city: "Dutse" },
  { stateId: "jigawa", name: "Hadejia Market", city: "Hadejia" },
  { stateId: "kaduna", name: "Kaduna Central Market", city: "Kaduna" },
  { stateId: "kaduna", name: "Kasuwar Barci", city: "Kaduna" },
  { stateId: "kaduna", name: "Sabon Gari Market", city: "Kaduna" },
  { stateId: "kano", name: "Kurmi Market", city: "Kano" },
  { stateId: "kano", name: "Kantin Kwari", city: "Kano" },
  { stateId: "kano", name: "Sabon Gari Market", city: "Kano" },
  { stateId: "katsina", name: "Katsina Central Market", city: "Katsina" },
  { stateId: "kebbi", name: "Birnin Kebbi Central Market", city: "Birnin Kebbi" },
  { stateId: "kogi", name: "Lokoja International Market", city: "Lokoja" },
  { stateId: "kogi", name: "Okene Central Market", city: "Okene" },
  { stateId: "kwara", name: "Oja Oba", city: "Ilorin" },
  { stateId: "kwara", name: "Ipata Market", city: "Ilorin" },
  { stateId: "lagos", name: "Balogun Market", city: "Lagos Island" },
  { stateId: "lagos", name: "Makoko", city: "Lagos Mainland" },
  { stateId: "lagos", name: "Mile 12 Market", city: "Kosofe" },
  { stateId: "lagos", name: "Alaba International", city: "Ojo" },
  { stateId: "lagos", name: "Computer Village", city: "Ikeja" },
  { stateId: "nasarawa", name: "Lafia Modern Market", city: "Lafia" },
  { stateId: "niger", name: "Minna Central Market", city: "Minna" },
  { stateId: "ogun", name: "Kuto Market", city: "Abeokuta" },
  { stateId: "ogun", name: "Lafenwa Market", city: "Abeokuta" },
  { stateId: "ondo", name: "Oja Oba", city: "Akure" },
  { stateId: "ondo", name: "Isikan Market", city: "Akure" },
  { stateId: "ondo", name: "Oja Oba", city: "Ondo" },
  { stateId: "osun", name: "Oja Oba", city: "Osogbo" },
  { stateId: "osun", name: "Oja Oba", city: "Ile-Ife" },
  { stateId: "oyo", name: "Bodija Market", city: "Ibadan" },
  { stateId: "oyo", name: "Ogunpa Market", city: "Ibadan" },
  { stateId: "oyo", name: "Oja Oba", city: "Ibadan" },
  { stateId: "oyo", name: "Gbagi Market", city: "Ibadan" },
  { stateId: "plateau", name: "Terminus Market", city: "Jos" },
  { stateId: "rivers", name: "Mile One Market", city: "Port Harcourt" },
  { stateId: "rivers", name: "Oil Mill Market", city: "Port Harcourt" },
  { stateId: "sokoto", name: "Sokoto Central Market", city: "Sokoto" },
  { stateId: "taraba", name: "Jalingo Main Market", city: "Jalingo" },
  { stateId: "yobe", name: "Damaturu Main Market", city: "Damaturu" },
  { stateId: "yobe", name: "Potiskum Market", city: "Potiskum" },
  { stateId: "zamfara", name: "Gusau Central Market", city: "Gusau" },
];

export function marketsInState(stateId: string): KnownMarket[] {
  return knownMarkets.filter((market) => market.stateId === stateId);
}
