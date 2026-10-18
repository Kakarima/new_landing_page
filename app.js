(function () {
  'use strict';

  /* ---------- Données et mémoire du navigateur ---------- */
  var KEY = 'karimaai.v1';

  var TOPICS = {
    discovery: { label: 'Appel gratuit de 30 minutes', min: 30 },
    agile:     { label: 'Rendez-vous de cadrage agile', min: 30 },
    coaching:  { label: 'Coaching IA (1 h en visio)', min: 60 },
    formation: { label: 'Formation IA : échange de cadrage', min: 30 },
    prototype: { label: 'Pack Prototype : demande de devis', min: 30 }
  };

  var OFFERS = [
    { topic: 'coaching', name: 'Coaching', price: '150 €', unit: '1 h en visio',
      desc: 'Une séance pour débloquer un sujet précis avec l\'IA.',
      points: ['Séance individuelle en visio', 'Plan d\'action concret', 'Compte rendu écrit'], cta: 'Réserver un coaching' },
    { topic: 'formation', name: 'Formation IA', price: '1 000 €', unit: '40 h en ligne', featured: true,
      desc: 'Montez vos équipes en compétence sur l\'IA appliquée à leur métier.',
      points: ['40 h de contenu en ligne', 'Cas pratiques sur vos projets', 'Accès aux ressources'], cta: 'Réserver un échange' },
    { topic: 'prototype', name: 'Pack Prototype', price: '3 000 €', unit: 'sur devis',
      desc: 'Un premier prototype fonctionnel pour valider votre idée.',
      points: ['Cadrage du besoin', 'Prototype en quelques semaines', 'Recommandations de suite'], cta: 'Demander un devis' }
  ];

  var state = load();
  var view = { current: 'home', history: [], month: null, date: null, time: null };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && s.user) return s; }
    } catch (e) { /* mémoire indisponible : on repart des exemples */ }
    return seed();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignoré */ }
  }
  function seed() {
    var next = nextWeekday(2, 1); // prochain mardi
    var past = new Date(); past.setDate(past.getDate() - 8);
    var now = Date.now();
    return {
      user: { name: 'Camille', email: 'camille.durand@entreprise.fr', company: 'Groupe Énergie Nord', calendly: '' },
      bookings: [
        { id: uid(), date: key(next), time: '14:00', topic: 'agile', name: 'Camille Durand', email: 'camille.durand@entreprise.fr', note: 'Cadrer l\'automatisation de nos spécifications.', status: 'confirmé' },
        { id: uid(), date: key(past), time: '10:30', topic: 'discovery', name: 'Camille Durand', email: 'camille.durand@entreprise.fr', note: '', status: 'confirmé' }
      ],
      activity: [
        { t: now - 1000 * 60 * 60 * 26, text: 'Rendez-vous de cadrage agile confirmé avec succès' },
        { t: now - 1000 * 60 * 60 * 24 * 8, text: 'Appel gratuit de 30 minutes effectué' }
      ]
    };
  }

  /* ---------- Outils ---------- */
  function $(id) { return document.getElementById(id); }
  function uid() { return 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function key(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function nextWeekday(dow, minDays) {
    var d = today(); d.setDate(d.getDate() + minDays);
    while (d.getDay() !== dow) d.setDate(d.getDate() + 1);
    return d;
  }
  function fmtLong(k) { return parse(k).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }); }
  function fmtWhen(t) {
    var d = new Date(t), diff = Date.now() - t;
    if (diff < 60000) return 'À l\'instant';
    if (diff < 3600000) return 'Il y a ' + Math.floor(diff / 60000) + ' min';
    if (diff < 86400000) return 'Il y a ' + Math.floor(diff / 3600000) + ' h';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function log(text) { state.activity.unshift({ t: Date.now(), text: text }); state.activity = state.activity.slice(0, 30); }

  var toastTimer;
  function toast(msg, isErr) {
    var el = $('toast');
    el.textContent = msg;
    el.className = 'toast show' + (isErr ? ' err' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = 'toast'; }, 2800);
  }
  function setError(id, msg) { $(id).textContent = msg || ''; }

  /* ---------- Navigation entre écrans ---------- */
  function go(name, opts) {
    opts = opts || {};
    if (!opts.back && view.current !== name) view.history.push(view.current);
    view.current = name;
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.toggle('active', screens[i].getAttribute('data-screen') === name);
    renderNav();
    if (name === 'dashboard') renderDashboard();
    if (name === 'settings') renderSettings();
    if (name === 'booking') renderBooking();
    window.scrollTo(0, 0);
  }
  function back() {
    var prev = view.history.pop() || 'home';
    go(prev, { back: true });
  }
  function renderNav() {
    var links = document.querySelectorAll('[data-nav]');
    for (var i = 0; i < links.length; i++) links[i].classList.toggle('active', links[i].getAttribute('data-nav') === view.current);
  }

  /* ---------- Accueil : formules ---------- */
  function renderOffers() {
    $('offers-list').innerHTML = OFFERS.map(function (o) {
      return '<article class="card offer' + (o.featured ? ' featured' : '') + '">' +
        '<h3>' + esc(o.name) + '</h3>' +
        '<div class="price">' + esc(o.price) + ' <small>· ' + esc(o.unit) + '</small></div>' +
        '<p>' + esc(o.desc) + '</p>' +
        '<ul>' + o.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        '<button class="btn ' + (o.featured ? '' : 'btn-outline') + '" data-book="' + o.topic + '">' + esc(o.cta) + '</button>' +
        '</article>';
    }).join('');
  }

  /* ---------- Tableau de bord ---------- */
  function upcoming() {
    var t = key(today());
    return state.bookings.filter(function (b) { return b.date >= t; })
      .sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
  }
  function renderDashboard() {
    var u = state.user, up = upcoming();
    $('dash-title').textContent = 'Mes rendez-vous';
    var minutes = up.reduce(function (s, b) { return s + (TOPICS[b.topic] ? TOPICS[b.topic].min : 30); }, 0);
    var hours = minutes / 60;
    var nextTxt = up.length ? fmtLong(up[0].date) + ' · ' + up[0].time.replace(':', ' h ') : 'Aucun';
    $('dash-stats').innerHTML =
      stat(up.length, 'rendez-vous à venir') +
      stat(String(+hours.toFixed(1)).replace('.', ',') + ' h', 'd\'échange réservées') +
      stat(nextTxt, 'prochain rendez-vous', true);

    $('dash-upcoming').innerHTML = up.length ? up.map(function (b) {
      var d = parse(b.date), t = TOPICS[b.topic] || { label: 'Rendez-vous' };
      return '<div class="appt">' +
        '<div class="date-chip"><small>' + esc(d.toLocaleDateString('fr-FR', { month: 'short' })) + '</small><span>' + d.getDate() + '</span></div>' +
        '<div class="appt-info"><b>' + esc(t.label) + '<span class="tag">' + esc(b.status) + '</span></b>' +
        '<small>' + esc(fmtLong(b.date)) + ' à ' + esc(b.time.replace(':', ' h ')) + '</small></div>' +
        '<button class="link-danger" data-cancel="' + b.id + '">Annuler</button></div>';
    }).join('') :
      '<div class="empty"><b>Bienvenue ! Votre agenda est vide.</b>Réservez votre premier appel gratuit de 30 minutes : c\'est le meilleur moyen de démarrer.</div>';

    $('dash-activity').innerHTML = state.activity.length ? state.activity.slice(0, 6).map(function (a) {
      return '<li><div>' + esc(a.text) + '<small>' + esc(fmtWhen(a.t)) + '</small></div></li>';
    }).join('') : '<li class="empty">Vos actions apparaîtront ici.</li>';
  }
  function stat(num, lbl, small) {
    return '<div class="card stat"><div class="num"' + (small ? ' style="font-size:1.25rem;line-height:1.25"' : '') + '>' + esc(num) + '</div><div class="lbl">' + esc(lbl) + '</div></div>';
  }

  /* ---------- Paramètres ---------- */
  function renderSettings() {
    var u = state.user;
    $('pf-name').value = u.name || '';
    $('pf-email').value = u.email || '';
    $('pf-company').value = u.company || '';
    $('pf-calendly').value = u.calendly || '';
    setError('pf-error');
  }

  /* ---------- Prise de rendez-vous ---------- */
  var BASE_SLOTS = ['09:00', '10:30', '14:00', '15:30', '16:30'];

  function daySlots(k) {
    var d = parse(k), dow = d.getDay();
    if (dow === 0 || dow === 6 || k <= key(today())) return [];
    var n = d.getDate() + d.getMonth();
    var slots = BASE_SLOTS.filter(function (s, i) {
      if (dow === 2 && s === '14:00') return true; // le mardi à 14 h est toujours proposé
      return (n + i * 3) % 5 !== 0;
    });
    var taken = state.bookings.filter(function (b) { return b.date === k; }).map(function (b) { return b.time; });
    return slots.filter(function (s) { return taken.indexOf(s) === -1; });
  }

  function openBooking(topic) {
    if (topic && TOPICS[topic]) view.topic = topic;
    view.date = null; view.time = null; view.month = null;
    go('booking');
  }

  function renderBooking() {
    if (!view.topic) view.topic = 'discovery';
    if (!view.month) { var m = nextWeekday(2, 1); view.month = new Date(m.getFullYear(), m.getMonth(), 1); }
    if (!view.date) { view.date = key(nextWeekday(2, 1)); view.time = null; }
    $('booking-ui').classList.remove('hidden');
    $('booking-done').classList.add('hidden');

    $('bk-topic').innerHTML = Object.keys(TOPICS).map(function (k) {
      return '<option value="' + k + '"' + (k === view.topic ? ' selected' : '') + '>' + esc(TOPICS[k].label) + '</option>';
    }).join('');
    $('bk-title').textContent = TOPICS[view.topic].label;
    $('bk-duration').textContent = TOPICS[view.topic].min + ' min';
    var contact = state.contact || {};
    $('bk-name').value = $('bk-name').value || contact.name || '';
    $('bk-email').value = $('bk-email').value || contact.email || '';
    setError('bk-error');

    renderCalendar();
    renderSlots();
    renderCalendlyLink();
  }

  function renderCalendar() {
    var m = view.month, first = new Date(m.getFullYear(), m.getMonth(), 1);
    var last = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    var offset = (first.getDay() + 6) % 7;
    $('cal-month').textContent = first.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    var html = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(function (d) { return '<div class="cal-dow">' + d + '</div>'; }).join('');
    for (var i = 0; i < offset; i++) html += '<div></div>';
    for (var d = 1; d <= last; d++) {
      var k = key(new Date(m.getFullYear(), m.getMonth(), d));
      var avail = daySlots(k).length > 0;
      html += '<button type="button" class="day' + (avail ? ' avail' : '') + (k === view.date ? ' sel' : '') + '"' +
        (avail ? ' data-day="' + k + '"' : ' disabled') + '>' + d + '</button>';
    }
    $('cal-grid').innerHTML = html;
    var now = today(), curMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    $('cal-prev').disabled = first <= curMonth;
    $('cal-next').disabled = first >= new Date(now.getFullYear(), now.getMonth() + 3, 1);
    $('cal-prev').style.opacity = $('cal-prev').disabled ? .35 : 1;
    $('cal-next').style.opacity = $('cal-next').disabled ? .35 : 1;
  }

  function renderSlots() {
    var slots = view.date ? daySlots(view.date) : [];
    $('slots-title').textContent = view.date ? fmtLong(view.date) : 'Heures disponibles';
    $('slots').innerHTML = slots.length ? slots.map(function (s) {
      return '<button type="button" class="slot' + (s === view.time ? ' sel' : '') + '" data-time="' + s + '">' + s.replace(':', ' h ') + '</button>';
    }).join('') : '<p class="muted small">Choisissez un jour en vert dans le calendrier.</p>';
    $('book-form').classList.toggle('hidden', !view.time);
    $('bk-summary').innerHTML = view.date && view.time
      ? '<b>' + esc(TOPICS[view.topic].label) + '</b><br>' + esc(fmtLong(view.date)) + ' à ' + esc(view.time.replace(':', ' h ')) + ' · ' + TOPICS[view.topic].min + ' min'
      : 'Aucun créneau sélectionné.';
  }

  function renderCalendlyLink() {
    var url = (state.user.calendly || '').trim();
    $('calendly-link-wrap').innerHTML = /^https?:\/\//i.test(url)
      ? 'Vous préférez Calendly ? <a href="' + esc(url) + '" target="_blank" rel="noopener">Ouvrir mon lien Calendly</a>'
      : 'Astuce : ajoutez votre lien Calendly dans les <a href="#" data-go="settings">Paramètres</a>.';
  }

  function confirmBooking() {
    var name = $('bk-name').value.trim(), email = $('bk-email').value.trim();
    if (!view.date || !view.time) { setError('bk-error', 'Choisissez d\'abord une date et une heure.'); return; }
    if (!name) { setError('bk-error', 'Indiquez votre nom.'); return; }
    if (!validEmail(email)) { setError('bk-error', 'Indiquez une adresse email valide.'); return; }
    if (daySlots(view.date).indexOf(view.time) === -1) { setError('bk-error', 'Ce créneau vient d\'être pris, choisissez-en un autre.'); renderCalendar(); renderSlots(); return; }
    var b = { id: uid(), date: view.date, time: view.time, topic: view.topic, name: name, email: email, note: $('bk-note').value.trim(), status: 'confirmé' };
    state.bookings.push(b);
    state.contact = { name: name, email: email };
    log(TOPICS[b.topic].label + ' confirmé avec succès');
    save();
    $('done-text').textContent = TOPICS[b.topic].label + ' · ' + fmtLong(b.date) + ' à ' + b.time.replace(':', ' h ') + '. Le rendez-vous est enregistré dans « Mes rendez-vous ».';
    $('booking-ui').classList.add('hidden');
    $('booking-done').classList.remove('hidden');
    $('bk-note').value = '';
    view.date = null; view.time = null;
    toast('Rendez-vous confirmé ✓');
    window.scrollTo(0, 0);
  }

  /* ---------- Événements ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-back],[data-book],[data-cancel],[data-day],[data-time]');
    if (!t) return;
    if (t.hasAttribute('data-go')) { e.preventDefault(); go(t.getAttribute('data-go')); }
    else if (t.hasAttribute('data-back')) { back(); }
    else if (t.hasAttribute('data-book')) {
      e.preventDefault();
      openBooking(t.getAttribute('data-book'));
    }
    else if (t.hasAttribute('data-cancel')) {
      var id = t.getAttribute('data-cancel');
      var b = state.bookings.filter(function (x) { return x.id === id; })[0];
      state.bookings = state.bookings.filter(function (x) { return x.id !== id; });
      if (b) log('Rendez-vous du ' + fmtLong(b.date) + ' annulé');
      save(); renderDashboard(); toast('Rendez-vous annulé');
    }
    else if (t.hasAttribute('data-day')) { view.date = t.getAttribute('data-day'); view.time = null; renderCalendar(); renderSlots(); }
    else if (t.hasAttribute('data-time')) { view.time = t.getAttribute('data-time'); renderSlots(); }
  });

  $('cta-start').addEventListener('click', function () { openBooking('discovery'); });
  $('cal-prev').addEventListener('click', function () { view.month = new Date(view.month.getFullYear(), view.month.getMonth() - 1, 1); renderCalendar(); });
  $('cal-next').addEventListener('click', function () { view.month = new Date(view.month.getFullYear(), view.month.getMonth() + 1, 1); renderCalendar(); });
  $('bk-topic').addEventListener('change', function () {
    view.topic = this.value;
    $('bk-title').textContent = TOPICS[view.topic].label;
    $('bk-duration').textContent = TOPICS[view.topic].min + ' min';
    renderSlots();
  });
  $('book-form').addEventListener('submit', function (e) { e.preventDefault(); confirmBooking(); });
  $('book-another').addEventListener('click', function () { view.topic = 'discovery'; renderBooking(); });

  // Paramètres
  $('profile-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('pf-name').value.trim(), email = $('pf-email').value.trim(), cal = $('pf-calendly').value.trim();
    if (!name) return setError('pf-error', 'Le prénom ne peut pas être vide.');
    if (!validEmail(email)) return setError('pf-error', 'Indiquez une adresse email valide.');
    if (cal && !/^https?:\/\//i.test(cal)) return setError('pf-error', 'Le lien Calendly doit commencer par https://');
    setError('pf-error');
    state.user.name = name; state.user.email = email;
    state.user.company = $('pf-company').value.trim(); state.user.calendly = cal;
    log('Profil mis à jour');
    save(); renderNav();
    toast('Modifications enregistrées ✓');
  });

  /* ---------- Démarrage ---------- */
  renderOffers();
  go('home', { back: true });
})();
