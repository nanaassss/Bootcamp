// script.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// A chave anon é própria para uso no frontend. Nunca coloque aqui a chave
// service_role.
const SUPABASE_URL = "https://lvpobhssmypsohckqngb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cG9iaHNzbXlwc29oY2txbmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwOTAzMDUsImV4cCI6MjEwNTY2NjMwNX0.PhZwIgzHEXoEcDOnMjhQ9qHE8dKF8jzkF4gxtjXdpzw";
const FAVORITES_TABLE = "favoritos";
const supabaseConfigured =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.length > 0 &&
  !SUPABASE_URL.includes("SEU-PROJETO") &&
  !SUPABASE_ANON_KEY.includes("SUA_CHAVE");
const supabase = supabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Compatível com o index.html e o style.css enviados.
// A API countries.dev recebe o nome do país em inglês, mas a interface
// aceita somente o idioma atualmente selecionado.

const API_URL = "https://countries.dev/name/";

const form = document.getElementById("search-form");
const input = document.getElementById("country-input");
const langSelect = document.getElementById("lang-select");
const searchButton = document.getElementById("search-btn");
const statusElement = document.getElementById("status");
const resultElement = document.getElementById("result");
const chips = document.querySelectorAll(".chip");
const favoriteButton = document.getElementById("favorite-btn");
const favoritesList = document.getElementById("favorites-list");
const favoritesStatus = document.getElementById("favorites-status");
const refreshFavoritesButton = document.getElementById("refresh-favorites-btn");
let currentCountry = null;

const TEXT = {
  pt: {
    subtitle: "Consulta em tempo real com a WEBAPI",
    placeholder: "Digite o nome de um país",
    button: "Consultar",
    hint: "Experimente:",
    loading: "Consultando o atlas...",
    empty: "Digite o nome de um país.",
    invalid: "O idioma selecionado é português. Use o nome do país em português.",
    notFound: (query) => `Nenhum país encontrado para “${query}”. Confira a grafia e use português.`,
    network: "Não foi possível conectar à API. Verifique sua internet.",
    api: "A API de países respondeu com um erro. Tente novamente em instantes.",
    noData: "Não informado",
    noBorders: "Nenhuma (país insular ou isolado)",
    populationSuffix: "hab.",
    flagAlt: (name) => `Bandeira de ${name}`,
    labels: ["Capital", "População", "Área", "Moeda(s)", "Idioma(s)", "Fronteiras"],
    favorite: "Favoritar país",
    favorited: "País favoritado",
    favoritesTitle: "Meus países favoritos",
    favoritesEmpty: "Nenhum país favorito salvo ainda.",
    favoritesLoading: "Carregando favoritos...",
    favoritesNotConfigured: "Configure a URL e a chave anon do Supabase no script.js para ativar os favoritos.",
    favoritesError: "Não foi possível acessar os favoritos. Confira a tabela e as políticas RLS.",
    favoriteSaved: "País salvo nos favoritos.",
    favoriteRemoved: "País removido dos favoritos.",
    removeFavorite: "Excluir",
    refresh: "Atualizar",
  },
  en: {
    subtitle: "Real-time search using the WEB API",
    placeholder: "Type a country name",
    button: "Search",
    hint: "Try:",
    loading: "Searching the atlas...",
    empty: "Type a country name.",
    invalid: "The selected language is English. Use the country name in English.",
    notFound: (query) => `No country found for “${query}”. Check the spelling and use English.`,
    network: "Could not connect to the API. Check your internet connection.",
    api: "The countries API returned an error. Please try again shortly.",
    noData: "Not provided",
    noBorders: "None (island or isolated country)",
    populationSuffix: "pop.",
    flagAlt: (name) => `Flag of ${name}`,
    labels: ["Capital", "Population", "Area", "Currency/Currencies", "Language(s)", "Borders"],
    favorite: "Favorite country",
    favorited: "Country favorited",
    favoritesTitle: "My favorite countries",
    favoritesEmpty: "No favorite country saved yet.",
    favoritesLoading: "Loading favorites...",
    favoritesNotConfigured: "Set the Supabase URL and anon key in script.js to enable favorites.",
    favoritesError: "Could not access favorites. Check the table and RLS policies.",
    favoriteSaved: "Country saved to favorites.",
    favoriteRemoved: "Country removed from favorites.",
    removeFavorite: "Delete",
    refresh: "Refresh",
  },
};

function normalize(value) {
  return value
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function currentLanguage() {
  return langSelect.value === "en" ? "en" : "pt";
}

function text(key, ...args) {
  const value = TEXT[currentLanguage()][key];
  return typeof value === "function" ? value(...args) : value;
}

// Nome em português normalizado -> nome usado na API.
const PT_TO_EN = {
  afeganistao: "afghanistan", africa: "africa", "africa do sul": "south africa",
  albania: "albania", alemanha: "germany", argelia: "algeria", "arabia saudita": "saudi arabia",
  argentina: "argentina", armenia: "armenia", australia: "australia", austria: "austria",
  azerbaijao: "azerbaijan", bahamas: "bahamas", bahrein: "bahrain", bangladesh: "bangladesh",
  belgica: "belgium", belarus: "belarus", belize: "belize", benin: "benin", bolivia: "bolivia",
  botsuana: "botswana", brasil: "brazil", brunei: "brunei", bulgaria: "bulgaria", butao: "bhutan",
  camboja: "cambodia", camaroes: "cameroon", canada: "canada", catar: "qatar", chade: "chad",
  chile: "chile", china: "china", chipre: "cyprus", colombia: "colombia", comores: "comoros",
  "costa rica": "costa rica", croacia: "croatia", cuba: "cuba", dinamarca: "denmark", djibuti: "djibouti",
  equador: "ecuador", egito: "egypt", "el salvador": "el salvador", "emirados arabes unidos": "united arab emirates",
  eslovaquia: "slovakia", eslovenia: "slovenia", espanha: "spain", "estados unidos": "united states",
  eua: "united states", estonia: "estonia", etiopia: "ethiopia", filipinas: "philippines",
  finlandia: "finland", franca: "france", gales: "wales", georgia: "georgia", gana: "ghana",
  grecia: "greece", guatemala: "guatemala", guine: "guinea", guiana: "guyana", haiti: "haiti",
  holanda: "netherlands", honduras: "honduras", hungria: "hungary", india: "india", indonesia: "indonesia",
  inglaterra: "england", ira: "iran", iraque: "iraq", irlanda: "ireland", islandia: "iceland",
  israel: "israel", italia: "italy", jamaica: "jamaica", japao: "japan", jordania: "jordan",
  cazaquistao: "kazakhstan", quenia: "kenya", kuwait: "kuwait", laos: "laos", letonia: "latvia",
  libano: "lebanon", liberia: "liberia", libia: "libya", lituania: "lithuania", luxemburgo: "luxembourg",
  madagascar: "madagascar", malasia: "malaysia", malawi: "malawi", maldivas: "maldives", mali: "mali",
  malta: "malta", marrocos: "morocco", mauritania: "mauritania", mauricia: "mauritius", mexico: "mexico",
  mianmar: "myanmar", moldavia: "moldova", monaco: "monaco", mongolia: "mongolia", montenegro: "montenegro",
  mocambique: "mozambique", namibia: "namibia", nepal: "nepal", nicaragua: "nicaragua", niger: "niger",
  nigeria: "nigeria", noruega: "norway", "nova zelandia": "new zealand", oma: "oman", paquistao: "pakistan",
  palestina: "palestine", panama: "panama", paraguai: "paraguay", peru: "peru", polonia: "poland",
  portugal: "portugal", "reino unido": "united kingdom", romenia: "romania", ruanda: "rwanda", russia: "russia",
  senegal: "senegal", "serra leoa": "sierra leone", singapura: "singapore", siria: "syria", somalia: "somalia",
  "sri lanka": "sri lanka", sudao: "sudan", "sudao do sul": "south sudan", suriname: "suriname",
  suecia: "sweden", suica: "switzerland", taiwan: "taiwan", tanzania: "tanzania", tchequia: "czechia",
  tailandia: "thailand", togo: "togo", tunisia: "tunisia", turquia: "turkey", ucrania: "ukraine",
  uganda: "uganda", uruguai: "uruguay", uzbequistao: "uzbekistan", vaticano: "vatican city",
  venezuela: "venezuela", vietna: "vietnam", zambia: "zambia", zimbabue: "zimbabwe",
};

// Estes termos não podem ser usados quando o seletor está em inglês.
// Nomes iguais nos dois idiomas, como Canada, Portugal e Argentina, ficam liberados.
const PT_ONLY_TERMS = new Set(
  Object.entries(PT_TO_EN)
    .filter(([pt, en]) => normalize(pt) !== normalize(en))
    .map(([pt]) => pt),
);

const CHIP_NAMES = {
  brasil: { pt: "Brasil", en: "Brazil" },
  japan: { pt: "Japão", en: "Japan" },
  portugal: { pt: "Portugal", en: "Portugal" },
  egypt: { pt: "Egito", en: "Egypt" },
  australia: { pt: "Austrália", en: "Australia" },
  canada: { pt: "Canadá", en: "Canada" },
};

const COUNTRY_NAME_PT = {
  Afghanistan: "Afeganistão", Albania: "Albânia", Algeria: "Argélia", Argentina: "Argentina",
  Australia: "Austrália", Austria: "Áustria", Belgium: "Bélgica", Bolivia: "Bolívia", Brazil: "Brasil",
  Bulgaria: "Bulgária", Cambodia: "Camboja", Cameroon: "Camarões", Canada: "Canadá", Chile: "Chile",
  China: "China", Colombia: "Colômbia", Croatia: "Croácia", Cuba: "Cuba", Czechia: "Tchéquia",
  Denmark: "Dinamarca", Ecuador: "Equador", Egypt: "Egito", Estonia: "Estônia", Ethiopia: "Etiópia",
  Finland: "Finlândia", France: "França", Georgia: "Geórgia", Germany: "Alemanha", Ghana: "Gana",
  Greece: "Grécia", Guatemala: "Guatemala", Guinea: "Guiné", Guyana: "Guiana", Haiti: "Haiti",
  Honduras: "Honduras", Hungary: "Hungria", Iceland: "Islândia", India: "Índia", Indonesia: "Indonésia",
  Iran: "Irã", Iraq: "Iraque", Ireland: "Irlanda", Israel: "Israel", Italy: "Itália", Jamaica: "Jamaica",
  Japan: "Japão", Jordan: "Jordânia", Kenya: "Quênia", Laos: "Laos", Latvia: "Letônia", Lebanon: "Líbano",
  Liberia: "Libéria", Libya: "Líbia", Lithuania: "Lituânia", Luxembourg: "Luxemburgo", Madagascar: "Madagascar",
  Malaysia: "Malásia", Maldives: "Maldivas", Mali: "Mali", Malta: "Malta", Mexico: "México", Moldova: "Moldávia",
  Monaco: "Mônaco", Mongolia: "Mongólia", Montenegro: "Montenegro", Morocco: "Marrocos", Mozambique: "Moçambique",
  Myanmar: "Mianmar", Namibia: "Namíbia", Nepal: "Nepal", Netherlands: "Holanda", "New Zealand": "Nova Zelândia",
  Nicaragua: "Nicarágua", Niger: "Níger", Nigeria: "Nigéria", Norway: "Noruega", Oman: "Omã", Pakistan: "Paquistão",
  Panama: "Panamá", Paraguay: "Paraguai", Peru: "Peru", Philippines: "Filipinas", Poland: "Polônia",
  Portugal: "Portugal", Qatar: "Catar", Romania: "Romênia", Russia: "Rússia", Rwanda: "Ruanda",
  "Saudi Arabia": "Arábia Saudita", Senegal: "Senegal", Serbia: "Sérvia", Singapore: "Singapura",
  Slovakia: "Eslováquia", Slovenia: "Eslovênia", Somalia: "Somália", "South Africa": "África do Sul",
  "South Korea": "Coreia do Sul", Spain: "Espanha", Sudan: "Sudão", Suriname: "Suriname", Sweden: "Suécia",
  Switzerland: "Suíça", Syria: "Síria", Taiwan: "Taiwan", Tanzania: "Tanzânia", Thailand: "Tailândia",
  Tunisia: "Tunísia", Turkey: "Turquia", Ukraine: "Ucrânia", Uganda: "Uganda", "United Kingdom": "Reino Unido",
  "United States": "Estados Unidos", Uruguay: "Uruguai", Uzbekistan: "Uzbequistão", Venezuela: "Venezuela",
  Vietnam: "Vietnã", Zambia: "Zâmbia", Zimbabwe: "Zimbábue",
};

const REGION_PT = {
  Africa: "África", Americas: "Américas", Asia: "Ásia", Europe: "Europa", Oceania: "Oceania",
  Antarctic: "Antártida", Polar: "Região Polar",
};

const SUBREGION_PT = {
  "Northern Africa": "África do Norte", "Eastern Africa": "África Oriental", "Middle Africa": "África Central",
  "Southern Africa": "África Austral", "Western Africa": "África Ocidental", Caribbean: "Caribe",
  "Central America": "América Central", "South America": "América do Sul", "Northern America": "América do Norte",
  "Central Asia": "Ásia Central", "Eastern Asia": "Ásia Oriental", "South-Eastern Asia": "Sudeste Asiático",
  "Southern Asia": "Ásia Meridional", "Western Asia": "Ásia Ocidental", "Eastern Europe": "Europa Oriental",
  "Northern Europe": "Europa do Norte", "Southern Europe": "Europa do Sul", "Western Europe": "Europa Ocidental",
  "Australia and New Zealand": "Austrália e Nova Zelândia", Melanesia: "Melanésia", Micronesia: "Micronésia",
  Polynesia: "Polinésia",
};

const LANGUAGE_PT = {
  English: "Inglês", French: "Francês", Spanish: "Espanhol", Portuguese: "Português", German: "Alemão",
  Italian: "Italiano", Dutch: "Holandês", Russian: "Russo", Chinese: "Chinês", Japanese: "Japonês",
  Korean: "Coreano", Arabic: "Árabe", Hindi: "Hindi", Bengali: "Bengali", Turkish: "Turco",
  Vietnamese: "Vietnamita", Thai: "Tailandês", Polish: "Polonês", Ukrainian: "Ucraniano", Greek: "Grego",
  Swedish: "Sueco", Norwegian: "Norueguês", Danish: "Dinamarquês", Finnish: "Finlandês", Hungarian: "Húngaro",
  Czech: "Tcheco", Romanian: "Romeno", Hebrew: "Hebraico", Indonesian: "Indonésio", Malay: "Malaio",
  Swahili: "Suaíli", Persian: "Persa", Urdu: "Urdu", Filipino: "Filipino", Tagalog: "Tagalo",
};

function displayName(name) {
  return currentLanguage() === "pt" ? (COUNTRY_NAME_PT[name] || name) : name;
}

function translateRegion(value) {
  return currentLanguage() === "pt" ? (REGION_PT[value] || value) : value;
}

function translateSubregion(value) {
  return currentLanguage() === "pt" ? (SUBREGION_PT[value] || value) : value;
}

function translateLanguage(value) {
  return currentLanguage() === "pt" ? (LANGUAGE_PT[value] || value) : value;
}

function updateStaticInterface() {
  const language = currentLanguage();
  const labels = document.querySelectorAll(".stat dt");
  const chipHint = document.querySelector(".hint");
  const subtitle = document.querySelector(".subtitle");

  input.placeholder = text("placeholder");
  searchButton.querySelector("span").textContent = text("button");
  favoriteButton.querySelector("span:last-child").textContent = text("favorite");
  document.getElementById("favorites-title").textContent = text("favoritesTitle");
  refreshFavoritesButton.textContent = text("refresh");
  labels.forEach((label, index) => { label.textContent = text("labels")[index]; });

  // Altera somente o texto antes do link, preservando countries.dev.
  if (subtitle?.firstChild) {
    subtitle.firstChild.textContent = `${text("subtitle")} `;
  }

  if (chipHint) {
    // Preserva os botões e atualiza somente o texto antes deles.
    const firstTextNode = [...chipHint.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (firstTextNode) firstTextNode.textContent = ` ${text("hint")} `;
  }

  chips.forEach((chip) => {
    const names = CHIP_NAMES[chip.dataset.name];
    if (names) {
      chip.textContent = names[language];
      chip.dataset.searchName = names[language];
      chip.title = language === "pt" ? "Pesquisar em português" : "Search in English";
    }
  });

  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
}

function setLoading() {
  searchButton.disabled = true;
  statusElement.dataset.state = "loading";
  statusElement.textContent = text("loading");
}

function clearStatus() {
  searchButton.disabled = false;
  statusElement.textContent = "";
  statusElement.removeAttribute("data-state");
}

function showError(message) {
  searchButton.disabled = false;
  statusElement.dataset.state = "error";
  statusElement.textContent = message;
}

function getApiSearchTerm(rawQuery) {
  const normalized = normalize(rawQuery);

  if (currentLanguage() === "pt") {
    return PT_TO_EN[normalized] || null;
  }

  if (PT_ONLY_TERMS.has(normalized)) return null;
  return rawQuery.trim();
}

function renderCountry(data) {
  currentCountry = data;
  const name = displayName(data.name);
  const locale = currentLanguage() === "pt" ? "pt-BR" : "en-US";
  const populationSuffix = text("populationSuffix");

  const flag = document.getElementById("country-flag");
  flag.src = data.flags?.svg || data.flags?.png || "";
  flag.alt = text("flagAlt", name);

  document.getElementById("country-region").textContent =
    [translateRegion(data.region), translateSubregion(data.subregion)].filter(Boolean).join(" · ");
  document.getElementById("country-name").textContent = name;
  document.getElementById("country-capital").textContent = data.capital || text("noData");
  document.getElementById("country-population").textContent = data.population
    ? `${data.population.toLocaleString(locale)} ${populationSuffix}`
    : text("noData");
  document.getElementById("country-area").textContent = data.area
    ? `${data.area.toLocaleString(locale)} km²`
    : text("noData");
  document.getElementById("country-currencies").textContent = Array.isArray(data.currencies) && data.currencies.length
    ? data.currencies.map((currency) => `${currency.name} (${currency.symbol || "?"})`).join(", ")
    : text("noData");
  document.getElementById("country-languages").textContent = Array.isArray(data.languages) && data.languages.length
    ? data.languages.map((language) => translateLanguage(language.name)).join(", ")
    : text("noData");
  document.getElementById("country-borders").textContent = data.borders?.length
    ? data.borders.join(", ")
    : text("noBorders");

  resultElement.hidden = false;
  favoriteButton.disabled = !supabaseConfigured;
  favoriteButton.classList.toggle("is-saved", false);
}

function setFavoritesStatus(message, state = "") {
  favoritesStatus.textContent = message;
  if (state) favoritesStatus.dataset.state = state;
  else favoritesStatus.removeAttribute("data-state");
}

function favoriteData(country) {
  return {
    nome: country.name,
    capital: country.capital || null,
    bandeira: country.flags?.svg || country.flags?.png || null,
    regiao: country.region || null,
  };
}

function renderFavorites(favorites) {
  favoritesList.replaceChildren();

  if (!favorites.length) {
    const empty = document.createElement("li");
    empty.className = "favorites-empty";
    empty.textContent = text("favoritesEmpty");
    favoritesList.append(empty);
    return;
  }

  favorites.forEach((favorite) => {
    const item = document.createElement("li");
    item.className = "favorite-item";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = favorite.nome_item;
    const date = document.createElement("small");
    date.textContent = favorite.criado_em
      ? new Date(favorite.criado_em).toLocaleString(currentLanguage() === "pt" ? "pt-BR" : "en-US")
      : "";
    info.append(name, date);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-favorite-btn";
    remove.textContent = text("removeFavorite");
    remove.addEventListener("click", () => removeFavorite(favorite.id));

    item.append(info, remove);
    favoritesList.append(item);
  });
}

async function listFavorites() {
  if (!supabaseConfigured) {
    setFavoritesStatus(text("favoritesNotConfigured"), "warning");
    return;
  }

  setFavoritesStatus(text("favoritesLoading"));
  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select("id, criado_em, nome_item, dados_extra")
    .order("criado_em", { ascending: false });

  if (error) {
    setFavoritesStatus(text("favoritesError"), "error");
    return;
  }

  renderFavorites(data || []);
  setFavoritesStatus("");
}

async function saveFavorite() {
  if (!currentCountry || !supabaseConfigured) return;

  favoriteButton.disabled = true;
  const { error } = await supabase.from(FAVORITES_TABLE).insert({
    nome_item: currentCountry.name,
    dados_extra: favoriteData(currentCountry),
  });

  if (error) {
    favoriteButton.disabled = false;
    setFavoritesStatus(text("favoritesError"), "error");
    return;
  }

  favoriteButton.classList.add("is-saved");
  favoriteButton.querySelector("span:first-child").textContent = "★";
  favoriteButton.querySelector("span:last-child").textContent = text("favorited");
  setFavoritesStatus(text("favoriteSaved"), "success");
  await listFavorites();
  favoriteButton.disabled = false;
}

async function removeFavorite(id) {
  if (!supabaseConfigured) return;

  const { error } = await supabase.from(FAVORITES_TABLE).delete().eq("id", id);
  if (error) {
    setFavoritesStatus(text("favoritesError"), "error");
    return;
  }

  setFavoritesStatus(text("favoriteRemoved"), "success");
  await listFavorites();
}

async function searchCountry(query) {
  const apiSearchTerm = getApiSearchTerm(query);
  setLoading();

  if (!apiSearchTerm) {
    showError(text("invalid"));
    resultElement.hidden = true;
    return;
  }

  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(apiSearchTerm)}`);

    if (!response.ok) {
      if (response.status === 404) throw new Error(text("notFound", query));
      throw new Error(text("api"));
    }

    const data = await response.json();
    if (!Array.isArray(data) || !data[0]) throw new Error(text("notFound", query));

    renderCountry(data[0]);
    clearStatus();
  } catch (error) {
    showError(error instanceof TypeError ? text("network") : error.message);
    resultElement.hidden = true;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError(text("empty"));
    input.focus();
    return;
  }

  searchCountry(query);
});

langSelect.addEventListener("change", () => {
  input.value = "";
  resultElement.hidden = true;
  currentCountry = null;
  favoriteButton.classList.remove("is-saved");
  favoriteButton.querySelector("span:first-child").textContent = "☆";
  clearStatus();
  updateStaticInterface();
  listFavorites();
  input.focus();
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const query = chip.dataset.searchName || chip.textContent.trim();
    input.value = query;
    searchCountry(query);
  });
});

favoriteButton.addEventListener("click", saveFavorite);
refreshFavoritesButton.addEventListener("click", listFavorites);

updateStaticInterface();
listFavorites();
