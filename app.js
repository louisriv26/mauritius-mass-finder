(() => {
'use strict';
const APP_VERSION = '15.1';
const DAYS = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const DAY_LABELS = {
  en: {Lundi:'Monday', Mardi:'Tuesday', Mercredi:'Wednesday', Jeudi:'Thursday', Vendredi:'Friday', Samedi:'Saturday', Dimanche:'Sunday'},
  fr: {Lundi:'Lundi', Mardi:'Mardi', Mercredi:'Mercredi', Jeudi:'Jeudi', Vendredi:'Vendredi', Samedi:'Samedi', Dimanche:'Dimanche'}
};
const DAYIDX = Object.fromEntries(DAYS.map((d,i)=>[d,i]));
const T = {
  en: {
    appTitle:'Mauritius Mass Finder',
    heroText:'Find a Mass quickly anywhere in Mauritius',
    quickTitle:'What do you need?', quickHint:'One tap. No typing.',
    qaNowTitle:'Find a Mass now', qaNowText:'Next available Masses, sorted by time.',
    qaNearTitle:'Near me', qaNearText:'Use your location and sort nearby results.',
    qaSundayTitle:'Sunday morning', qaSundayText:'Show Sunday Masses before midday.',
    qaFavTitle:'My Churches', qaFavText:'Open your saved churches quickly.',
    navHome:'Home', navSearch:'Search', navNear:'Near me', navFav:'My Churches', navMore:'More',
    aboutTitle:'About this app', aboutText:'A simple Catholic Mass finder for Mauritius, built for fast mobile use.', versionWord:'Version', share:'Share', shareText:'Mass at {site}, {day} {time}. Directions: {url}', shareCopied:'Mass details copied. You can paste them into WhatsApp or a message.',
    sundayNotice:'Showing Sunday morning Masses before midday.',
    searchPlaceholder:'Search parish, church, town…', anyDay:'Any day', allRegions:'All regions', massesOnly:'Masses only', includeOther:'Include other celebrations',
    findNext:'Find next Mass', useLocation:'Use my location', favouritesOnly:'My Churches only', clear:'Clear', loading:'Loading data…',
    updateTitle:'Update the database without rebuilding', updateA:'<b>Option A:</b> edit <code>data/masses.json</code> in GitHub and commit. The app fetches it on launch.', updateB:'<b>Option B:</b> publish a Google Sheet as CSV and paste the published CSV URL in <code>config.js</code>.', fallbackNote:'The app falls back to the embedded full database if the live file is unavailable.', footerNote:'Sources are linked on each result. Always verify special services directly with the parish when timing is critical.',
    rowWord:'rows', rows:'Rows', parishes:'Parishes', sites:'Sites', massRows:'Mass rows', other:'Other', showing:'Showing', results:'result(s)',
    noResult:'No matching Mass found for this filter.', noResultHint:'Try clearing filters, Sunday morning, Near me, or include other celebrations.', nextNotice:'Showing the next available Masses across the coming 7 days, sorted by soonest time.', locationNotice:'Location sorting is active. Distances are shown for all sites; some are approximate locality distances.', favNotice:'Showing favourite churches only.', otherNotice:'Other celebrations are shown separately and are not mixed into Masses-only results.',
    parish:'Parish', today:'Today', inDays:'In {n} day(s)', distanceExact:'{n} km', distanceApprox:'~{n} km', directions:'Directions', source:'Source', favouriteOn:'★ Favourite', favouriteOff:'☆ Favourite', reportCorrection:'Report correction',
    dataLiveJson:'Database loaded', dataGoogle:'Live database loaded', dataFallback:'Offline database loaded', copied:'Correction details copied. Paste them into an email or message.', locationAsk:'Use your location to show nearby Masses. Your location is not stored.', locationDenied:'Location permission was not granted.', locationUnsupported:'Location is not supported by this browser.', correction:'Correction', checkEntry:'Please check this Mass Finder entry:', dayTime:'Day/time', serviceMass:'Mass', serviceOther:'Other celebration'
  },
  fr: {
    appTitle:'Trouver une Messe à Maurice',
    heroText:'Trouvez rapidement une messe à Maurice',
    quickTitle:'De quoi avez-vous besoin ?', quickHint:'Un clic. Sans taper.',
    qaNowTitle:'Trouver une messe maintenant', qaNowText:'Prochaines messes, triées par horaire.',
    qaNearTitle:'Près de moi', qaNearText:'Utilisez votre position et triez les résultats proches.',
    qaSundayTitle:'Dimanche matin', qaSundayText:'Afficher les messes du dimanche avant midi.',
    qaFavTitle:'Mes églises', qaFavText:'Ouvrir rapidement vos églises sauvegardées.',
    navHome:'Accueil', navSearch:'Recherche', navNear:'Près de moi', navFav:'Mes églises', navMore:'Plus',
    aboutTitle:'À propos de cette application', aboutText:'Une application simple pour trouver rapidement les messes à Maurice sur mobile.', versionWord:'Version', share:'Partager', shareText:'Messe à {site}, {day} {time}. Itinéraire : {url}', shareCopied:'Les détails de la messe ont été copiés. Vous pouvez les coller dans WhatsApp ou un message.',
    sundayNotice:'Affichage des messes du dimanche matin avant midi.',
    searchPlaceholder:'Rechercher paroisse, église, ville…', anyDay:'Tous les jours', allRegions:'Toutes les régions', massesOnly:'Messes seulement', includeOther:'Inclure les autres célébrations',
    findNext:'Trouver la prochaine messe', useLocation:'Utiliser ma position', favouritesOnly:'Mes églises seulement', clear:'Effacer', loading:'Chargement des données…',
    updateTitle:'Mettre à jour la base sans reconstruire', updateA:'<b>Option A :</b> modifiez <code>data/masses.json</code> dans GitHub et validez. L’application le charge au démarrage.', updateB:'<b>Option B :</b> publiez une feuille Google en CSV et collez l’URL CSV publiée dans <code>config.js</code>.', fallbackNote:'L’application utilise la base intégrée si le fichier en direct n’est pas disponible.', footerNote:'Les sources sont liées sur chaque résultat. Vérifiez toujours les services spéciaux directement avec la paroisse lorsque l’horaire est critique.',
    rowWord:'lignes', rows:'Lignes', parishes:'Paroisses', sites:'Sites', massRows:'Lignes de messe', other:'Autres', showing:'Affichage de', results:'résultat(s)',
    noResult:'Aucune messe trouvée avec ce filtre.', noResultHint:'Essayez d’effacer les filtres, dimanche matin, près de moi, ou incluez les autres célébrations.', nextNotice:'Affichage des prochaines messes disponibles sur les 7 prochains jours, triées par horaire.', locationNotice:'Le tri par position est actif. Les distances sont affichées pour tous les sites ; certaines sont approximatives par localité.', favNotice:'Affichage des églises favorites seulement.', otherNotice:'Les autres célébrations sont affichées séparément et ne sont pas mélangées aux résultats “messes seulement”.',
    parish:'Paroisse', today:'Aujourd’hui', inDays:'Dans {n} jour(s)', distanceExact:'{n} km', distanceApprox:'~{n} km', directions:'Itinéraire', source:'Source', favouriteOn:'★ Favori', favouriteOff:'☆ Favori', reportCorrection:'Signaler une correction',
    dataLiveJson:'Base chargée', dataGoogle:'Base en direct chargée', dataFallback:'Base hors ligne chargée', copied:'Les détails de correction ont été copiés. Collez-les dans un e-mail ou un message.', locationAsk:'Utilisez votre position pour afficher les messes proches. Votre position n’est pas enregistrée.', locationDenied:'L’autorisation de localisation n’a pas été accordée.', locationUnsupported:'La localisation n’est pas prise en charge par ce navigateur.', correction:'Correction', checkEntry:'Veuillez vérifier cette entrée du Mass Finder :', dayTime:'Jour/heure', serviceMass:'Messe', serviceOther:'Autre célébration'
  }
};
let DATA = [];
let META = {};
let userPos = null;
let nextMode = false;
let nearMode = false;
let quickMode = '';
let favOnly = false;
const savedLang = localStorage.getItem('mmf_lang');
let currentLang = (savedLang === 'fr' || savedLang === 'en') ? savedLang : (((navigator.language || 'en').toLowerCase().startsWith('fr')) ? 'fr' : 'en');
const favs = new Set(JSON.parse(localStorage.getItem('mmf_site_favourites') || '[]'));
const $ = id => document.getElementById(id);
const tr = (key, vars={}) => String((T[currentLang] && T[currentLang][key]) || T.en[key] || key).replace(/\{(\w+)\}/g, (_,k)=>vars[k] ?? '');
const dayLabel = d => (DAY_LABELS[currentLang] && DAY_LABELS[currentLang][d]) || d;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\bsaint\b/g,'st').replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
function uniqParts(parts){ const seen=new Set(); return parts.map(x=>String(x||'').trim()).filter(x=>{ const k=norm(x); if(!k || seen.has(k)) return false; seen.add(k); return true; }); }
function buildMapsQuery(r){ return uniqParts([r.site_name, r.town, r.parish_label || r.parish_name, r.region, 'Mauritius']).join(', '); }
let SITE_NAME_COLLISIONS = new Set();
function computeDisambiguation(){ const byName=new Map(); DATA.forEach(r=>{ const k=norm(r.site_name); if(!k) return; if(!byName.has(k)) byName.set(k,new Set()); byName.get(k).add(r.site_uid || buildMapsQuery(r)); }); SITE_NAME_COLLISIONS = new Set([...byName.entries()].filter(([k,v])=>v.size>1).map(([k])=>k)); }
function siteDisplayName(r){ const name = r.site_name || ''; if(r.display_site_label) return r.display_site_label; if(SITE_NAME_COLLISIONS.has(norm(name))){ const suffix = uniqParts([r.town, r.region]).join(' · '); return suffix ? name + ' (' + suffix + ')' : name; } return name; }
function parseCSV(text){
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(quoted){ if(c==='"' && n==='"'){field+='"'; i++;} else if(c==='"'){quoted=false;} else field+=c; }
    else { if(c==='"') quoted=true; else if(c===','){row.push(field); field='';} else if(c==='\n'){row.push(field); rows.push(row); row=[]; field='';} else if(c==='\r'){} else field+=c; }
  }
  if(field.length || row.length){row.push(field); rows.push(row);}
  const headers = rows.shift() || [];
  return rows.filter(r=>r.some(x=>x!=='')).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i] ?? ''])));
}
function bool(v){ return v === true || String(v).toLowerCase() === 'true'; }
function normaliseRows(rows){
  return rows.map((r,i)=>{
    const category = r.mass_category || (bool(r.is_mass_only_visible) ? 'Mass' : 'Non-Mass');
    const visible = bool(r.is_mass_only_visible) || category === 'Mass';
    const baseSearch = [r.region,r.town,r.parish_name,r.parish_label,r.site_name,r.parent_parish,r.special_rule,r.qualifier,r.notes,buildMapsQuery(r)].join(' ');
    return {
      id: r.id || 'row-'+i,
      parish_uid: r.parish_uid || '', site_uid: r.site_uid || '', region: r.region || '', town: r.town || '',
      parish_name: r.parish_name || '', parish_label: r.parish_label || r.parish_name || '', site_name: r.site_name || '', display_site_label: r.display_site_label || '',
      day_of_week: r.day_of_week || '', time_24h: r.time_24h || '', service_type: r.service_type || '', mass_category: category,
      verified_status: r.verified_status || '', language: r.language || '', special_rule: r.special_rule || '', qualifier: r.qualifier || '', notes: r.notes || '',
      source_url: r.source_url || '', last_checked: r.last_checked || '', is_active: String(r.is_active).toLowerCase() !== 'false',
      latitude: Number.isFinite(parseFloat(r.latitude)) ? parseFloat(r.latitude) : null,
      longitude: Number.isFinite(parseFloat(r.longitude)) ? parseFloat(r.longitude) : null,
      maps_query: buildMapsQuery(r),
      coordinate_precision: r.coordinate_precision || '', coordinate_note: r.coordinate_note || '',
      parent_parish: r.parent_parish || r.parish_name || '', site_type: r.site_type || '',
      is_mass_only_visible: visible,
      display_category: r.display_category || (visible ? 'Mass' : 'Other celebration'),
      search_text: r.search_text ? norm(r.search_text) : norm(baseSearch)
    };
  });
}
async function loadData(){
  const cfg = window.MASS_FINDER_CONFIG || {};
  let loadedKey = 'dataFallback';
  let raw = window.MMF_EMBEDDED_DATA || {rows:[]};
  try{
    if(cfg.GOOGLE_SHEET_CSV_URL){
      const url = cfg.GOOGLE_SHEET_CSV_URL + (cfg.GOOGLE_SHEET_CSV_URL.includes('?') ? '&' : '?') + 'v=' + Date.now();
      const res = await fetch(url,{cache:'no-store'}); if(!res.ok) throw new Error('Google Sheet CSV unavailable');
      DATA = normaliseRows(parseCSV(await res.text())); META = {version:'Google Sheet live', row_count:DATA.length}; loadedKey='dataGoogle';
    } else {
      const url = (cfg.DATA_JSON_URL || './data/masses.json') + '?v=' + Date.now();
      const res = await fetch(url,{cache:'no-store'}); if(!res.ok) throw new Error('JSON unavailable');
      raw = await res.json(); DATA = normaliseRows(raw.rows || raw); META = raw.meta || {row_count:DATA.length}; loadedKey='dataLiveJson';
    }
  } catch(e){
    DATA = normaliseRows(raw.rows || raw); META = raw.meta || {row_count:DATA.length}; loadedKey='dataFallback';
  }
  computeDisambiguation();
  $('dataStatus').dataset.loadedKey = loadedKey;
  updateStaticText();
  initFilters(); render();
}
function updateStaticText(){
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = tr(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-html]').forEach(el => el.innerHTML = tr(el.dataset.i18nHtml));
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = tr(el.dataset.i18nPlaceholder));
  $('langEn')?.classList.toggle('active', currentLang === 'en');
  $('langFr')?.classList.toggle('active', currentLang === 'fr');
  if($('dataStatus')?.dataset.loadedKey) $('dataStatus').textContent = tr($('dataStatus').dataset.loadedKey) + ' · ' + DATA.length + ' ' + tr('rowWord') + ' · v' + APP_VERSION;
  const vf=$('versionFooter'); if(vf) vf.textContent='v' + APP_VERSION;
  const av=$('aboutVersion'); if(av) av.textContent=APP_VERSION;
}
function setLang(lang){ currentLang = lang; localStorage.setItem('mmf_lang', lang); updateStaticText(); refreshDayOptions(); render(); }
function initFilters(){
  refreshDayOptions();
  const regionSelect = $('region');
  const current = regionSelect.value;
  while(regionSelect.options.length > 1) regionSelect.remove(1);
  [...new Set(DATA.map(r=>r.region).filter(Boolean))].sort().forEach(r => regionSelect.insertAdjacentHTML('beforeend','<option>'+esc(r)+'</option>'));
  regionSelect.value = current;
}
function refreshDayOptions(){
  const daySelect = $('day');
  if(!daySelect) return;
  const current = daySelect.value;
  daySelect.innerHTML = '<option value="">'+esc(tr('anyDay'))+'</option>' + DAYS.map(d=>'<option value="'+esc(d)+'">'+esc(dayLabel(d))+'</option>').join('');
  daySelect.value = current;
}
function minutesNow(){ const d=new Date(); return d.getHours()*60+d.getMinutes(); }
function todayIdx(){ return (new Date().getDay()+6)%7; }
function mins(t){ const [h,m] = String(t || '00:00').split(':').map(Number); return h*60+m; }
function nextDelta(r){ const day = DAYIDX[r.day_of_week]; if(day == null) return 999999; let deltaDays=(day - todayIdx() + 7) % 7; let delta=deltaDays*1440 + mins(r.time_24h) - minutesNow(); if(delta < 0) delta += 7*1440; return delta; }
function relativeText(delta){
  if(delta < 60) return currentLang === 'fr' ? 'dans '+delta+' min' : 'in '+delta+' min';
  if(delta < 1440){ const h=Math.floor(delta/60), m=delta%60; return currentLang === 'fr' ? 'dans '+h+' h'+(m?' '+m+' min':'') : 'in '+h+'h'+(m?' '+m+'m':''); }
  const d=Math.floor(delta/1440); return currentLang === 'fr' ? 'dans '+d+' jour(s)' : 'in '+d+' day(s)';
}
function distKm(a,b,c,d){ if([a,b,c,d].some(x=>x==null || Number.isNaN(x))) return null; const R=6371, rad=x=>x*Math.PI/180; const dLat=rad(c-a), dLon=rad(d-b); const h=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(h)); }
function filtered(){
  const q=norm($('q').value), day=$('day').value, region=$('region').value, mode=$('mode').value;
  let arr = DATA.filter(r=>r.is_active);
  if(mode === 'mass') arr = arr.filter(r=>r.is_mass_only_visible);
  if(favOnly) arr = arr.filter(r=>favs.has(r.site_uid));
  if(q) arr = arr.filter(r=>r.search_text.includes(q) || norm([r.parish_name,r.site_name,r.town,r.region,r.parish_label,r.maps_query].join(' ')).includes(q));
  if(day && !nextMode) arr = arr.filter(r=>r.day_of_week === day);
  if(region) arr = arr.filter(r=>r.region === region);
  if(quickMode === 'sundayMorning') arr = arr.filter(r=>r.day_of_week === 'Dimanche' && mins(r.time_24h) < 12*60);
  arr.sort((a,b)=>{
    if(nearMode && userPos){ const da=distKm(userPos.lat,userPos.lon,a.latitude,a.longitude) ?? 9999; const db=distKm(userPos.lat,userPos.lon,b.latitude,b.longitude) ?? 9999; if(da!==db) return da-db; const nd=nextDelta(a)-nextDelta(b); if(nd) return nd; }
    if(nextMode){ const nd = nextDelta(a)-nextDelta(b); if(nd) return nd; }
    return (DAYIDX[a.day_of_week]-DAYIDX[b.day_of_week]) || (mins(a.time_24h)-mins(b.time_24h)) || a.site_name.localeCompare(b.site_name);
  });
  return arr;
}
function mapsUrl(r){ const useExact = isExactCoord(r) && r.latitude != null && r.longitude != null; const destRaw = useExact ? (r.latitude+','+r.longitude) : (r.maps_query || buildMapsQuery(r)); const dest=encodeURIComponent(destRaw); const origin=userPos ? '&origin='+encodeURIComponent(userPos.lat+','+userPos.lon) : ''; return 'https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest; }
function toggleFav(siteUid){ if(favs.has(siteUid)) favs.delete(siteUid); else favs.add(siteUid); localStorage.setItem('mmf_site_favourites', JSON.stringify([...favs])); render(); }
function shareAction(r){
  const url = mapsUrl(r);
  const text = tr('shareText', {site:siteDisplayName(r), day:dayLabel(r.day_of_week), time:r.time_24h, url});
  if(navigator.share){ navigator.share({title:'Mauritius Mass Finder', text, url}).catch(()=>{}); }
  else { navigator.clipboard?.writeText(text).then(()=>alert(tr('shareCopied'))).catch(()=>alert(text)); }
}

function reportAction(r){
  const cfg = window.MASS_FINDER_CONFIG || {};
  const subject = 'Mass Finder correction: ' + siteDisplayName(r);
  const body = [tr('checkEntry'), '', siteDisplayName(r), tr('parish')+': '+(r.parish_label||r.parish_name), tr('dayTime')+': '+dayLabel(r.day_of_week)+' '+r.time_24h, tr('source')+': '+r.source_url, '', tr('correction')+': '].join('\n');
  if(cfg.REPORT_EMAIL) location.href = 'mailto:'+encodeURIComponent(cfg.REPORT_EMAIL)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  else navigator.clipboard?.writeText(body).then(()=>alert(tr('copied'))).catch(()=>alert(body));
}
function renderStats(){
  const par=new Set(DATA.map(r=>r.parish_uid)).size, sites=new Set(DATA.map(r=>r.site_uid)).size, masses=DATA.filter(r=>r.is_mass_only_visible).length, other=DATA.length-masses;
  $('stats').innerHTML = [[tr('rows'),DATA.length],[tr('parishes'),par],[tr('sites'),sites],[tr('massRows'),masses],[tr('other'),other]].map(x=>'<div class="stat"><b>'+x[1]+'</b>'+x[0]+'</div>').join('');
}
function renderNotice(){
  const notices=[];
  if(nextMode) notices.push('<div class="notice ok">'+esc(tr('nextNotice'))+'</div>');
  if(nearMode && userPos) notices.push('<div class="notice ok">'+esc(tr('locationNotice'))+'</div>');
  if(favOnly) notices.push('<div class="notice ok">'+esc(tr('favNotice'))+'</div>');
  if(quickMode === 'sundayMorning') notices.push('<div class="notice ok">'+esc(tr('sundayNotice'))+'</div>');
  if(($('mode').value==='all')) notices.push('<div class="notice warn">'+esc(tr('otherNotice'))+'</div>');
  $('notice').innerHTML = notices.join('');
}
function el(tag, attrs={}, text){ const node=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(k==='class') node.className=v; else if(k==='href') node.href=v; else if(k==='target') node.target=v; else node.setAttribute(k,v); } if(text != null) node.textContent=text; return node; }
function categoryLabel(r){ return r.is_mass_only_visible ? tr('serviceMass') : tr('serviceOther'); }
function isExactCoord(r){ return ['exact','existing','verified'].includes(String(r.coordinate_precision||'').toLowerCase()); }
function distanceLabel(r, d){ return tr(isExactCoord(r) ? 'distanceExact' : 'distanceApprox', {n:d.toFixed(1)}); }
function firstNextMass(){
  const oldNext=nextMode, oldNear=nearMode, oldQuick=quickMode, oldFav=favOnly;
  nextMode=true; nearMode=false; quickMode=''; favOnly=false;
  const arr=filtered().filter(r=>r.is_mass_only_visible);
  nextMode=oldNext; nearMode=oldNear; quickMode=oldQuick; favOnly=oldFav;
  return arr[0] || null;
}
function renderNextHero(){
  const root=$('nextHero'); if(!root) return;
  const r=firstNextMass();
  if(!r){ root.innerHTML=''; return; }
  const d=userPos?distKm(userPos.lat,userPos.lon,r.latitude,r.longitude):null;
  const meta=[dayLabel(r.day_of_week), r.town, d!=null ? distanceLabel(r,d) : ''].filter(Boolean).join(' · ');
  root.innerHTML='<div class="heroLine"><div><div class="small">'+esc(currentLang==='fr'?'Prochaine messe utile':'Next useful Mass')+'</div><div class="heroSite">'+esc(siteDisplayName(r))+'</div><div class="heroMeta">'+esc(meta)+'</div></div><div class="heroTime">'+esc(r.time_24h)+'</div></div><div class="heroActions"><a class="primarylink" target="_blank" rel="noopener" href="'+esc(mapsUrl(r))+'">'+esc(tr('directions'))+'</a><button type="button" id="heroShare">'+esc(tr('share'))+'</button><button type="button" id="heroShowNext">'+esc(tr('findNext'))+'</button></div>';
  $('heroShare')?.addEventListener('click',()=>shareAction(r));
  $('heroShowNext')?.addEventListener('click',()=>showNext());
}
function render(){
  updateStaticText();
  const arr=filtered(); renderStats(); renderNotice(); renderNextHero();
  const root=$('results'); root.innerHTML='';
  if(!arr.length){
    const empty=el('div',{class:'empty'});
    empty.appendChild(el('div',{},tr('noResult')));
    empty.appendChild(el('div',{class:'small'},tr('noResultHint')));
    const er=el('div',{class:'actions'});
    const clear=el('button',{},tr('clear')); clear.addEventListener('click',()=>{$('clearBtn').click();}); er.appendChild(clear);
    const sun=el('button',{},tr('qaSundayTitle')); sun.addEventListener('click',()=>showSunday()); er.appendChild(sun);
    const near=el('button',{},tr('qaNearTitle')); near.addEventListener('click',()=>showNear()); er.appendChild(near);
    empty.appendChild(er); root.appendChild(empty); return;
  }
  root.appendChild(el('div',{class:'small'},tr('showing')+' '+arr.length+' '+tr('results')));
  for(const r of arr){
    const card=el('article',{class:'card'});
    const top=el('div',{class:'top'}); const left=el('div');
    left.appendChild(el('div',{class:'site'},siteDisplayName(r)));
    left.appendChild(el('div',{class:'meta'},[r.town,r.region].filter(Boolean).join(' · ')));
    left.appendChild(el('div',{class:'meta'},tr('parish')+': '+(r.parish_label||r.parish_name)));
    top.appendChild(left);
    const timeBox=el('div',{class:'timeBox'});
    timeBox.appendChild(el('div',{class:'time'},r.time_24h));
    if(nextMode || nearMode) timeBox.appendChild(el('div',{class:'relative'},relativeText(nextDelta(r))));
    top.appendChild(timeBox); card.appendChild(top);
    const badges=el('div',{class:'badges'});
    badges.appendChild(el('span',{class:'badge mass'},dayLabel(r.day_of_week)));
    badges.appendChild(el('span',{class:'badge '+(r.is_mass_only_visible?'mass':'')},categoryLabel(r)));
    if(nextMode){ const delta=nextDelta(r); const daysAway=Math.floor(delta/1440); badges.appendChild(el('span',{class:'badge'}, daysAway===0 ? tr('today') : tr('inDays',{n:daysAway}))); }
    if(r.qualifier) badges.appendChild(el('span',{class:'badge'},r.qualifier));
    if(r.special_rule) badges.appendChild(el('span',{class:'badge'},r.special_rule));
    const d=userPos?distKm(userPos.lat,userPos.lon,r.latitude,r.longitude):null; if(d!=null) badges.appendChild(el('span',{class:'badge'},distanceLabel(r,d)));
    card.appendChild(badges);
    if(r.notes) card.appendChild(el('div',{class:'small'},r.notes));
    const actions=el('div',{class:'actions'});
    actions.appendChild(el('a',{class:'primarylink',href:mapsUrl(r),target:'_blank',rel:'noopener'},tr('directions')));
    const share=el('button',{},tr('share')); share.addEventListener('click',()=>shareAction(r)); actions.appendChild(share);
    if(r.source_url) actions.appendChild(el('a',{href:r.source_url,target:'_blank',rel:'noopener'},tr('source')));
    const fav=el('button',{class:'fav '+(favs.has(r.site_uid)?'active':'')},favs.has(r.site_uid)?tr('favouriteOn'):tr('favouriteOff')); fav.addEventListener('click',()=>toggleFav(r.site_uid)); actions.appendChild(fav);
    const rep=el('button',{},tr('reportCorrection')); rep.addEventListener('click',()=>reportAction(r)); actions.appendChild(rep);
    card.appendChild(actions); root.appendChild(card);
  }
}

function scrollToResults(){ document.getElementById('results')?.scrollIntoView({behavior:'smooth', block:'start'}); }
function scrollToSearch(){ document.getElementById('searchPanel')?.scrollIntoView({behavior:'smooth', block:'start'}); }
function setActiveNav(id){ document.querySelectorAll('.navBtn').forEach(b=>b.classList.toggle('active', b.id===id)); }
function showNext(){ nextMode=true; nearMode=false; quickMode=''; favOnly=false; syncFavButton(); $('day').value=''; $('mode').value='mass'; setActiveNav('navHome'); render(); scrollToResults(); }
function showSunday(){ nextMode=false; nearMode=false; quickMode='sundayMorning'; favOnly=false; syncFavButton(); $('day').value='Dimanche'; $('mode').value='mass'; setActiveNav('navHome'); render(); scrollToResults(); }
function syncFavButton(){ $('favOnlyBtn')?.classList.toggle('primary', favOnly); }
function showFavs(){ favOnly=true; nextMode=false; nearMode=false; quickMode=''; syncFavButton(); setActiveNav('navFav'); render(); scrollToResults(); }
function showNear(){
  if(!navigator.geolocation){ alert(tr('locationUnsupported')); return; }
  if(!userPos && !confirm(tr('locationAsk'))) return;
  navigator.geolocation.getCurrentPosition(p=>{
    userPos={lat:p.coords.latitude, lon:p.coords.longitude};
    nearMode=true; nextMode=false; quickMode=''; favOnly=false; syncFavButton(); $('mode').value='mass'; setActiveNav('navNear'); render(); scrollToResults();
  },()=>alert(tr('locationDenied')));
}

['q','day','region','mode'].forEach(id => $(id).addEventListener('input',()=>{ nextMode=false; quickMode=''; render(); }));
$('nextBtn').addEventListener('click',()=>showNext());
$('clearBtn').addEventListener('click',()=>{ ['q','day','region'].forEach(id=>$(id).value=''); $('mode').value='mass'; nextMode=false; nearMode=false; quickMode=''; favOnly=false; userPos=null; syncFavButton(); setActiveNav('navHome'); render(); });
$('favOnlyBtn').addEventListener('click',()=>{ favOnly=!favOnly; nextMode=false; nearMode=false; quickMode=''; syncFavButton(); if(favOnly) setActiveNav('navFav'); render(); scrollToResults(); });
$('nearBtn').addEventListener('click',()=>showNear());

$('qaNow')?.addEventListener('click',()=>showNext());
$('qaNear')?.addEventListener('click',()=>showNear());
$('qaSunday')?.addEventListener('click',()=>showSunday());
$('qaFav')?.addEventListener('click',()=>showFavs());
$('navHome')?.addEventListener('click',()=>{setActiveNav('navHome'); document.getElementById('homePanel')?.scrollIntoView({behavior:'smooth', block:'start'});});
$('navSearch')?.addEventListener('click',()=>{setActiveNav('navSearch'); scrollToSearch();});
$('navNear')?.addEventListener('click',()=>showNear());
$('navFav')?.addEventListener('click',()=>showFavs());
$('navMore')?.addEventListener('click',()=>{setActiveNav('navMore'); document.querySelector('footer')?.scrollIntoView({behavior:'smooth', block:'end'});});
$('langEn')?.addEventListener('click',()=>setLang('en'));
$('langFr')?.addEventListener('click',()=>setLang('fr'));
if('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
window.MMF = {render, filtered, getData:()=>DATA, setLang, version:APP_VERSION, buildMapsQuery, siteDisplayName};
loadData();
})();
