/* ============================================================
   Gazberry — логика и анимации (Anime.js v3).
   Если Anime.js не загрузился или включено «уменьшить движение»,
   сайт остаётся полностью рабочим, просто без анимаций.
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.GB_CONFIG, MENU = window.GB_MENU, I18N = window.GB_I18N, ICONS = window.GB_ICONS, FLAVORS = window.GB_FLAVORS;
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A = window.anime;
  var motion = !!A && !reduced;
  if (motion) root.classList.add('js-anim');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var lang = root.lang === 'en' ? 'en' : 'uk';
  var L = function (v) { return Array.isArray(v) ? v[lang === 'en' ? 1 : 0] : v; };
  var t = function (k) { return (I18N[lang] && I18N[lang][k]) || k; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var num = function (v, dec) { return v.toFixed(dec || 0).replace('.', lang === 'en' ? '.' : ','); };
  var icon = function (id) { return '<svg viewBox="0 0 48 48" aria-hidden="true">' + (ICONS[id] || '') + '</svg>'; };
  var jump = function (sel) { var el = $(sel); if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); };

  /* ---------- ссылки из конфига ---------- */
  var LINKS = { instagram: CFG.instagram, phone: 'tel:' + CFG.phone, maps: CFG.maps, pdf: CFG.menuPdf };
  $$('[data-link]').forEach(function (a) { a.href = LINKS[a.dataset.link]; });
  $$('[data-label="phone"]').forEach(function (a) { a.textContent = CFG.phoneLabel; });
  $$('[data-label="instagram"]').forEach(function (a) { a.textContent = CFG.instagramLabel; });
  $('#year').textContent = new Date().getFullYear();
  var itemCount = MENU.reduce(function (n, c) { return n + c.groups.reduce(function (m, g) { return m + g.items.length; }, 0); }, 0);

  /* ---------- открыто / закрыто (время Киева) ---------- */
  function kyivHour() {
    var zones = ['Europe/Kyiv', 'Europe/Kiev'];
    for (var i = 0; i < zones.length; i++) {
      try { return parseInt(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: zones[i] }).format(new Date()), 10) % 24; } catch (e) {}
    }
    return new Date().getHours();
  }
  function isOpenHour(h) { return h >= CFG.openHour || h < CFG.closeHour; }
  function updateOpen() {
    var open = isOpenHour(kyivHour());
    $$('[data-open]').forEach(function (el) {
      el.classList.toggle('is-open', open);
      el.lastElementChild.textContent = t(open ? 'open.yes' : 'open.no');
    });
  }
  setInterval(updateOpen, 60000);

  /* ---------- i18n ---------- */
  function applyLang() {
    root.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    $$('.lang button').forEach(function (b) { b.classList.toggle('is-on', b.dataset.lang === lang); b.setAttribute('aria-pressed', b.dataset.lang === lang); });
    document.title = lang === 'en' ? 'Gazberry — hookah lounge in Chernihiv' : 'Gazberry — кальянна у Чернігові';
    $$('[data-num]').forEach(function (el) { el.textContent = num(parseFloat(el.dataset.num), 1); });
    $$('[data-count]').forEach(function (el) { if (el.dataset.done) setCount(el, countTarget(el)); });
    updateOpen();
    renderTabs();
    renderMenu(false);
    if (okState) fillOk();
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang; store.set('gb-lang', lang);
      applyLang();
      if (motion) {
        A({ targets: $$('main [data-i18n]').filter(inView), opacity: [0, 1], translateY: [8, 0], duration: 520, delay: A.stagger(14), easing: 'easeOutCubic' });
        animateMenuItems();
      }
    });
  });
  function inView(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && getComputedStyle(el).opacity !== '0'; }

  /* ---------- тема ---------- */
  var themeBtn = $('#themeBtn');
  function setTheme(v) {
    root.dataset.theme = v; store.set('gb-theme', v);
    var m = $('meta[name="theme-color"]'); if (m) m.content = v === 'light' ? '#f6efe3' : '#0b0b0c';
    heroSmoke.recolor();
  }
  themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    var r = themeBtn.getBoundingClientRect();
    root.style.setProperty('--tx', (r.left + r.width / 2) + 'px');
    root.style.setProperty('--ty', (r.top + r.height / 2) + 'px');
    if (motion && document.startViewTransition) document.startViewTransition(function () { setTheme(next); });
    else setTheme(next);
    if (motion) A({ targets: themeBtn, scale: [.8, 1], duration: 700, easing: 'easeOutElastic(1, .5)' });
  });

  /* ---------- навигация ---------- */
  var nav = $('#nav'), progress = $('#progress'), burger = $('#burger'), navLinks = $('#navLinks');
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-stuck', y > 30);
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function closeNav() { navLinks.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    if (open && motion) A({ targets: '#navLinks a', opacity: [0, 1], translateX: [-18, 0], delay: A.stagger(60), duration: 500, easing: 'easeOutCubic' });
  });
  navLinks.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });

  /* ---------- меню ---------- */
  var tabs = $('#tabs'), pill = $('#tabsPill'), panel = $('#menuPanel');
  var activeCat = MENU[0].id;

  function renderTabs() {
    $$('button', tabs).forEach(function (b) { b.remove(); });
    MENU.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.cat = c.id;
      b.innerHTML = icon(c.id) + '<span>' + esc(L(c.t)) + '</span>';
      b.setAttribute('aria-selected', String(c.id === activeCat));
      tabs.appendChild(b);
    });
    movePill(false);
  }
  function movePill(animate) {
    var b = $('button[aria-selected="true"]', tabs); if (!b) return;
    var to = { left: b.offsetLeft, width: b.offsetWidth };
    if (animate && motion) A({ targets: pill, left: to.left, width: to.width, duration: 650, easing: 'easeOutElastic(1, .8)' });
    else { pill.style.left = to.left + 'px'; pill.style.width = to.width + 'px'; }
  }
  function itemHTML(it) {
    return '<div class="mi"><div class="mi__top"><span class="mi__name">' + esc(L(it[0])) + '</span><span class="mi__dots"></span><span class="mi__price">' + it[1] + '&nbsp;₴</span></div>' +
      (it[2] ? '<p class="mi__desc">' + esc(L(it[2])) + '</p>' : '') + '</div>';
  }
  function renderMenu(animate) {
    var cat = MENU.filter(function (c) { return c.id === activeCat; })[0];
    panel.innerHTML = '<h3 class="menu-title"><span class="menu-ico">' + icon(cat.id) + '</span><span>' + esc(L(cat.t)) + '</span></h3>' + cat.groups.map(function (g) {
      return '<div class="menu-group">' + (g.t && cat.groups.length > 1 ? '<h4>' + esc(L(g.t)) + '</h4>' : '') +
        '<div class="menu-list">' + g.items.map(itemHTML).join('') + '</div></div>';
    }).join('') + (cat.id === 'hookah' ? hbHTML() : '');
    if (animate) animateMenuItems();
  }
  function animateMenuItems() {
    if (!motion) return;
    A.remove('#menuPanel *');
    A({ targets: '#menuPanel .menu-title', opacity: [0, 1], letterSpacing: ['.5em', '.22em'], duration: 800, easing: 'easeOutExpo' });
    A({ targets: '#menuPanel .menu-ico', scale: [0, 1], rotate: [-90, 0], duration: 900, easing: 'easeOutElastic(1, .6)' });
    A({ targets: '#menuPanel h4', opacity: [0, 1], duration: 600, delay: A.stagger(80, { start: 120 }), easing: 'linear' });
    A({ targets: '#menuPanel .mi, #menuPanel .hb > *', opacity: [0, 1], translateY: [22, 0], duration: 700, delay: A.stagger(28, { start: 120 }), easing: 'easeOutExpo' });
  }
  function selectCat(id, animate) {
    if (id === activeCat) return;
    activeCat = id;
    var btn = null;
    $$('button', tabs).forEach(function (x) { var on = x.dataset.cat === id; x.setAttribute('aria-selected', String(on)); if (on) btn = x; });
    movePill(animate);
    if (btn) tabs.scrollTo({ left: btn.offsetLeft - (tabs.clientWidth - btn.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    renderMenu(animate);
  }
  tabs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) selectCat(b.dataset.cat, true); });
  addEventListener('resize', function () { movePill(false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { movePill(false); });

  /* ---------- конструктор кальяна: крепость + вкус ---------- */
  var hb = { s: null, f: [] };
  function hbSummary() {
    var parts = [];
    if (hb.s !== null) parts.push(L(MENU[0].groups[0].items[hb.s][0]));
    if (hb.f.length) parts.push(hb.f.map(function (i) { return L(FLAVORS[i]); }).join(', '));
    return parts.join(' · ');
  }
  function hbReady() { return hb.s !== null && hb.f.length > 0; }
  function hbHTML() {
    var chip = function (kind, i, label, on, off) {
      return '<button type="button" data-hb="' + kind + '" data-i="' + i + '" aria-pressed="' + on + '"' + (off ? ' disabled' : '') + '>' + esc(label) + '</button>';
    };
    return '<div class="hb" id="hb"><h4>' + esc(t('hb.title')) + '</h4>' +
      '<div class="hb__row"><span class="hb__label">' + esc(t('hb.strength')) + '</span><div class="hb__chips">' +
      MENU[0].groups[0].items.map(function (it, i) { return chip('s', i, L(it[0]), hb.s === i); }).join('') + '</div></div>' +
      '<div class="hb__row"><span class="hb__label">' + esc(t('hb.flavor')) + '</span><div class="hb__chips">' +
      FLAVORS.map(function (f, i) { var on = hb.f.indexOf(i) > -1; return chip('f', i, L(f), on, !on && hb.f.length >= 3); }).join('') + '</div></div>' +
      '<div class="hb__foot"><span class="hb__sum">' + esc(hbSummary() || t('hb.pick')) + '</span>' +
      '<a class="btn btn--gold" id="hbCta" href="#booking" aria-disabled="' + !hbReady() + '"><span>' + esc(t('hb.cta')) + '</span></a>' +
      '<span class="hb__note">' + esc(t('hb.note')) + '</span></div></div>';
  }
  panel.addEventListener('click', function (e) {
    var b = e.target.closest('[data-hb]');
    if (b) {
      var i = parseInt(b.dataset.i, 10);
      if (b.dataset.hb === 's') hb.s = hb.s === i ? null : i;
      else { var at = hb.f.indexOf(i); if (at > -1) hb.f.splice(at, 1); else if (hb.f.length < 3) hb.f.push(i); }
      var old = $('#hb'), box = document.createElement('div');
      box.innerHTML = hbHTML(); old.replaceWith(box.firstChild);
      var again = $('[data-hb="' + b.dataset.hb + '"][data-i="' + i + '"]', panel);
      if (again) { again.focus({ preventScroll: true }); if (motion) A({ targets: again, scale: [.86, 1], duration: 600, easing: 'easeOutElastic(1, .5)' }); }
      return;
    }
    var cta = e.target.closest('#hbCta');
    if (cta) {
      e.preventDefault();
      if (!hbReady()) return;
      $('#bWish').value = t('hb.wish') + ': ' + hbSummary().toLowerCase();
      jump('#booking');
    }
  });

  /* ---------- карточки «про нас» ведут в меню / контакты ---------- */
  $$('.card[data-go]').forEach(function (card) {
    function go() {
      if (card.dataset.go === 'contacts') return jump('#contacts');
      selectCat(card.dataset.go, true);
      jump('#menu');
    }
    card.addEventListener('click', go);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });

  /* ---------- бронирование ---------- */
  var form = $('#bookForm'), okBox = $('#bookOk'), fail = $('#bookFail');
  var fName = $('#bName'), fPhone = $('#bPhone'), fDate = $('#bDate'), fTime = $('#bTime'), fWish = $('#bWish'), fGuests = $('#bGuests');
  var guests = 2, okState = null;
  function isoDate(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  fDate.min = fDate.value = isoDate(new Date());
  $$('.stepper button').forEach(function (b) {
    b.addEventListener('click', function () {
      guests = Math.max(1, Math.min(20, guests + parseInt(b.dataset.step, 10)));
      fGuests.textContent = guests;
      if (motion) A({ targets: fGuests, scale: [1.35, 1], duration: 450, easing: 'easeOutBack' });
    });
  });
  fPhone.addEventListener('focus', function () { if (!fPhone.value) fPhone.value = '+380 '; });
  fPhone.addEventListener('input', function () { fPhone.value = fPhone.value.replace(/[^\d+\s()-]/g, ''); });
  [fName, fPhone, fDate, fTime].forEach(function (el) { el.addEventListener('input', function () { el.closest('.field').classList.remove('is-bad'); fail.hidden = true; }); });

  function validate() {
    var digits = fPhone.value.replace(/\D/g, ''), h = parseInt(fTime.value.slice(0, 2), 10);
    var bad = [];
    if (fName.value.trim().length < 2) bad.push(fName);
    if (digits.length < 10 || digits.length > 13) bad.push(fPhone);
    if (!fDate.value || fDate.value < isoDate(new Date())) bad.push(fDate);
    if (!fTime.value || !isOpenHour(h)) bad.push(fTime);
    [fName, fPhone, fDate, fTime].forEach(function (el) { el.closest('.field').classList.toggle('is-bad', bad.indexOf(el) > -1); });
    if (bad.length) {
      bad[0].focus();
      if (motion) A({ targets: bad.map(function (el) { return el.closest('.field'); }), translateX: [0, -8, 8, -5, 5, 0], duration: 450, easing: 'easeInOutSine' });
    }
    return !bad.length;
  }
  function bookingData() {
    return { name: fName.value.trim(), phone: fPhone.value.trim(), guests: guests, date: fDate.value, time: fTime.value, wish: fWish.value.trim() };
  }
  function bookingText(d) {
    var p = d.date.split('-');
    return t('b.msg.head') + '\n' + d.name + ', ' + d.phone + '\n' + t('b.msg.guests') + ': ' + d.guests + '\n' +
      t('b.msg.when') + ': ' + p[2] + '.' + p[1] + '.' + p[0] + ', ' + d.time + (d.wish ? '\n' + d.wish : '');
  }
  function fillOk() {
    $('#bookOkTitle').textContent = t(okState.sent ? 'b.ok.title.sent' : 'b.ok.title');
    $('#bookOkText').textContent = t(okState.sent ? 'b.ok.sent' : 'b.ok.text');
    $('#bookOkMsg').textContent = bookingText(okState.data);
    $('#bookOkCta').hidden = okState.sent;
  }
  function showOk(data, sent) {
    okState = { data: data, sent: sent };
    fillOk(); form.hidden = true; okBox.hidden = false;
    if (motion) {
      var marks = $$('.book-ok__mark *');
      marks.forEach(function (p) { var len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
      A({ targets: marks, strokeDashoffset: 0, duration: 900, delay: A.stagger(350), easing: 'easeInOutQuart' });
      A({ targets: '#bookOk > *', opacity: [0, 1], translateY: [24, 0], duration: 800, delay: A.stagger(90), easing: 'easeOutExpo' });
    }
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault(); fail.hidden = true;
    if (!validate()) return;
    var data = bookingData(), btn = $('button[type="submit"]', form);
    if (CFG.bookingEndpoint) {
      btn.disabled = true;
      fetch(CFG.bookingEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); showOk(data, true); })
        .catch(function () { fail.hidden = false; })
        .then(function () { btn.disabled = false; });
    } else {
      var text = bookingText(data);
      try { if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {}); } catch (err) {}
      showOk(data, false);
    }
  });
  $('#bookAgain').addEventListener('click', function () { okState = null; okBox.hidden = true; form.hidden = false; fName.focus(); });

  /* ---------- счётчики ---------- */
  function countTarget(el) { return el.dataset.count === 'items' ? itemCount : parseFloat(el.dataset.count); }
  function setCount(el, v) { el.textContent = num(v, parseInt(el.dataset.dec || '0', 10)) + (el.dataset.suffix || ''); }
  function runCount(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    var target = countTarget(el), o = { v: 0 };
    if (!motion) return setCount(el, target);
    A({ targets: o, v: target, duration: 1800, easing: 'easeOutExpo', update: function () { setCount(el, o.v); }, complete: function () { setCount(el, target); } });
  }

  /* ---------- появление блоков при скролле ---------- */
  function reveal(el) {
    $$('[data-count]', el).forEach(runCount);
    if (el.querySelector('#scoreArc') && motion) A({ targets: '#scoreArc', strokeDashoffset: [326.7, 32.7], duration: 2000, easing: 'easeInOutQuart' });
    if (!motion) return;
    var own = el.hasAttribute('data-stagger') ? el.children : el;
    A({
      targets: own, opacity: [0, 1], translateY: [40, 0], duration: 1000, delay: A.stagger(110), easing: 'easeOutExpo',
      complete: function () { $$('.tilt', el).forEach(function (c) { c.style.transform = ''; c.dataset.shown = '1'; }); }
    });
    $$('[data-stagger]', el).forEach(function (s) {
      A({ targets: s.children, opacity: [0, 1], scale: [.8, 1], duration: 700, delay: A.stagger(70, { start: 350 }), easing: 'easeOutBack' });
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); reveal(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    root.classList.remove('js-anim'); $$('.reveal').forEach(reveal);
  }

  /* ---------- 3D-наклон карточек и подсветка за курсором ---------- */
  if (motion && matchMedia('(hover: hover)').matches) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--cx', x * 100 + '%'); card.style.setProperty('--cy', y * 100 + '%');
        if (!card.dataset.shown) return; // не мешаем анимации появления
        card.style.transition = 'transform .25s ease-out, border-color .4s';
        card.style.transform = 'rotateY(' + (x - .5) * 10 + 'deg) rotateX(' + (.5 - y) * 10 + 'deg) translateZ(8px)';
      });
      card.addEventListener('pointerleave', function () {
        if (!card.dataset.shown) return;
        card.style.transition = 'transform .9s cubic-bezier(.2, 1.4, .4, 1), border-color .4s';
        card.style.transform = '';
      });
    });
    var hero = $('#hero');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px'); hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    // «магнитные» кнопки
    $$('.btn, .fab').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        A.remove(b);
        A({ targets: b, translateX: (e.clientX - r.left - r.width / 2) * .22, translateY: (e.clientY - r.top - r.height / 2) * .3, duration: 250, easing: 'easeOutQuad' });
      });
      b.addEventListener('pointerleave', function () {
        A.remove(b);
        A({ targets: b, translateX: 0, translateY: 0, duration: 800, easing: 'easeOutElastic(1, .5)' });
      });
    });
  }

  /* ---------- дым (canvas) ----------
     rise: false — густой дым в hero, медленно плывёт вверх;
     rise: true  — экран загрузки: дым поднимается снизу и заполняет экран. */
  function createSmoke(c, o) {
    var ctx = c.getContext('2d'), sprite, parts = [], w = 0, h = 0, raf = 0, visible = true, dead = false;
    function makeSprite() {
      var rgb = getComputedStyle(root).getPropertyValue('--smoke-c').trim() || '236,214,182';
      sprite = document.createElement('canvas'); sprite.width = sprite.height = 256;
      var g = sprite.getContext('2d'), grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(' + rgb + ',.4)'); grad.addColorStop(.4, 'rgba(' + rgb + ',.13)'); grad.addColorStop(1, 'rgba(' + rgb + ',0)');
      g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
    }
    function spawn(p, initial) {
      var k = Math.max(.6, h / 800);
      if (o.rise) {
        p.r = (170 + Math.random() * 280) * k; p.x = Math.random() * w;
        p.y = h + p.r + (initial ? Math.random() * h * .55 : 0);
        p.r *= Math.max(.6, Math.min(1, w / 900));
        p.vy = (2.4 + Math.random() * 3) * k; p.vx = (Math.random() - .5) * .8; p.max = .3 + Math.random() * .45; p.grow = .5;
      } else {
        var s = Math.max(.55, Math.min(1, w / 1000));
        p.x = w * (.05 + Math.random() * .9); p.y = initial ? Math.random() * h : h + 140;
        p.r = (130 + Math.random() * 240) * s; p.vy = .3 + Math.random() * .55; p.vx = (Math.random() - .5) * .3;
        p.max = .3 + Math.random() * .45; p.grow = (.1 + Math.random() * .18) * s;
      }
      p.a = 0; p.ph = Math.random() * 6.28;
      return p;
    }
    function resize() {
      var dpr = Math.min(devicePixelRatio || 1, 1.5);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!motion) draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        ctx.globalAlpha = p.a; ctx.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
    }
    function tick(ts) {
      if (dead) return;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.x += p.vx + Math.sin(ts / 2400 + p.ph) * (o.rise ? .9 : .4); p.r += p.grow;
        if (o.rise) p.a = p.max * Math.max(0, Math.min(1, (h + p.r - p.y) / (h * .3)));
        else { var life = p.y / h; p.a = p.max * Math.max(0, Math.min(1, (1.15 - life) * 3)) * Math.max(0, Math.min(1, (life + .25) * 2)); }
        if (p.y < -p.r) spawn(p, false);
      }
      draw();
      raf = visible ? requestAnimationFrame(tick) : 0;
    }
    makeSprite(); resize();
    // количество клубов зависит от площади экрана, чтобы на телефоне дым не превращался в сплошную заливку
    var count = Math.round(Math.max(o.count * .4, Math.min(o.count, w * h / o.area)));
    for (var i = 0; i < count; i++) parts.push(spawn({}, true));
    addEventListener('resize', resize);
    if (motion) {
      raf = requestAnimationFrame(tick);
      if (!o.rise && 'IntersectionObserver' in window) new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible && !raf && !dead) raf = requestAnimationFrame(tick);
      }).observe(c);
    } else { parts.forEach(function (p) { p.a = p.max * .6; }); draw(); }
    return {
      recolor: function () { makeSprite(); if (!motion) draw(); },
      stop: function () { dead = true; cancelAnimationFrame(raf); removeEventListener('resize', resize); }
    };
  }
  var heroSmoke = createSmoke($('#smoke'), { count: 44, area: 26000, rise: false });

  /* ---------- первичная отрисовка ---------- */
  $('#map').src = CFG.mapEmbed;
  applyLang();

  /* ---------- вступительная анимация hero ---------- */
  function heroIntro() {
    var draws = $$('#heroLogo .draw');
    draws.forEach(function (p) { var len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
    A.timeline({ easing: 'easeOutExpo' })
      .add({ targets: '#heroRing', opacity: [0, 1], rotate: [-200, 0], scale: [.6, 1], duration: 1700, easing: 'easeOutQuart' }, 0)
      .add({ targets: draws, strokeDashoffset: 0, duration: 1300, delay: A.stagger(170), easing: 'easeInOutQuart' }, 200)
      .add({ targets: '.hero__kicker', opacity: [0, 1], translateY: [20, 0], duration: 900 }, 600)
      .add({ targets: '#heroTitle', opacity: [0, 1], translateY: [50, 0], letterSpacing: ['.6em', '.12em'], duration: 1800 }, 700)
      .add({ targets: ['.hero__lead', '.hero__cta', '.hero__rating'], opacity: [0, 1], translateY: [26, 0], duration: 1000, delay: A.stagger(130) }, 1200)
      .add({ targets: '.hero__scroll', opacity: [0, 1], duration: 900, easing: 'linear' }, 2000)
      .finished.then(function () {
        A({ targets: '#heroRing', rotate: 360, duration: 48000, easing: 'linear', loop: true });
        A({ targets: '#heroLogo', translateY: [0, -8], duration: 3200, direction: 'alternate', loop: true, easing: 'easeInOutSine' });
      });
    // параллакс hero при скролле
    var inner = $('.hero__inner');
    addEventListener('scroll', function () {
      var y = scrollY; if (y > innerHeight) return;
      inner.style.transform = 'translateY(' + y * .22 + 'px)'; inner.style.opacity = String(Math.max(0, 1 - y / (innerHeight * .8)));
    }, { passive: true });
  }

  /* ---------- экран загрузки: дым поднимается снизу, из него вырастает логотип ---------- */
  var loader = $('#loader');
  function endLoading() { root.classList.remove('loading'); if (loader) { loader.remove(); loader = null; } }
  if (!motion) endLoading();
  else if (!root.classList.contains('loading')) { endLoading(); heroIntro(); }
  else {
    var loadSmoke = createSmoke($('#loaderSmoke'), { count: 60, area: 16000, rise: true });
    A.timeline()
      .add({
        targets: '#loaderLogo', opacity: [0, 1], translateY: [innerHeight * .5, 0], scale: [.1, 1],
        filter: ['blur(28px)', 'blur(0px)'], duration: 2200, easing: 'easeOutQuart'
      }, 700)
      .add({ targets: '#loaderRing', rotate: [-180, 0], duration: 2200, easing: 'easeOutQuart' }, 700)
      .add({ targets: '#loaderLogo', scale: 1.08, duration: 500, easing: 'easeInOutSine' }, 2900)
      .add({
        targets: '#loader', opacity: [1, 0], duration: 800, easing: 'easeInOutQuad',
        begin: heroIntro,
        complete: function () { loadSmoke.stop(); endLoading(); }
      }, 3300);
  }
})();
