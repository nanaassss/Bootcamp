// script.js
// Consome a countries.dev (https://countries.dev/) — API pública, sem necessidade de chave.
//
// Observação: este projeto usava a REST Countries (restcountries.com v3.1), mas essa versão
// foi descontinuada — hoje ela exige conta e chave de API (v5). Como o objetivo é rodar em
// GitHub Pages (site estático, sem backend), trocamos para a countries.dev, que oferece os
// mesmos dados sem exigir autenticação.
//
// A countries.dev só devolve nomes/regiões/idiomas em inglês (não tem campo de traduções).
// Por isso mantemos dicionários locais para exibir tudo em português.

const form = document.getElementById("search-form");
const input = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const chips = document.querySelectorAll(".chip");

// A API busca pelo nome em inglês. Como o público deste app fala português, traduzimos
// os nomes mais comuns antes de consultar (ex: "frança" -> "france").
const PT_TO_EN = {
  "africa do sul": "south africa", "alemanha": "germany", "arabia saudita": "saudi arabia",
  "argentina": "argentina", "australia": "australia", "austria": "austria", "belgica": "belgium",
  "bolivia": "bolivia", "brasil": "brazil", "canada": "canada", "chile": "chile", "china": "china",
  "colombia": "colombia", "coreia do sul": "south korea", "coreia do norte": "north korea",
  "costa rica": "costa rica", "cuba": "cuba", "dinamarca": "denmark", "egito": "egypt",
  "equador": "ecuador", "escocia": "scotland", "espanha": "spain", "estados unidos": "united states",
  "eua": "united states", "filipinas": "philippines", "franca": "france", "grecia": "greece",
  "holanda": "netherlands", "hungria": "hungary", "india": "india", "inglaterra": "england",
  "irlanda": "ireland", "islandia": "iceland", "italia": "italy", "japao": "japan", "mexico": "mexico",
  "noruega": "norway", "nova zelandia": "new zealand", "paraguai": "paraguay", "peru": "peru",
  "polonia": "poland", "portugal": "portugal", "reino unido": "united kingdom", "russia": "russia",
  "suecia": "sweden", "suica": "switzerland", "turquia": "turkey", "ucrania": "ukraine",
  "uruguai": "uruguay", "venezuela": "venezuela",
};

// Nomes de países (como a countries.dev devolve, em inglês) traduzidos para português.
// Usado só para EXIBIÇÃO — a busca continua em inglês por baixo dos panos.
const COUNTRY_NAME_PT = {
  "Afghanistan": "Afeganistão", "Albania": "Albânia", "Algeria": "Argélia", "Andorra": "Andorra",
  "Angola": "Angola", "Argentina": "Argentina", "Armenia": "Armênia", "Australia": "Austrália",
  "Austria": "Áustria", "Azerbaijan": "Azerbaijão", "Bahamas": "Bahamas", "Bahrain": "Bahrein",
  "Bangladesh": "Bangladesh", "Belarus": "Belarus", "Belgium": "Bélgica", "Belize": "Belize",
  "Benin": "Benin", "Bhutan": "Butão", "Bolivia": "Bolívia", "Bosnia and Herzegovina": "Bósnia e Herzegovina",
  "Botswana": "Botsuana", "Brazil": "Brasil", "Brunei": "Brunei", "Bulgaria": "Bulgária",
  "Burkina Faso": "Burkina Faso", "Burundi": "Burundi", "Cambodia": "Camboja", "Cameroon": "Camarões",
  "Canada": "Canadá", "Chad": "Chade", "Chile": "Chile", "China": "China", "Colombia": "Colômbia",
  "Comoros": "Comores", "Costa Rica": "Costa Rica", "Croatia": "Croácia", "Cuba": "Cuba",
  "Cyprus": "Chipre", "Czechia": "Tchéquia", "Czech Republic": "República Tcheca",
  "Democratic Republic of the Congo": "República Democrática do Congo", "Denmark": "Dinamarca",
  "Djibouti": "Djibuti", "Dominican Republic": "República Dominicana", "Ecuador": "Equador",
  "Egypt": "Egito", "El Salvador": "El Salvador", "England": "Inglaterra", "Estonia": "Estônia",
  "Eswatini": "Essuatíni", "Ethiopia": "Etiópia", "Fiji": "Fiji", "Finland": "Finlândia",
  "France": "França", "Gabon": "Gabão", "Gambia": "Gâmbia", "Georgia": "Geórgia",
  "Germany": "Alemanha", "Ghana": "Gana", "Greece": "Grécia", "Guatemala": "Guatemala",
  "Guinea": "Guiné", "Guyana": "Guiana", "Haiti": "Haiti", "Honduras": "Honduras",
  "Hungary": "Hungria", "Iceland": "Islândia", "India": "Índia", "Indonesia": "Indonésia",
  "Iran": "Irã", "Iraq": "Iraque", "Ireland": "Irlanda", "Israel": "Israel", "Italy": "Itália",
  "Ivory Coast": "Costa do Marfim", "Jamaica": "Jamaica", "Japan": "Japão", "Jordan": "Jordânia",
  "Kazakhstan": "Cazaquistão", "Kenya": "Quênia", "Kuwait": "Kuwait", "Kyrgyzstan": "Quirguistão",
  "Laos": "Laos", "Latvia": "Letônia", "Lebanon": "Líbano", "Lesotho": "Lesoto", "Liberia": "Libéria",
  "Libya": "Líbia", "Liechtenstein": "Liechtenstein", "Lithuania": "Lituânia", "Luxembourg": "Luxemburgo",
  "Madagascar": "Madagascar", "Malawi": "Malawi", "Malaysia": "Malásia", "Maldives": "Maldivas",
  "Mali": "Mali", "Malta": "Malta", "Mauritania": "Mauritânia", "Mauritius": "Maurícia",
  "Mexico": "México", "Moldova": "Moldávia", "Monaco": "Mônaco", "Mongolia": "Mongólia",
  "Montenegro": "Montenegro", "Morocco": "Marrocos", "Mozambique": "Moçambique", "Myanmar": "Mianmar",
  "Namibia": "Namíbia", "Nepal": "Nepal", "Netherlands": "Holanda", "New Zealand": "Nova Zelândia",
  "Nicaragua": "Nicarágua", "Niger": "Níger", "Nigeria": "Nigéria", "North Korea": "Coreia do Norte",
  "North Macedonia": "Macedônia do Norte", "Norway": "Noruega", "Oman": "Omã", "Pakistan": "Paquistão",
  "Palestine": "Palestina", "Panama": "Panamá", "Papua New Guinea": "Papua-Nova Guiné",
  "Paraguay": "Paraguai", "Peru": "Peru", "Philippines": "Filipinas", "Poland": "Polônia",
  "Portugal": "Portugal", "Qatar": "Catar", "Republic of the Congo": "República do Congo",
  "Romania": "Romênia", "Russia": "Rússia", "Rwanda": "Ruanda", "Saudi Arabia": "Arábia Saudita",
  "Scotland": "Escócia", "Senegal": "Senegal", "Serbia": "Sérvia", "Sierra Leone": "Serra Leoa",
  "Singapore": "Singapura", "Slovakia": "Eslováquia", "Slovenia": "Eslovênia", "Somalia": "Somália",
  "South Africa": "África do Sul", "South Korea": "Coreia do Sul", "South Sudan": "Sudão do Sul",
  "Spain": "Espanha", "Sri Lanka": "Sri Lanka", "Sudan": "Sudão", "Suriname": "Suriname",
  "Sweden": "Suécia", "Switzerland": "Suíça", "Syria": "Síria", "Taiwan": "Taiwan",
  "Tajikistan": "Tajiquistão", "Tanzania": "Tanzânia", "Thailand": "Tailândia", "Togo": "Togo",
  "Trinidad and Tobago": "Trinidad e Tobago", "Tunisia": "Tunísia", "Turkey": "Turquia",
  "Turkmenistan": "Turcomenistão", "Uganda": "Uganda", "Ukraine": "Ucrânia",
  "United Arab Emirates": "Emirados Árabes Unidos", "United Kingdom": "Reino Unido",
  "United States of America": "Estados Unidos", "United States": "Estados Unidos", "Uruguay": "Uruguai",
  "Uzbekistan": "Uzbequistão", "Vanuatu": "Vanuatu", "Vatican City": "Vaticano", "Venezuela": "Venezuela",
  "Vietnam": "Vietnã", "Wales": "País de Gales", "Yemen": "Iêmen", "Zambia": "Zâmbia", "Zimbabwe": "Zimbábue",
};

const REGION_PT = {
  "Africa": "África", "Americas": "Américas", "Asia": "Ásia", "Europe": "Europa", "Oceania": "Oceania",
  "Antarctic": "Antártida", "Polar": "Região Polar",
};

const SUBREGION_PT = {
  "Northern Africa": "África do Norte", "Eastern Africa": "África Oriental",
  "Middle Africa": "África Central", "Southern Africa": "África Austral", "Western Africa": "África Ocidental",
  "Caribbean": "Caribe", "Central America": "América Central", "South America": "América do Sul",
  "Northern America": "América do Norte", "Central Asia": "Ásia Central", "Eastern Asia": "Ásia Oriental",
  "South-Eastern Asia": "Sudeste Asiático", "Southern Asia": "Ásia Meridional", "Western Asia": "Ásia Ocidental",
  "Eastern Europe": "Europa Oriental", "Northern Europe": "Europa do Norte",
  "Southern Europe": "Europa do Sul", "Western Europe": "Europa Ocidental",
  "Australia and New Zealand": "Austrália e Nova Zelândia", "Melanesia": "Melanésia",
  "Micronesia": "Micronésia", "Polynesia": "Polinésia",
};

const LANGUAGE_PT = {
  "English": "Inglês", "French": "Francês", "Spanish": "Espanhol", "Portuguese": "Português",
  "German": "Alemão", "Italian": "Italiano", "Dutch": "Holandês", "Russian": "Russo",
  "Chinese": "Chinês", "Japanese": "Japonês", "Korean": "Coreano", "Arabic": "Árabe",
  "Hindi": "Hindi", "Bengali": "Bengali", "Turkish": "Turco", "Vietnamese": "Vietnamita",
  "Thai": "Tailandês", "Polish": "Polonês", "Ukrainian": "Ucraniano", "Greek": "Grego",
  "Swedish": "Sueco", "Norwegian": "Norueguês", "Danish": "Dinamarquês", "Finnish": "Finlandês",
  "Hungarian": "Húngaro", "Czech": "Tcheco", "Romanian": "Romeno", "Hebrew": "Hebraico",
  "Indonesian": "Indonésio", "Malay": "Malaio", "Swahili": "Suaíli", "Persian": "Persa",
  "Urdu": "Urdu", "Filipino": "Filipino", "Tagalog": "Tagalo",
};

function toSearchTerm(rawQuery) {
  const normalized = rawQuery
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos: "frança" -> "franca"
  return PT_TO_EN[normalized] || rawQuery;
}

function translateName(name) {
  return COUNTRY_NAME_PT[name] || name;
}

function translateRegion(region) {
  return REGION_PT[region] || region;
}

function translateSubregion(subregion) {
  return SUBREGION_PT[subregion] || subregion;
}

function translateLanguage(lang) {
  return LANGUAGE_PT[lang] || lang;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  searchCountry(query);
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const name = chip.dataset.name;
    input.value = name;
    searchCountry(name);
  });
});

async function searchCountry(query) {
  setLoading();

  try {
    const searchTerm = toSearchTerm(query);
    const url = `https://countries.dev/name/${encodeURIComponent(searchTerm)}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Não encontramos nenhum país para "${query}". Tente o nome em inglês (ex: "france") ou confira a grafia.`);
      }
      throw new Error("A API de países respondeu com um erro. Tente novamente em instantes.");
    }

    const data = await response.json();
    // O endpoint /name/{nome} retorna uma lista (pode haver mais de uma correspondência);
    // usamos a primeira.
    renderCountry(data[0]);
    clearStatus();
  } catch (error) {
    // Cobre tanto erros de rede (API fora do ar / sem internet) quanto os erros lançados acima
    const message =
      error instanceof TypeError
        ? "Não foi possível conectar à API de países. Verifique sua internet e tente novamente."
        : error.message;
    showError(message);
    resultEl.hidden = true;
  }
}

function renderCountry(data) {
  const namePt = translateName(data.name);

  // 1) Bandeira
  const flagEl = document.getElementById("country-flag");
  flagEl.src = data.flags?.svg || data.flags?.png || "";
  flagEl.alt = `Bandeira de ${namePt}`;

  // 2) Região / sub-região (traduzidas)
  document.getElementById("country-region").textContent =
    [translateRegion(data.region), translateSubregion(data.subregion)].filter(Boolean).join(" · ");

  // 3) Nome (traduzido)
  document.getElementById("country-name").textContent = namePt;

  // 4) Capital
  document.getElementById("country-capital").textContent = data.capital || "—";

  // 5) População
  document.getElementById("country-population").textContent =
    data.population ? data.population.toLocaleString("pt-BR") + " hab." : "—";

  // 6) Área
  document.getElementById("country-area").textContent =
    data.area ? data.area.toLocaleString("pt-BR") + " km²" : "—";

  // 7) Moeda(s)
  const currencies = Array.isArray(data.currencies)
    ? data.currencies.map((c) => `${c.name} (${c.symbol || "?"})`).join(", ")
    : "—";
  document.getElementById("country-currencies").textContent = currencies;

  // 8) Idioma(s) (traduzidos)
  const languages = Array.isArray(data.languages)
    ? data.languages.map((l) => translateLanguage(l.name)).join(", ")
    : "—";
  document.getElementById("country-languages").textContent = languages;

  // 9) Fronteiras (códigos de 3 letras, ex: BRA, ARG — mantidos como a API devolve)
  const borders = data.borders && data.borders.length ? data.borders.join(", ") : "Nenhuma (país insular ou isolado)";
  document.getElementById("country-borders").textContent = borders;

  resultEl.hidden = false;
}

function setLoading() {
  searchBtn.disabled = true;
  statusEl.dataset.state = "loading";
  statusEl.textContent = "Consultando o atlas...";
}

function clearStatus() {
  searchBtn.disabled = false;
  statusEl.removeAttribute("data-state");
  statusEl.textContent = "";
}

function showError(message) {
  searchBtn.disabled = false;
  statusEl.dataset.state = "error";
  statusEl.textContent = message;
}
