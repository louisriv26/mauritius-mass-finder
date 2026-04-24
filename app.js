(() => {
'use strict';
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
    searchPlaceholder:'Search parish, church, town…', anyDay:'Any day', allRegions:'All regions', massesOnly:'Masses only', includeOther:'Include other celebrations',
    findNext:'Find next Mass', useLocation:'Use my location', favouritesOnly:'Favourites only', clear:'Clear', loading:'Loading data…',
    updateTitle:'Update the database without rebuilding', updateA:'<b>Option A:</b> edit <code>data/masses.json</code> in GitHub and commit. The app fetches it on launch.', updateB:'<b>Option B:</b> publish a Google Sheet as CSV and paste the published CSV URL in <code>config.js</code>.', fallbackNote:'The app falls back to the embedded full database if the live file is unavailable.', footerNote:'Sources are linked on each result. Always verify special services directly with the parish when timing is critical.',
    rowWord:'rows', rows:'Rows', parishes:'Parishes', sites:'Sites', massRows:'Mass rows', other:'Other', showing:'Showing', results:'result(s)',
    noResult:'No matching result. Clear filters or include other celebrations.', nextNotice:'Showing the next available Masses across the coming 7 days, sorted by soonest time.', locationNotice:'Location sorting is active. Rows without coordinates still show directions, but no distance badge.', favNotice:'Showing favourite churches only.', otherNotice:'Other celebrations are shown separately and are not mixed into Masses-only results.',
    parish:'Parish', today:'Today', inDays:'In {n} day(s)', approx:'≈ {n} km', directions:'Directions', source:'Source', favouriteOn:'★ Favourite', favouriteOff:'☆ Favourite', reportCorrection:'Report correction',
    dataLiveJson:'Database loaded', dataGoogle:'Live database loaded', dataFallback:'Offline database loaded', copied:'Correction details copied. Paste them into an email or message.', locationDenied:'Location permission was not granted.', locationUnsupported:'Location is not supported by this browser.', correction:'Correction', checkEntry:'Please check this Mass Finder entry:', dayTime:'Day/time', serviceMass:'Mass', serviceOther:'Other celebration'
  },
  fr: {
    appTitle:'Trouver une Messe à Maurice',
    heroText:'Trouvez rapidement une messe à Maurice',
    searchPlaceholder:'Rechercher paroisse, église, ville…', anyDay:'Tous les jours', allRegions:'Toutes les régions', massesOnly:'Messes seulement', includeOther:'Inclure les autres célébrations',
    findNext:'Trouver la prochaine messe', useLocation:'Utiliser ma position', favouritesOnly:'Favoris seulement', clear:'Effacer', loading:'Chargement des données…',
    updateTitle:'Mettre à jour la base sans reconstruire', updateA:'<b>Option A :</b> modifiez <code>data/masses.json</code> dans GitHub et validez. L’application le charge au démarrage.', updateB:'<b>Option B :</b> publiez une feuille Google en CSV et collez l’URL CSV publiée dans <code>config.js</code>.', fallbackNote:'L’application utilise la base intégrée si le fichier en direct n’est pas disponible.', footerNote:'Les sources sont liées sur chaque résultat. Vérifiez toujours les services spéciaux directement avec la paroisse lorsque l’horaire est critique.',
    rowWord:'lignes', rows:'Lignes', parishes:'Paroisses', sites:'Sites', massRows:'Lignes de messe', other:'Autres', showing:'Affichage de', results:'résultat(s)',
    noResult:'Aucun résultat. Effacez les filtres ou incluez les autres célébrations.', nextNotice:'Affichage des prochaines messes disponibles sur les 7 prochains jours, triées par horaire.', locationNotice:'Le tri par position est actif. Les lignes sans coordonnées affichent toujours l’itinéraire, mais pas la distance.', favNotice:'Affichage des églises favorites seulement.', otherNotice:'Les autres célébrations sont affichées séparément et ne sont pas mélangées aux résultats “messes seulement”.',
    parish:'Paroisse', today:'Aujourd’hui', inDays:'Dans {n} jour(s)', approx:'≈ {n} km', directions:'Itinéraire', source:'Source', favouriteOn:'★ Favori', favouriteOff:'☆ Favori', reportCorrection:'Signaler une correction',
    dataLiveJson:'Base chargée', dataGoogle:'Base en direct chargée', dataFallback:'Base hors ligne chargée', copied:'Les détails de correction ont été copiés. Collez-les dans un e-mail ou un message.', locationDenied:'L’autorisation de localisation n’a pas été accordée.', locationUnsupported:'La localisation n’est pas prise en charge par ce navigateur.', correction:'Correction', checkEntry:'Veuillez vérifier cette entrée du Mass Finder :', dayTime:'Jour/heure', serviceMass:'Messe', serviceOther:'Autre célébration'
  }
};
let DATA = [];
let META = {};
let userPos = null;
let nextMode = false;
let favOnly = false;
const savedLang = localStorage.getItem('mmf_lang');
let currentLang = (savedLang === 'fr' || savedLang === 'en') ? savedLang : (((navigator.language || 'en').toLowerCase().startsWith('fr')) ? 'fr' : 'en');
const favs = new Set(JSON.parse(localStorage.getItem('mmf_site_favourites') || '[]'));
const $ = id => document.getElementById(id);
const tr = (key, vars={}) => String((T[currentLang] && T[currentLang][key]) || T.en[key] || key).replace(/\{(\w+)\}/g, (_,k)=>vars[k] ?? '');
const dayLabel = d => (DAY_LABELS[currentLang] && DAY_LABELS[currentLang][d]) || d;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\bsaint\b/g,'st').replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
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
    const baseSearch = [r.region,r.town,r.parish_name,r.parish_label,r.site_name,r.parent_parish,r.special_rule,r.qualifier,r.notes].join(' ');
    return {
      id: r.id || 'row-'+i,
      parish_uid: r.parish_uid || '', site_uid: r.site_uid || '', region: r.region || '', town: r.town || '',
      parish_name: r.parish_name || '', parish_label: r.parish_label || r.parish_name || '', site_name: r.site_name || '',
      day_of_week: r.day_of_week || '', time_24h: r.time_24h || '', service_type: r.service_type || '', mass_category: category,
      verified_status: r.verified_status || '', language: r.language || '', special_rule: r.special_rule || '', qualifier: r.qualifier || '', notes: r.notes || '',
      source_url: r.source_url || '', last_checked: r.last_checked || '', is_active: String(r.is_active).toLowerCase() !== 'false',
      latitude: Number.isFinite(parseFloat(r.latitude)) ? parseFloat(r.latitude) : null,
      longitude: Number.isFinite(parseFloat(r.longitude)) ? parseFloat(r.longitude) : null,
      maps_query: r.maps_query || [r.site_name,r.town,'Mauritius'].filter(Boolean).join(', '),
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
  if($('dataStatus')?.dataset.loadedKey) $('dataStatus').textContent = tr($('dataStatus').dataset.loadedKey) + ' · ' + DATA.length + ' ' + tr('rowWord');
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
function distKm(a,b,c,d){ if([a,b,c,d].some(x=>x==null || Number.isNaN(x))) return null; const R=6371, rad=x=>x*Math.PI/180; const dLat=rad(c-a), dLon=rad(d-b); const h=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(h)); }
function filtered(){
  const q=norm($('q').value), day=$('day').value, region=$('region').value, mode=$('mode').value;
  let arr = DATA.filter(r=>r.is_active);
  if(mode === 'mass') arr = arr.filter(r=>r.is_mass_only_visible);
  if(favOnly) arr = arr.filter(r=>favs.has(r.site_uid));
  if(q) arr = arr.filter(r=>r.search_text.includes(q) || norm([r.parish_name,r.site_name,r.town,r.region,r.parish_label].join(' ')).includes(q));
  if(day && !nextMode) arr = arr.filter(r=>r.day_of_week === day);
  if(region) arr = arr.filter(r=>r.region === region);
  arr.sort((a,b)=>{
    if(nextMode){ const nd = nextDelta(a)-nextDelta(b); if(nd) return nd; }
    if(userPos){ const da=distKm(userPos.lat,userPos.lon,a.latitude,a.longitude) ?? 9999; const db=distKm(userPos.lat,userPos.lon,b.latitude,b.longitude) ?? 9999; if(da!==db) return da-db; }
    return (DAYIDX[a.day_of_week]-DAYIDX[b.day_of_week]) || (mins(a.time_24h)-mins(b.time_24h)) || a.site_name.localeCompare(b.site_name);
  });
  return arr;
}
function mapsUrl(r){ const dest=encodeURIComponent(r.maps_query || [r.site_name,r.town,'Mauritius'].join(', ')); const origin=userPos ? '&origin='+encodeURIComponent(userPos.lat+','+userPos.lon) : ''; return 'https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest; }
function toggleFav(siteUid){ if(favs.has(siteUid)) favs.delete(siteUid); else favs.add(siteUid); localStorage.setItem('mmf_site_favourites', JSON.stringify([...favs])); render(); }
function reportAction(r){
  const cfg = window.MASS_FINDER_CONFIG || {};
  const subject = 'Mass Finder correction: ' + r.site_name;
  const body = [tr('checkEntry'), '', r.site_name, tr('parish')+': '+(r.parish_label||r.parish_name), tr('dayTime')+': '+dayLabel(r.day_of_week)+' '+r.time_24h, tr('source')+': '+r.source_url, '', tr('correction')+': '].join('\n');
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
  if(userPos) notices.push('<div class="notice ok">'+esc(tr('locationNotice'))+'</div>');
  if(favOnly) notices.push('<div class="notice ok">'+esc(tr('favNotice'))+'</div>');
  if(($('mode').value==='all')) notices.push('<div class="notice warn">'+esc(tr('otherNotice'))+'</div>');
  $('notice').innerHTML = notices.join('');
}
function el(tag, attrs={}, text){ const node=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(k==='class') node.className=v; else if(k==='href') node.href=v; else if(k==='target') node.target=v; else node.setAttribute(k,v); } if(text != null) node.textContent=text; return node; }
function categoryLabel(r){ return r.is_mass_only_visible ? tr('serviceMass') : tr('serviceOther'); }
function render(){
  updateStaticText();
  const arr=filtered(); renderStats(); renderNotice();
  const root=$('results'); root.innerHTML='';
  if(!arr.length){ root.appendChild(el('div',{class:'empty'},tr('noResult'))); return; }
  root.appendChild(el('div',{class:'small'},tr('showing')+' '+arr.length+' '+tr('results')));
  for(const r of arr){
    const card=el('article',{class:'card'});
    const top=el('div',{class:'top'}); const left=el('div');
    left.appendChild(el('div',{class:'site'},r.site_name));
    left.appendChild(el('div',{class:'meta'},[r.town,r.region].filter(Boolean).join(' · ')));
    left.appendChild(el('div',{class:'meta'},tr('parish')+': '+(r.parish_label||r.parish_name)));
    top.appendChild(left); top.appendChild(el('div',{class:'time'},r.time_24h)); card.appendChild(top);
    const badges=el('div',{class:'badges'});
    badges.appendChild(el('span',{class:'badge mass'},dayLabel(r.day_of_week)));
    badges.appendChild(el('span',{class:'badge '+(r.is_mass_only_visible?'mass':'')},categoryLabel(r)));
    if(nextMode){ const delta=nextDelta(r); const daysAway=Math.floor(delta/1440); badges.appendChild(el('span',{class:'badge'}, daysAway===0 ? tr('today') : tr('inDays',{n:daysAway}))); }
    if(r.qualifier) badges.appendChild(el('span',{class:'badge'},r.qualifier));
    if(r.special_rule) badges.appendChild(el('span',{class:'badge'},r.special_rule));
    const d=userPos?distKm(userPos.lat,userPos.lon,r.latitude,r.longitude):null; if(d!=null) badges.appendChild(el('span',{class:'badge'},tr('approx',{n:d.toFixed(1)})));
    card.appendChild(badges);
    if(r.notes) card.appendChild(el('div',{class:'small'},r.notes));
    const actions=el('div',{class:'actions'});
    actions.appendChild(el('a',{class:'primarylink',href:mapsUrl(r),target:'_blank'},tr('directions')));
    if(r.source_url) actions.appendChild(el('a',{href:r.source_url,target:'_blank'},tr('source')));
    const fav=el('button',{class:'fav '+(favs.has(r.site_uid)?'active':'')},favs.has(r.site_uid)?tr('favouriteOn'):tr('favouriteOff')); fav.addEventListener('click',()=>toggleFav(r.site_uid)); actions.appendChild(fav);
    const rep=el('button',{},tr('reportCorrection')); rep.addEventListener('click',()=>reportAction(r)); actions.appendChild(rep);
    card.appendChild(actions); root.appendChild(card);
  }
}
['q','day','region','mode'].forEach(id => $(id).addEventListener('input',()=>{ nextMode=false; render(); }));
$('nextBtn').addEventListener('click',()=>{ nextMode=true; $('day').value=''; render(); });
$('clearBtn').addEventListener('click',()=>{ ['q','day','region'].forEach(id=>$(id).value=''); $('mode').value='mass'; nextMode=false; favOnly=false; render(); });
$('favOnlyBtn').addEventListener('click',()=>{ favOnly=!favOnly; $('favOnlyBtn').classList.toggle('primary', favOnly); render(); });
$('nearBtn').addEventListener('click',()=> navigator.geolocation ? navigator.geolocation.getCurrentPosition(p=>{userPos={lat:p.coords.latitude, lon:p.coords.longitude}; render();},()=>alert(tr('locationDenied'))) : alert(tr('locationUnsupported')));
$('langEn')?.addEventListener('click',()=>setLang('en'));
$('langFr')?.addEventListener('click',()=>setLang('fr'));
if('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
window.MMF = {render, filtered, getData:()=>DATA, setLang};
loadData();
})();
