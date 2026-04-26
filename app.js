
const APP_VERSION = "20.5";
const LAST_VERIFIED = "26 Apr 2026";
const DAY_ORDER = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAY_LABELS = {
  en: { "":"All days", Monday:"Monday", Tuesday:"Tuesday", Wednesday:"Wednesday", Thursday:"Thursday", Friday:"Friday", Saturday:"Saturday", Sunday:"Sunday" },
  fr: { "":"Tous les jours", Monday:"Lundi", Tuesday:"Mardi", Wednesday:"Mercredi", Thursday:"Jeudi", Friday:"Vendredi", Saturday:"Samedi", Sunday:"Dimanche" }
};
const I18N = {
  en: {
    appTitle:"Mauritius Mass Finder",
    subtitle:"Find a Mass quickly anywhere in Mauritius",
    search:"Search church, parish or locality",
    searchFilters:"Search and filters",
    sunday:"Sunday obligation",
    include:"Include other celebrations",
    near:"Next Mass near you",
    nearActive:"Nearest Masses",
    my:"My Churches",
    allResults:"All Masses",
    help:"Help",
    about:"About",
    whatsNew:"What's New",
    update:"How to update",
    source:"Source",
    directions:"Directions",
    save:"Save",
    saved:"Saved",
    remove:"Remove",
    share:"Share",
    report:"Report correction",
    mass:"Mass",
    other:"Other celebration",
    ambiguous:"Ambiguous",
    trustStrip:"48 parishes across Mauritius · Verified 26 Apr 2026",
    countMassesFound:n => `${n} Masses found`,
    emptyTitle:"No Masses found",
    emptyHint:"Try another church name, area, or day.",
    emptyMyTitle:"No saved churches yet",
    emptyMyHint:"Save a church from any result card.",
    clearFilters:"Clear filters",
    empty:"No Masses found. Try another church name, area, or day.",
    emptyMy:"No saved churches yet. Save a church from any result card.",
    approx:"approx.",
    version:"Version",
    last:"Last verified",
    vigil:"Vigil Mass",
    nonmass:"Hidden by default: not a confirmed Mass",
    refresh:"Refresh",
    newversion:"New version available",
    copied:"Copied to clipboard.",
    copyFailed:"Copy was not available on this device.",
    locRequest:"Requesting your location…",
    locReady:"Location received. Results are now sorted by distance.",
    locDenied:"Location is not available or permission was denied.",
    locUnsupported:"Location is not supported by this browser.",
    close:"Close",
    distance:"distance",
    sourceLabel:"Official source",
    reportSubject:"Mauritius Mass Finder correction",
    reportBody:"Please describe the correction needed, including the church/parish, day, time, and source if known.",
    helpBody:`<p>Use search for a church, parish, locality, or common spelling variation. Accents, apostrophes, hyphens, œ/oe, and Saint/St variations are handled automatically.</p><p>By default, only confirmed Masses are shown. Tick “Include other celebrations” only when you also want non-Mass or ambiguous entries.</p><p>Use “Sunday obligation” for Sunday Masses and row-level Saturday eligibility generated from the at-or-after-15:00 rule, except explicitly excluded special cases such as infrequent non-vigil rows.</p>`,
    aboutBody:`<p>This v20.5 release is a focused public-facing UX polish over v20.4. It improves the top trust signal, contextual result-count behaviour, and the no-results experience without changing Mass schedules, source data, coordinates, or Sunday-obligation logic.</p><p>Non-Mass and ambiguous entries remain hidden by default and can be shown with the “Include other celebrations” option.</p>`,
    whatsNewBody:`<ul><li>Public technical counters removed from the main user flow.</li><li>New bilingual trust strip added near the top of the app.</li><li>Result count now appears only when a search or narrowing filter is active.</li><li>Friendly bilingual no-results card added with simple recovery actions.</li><li>v20.4 data, search rules, and Sunday-obligation logic preserved.</li></ul>`,
    updateBody:`<p>When a new version is published, the app checks <code>version.json</code>. If an update banner appears, tap Refresh. Your saved churches should normally remain on the device.</p><p>If a phone remains stuck on an older version, close and reopen the app. On iPhone, removing and reinstalling the home-screen icon may be needed in rare stale-cache cases.</p>`
  },
  fr: {
    appTitle:"Trouver une Messe à Maurice",
    subtitle:"Trouvez rapidement une messe à Maurice",
    search:"Rechercher une église, paroisse ou localité",
    searchFilters:"Recherche et filtres",
    sunday:"Obligation dominicale",
    include:"Inclure les autres célébrations",
    near:"Prochaine messe près de vous",
    nearActive:"Messes les plus proches",
    my:"Mes églises",
    allResults:"Toutes les messes",
    help:"Aide",
    about:"À propos",
    whatsNew:"Nouveautés",
    update:"Comment mettre à jour",
    source:"Source",
    directions:"Itinéraire",
    save:"Enregistrer",
    saved:"Enregistré",
    remove:"Retirer",
    share:"Partager",
    report:"Signaler une correction",
    mass:"Messe",
    other:"Autre célébration",
    ambiguous:"Ambigu",
    trustStrip:"48 paroisses à travers l’île Maurice · Vérifié le 26 avr 2026",
    countMassesFound:n => `${n} messes trouvées`,
    emptyTitle:"Aucune messe trouvée",
    emptyHint:"Essayez un autre nom d’église, lieu ou jour.",
    emptyMyTitle:"Aucune église enregistrée",
    emptyMyHint:"Enregistrez une église depuis une fiche.",
    clearFilters:"Réinitialiser les filtres",
    empty:"Aucune messe trouvée. Essayez un autre nom d’église, lieu ou jour.",
    emptyMy:"Aucune église enregistrée pour le moment. Enregistrez une église depuis une fiche.",
    approx:"env.",
    version:"Version",
    last:"Dernière vérification",
    vigil:"Messe anticipée",
    nonmass:"Masqué par défaut : pas une messe confirmée",
    refresh:"Actualiser",
    newversion:"Nouvelle version disponible",
    copied:"Copié dans le presse-papiers.",
    copyFailed:"La copie n’est pas disponible sur cet appareil.",
    locRequest:"Demande de votre position…",
    locReady:"Position reçue. Les résultats sont maintenant triés par distance.",
    locDenied:"La position n’est pas disponible ou l’autorisation a été refusée.",
    locUnsupported:"La localisation n’est pas prise en charge par ce navigateur.",
    close:"Fermer",
    distance:"distance",
    sourceLabel:"Source officielle",
    reportSubject:"Correction Mauritius Mass Finder",
    reportBody:"Veuillez décrire la correction à faire, avec l’église/la paroisse, le jour, l’heure et la source si possible.",
    helpBody:`<p>Utilisez la recherche pour trouver une église, une paroisse, une localité ou une variante courante. Les accents, apostrophes, traits d’union, œ/oe et variantes Saint/St sont gérés automatiquement.</p><p>Par défaut, seules les messes confirmées sont affichées. Cochez « Inclure les autres célébrations » seulement si vous voulez aussi voir les entrées non confirmées comme messes.</p><p>Utilisez « Obligation dominicale » pour les messes du dimanche et les messes du samedi à partir de 15h00, sauf cas spécial explicitement exclu.</p>`,
    aboutBody:`<p>Cette v20.5 est une amélioration UX ciblée par rapport à v20.4. Elle améliore le signal de confiance en haut de l’application, le compteur contextuel des résultats et l’affichage lorsqu’aucune messe n’est trouvée, sans changer les horaires, les sources, les coordonnées ou la logique d’obligation dominicale.</p><p>Les célébrations non-messes et les entrées ambiguës restent masquées par défaut et peuvent être affichées avec « Inclure les autres célébrations ».</p>`,
    whatsNewBody:`<ul><li>Les compteurs techniques visibles ont été retirés du parcours principal.</li><li>Ajout d’un bandeau de confiance bilingue près du haut de l’application.</li><li>Le nombre de résultats s’affiche seulement lorsqu’une recherche ou un filtre restrictif est actif.</li><li>Ajout d’un message bilingue plus clair lorsqu’aucun résultat n’est trouvé.</li><li>Les données, règles de recherche et règles d’obligation dominicale de v20.4 sont conservées.</li></ul>`,
    updateBody:`<p>Quand une nouvelle version est publiée, l’application vérifie <code>version.json</code>. Si une bannière apparaît, appuyez sur Actualiser. Vos églises enregistrées restent normalement sur l’appareil.</p><p>Si un téléphone reste bloqué sur une ancienne version, fermez puis rouvrez l’application. Sur iPhone, il peut parfois être nécessaire de supprimer puis réinstaller l’icône de l’écran d’accueil.</p>`
  }
};

let state = {
  lang: localStorage.getItem("mmf_lang") || "en",
  allRows: [],
  query: "",
  day: "",
  sunday: false,
  includeOther: false,
  position: null,
  nearMode: false,
  view: "all",
  favs: JSON.parse(localStorage.getItem("mmf_favs") || "[]")
};

function t(k){ return (I18N[state.lang] && I18N[state.lang][k]) || I18N.en[k] || k; }
function esc(s){ return String(s ?? "").replace(/[&<>"']/g, m => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[m])); }
function normalize(s){
  return String(s || "")
    .toLowerCase()
    .replace(/[œŒ]/g, "oe")
    .replace(/[æÆ]/g, "ae")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019\u02bc'`´]/g, " ")
    .replace(/[\-‐‑‒–—―]/g, " ")
    .replace(/\bst\.?\b/g, "saint")
    .replace(/\bste\.?\b/g, "sainte")
    .replace(/\s+/g, " ")
    .trim();
}
const STOP = new Set(["the","a","an","de","du","la","le","les","des","and","or"]);
function tokens(q){ return normalize(q).split(" ").filter(x => x && !STOP.has(x)); }
function rowText(r){ return r.normalized_search_text || normalize([r.region,r.locality,r.parish,r.parish_label,r.site,r.qualifier,r.special_rule,r.language,r.notes,r.directions_query].join(" ")); }
function hasCoords(r){ return Number.isFinite(Number(r.latitude)) && Number.isFinite(Number(r.longitude)); }
function haversineKm(lat1, lon1, lat2, lon2){
  const R = 6371;
  const toRad = d => Number(d) * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function distanceFor(r){
  if(!state.position || !hasCoords(r)) return null;
  return haversineKm(state.position.latitude, state.position.longitude, Number(r.latitude), Number(r.longitude));
}
function baseFilteredRows(){
  const toks = tokens(state.query);
  if(state.query.trim() && toks.length === 0) return [];
  const favSet = new Set(state.favs);
  return state.allRows.filter(r => {
    if(state.view === "my" && !favSet.has(r.site_id)) return false;
    if(!state.includeOther && !r.is_mass_only_visible) return false;
    if(state.day && r.day !== state.day) return false;
    if(state.sunday && !r.sunday_obligation_eligible) return false;
    if(toks.length && !toks.every(tok => rowText(r).includes(tok))) return false;
    return true;
  });
}
function visibleRows(){
  const list = baseFilteredRows().map(r => ({...r, _distance: distanceFor(r)}));
  if(state.nearMode && state.position){
    return list.sort((a,b) => {
      const da = a._distance ?? Infinity;
      const db = b._distance ?? Infinity;
      if(da !== db) return da - db;
      return DAY_ORDER.indexOf(a.day)-DAY_ORDER.indexOf(b.day) || a.time.localeCompare(b.time) || a.site.localeCompare(b.site);
    });
  }
  return list.sort((a,b) => DAY_ORDER.indexOf(a.day)-DAY_ORDER.indexOf(b.day) || a.time.localeCompare(b.time) || a.site.localeCompare(b.site));
}
function badge(r){
  if(r.mass_category === "mass" && (r.vigil_status === "confirmed_vigil" || r.vigil_status === "rule_based_eligible")) return `<span class="badge vigil" aria-label="${esc(t("vigil"))}">${esc(t("vigil"))}</span>`;
  if(r.mass_category === "other_celebration") return `<span class="badge other">${esc(t("other"))}</span>`;
  if(r.mass_category === "ambiguous") return `<span class="badge ambiguous">${esc(t("ambiguous"))}</span>`;
  return `<span class="badge">${esc(t("mass"))}</span>`;
}
function distanceBadge(r){
  if(r._distance == null) return "";
  const approx = r.coordinate_precision === "exact_church" ? "" : "~";
  const label = `${approx}${r._distance.toFixed(r._distance < 10 ? 1 : 0)} km`;
  return `<span class="distance" aria-label="${esc(t("distance"))}: ${esc(label)}">${esc(label)}</span>`;
}
function sourceBasis(r){
  return (r.vigil_status === "confirmed_vigil" || r.vigil_status === "rule_based_eligible") && r.vigil_source_basis ? `<span class="basis">${esc(r.vigil_source_basis)}</span>` : "";
}
function renderDayOptions(){
  const day = document.getElementById("day");
  day.innerHTML = ["", ...DAY_ORDER].map(d => `<option value="${esc(d)}"${state.day === d ? " selected" : ""}>${esc(DAY_LABELS[state.lang][d])}</option>`).join("");
  day.setAttribute("aria-label", DAY_LABELS[state.lang][""]);
}
function render(){
  document.documentElement.lang = state.lang;
  document.getElementById("title").textContent = t("appTitle");
  document.getElementById("subtitle").textContent = t("subtitle");
  document.getElementById("search").placeholder = t("search");
  document.querySelector(".controls").setAttribute("aria-label", t("searchFilters"));
  document.getElementById("includeLabel").textContent = t("include");
  document.getElementById("sundayBtn").textContent = t("sunday");
  document.getElementById("nearBtn").textContent = state.nearMode ? t("nearActive") : t("near");
  document.getElementById("myBtn").textContent = state.view === "my" ? t("allResults") : t("my");
  document.getElementById("helpBtn").textContent = t("help");
  document.getElementById("aboutBtn").textContent = t("about");
  document.getElementById("whatsNewBtn").textContent = t("whatsNew");
  document.getElementById("updateBtn").textContent = t("update");
  document.getElementById("version").textContent = `${t("version")} ${APP_VERSION} · ${t("last")} ${LAST_VERIFIED}`;
  document.getElementById("langBtn").textContent = state.lang === "en" ? "Français" : "English";
  document.getElementById("sundayBtn").classList.toggle("active", state.sunday);
  document.getElementById("nearBtn").classList.toggle("active", state.nearMode);
  document.getElementById("myBtn").classList.toggle("active", state.view === "my");
  renderDayOptions();

  const list = visibleRows();
  document.getElementById("trustStrip").textContent = t("trustStrip");
  const resultCount = document.getElementById("resultCount");
  const isNarrowed = Boolean(state.query.trim() || state.day || state.sunday || state.view === "my");
  if(isNarrowed){
    resultCount.textContent = t("countMassesFound")(list.length);
    resultCount.hidden = false;
  } else {
    resultCount.textContent = "";
    resultCount.hidden = true;
  }

  const container = document.getElementById("results");
  if(!list.length){
    const isMy = state.view === "my";
    container.innerHTML = `<div class="empty-card" role="status">
      <h2>${esc(isMy ? t("emptyMyTitle") : t("emptyTitle"))}</h2>
      <p>${esc(isMy ? t("emptyMyHint") : t("emptyHint"))}</p>
      <div class="empty-actions">
        <button type="button" onclick="clearFilters()">${esc(t("clearFilters"))}</button>
        <button type="button" onclick="activateNearMe()">${esc(t("near"))}</button>
        <button type="button" onclick="showAllMasses()">${esc(t("allResults"))}</button>
      </div>
    </div>`;
    return;
  }
  const favSet = new Set(state.favs);
  container.innerHTML = list.map(r => {
    const fav = favSet.has(r.site_id);
    const notes = [r.qualifier, r.special_rule, r.frequency_rule, r.language, r.notes].filter(Boolean);
    return `<article class="card">
      <div class="time">${esc(DAY_LABELS[state.lang][r.day] || r.day)} ${esc(r.time)} ${badge(r)} ${distanceBadge(r)}</div>
      <h2>${esc(r.display_title || r.site)}</h2>
      <p class="sub">${esc(r.display_subtitle || [r.parish_label,r.locality,r.region].filter(Boolean).join(" · "))}</p>
      ${notes.length ? `<p class="note">${esc([...new Set(notes)].join(" · "))}</p>` : ""}
      ${sourceBasis(r)}
      ${!r.is_mass_only_visible ? `<p class="warn">${esc(t("nonmass"))}</p>` : ""}
      <div class="actions">
        <a aria-label="${esc(t("directions"))} ${esc(r.site)}" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.directions_query || `${r.site}, ${r.locality}, Mauritius`)}" target="_blank" rel="noopener">${esc(t("directions"))}</a>
        <a aria-label="${esc(t("sourceLabel"))} ${esc(r.site)}" href="${esc(r.source_url)}" target="_blank" rel="noopener">${esc(t("source"))}</a>
        <button aria-label="${esc(fav ? t("remove") : t("save"))} ${esc(r.site)}" onclick="toggleFav('${esc(r.site_id)}')">${esc(fav ? t("saved") : t("save"))}</button>
        <button aria-label="${esc(t("share"))} ${esc(r.site)}" onclick="shareRow('${esc(r.row_id)}')">${esc(t("share"))}</button>
        <a aria-label="${esc(t("report"))} ${esc(r.site)}" href="${reportHref(r)}">${esc(t("report"))}</a>
      </div>
    </article>`;
  }).join("");
}
function toggleFav(siteId){
  const set = new Set(state.favs);
  if(set.has(siteId)) set.delete(siteId); else set.add(siteId);
  state.favs = [...set];
  localStorage.setItem("mmf_favs", JSON.stringify(state.favs));
  render();
}
function reportHref(r){
  const subject = encodeURIComponent(t("reportSubject"));
  const body = encodeURIComponent(`${t("reportBody")}\n\n${r.site} — ${r.parish_label || r.parish}\n${r.day} ${r.time}\n${r.source_url}`);
  return `mailto:?subject=${subject}&body=${body}`;
}
async function shareRow(id){
  const r = state.allRows.find(x => x.row_id === id);
  if(!r) return;
  const text = `${r.site} — ${DAY_LABELS[state.lang][r.day] || r.day} ${r.time}, ${r.locality}. ${r.source_url}`;
  try{
    if(navigator.share) await navigator.share({text});
    else if(navigator.clipboard) { await navigator.clipboard.writeText(text); notify(t("copied")); }
    else notify(t("copyFailed"));
  }catch(e){}
}
function notify(message){
  const el = document.getElementById("notice");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(notify._timer);
  notify._timer = setTimeout(() => { el.hidden = true; }, 3500);
}
function openModal(title, body){
  const m = document.getElementById("modal");
  m.innerHTML = `<div class="modalbox" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button class="close" onclick="closeModal()" aria-label="${esc(t("close"))}">×</button>
    <h2 id="modalTitle">${esc(title)}</h2>
    <div>${body}</div>
  </div>`;
  m.hidden = false;
  const close = m.querySelector(".close");
  close.focus();
}
function closeModal(){ document.getElementById("modal").hidden = true; }
window.addEventListener("keydown", e => {
  if(e.key === "Escape") closeModal();
  const modal = document.getElementById("modal");
  if(e.key === "Tab" && !modal.hidden){
    const focusables = [...modal.querySelectorAll("button,a,input,select,textarea,[tabindex]:not([tabindex='-1'])")];
    if(!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
    if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
  }
});
function debounce(fn, delay = 150){
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const debouncedSearchRender = debounce(value => {
  state.query = value;
  render();
}, 150);
function clearFilters(){
  state.query = "";
  state.day = "";
  state.sunday = false;
  state.includeOther = false;
  state.view = "all";
  state.nearMode = false;
  const search = document.getElementById("search");
  if(search) search.value = "";
  const include = document.getElementById("include");
  if(include) include.checked = false;
  render();
}
function showAllMasses(){
  clearFilters();
}
function activateNearMe(){
  const near = document.getElementById("nearBtn");
  if(near) near.click();
}

function setup(){
  document.getElementById("search").oninput = e => { debouncedSearchRender(e.target.value); };
  document.getElementById("search").onsearch = e => { state.query = e.target.value; render(); };
  document.getElementById("search").onkeydown = e => { if(e.key === "Enter"){ state.query = e.target.value; render(); } };
  document.getElementById("day").onchange = e => { state.day = e.target.value; render(); };
  document.getElementById("include").onchange = e => { state.includeOther = e.target.checked; render(); };
  document.getElementById("sundayBtn").onclick = () => { state.sunday = !state.sunday; render(); };
  document.getElementById("langBtn").onclick = () => { state.lang = state.lang === "en" ? "fr" : "en"; localStorage.setItem("mmf_lang", state.lang); render(); };
  document.getElementById("myBtn").onclick = () => { state.view = state.view === "my" ? "all" : "my"; render(); };
  document.getElementById("nearBtn").onclick = () => {
    if(!navigator.geolocation){ notify(t("locUnsupported")); return; }
    notify(t("locRequest"));
    navigator.geolocation.getCurrentPosition(
      p => { state.position = { latitude:p.coords.latitude, longitude:p.coords.longitude }; state.day = ""; state.nearMode = true; notify(t("locReady")); render(); },
      () => { state.nearMode = false; notify(t("locDenied")); render(); },
      { enableHighAccuracy:false, timeout:10000, maximumAge:300000 }
    );
  };
  document.getElementById("helpBtn").onclick = () => openModal(t("help"), t("helpBody"));
  document.getElementById("aboutBtn").onclick = () => openModal(t("about"), t("aboutBody"));
  document.getElementById("whatsNewBtn").onclick = () => openModal(t("whatsNew"), t("whatsNewBody"));
  document.getElementById("updateBtn").onclick = () => openModal(t("update"), t("updateBody"));
}
async function loadData(){
  let data = null;
  try{
    const res = await fetch("data/masses.json", {cache:"no-store"});
    if(res.ok) data = await res.json();
  }catch(e){}
  if(!data && window.MMF_FALLBACK_DATA) data = window.MMF_FALLBACK_DATA;
  state.allRows = (data && data.rows) || [];
  setup();
  render();
  checkVersion();
}
async function checkVersion(){
  try{
    const res = await fetch(`version.json?v=${Date.now()}`, {cache:"no-store"});
    if(!res.ok) return;
    const v = await res.json();
    if(v.version && String(v.version) !== APP_VERSION){
      const bar = document.getElementById("updateBanner");
      bar.innerHTML = `${esc(t("newversion"))} <button onclick="location.reload()">${esc(t("refresh"))}</button>`;
      bar.hidden = false;
    }
  }catch(e){}
}
loadData();
if("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
