
const APP_VERSION = "20.9";
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
    quickTitle:"What do you need?",
    quickHint:"One tap. No typing.",
    qaNowTitle:"Find a Mass now",
    qaNowText:"Show available Masses quickly.",
    qaNearTitle:"Near me",
    qaNearText:"Use your location and sort nearby results.",
    qaSundayTitle:"Sunday obligation",
    qaSundayText:"Show Sunday Masses and eligible Saturday Vigil Masses.",
    qaMyTitle:"My Churches",
    qaMyText:"Open your saved churches quickly.",
    navHome:"Home",
    navSearch:"Search",
    navNear:"Near me",
    navFav:"My Churches",
    navMore:"More",
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
    helpBody:`<p>Use search for a church, parish, locality, or common spelling variation. Accents, apostrophes, hyphens, œ/oe, and Saint/St variations are handled automatically.</p><p>By default, only confirmed Masses are shown. Tick “Include other celebrations” only when you also want non-Mass or ambiguous entries.</p><p>Use “Sunday obligation” for Sunday Masses and all Saturday Masses from 15:30 onward.</p>`,
    aboutBody:`<p>This v20.9 release restores the v17.2-style More / Help / FAQ / About support centre while preserving the v20.7 visual restoration. Sunday-obligation logic was updated: all Saturday Masses at or after 15:30 are treated as Sunday Vigil eligible.</p>`,
    whatsNewBody:`<ul><li>Preserved the v17.2-style bottom support section restored in v20.8.</li><li>Preserved the formatted quick-action cards.</li><li>Service-worker migration hotfix retained for users upgrading from older installed versions.</li><li>Legacy <code>sw.js</code> is now handled safely so old cached app files can be cleared.</li><li>v20.5 trust strip, contextual result count, and empty-state UX preserved.</li><li>Sunday-obligation logic now treats all Saturday Masses at or after 15:30 as Sunday Vigil eligible.</li></ul>`,
    updateBody:`<p>When a new version is published, the app checks <code>version.json</code>. If an update banner appears, tap Refresh. The app now clears stale caches more aggressively before reloading.</p><p>Your saved churches should normally remain on the device because they are stored separately from the app files.</p>`,
    supportTitle:"Help, FAQ and app information",
    supportIntro:"Use this section as a mini user guide. It explains how to search, update, save churches, use location, and check the source information.",
    faq:"FAQ",
    footerNote:"Sources are linked on each result. Always verify special services directly with the parish when timing is critical.",
    helpPanelBody:'<h3>Quick Start</h3><ol><li>Search by church, parish, town, or region.</li><li>Use Near Me to find nearby churches.</li><li>Save churches with Save to keep them in My Churches.</li><li>Tap Directions for Google Maps.</li><li>Tap Refresh / Update when a new version appears.</li></ol><h3>Features explained</h3><h4>Search</h4><p>Search is accent-insensitive and works with church, parish, town, region, Saint/St variations, apostrophes and hyphens.</p><h4>Sunday obligation</h4><p>Sunday obligation mode shows Sunday Masses and all Saturday Masses from 15:30 onward. Check each result badge and source where timing is important.</p><h4>Near Me and distances</h4><p>Near Me uses your device location to sort churches by distance. Some coordinates are locality-based, so distances marked with ~ are approximate.</p><h4>Next Mass near you</h4><p>This quick action looks for upcoming Masses and prioritises nearby results when location is available.</p><h4>My Churches</h4><p>Tap Save to keep a church in My Churches. Tap Saved again to remove it.</p><h4>Reading result cards</h4><p>Each card shows day, time, church or chapel, parish/location, special notes, source, directions, save, share and correction options.</p><h4>Report correction</h4><p>On any result, tap Report correction. The app prepares the church, parish, day, time and source details so you can send the correction easily.</p>',
    faqPanelBody:'<h3>Frequently asked questions</h3><h4>How do I install it on iPhone?</h4><p>Open the app link in Safari, tap the Share icon, then tap Add to Home Screen.</p><h4>How do I install it on Android?</h4><p>Open the app link in Chrome, tap the menu, then tap Add to Home screen or Install app.</p><h4>How do I update the app?</h4><p>Tap Refresh / Update when the banner appears. If the old version remains, close the app completely and reopen it. On iPhone, if it is still stuck, remove the home-screen shortcut and install it again from the latest link.</p><h4>Why do I see Saturday evening Masses when looking for Sunday?</h4><p>Because confirmed Saturday Vigil Masses may count for the Sunday obligation. The app tries to show this clearly.</p><h4>Why are some distances approximate?</h4><p>Some churches use locality-level coordinates rather than exact church-door coordinates. Approximate distances are marked with ~.</p><h4>Why can’t I find nearby churches?</h4><p>Location access may be disabled, blocked by the browser, or unavailable on your device. You can still search by town, parish, or church name.</p><h4>What does “Other celebrations” mean?</h4><p>These may include celebrations, prayer services, adoration, or ambiguous entries that are not confirmed Masses. Masses remain the default.</p><h4>Why might a Mass time be wrong?</h4><p>Schedules can change for feast days, funerals, cyclones, public holidays, or recent parish changes. Use the source link or report a correction.</p>',
    aboutPanelBody:'<p>A simple Catholic Mass finder for Mauritius, built for fast mobile use. It is designed to help people find Masses quickly, save churches, get directions, and verify source information.</p><p>The app uses diocesan/parish source information where available. Times can still change, so source links and correction reporting remain important.</p><p>This v20.9 release restores the v17.2-style bottom Help / FAQ / About / Latest Version support centre while preserving the v20.7 visual restoration.</p>',
    whatsNewPanelBody:'<ul><li>Restored the v17.2-style More button behaviour: More scrolls to the bottom support section.</li><li>Restored Help / Aide as a practical user guide.</li><li>Restored FAQ / Questions fréquentes.</li><li>Restored About / À propos.</li><li>Restored Latest Version / Dernière version content and visible version number.</li><li>Preserved v20.7 quick action cards, bottom navigation band, search, data, PWA and update fixes.</li><li>Sunday-obligation data now treats all Saturday Masses at or after 15:30 as Sunday Vigil eligible.</li></ul>',
    updatePanelBody:'<h3>How to update the app</h3><ol><li>Open the app.</li><li>If the “New version available” banner appears, tap Refresh.</li><li>If the app does not update, close it completely and reopen it.</li><li>On iPhone, swipe up and close the app from the app switcher, then reopen it.</li><li>If it is still stuck on an old version, remove the home-screen shortcut and install it again from the latest link.</li></ol><p>Your saved churches should normally remain saved because they are stored separately from the app files.</p>'
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
    quickTitle:"Que cherchez-vous ?",
    quickHint:"Un geste. Sans taper.",
    qaNowTitle:"Trouver une messe maintenant",
    qaNowText:"Afficher rapidement les messes disponibles.",
    qaNearTitle:"Près de moi",
    qaNearText:"Utiliser votre position et trier les résultats proches.",
    qaSundayTitle:"Obligation dominicale",
    qaSundayText:"Afficher les messes du dimanche et les messes anticipées éligibles.",
    qaMyTitle:"Mes églises",
    qaMyText:"Ouvrir rapidement vos églises enregistrées.",
    navHome:"Accueil",
    navSearch:"Recherche",
    navNear:"Près de moi",
    navFav:"Mes églises",
    navMore:"Plus",
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
    helpBody:`<p>Utilisez la recherche pour trouver une église, une paroisse, une localité ou une variante courante. Les accents, apostrophes, traits d’union, œ/oe et variantes Saint/St sont gérés automatiquement.</p><p>Par défaut, seules les messes confirmées sont affichées. Cochez « Inclure les autres célébrations » seulement si vous voulez aussi voir les entrées non confirmées comme messes.</p><p>Utilisez « Obligation dominicale » pour les messes du dimanche et toutes les messes du samedi à partir de 15h30.</p>`,
    aboutBody:`<p>Cette version v20.9 rétablit le centre d’aide Plus / Aide / FAQ / À propos au style v17.2 tout en conservant la restauration visuelle de v20.7. La logique d’obligation dominicale a été mise à jour : toutes les messes du samedi à partir de 15h30 sont traitées comme messes anticipées éligibles.</p>`,
    whatsNewBody:`<ul><li>Rétablissement du bandeau de navigation inférieur au style v17.2.</li><li>Rétablissement des cartes d’actions rapides formatées.</li><li>Correctif de migration du service worker conservé pour les utilisateurs venant d’anciennes versions installées.</li><li>L’ancien <code>sw.js</code> est maintenant géré afin de supprimer les anciens fichiers en cache.</li><li>Le bandeau de confiance, le compteur contextuel et l’état sans résultat de v20.5 sont conservés.</li><li>La logique d’obligation dominicale traite maintenant toutes les messes du samedi à partir de 15h30 comme messes anticipées éligibles.</li></ul>`,
    updateBody:`<p>Quand une nouvelle version est publiée, l’application vérifie <code>version.json</code>. Si une bannière apparaît, appuyez sur Actualiser. L’application supprime maintenant les anciens caches de manière plus active avant de se recharger.</p><p>Vos églises enregistrées restent normalement sur l’appareil, car elles sont stockées séparément des fichiers de l’application.</p>`,
    supportTitle:"Aide, FAQ et informations sur l’application",
    supportIntro:"Utilisez cette section comme mini guide d’utilisation. Elle explique comment rechercher, mettre à jour, enregistrer des églises, utiliser la localisation et vérifier les sources.",
    faq:"FAQ",
    footerNote:"Les sources sont indiquées sur chaque résultat. Vérifiez toujours les services spéciaux directement avec la paroisse lorsque l’horaire est important.",
    helpPanelBody:'<h3>Démarrage rapide</h3><ol><li>Recherchez par église, paroisse, localité ou région.</li><li>Utilisez Près de moi pour trouver les églises proches.</li><li>Appuyez sur Enregistrer pour garder une église dans Mes églises.</li><li>Appuyez sur Itinéraire pour ouvrir Google Maps.</li><li>Appuyez sur Actualiser / Mettre à jour quand une nouvelle version apparaît.</li></ol><h3>Fonctions expliquées</h3><h4>Recherche</h4><p>La recherche fonctionne avec ou sans accents et accepte les noms d’église, de paroisse, de localité, de région, ainsi que les variantes Saint/St, apostrophes et traits d’union.</p><h4>Obligation dominicale</h4><p>Le mode obligation dominicale affiche les messes du dimanche et toutes les messes du samedi à partir de 15h30. Vérifiez le badge et la source quand l’horaire est important.</p><h4>Près de moi et distances</h4><p>Près de moi utilise la position de votre appareil pour trier les églises par distance. Certaines coordonnées sont approximatives par localité ; les distances avec ~ sont donc approximatives.</p><h4>Prochaine messe près de vous</h4><p>Cette action rapide cherche les prochaines messes et met en avant les résultats proches lorsque la localisation est disponible.</p><h4>Mes églises</h4><p>Appuyez sur Enregistrer pour garder une église dans Mes églises. Appuyez sur Enregistré pour la retirer.</p><h4>Lire les fiches de résultat</h4><p>Chaque fiche affiche le jour, l’heure, l’église ou chapelle, la paroisse/localité, les notes spéciales, la source, l’itinéraire, l’enregistrement, le partage et le signalement de correction.</p><h4>Signaler une correction</h4><p>Sur un résultat, appuyez sur Signaler une correction. L’application prépare l’église, la paroisse, le jour, l’heure et la source pour faciliter l’envoi.</p>',
    faqPanelBody:'<h3>Questions fréquentes</h3><h4>Comment l’installer sur iPhone ?</h4><p>Ouvrez le lien de l’application dans Safari, touchez l’icône Partager, puis touchez Sur l’écran d’accueil.</p><h4>Comment l’installer sur Android ?</h4><p>Ouvrez le lien de l’application dans Chrome, touchez le menu, puis Ajouter à l’écran d’accueil ou Installer l’application.</p><h4>Comment mettre l’application à jour ?</h4><p>Appuyez sur Actualiser / Mettre à jour lorsque la bannière apparaît. Si l’ancienne version reste affichée, fermez complètement l’application puis rouvrez-la. Sur iPhone, si elle reste bloquée, supprimez le raccourci de l’écran d’accueil et réinstallez-le avec le dernier lien.</p><h4>Pourquoi est-ce que je vois des messes du samedi soir quand je cherche le dimanche ?</h4><p>Parce que les messes anticipées confirmées du samedi soir peuvent compter pour l’obligation dominicale. L’application essaie de l’indiquer clairement.</p><h4>Pourquoi certaines distances sont-elles approximatives ?</h4><p>Certaines églises utilisent des coordonnées par localité plutôt que des coordonnées exactes à la porte de l’église. Les distances approximatives sont indiquées avec ~.</p><h4>Pourquoi est-ce que je ne trouve pas d’églises proches ?</h4><p>L’accès à la localisation peut être désactivé, bloqué par le navigateur ou indisponible sur votre appareil. Vous pouvez toujours rechercher par localité, paroisse ou nom d’église.</p><h4>Que signifie « Autres célébrations » ?</h4><p>Il peut s’agir de célébrations, prières, adorations ou entrées ambiguës qui ne sont pas confirmées comme messes. Les messes restent affichées par défaut.</p><h4>Pourquoi un horaire peut-il être incorrect ?</h4><p>Les horaires peuvent changer pour les fêtes, funérailles, cyclones, jours fériés ou changements paroissiaux récents. Utilisez le lien source ou signalez une correction.</p>',
    aboutPanelBody:'<p>Une application simple pour trouver une messe catholique à Maurice, conçue pour un usage rapide sur téléphone. Elle aide à trouver une messe, enregistrer des églises, obtenir un itinéraire et vérifier les sources.</p><p>L’application utilise les informations diocésaines ou paroissiales disponibles. Les horaires peuvent toutefois changer ; les liens source et le signalement de correction restent donc importants.</p><p>Cette version v20.9 rétablit le centre d’aide inférieur de style v17.2 : Aide / FAQ / À propos / Dernière version, tout en conservant la restauration visuelle de v20.7.</p>',
    whatsNewPanelBody:'<ul><li>Rétablissement du comportement v17.2 du bouton Plus : Plus amène à la section d’aide en bas de l’application.</li><li>Rétablissement de l’Aide comme guide pratique d’utilisation.</li><li>Rétablissement de la FAQ / Questions fréquentes.</li><li>Rétablissement de À propos.</li><li>Rétablissement de la section Dernière version et du numéro de version visible.</li><li>Conservation des cartes d’action rapide, du bandeau inférieur, de la recherche, des données, du PWA et des correctifs de mise à jour de v20.7.</li><li>La logique d’obligation dominicale traite maintenant toutes les messes du samedi à partir de 15h30 comme messes anticipées éligibles.</li></ul>',
    updatePanelBody:'<h3>Comment mettre l’application à jour</h3><ol><li>Ouvrez l’application.</li><li>Si la bannière « Nouvelle version disponible » apparaît, appuyez sur Actualiser.</li><li>Si l’application ne se met pas à jour, fermez-la complètement puis rouvrez-la.</li><li>Sur iPhone, fermez l’application depuis le sélecteur d’applications, puis rouvrez-la.</li><li>Si l’ancienne version reste bloquée, supprimez le raccourci de l’écran d’accueil et réinstallez-le avec le dernier lien.</li></ol><p>Vos églises enregistrées devraient normalement rester sauvegardées, car elles sont stockées séparément des fichiers de l’application.</p>'
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
function setText(id, value){ const el=document.getElementById(id); if(el) el.textContent=value; }
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
function updateBottomNavActive(active){
  const id = active || (state.nearMode ? "navNear" : state.view === "my" ? "navFav" : "navHome");
  document.querySelectorAll(".navBtn").forEach(btn => btn.classList.toggle("active", btn.id === id));
}
function scrollToSelector(selector){ document.querySelector(selector)?.scrollIntoView({behavior:"smooth", block:"start"}); }
function showNow(){ state.query=""; state.day=""; state.sunday=false; state.view="all"; state.nearMode=false; const search=document.getElementById("search"); if(search) search.value=""; render(); updateBottomNavActive("navHome"); scrollToSelector("#results"); }
function renderDayOptions(){
  const day = document.getElementById("day");
  day.innerHTML = ["", ...DAY_ORDER].map(d => `<option value="${esc(d)}"${state.day === d ? " selected" : ""}>${esc(DAY_LABELS[state.lang][d])}</option>`).join("");
  day.setAttribute("aria-label", DAY_LABELS[state.lang][""]);
}
function renderSupport(){
  setText("supportTitle", t("supportTitle"));
  setText("supportIntroText", t("supportIntro"));
  setText("helpPanelTitle", t("help"));
  setText("faqPanelTitle", t("faq"));
  setText("aboutPanelTitle", t("about"));
  setText("whatsNewPanelTitle", t("whatsNew"));
  setText("updatePanelTitle", t("update"));
  const help=document.getElementById("helpPanelBody"); if(help) help.innerHTML=t("helpPanelBody");
  const faq=document.getElementById("faqPanelBody"); if(faq) faq.innerHTML=t("faqPanelBody");
  const about=document.getElementById("aboutPanelBody"); if(about) about.innerHTML=t("aboutPanelBody");
  const wn=document.getElementById("whatsNewPanelBody"); if(wn) wn.innerHTML=t("whatsNewPanelBody");
  const up=document.getElementById("updatePanelBody"); if(up) up.innerHTML=t("updatePanelBody");
  setText("aboutVersionLabel", t("version"));
  setText("aboutVersion", APP_VERSION);
  setText("footerNote", t("footerNote"));
}
function render(){
  document.documentElement.lang = state.lang;
  document.getElementById("title").textContent = t("appTitle");
  document.getElementById("subtitle").textContent = t("subtitle");
  document.getElementById("search").placeholder = t("search");
  document.querySelector(".controls").setAttribute("aria-label", t("searchFilters"));
  document.getElementById("includeLabel").textContent = t("include");
  document.getElementById("sundayBtn").textContent = t("sunday");
  setText("quickTitle", t("quickTitle"));
  setText("quickHint", t("quickHint"));
  setText("qaNowTitle", t("qaNowTitle"));
  setText("qaNowText", t("qaNowText"));
  setText("qaNearTitle", state.nearMode ? t("nearActive") : t("qaNearTitle"));
  setText("qaNearText", t("qaNearText"));
  setText("qaSundayTitle", t("qaSundayTitle"));
  setText("qaSundayText", t("qaSundayText"));
  setText("qaMyTitle", state.view === "my" ? t("allResults") : t("qaMyTitle"));
  setText("qaMyText", t("qaMyText"));
  setText("navHomeLabel", t("navHome"));
  setText("navSearchLabel", t("navSearch"));
  setText("navNearLabel", t("navNear"));
  setText("navFavLabel", t("navFav"));
  setText("navMoreLabel", t("navMore"));
  document.querySelector(".bottomNav")?.setAttribute("aria-label", state.lang === "fr" ? "Navigation principale" : "Main navigation");
  document.getElementById("helpBtn").textContent = t("help");
  document.getElementById("aboutBtn").textContent = t("about");
  document.getElementById("whatsNewBtn").textContent = t("whatsNew");
  document.getElementById("updateBtn").textContent = t("update");
  document.getElementById("version").textContent = `${t("version")} ${APP_VERSION} · ${t("last")} ${LAST_VERIFIED}`;
  renderSupport();
  document.getElementById("langBtn").textContent = state.lang === "en" ? "Français" : "English";
  document.getElementById("sundayBtn").classList.toggle("active", state.sunday);
  document.getElementById("qaSunday")?.classList.toggle("active", state.sunday);
  document.getElementById("nearBtn").classList.toggle("active", state.nearMode);
  document.getElementById("myBtn").classList.toggle("active", state.view === "my");
  updateBottomNavActive();
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
  document.getElementById("sundayBtn").onclick = () => { state.sunday = !state.sunday; state.nearMode=false; state.view="all"; render(); };
  document.getElementById("qaSunday").onclick = () => { state.sunday = true; state.nearMode=false; state.view="all"; state.day=""; render(); updateBottomNavActive("navHome"); scrollToSelector("#results"); };
  document.getElementById("qaNow").onclick = showNow;
  document.getElementById("langBtn").onclick = () => { state.lang = state.lang === "en" ? "fr" : "en"; localStorage.setItem("mmf_lang", state.lang); render(); };
  document.getElementById("myBtn").onclick = () => { state.view = state.view === "my" ? "all" : "my"; state.nearMode=false; render(); updateBottomNavActive(state.view === "my" ? "navFav" : "navHome"); scrollToSelector("#results"); };
  document.getElementById("nearBtn").onclick = () => {
    if(!navigator.geolocation){ notify(t("locUnsupported")); return; }
    state.query = "";
    state.day = "";
    state.sunday = false;
    state.view = "all";
    const search = document.getElementById("search");
    if(search) search.value = "";
    notify(t("locRequest"));
    navigator.geolocation.getCurrentPosition(
      p => { state.position = { latitude:p.coords.latitude, longitude:p.coords.longitude }; state.nearMode = true; updateBottomNavActive("navNear"); notify(t("locReady")); render(); },
      () => { state.nearMode = false; notify(t("locDenied")); render(); },
      { enableHighAccuracy:false, timeout:10000, maximumAge:300000 }
    );
  };
  document.getElementById("helpBtn").onclick = () => { document.getElementById("helpPanel").open = true; scrollToSelector("#supportCenter"); };
  document.getElementById("aboutBtn").onclick = () => { document.getElementById("aboutPanel").open = true; scrollToSelector("#aboutPanel"); };
  document.getElementById("whatsNewBtn").onclick = () => { document.getElementById("whatsNewPanel").open = true; scrollToSelector("#whatsNewPanel"); };
  document.getElementById("updateBtn").onclick = () => { document.getElementById("updatePanel").open = true; scrollToSelector("#updatePanel"); };
  document.getElementById("navHome")?.addEventListener("click",()=>{showNow(); updateBottomNavActive("navHome");});
  document.getElementById("navSearch")?.addEventListener("click",()=>{updateBottomNavActive("navSearch"); scrollToSelector(".controls"); setTimeout(()=>document.getElementById("search")?.focus(),250);});
  document.getElementById("navNear")?.addEventListener("click",()=>{updateBottomNavActive("navNear"); document.getElementById("nearBtn")?.click();});
  document.getElementById("navFav")?.addEventListener("click",()=>{if(state.view!=="my") document.getElementById("myBtn")?.click(); else {updateBottomNavActive("navFav"); scrollToSelector("#results");}});
  document.getElementById("navMore")?.addEventListener("click",()=>{updateBottomNavActive("navMore"); document.getElementById("helpPanel").open = true; scrollToSelector("#supportCenter");});
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
async function forceAppRefresh(){
  try{
    if("serviceWorker" in navigator){
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(async reg => {
        try{ if(reg.waiting) reg.waiting.postMessage({type:"SKIP_WAITING"}); }catch(e){}
        try{ await reg.update(); }catch(e){}
      }));
    }
    if(window.caches){
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => /mmf|mass|mauritius/i.test(k)).map(k => caches.delete(k)));
    }
  }catch(e){}
  const url = new URL(window.location.href);
  url.searchParams.set("mmf_refresh", Date.now());
  window.location.replace(url.toString());
}

async function checkVersion(){
  try{
    const res = await fetch(`version.json?v=${Date.now()}`, {cache:"no-store"});
    if(!res.ok) return;
    const v = await res.json();
    if(v.version && String(v.version) !== APP_VERSION){
      const bar = document.getElementById("updateBanner");
      bar.innerHTML = `${esc(t("newversion"))} <button onclick="forceAppRefresh()">${esc(t("refresh"))}</button>`;
      bar.hidden = false;
    }
  }catch(e){}
}
loadData();
if("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
