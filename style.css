:root {
  --navy: #0f2438;
  --navy-deep: #0a1826;
  --paper: #161b2c;
  --panel: #fffdf6;
  --gold: #5eead4;
  --gold-light: #f5c26b;
  --ink: #1b2431;
  --grey: #6d7684;
  --line: #aab7c9;
  --radius: 10px;
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Work Sans", system-ui, sans-serif;
}

* { box-sizing: border-box; }

html, body { margin: 0; padding: 0; }

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 85% 0%, rgba(226, 222, 211, 0.12), transparent 45%),
    var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
}

.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ---------- Header ---------- */
.topbar {
  background: var(--navy);
  background-image: linear-gradient(180deg, var(--navy), var(--navy-deep));
  border-bottom: 4px solid var(--gold);
  padding: 30px 20px 34px;
  text-align: center;
  position: relative;
}

.compass {
  width: 50px;
  height: 50px;
  margin: 0 auto 14px;
  border-radius: 50%;
  border: 3px solid var(--gold-light);
  position: relative;
  background: radial-gradient(circle at 35% 30%, #17324a, var(--navy-deep) 70%);
}

.needle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 32px;
  margin: -16px 0 0 -1.5px;
  background: linear-gradient(to bottom, var(--gold-light) 50%, #7a3b3b 50%);
  transform: rotate(35deg);
  border-radius: 2px;
}

.topbar h1 {
  font-family: var(--font-display);
  color: #ffffff;
  font-size: clamp(26px, 4.5vw, 38px);
  letter-spacing: 0.5px;
  margin: 0 0 10px;
  font-weight: 700;
}

.subtitle {
  color: var(--gold-light);
  font-size: 14px;
  margin: 0;
}

.subtitle a {
  color: #ffffff;
  font-weight: 600;
  text-decoration: underline;
}

/* ---------- Main ---------- */
main {
  flex: 1;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px 60px;
}

.search-form {
  display: flex;
  gap: 10px;
  background: var(--panel);
  border: 2px solid var(--line);
  border-radius: var(--radius);
  padding: 10px;
  box-shadow: 5px 5px 0 rgba(15,36,56,0.15);
}

#country-input {
  flex: 1;
  min-width: 0;
  border: 1.5px solid var(--line);
  border-radius: 6px;
  padding: 12px 14px;
  font-family: var(--font-body);
  font-size: 15px;
  background: #fff;
  color: var(--ink);
}

#country-input:focus-visible,
#lang-select:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 1px;
}

/* ---------- Language selector ---------- */
#lang-select {
  min-width: 126px;
  border: 1.5px solid var(--line);
  border-radius: 6px;
  padding: 12px 30px 12px 12px;
  color: var(--navy-deep);
  background-color: #ffffff;
  background-image:
    linear-gradient(45deg, transparent 50%, var(--navy) 50%),
    linear-gradient(135deg, var(--navy) 50%, transparent 50%);
  background-position:
    calc(100% - 16px) 50%,
    calc(100% - 11px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  appearance: none;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

#lang-select:hover {
  border-color: var(--gold-light);
  background-color: #fffaf0;
}

#lang-select:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 2px rgba(94, 234, 212, 0.25);
  outline: none;
}

#search-btn {
  border: 1.5px solid var(--line);
  border-radius: 6px;
  background: var(--gold);
  color: var(--navy-deep);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 15px;
  padding: 12px 22px;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.15s ease;
}

#search-btn:hover { background: var(--gold-light); transform: translateY(-2px); }
#search-btn:active { transform: translateY(0); }
#search-btn:focus-visible { outline: 3px solid var(--navy); outline-offset: 2px; }
#search-btn:disabled { opacity: 0.6; cursor: progress; }

.hint {
  margin: 14px 2px 0;
  font-size: 13px;
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.chip {
  border: 1.5px solid var(--line);
  background: #fff;
  color: var(--ink);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  font-family: var(--font-body);
  cursor: pointer;
}

.chip:hover { background: var(--gold-light); }

/* ---------- Status / errors ---------- */
.status {
  margin-top: 18px;
  min-height: 24px;
  font-size: 14px;
}

.status[data-state="loading"] {
  color: var(--navy);
  font-weight: 600;
}

.status[data-state="error"] {
  color: #fff;
  background: #7a3b3b;
  border: 2px solid var(--line);
  border-radius: 10px;
  padding: 12px 14px;
  font-weight: 600;
}

/* ---------- Result card ---------- */
.result-card {
  margin-top: 22px;
  background: var(--panel);
  border: 2px solid var(--line);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: 5px 5px 0 rgba(15,36,56,0.15);
  animation: pop 0.25s ease;
}

@keyframes pop {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-top {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

#country-flag {
  width: 110px;
  height: 74px;
  object-fit: cover;
  border: 2px solid var(--line);
  border-radius: 6px;
  background: #eee;
}

.country-region {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gold);
  font-weight: 700;
}

.country-name {
  font-family: var(--font-display);
  font-size: clamp(20px, 3.4vw, 28px);
  margin: 4px 0 0;
  color: var(--navy);
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 22px 0 0;
}

.stat {
  border: 1.5px dashed var(--grey);
  border-radius: 8px;
  padding: 10px 12px;
}

.stat-wide { grid-column: 1 / -1; }

.stat dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--grey);
  margin-bottom: 4px;
}

.stat dd {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
}

/* ---------- Favorites / Supabase ---------- */
.favorite-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  border: 1.5px solid var(--line);
  border-radius: 6px;
  padding: 10px 14px;
  background: var(--gold);
  color: var(--navy-deep);
  font: 600 14px var(--font-body);
  cursor: pointer;
  transition: transform 0.1s ease, background 0.15s ease;
}

.favorite-btn:hover:not(:disabled) { background: var(--gold-light); transform: translateY(-2px); }
.favorite-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.favorite-btn.is-saved { background: var(--gold-light); }
.favorite-btn > span:first-child { font-size: 20px; line-height: 1; }

.favorites-card {
  margin-top: 28px;
  background: var(--panel);
  border: 2px solid var(--line);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: 5px 5px 0 rgba(15,36,56,0.15);
}

.favorites-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.favorites-heading h2 {
  margin: 0;
  color: var(--navy);
  font: 700 clamp(20px, 3.4vw, 26px) var(--font-display);
}

.secondary-btn,
.remove-favorite-btn {
  border: 1.5px solid var(--line);
  border-radius: 6px;
  padding: 8px 11px;
  background: #fff;
  color: var(--navy);
  font: 600 12px var(--font-body);
  cursor: pointer;
}

.secondary-btn:hover,
.remove-favorite-btn:hover { background: #fffaf0; border-color: var(--gold-light); }

.favorites-status {
  min-height: 20px;
  margin: 14px 0 4px;
  color: var(--grey);
  font-size: 13px;
}

.favorites-status[data-state="warning"] { color: #856404; }
.favorites-status[data-state="error"] { color: #7a3b3b; font-weight: 600; }
.favorites-status[data-state="success"] { color: #176b54; font-weight: 600; }

.favorites-list {
  display: grid;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: 1.5px dashed var(--grey);
  border-radius: 8px;
  padding: 10px 12px;
}

.favorite-item strong,
.favorite-item small { display: block; }
.favorite-item small { margin-top: 3px; color: var(--grey); font-size: 11px; }
.favorites-empty { color: var(--grey); font-size: 14px; }

/* ---------- Footer ---------- */
footer {
  text-align: center;
  font-size: 12px;
  color: var(--grey);
  padding: 18px;
  border-top: 3px solid var(--gold);
  background: var(--panel);
}

footer a { color: var(--navy); }

@media (max-width: 560px) {
  .search-form { flex-wrap: wrap; }
  #country-input { flex-basis: 100%; }
  #lang-select,
  #search-btn { flex: 1; }
}

@media (max-width: 480px) {
  .search-form { flex-direction: column; }
  #lang-select,
  #search-btn { width: 100%; }
}


/* ---------- Atlas náutico: temas e movimento ---------- */
:root {
  --navy: #1B3A5C;
  --navy-deep: #122A43;
  --paper: #F7F3E8;
  --panel: #FFFDF6;
  --gold: #B8860B;
  --gold-light: #D7AF45;
  --ink: #22201A;
  --grey: #6F746F;
  --line: #CFC5AF;
  --shadow-color: rgba(27, 58, 92, 0.16);
  color-scheme: light;
}

html[data-theme="dark"] {
  --navy: #1B4965;
  --navy-deep: #091522;
  --paper: #0D1B2A;
  --panel: #13283A;
  --gold: #5FA8D3;
  --gold-light: #BEE9E8;
  --ink: #E8EEF2;
  --grey: #A4B5C2;
  --line: #41647A;
  --shadow-color: rgba(0, 0, 0, 0.28);
  color-scheme: dark;
}

body,
.search-form,
.result-card,
.favorites-card,
footer,
#country-input,
#lang-select,
.chip,
.secondary-btn,
.remove-favorite-btn {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

body {
  background: radial-gradient(circle at 85% 0%, rgba(226, 222, 211, 0.12), transparent 45%), var(--paper);
}

.topbar { box-shadow: 0 8px 24px var(--shadow-color); }
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  padding: 8px 13px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font: 600 12px var(--font-body);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.theme-toggle:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-2px); }
.theme-toggle:focus-visible { outline: 3px solid var(--gold-light); outline-offset: 3px; }

.search-form,
.result-card,
.favorites-card { box-shadow: 5px 5px 0 var(--shadow-color); }
#country-input,
#lang-select,
.chip,
.secondary-btn,
.remove-favorite-btn { background: var(--panel); color: var(--ink); }
#lang-select { color: var(--ink); }
.hint { color: var(--grey); }
.country-name,
.favorites-heading h2,
footer a { color: var(--navy); }
.status[data-state="loading"] { color: var(--navy); }
.secondary-btn:hover,
.remove-favorite-btn:hover { background: color-mix(in srgb, var(--panel) 78%, var(--gold-light)); }

.topbar { animation: atlas-header-in 0.55s ease both; }
main { animation: atlas-content-in 0.65s 0.08s ease both; }
.result-card, .favorites-card { animation: atlas-card-in 0.35s ease both; }
.compass { animation: atlas-compass-in 0.8s ease both; }
.needle { animation: atlas-needle 1.1s 0.2s ease-out both; }

@keyframes atlas-header-in { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes atlas-content-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes atlas-card-in { from { opacity: 0; transform: translateY(8px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes atlas-compass-in { from { opacity: 0; transform: scale(0.7) rotate(-30deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
@keyframes atlas-needle { from { transform: rotate(-35deg); } to { transform: rotate(35deg); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}


/* ---------- Tema escolhido: Azul petróleo / Atlas oceânico ---------- */
:root {
  --navy: #126071;
  --navy-deep: #07171C;
  --paper: #EAF4F4;
  --panel: #FFFFFF;
  --gold: #2A91A3;
  --gold-light: #EFB366;
  --ink: #17323A;
  --grey: #668087;
  --line: #A4C7CA;
  --shadow-color: rgba(18, 75, 91, 0.18);
  color-scheme: light;
}

html[data-theme="dark"] {
  --navy: #126071;
  --navy-deep: #07171C;
  --paper: #0B2026;
  --panel: #122E35;
  --gold: #48B9C8;
  --gold-light: #F0BD72;
  --ink: #EDF3F5;
  --grey: #9EAFB8;
  --line: #3B6971;
  --shadow-color: rgba(0, 0, 0, 0.3);
  color-scheme: dark;
}

/* Transições e microinterações */
.search-form {
  transition: transform 0.25s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.search-form:focus-within {
  transform: translateY(-2px);
  box-shadow: 5px 7px 0 var(--shadow-color), 0 0 0 3px color-mix(in srgb, var(--gold) 22%, transparent);
}

.chip,
#search-btn,
.favorite-btn,
.secondary-btn,
.remove-favorite-btn {
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.chip:hover { transform: translateY(-2px); box-shadow: 0 4px 10px var(--shadow-color); }
#search-btn:hover,
.favorite-btn:hover:not(:disabled) { box-shadow: 0 5px 12px var(--shadow-color); }

.compass { transition: transform 0.35s ease, box-shadow 0.35s ease; }
.compass:hover { transform: rotate(8deg) scale(1.05); box-shadow: 0 0 0 5px color-mix(in srgb, var(--gold-light) 20%, transparent); }

.result-card:hover,
.favorites-card:hover { box-shadow: 6px 7px 0 var(--shadow-color); }
.favorite-item { animation: atlas-favorite-in 0.35s ease both; }
.favorite-item:nth-child(2) { animation-delay: 0.06s; }
.favorite-item:nth-child(3) { animation-delay: 0.12s; }

@keyframes atlas-favorite-in {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .search-form:focus-within,
  .chip:hover,
  #search-btn:hover,
  .favorite-btn:hover:not(:disabled),
  .compass:hover { transform: none; }
}


/* Correção de contraste no modo escuro */
html[data-theme="dark"] .favorites-heading h2 {
  color: var(--ink);
}


/* ---------- Interações de pesquisa e favoritos ---------- */
.result-card:not([hidden]) {
  animation: atlas-result-arrive 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.favorite-pulse {
  animation: atlas-favorite-pulse 0.55s ease both;
}

@keyframes atlas-result-arrive {
  from { opacity: 0; transform: translateY(18px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes atlas-favorite-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 color-mix(in srgb, var(--gold-light) 0%, transparent); }
  35% { transform: scale(1.08); box-shadow: 0 0 0 7px color-mix(in srgb, var(--gold-light) 28%, transparent); }
  100% { transform: scale(1); box-shadow: 0 5px 12px var(--shadow-color); }
}

@media (prefers-reduced-motion: reduce) {
  .result-card:not([hidden]),
  .favorite-pulse { animation: none; }
}


/* Correção de contraste dos títulos de países no modo escuro */
html[data-theme="dark"] .country-name {
  color: var(--ink);
}


/* ---------- Suporte CSS para rolagem suave ---------- */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 72px;
}

.result-card {
  scroll-margin-top: 72px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
