/* =====================================================================
   RS Software website — main interactions (no dependencies)
   ===================================================================== */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.remove('no-js');
  var CFG = window.RS_CONFIG || {};
  var BASE = doc.body.getAttribute('data-base') || '';
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var params = new URLSearchParams(location.search);

  /* ---------- Header: scroll state, mobile menu, dropdowns ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = $('.nav__toggle', header);
    if (toggle) toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
      doc.body.style.overflow = open ? 'hidden' : '';
    });

    var closeAll = function (except) {
      $$('.nav__item.is-open, .region.is-open', header).forEach(function (el) {
        if (el !== except) { el.classList.remove('is-open'); var b = el.querySelector('[aria-expanded]'); if (b) b.setAttribute('aria-expanded', 'false'); }
      });
    };
    $$('.nav__item', header).forEach(function (item) {
      var btn = item.querySelector('button.nav__link');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !item.classList.contains('is-open');
        closeAll(item); item.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open);
      });
      var t;
      item.addEventListener('mouseenter', function () { if (window.innerWidth > 960) { clearTimeout(t); closeAll(item); item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); } });
      item.addEventListener('mouseleave', function () { if (window.innerWidth > 960) { t = setTimeout(function () { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 160); } });
    });
    doc.addEventListener('click', function (e) { if (!header.contains(e.target)) closeAll(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeAI(); } });
  }

  /* ---------- Region picker ---------- */
  var regions = CFG.regions || {};
  var regionKey = store.get('rs-region');
  if (!regions[regionKey]) regionKey = CFG.defaultRegion || Object.keys(regions)[0];
  function applyRegion(key) {
    var r = regions[key]; if (!r) return;
    regionKey = key; store.set('rs-region', key);
    $$('[data-region]').forEach(function (el) {
      var f = el.getAttribute('data-region');
      if (f === 'email') { el.textContent = r.email; if (el.tagName === 'A') el.href = 'mailto:' + r.email; }
      else if (f === 'phone') { el.textContent = r.phone; if (el.tagName === 'A') el.href = 'tel:' + r.phone.replace(/[^+\d]/g, ''); }
      else if (f === 'title') { el.textContent = r.label === 'Global' ? 'Global office' : r.label + ' office'; }
      else if (f === 'region') { el.textContent = r.flag + ' ' + r.label + ' — ' + r.tagline; }
      else if (r[f] != null) el.textContent = r[f];
    });
    // Regional page content (e.g. products/bill-edge.html): show this region's version of each group, else Global.
    var groups = {};
    $$('[data-region-content]').forEach(function (el) { var g = el.getAttribute('data-region-group'); (groups[g] = groups[g] || []).push(el); });
    Object.keys(groups).forEach(function (g) {
      var list = groups[g], want = list.some(function (el) { return el.getAttribute('data-region-content') === key; }) ? key : 'global';
      list.forEach(function (el) { el.hidden = el.getAttribute('data-region-content') !== want; });
    });
    $$('.region__opt').forEach(function (o) { o.setAttribute('aria-selected', o.getAttribute('data-key') === key); });
    $$('.office-chip').forEach(function (o) { o.setAttribute('aria-pressed', o.getAttribute('data-key') === key); });
  }
  $$('.region').forEach(function (wrap) {
    var btn = wrap.querySelector('.region__btn'), menu = wrap.querySelector('.region__menu');
    Object.keys(regions).forEach(function (k) {
      var r = regions[k], li = doc.createElement('li');
      li.innerHTML = '<button type="button" class="region__opt" role="option" data-key="' + k + '"><span class="region__flag">' + r.flag + '</span><span><b>' + r.label + '</b><small>' + r.tagline + '</small></span></button>';
      menu.appendChild(li);
    });
    btn.addEventListener('click', function (e) { e.stopPropagation(); var o = wrap.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); });
    menu.addEventListener('click', function (e) {
      var o = e.target.closest('.region__opt'); if (!o) return;
      applyRegion(o.getAttribute('data-key')); wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false');
    });
  });
  var chipWrap = $('#office-chips');
  if (chipWrap) {
    Object.keys(regions).forEach(function (k) {
      var r = regions[k], b = doc.createElement('button');
      b.type = 'button'; b.className = 'office-chip'; b.setAttribute('data-key', k);
      b.innerHTML = '<b>' + r.flag + ' ' + r.label + '</b><small>' + r.office + ' · ' + r.email + '</small>';
      b.addEventListener('click', function () { applyRegion(k); var c = $('#office-card'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
      chipWrap.appendChild(b);
    });
  }
  applyRegion(regionKey);

  /* ---------- Reveal on scroll + count-up ---------- */
  function countUp(el) {
    var raw = el.getAttribute('data-count'), m = raw.match(/^([^\d]*)(\d[\d.,]*)(.*)$/);
    if (!m) return;
    var pre = m[1], num = parseFloat(m[2].replace(/,/g, '')), suf = m[3], dec = (m[2].split('.')[1] || '').length, comma = m[2].indexOf(',') > -1;
    var t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3), v = (num * e).toFixed(dec);
      if (comma) v = Number(v).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      el.textContent = pre + v + suf; if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        $$('[data-count]', en.target).concat(en.target.hasAttribute('data-count') ? [en.target] : []).forEach(function (c) { if (!c._done) { c._done = 1; countUp(c); } });
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal, [data-observe]').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('is-in'); }); }

  /* ---------- Generic tabs: [data-tabs] > [role=tab][aria-controls] ---------- */
  $$('[data-tabs]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        var ids = (t.getAttribute('aria-controls') || '').split(' ');
        ids.forEach(function (id) { var p = doc.getElementById(id); if (p) p.hidden = !on; });
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); select(n); }
      });
    });
  });

  /* ---------- Home: role selector dims non-matching products ---------- */
  var roleBtns = $$('.role');
  roleBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      roleBtns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', on);
      var list = on ? b.getAttribute('data-products').split(',') : null;
      $$('.pcard[data-product]').forEach(function (c) { c.classList.toggle('is-dim', !!list && list.indexOf(c.getAttribute('data-product')) === -1); });
      doc.dispatchEvent(new CustomEvent('rs:roles', { detail: list }));
    });
  });


  /* ---------- "What we build": Magic Transform flow ----------
     Documents move left→right at a steady beat; the part past the axis
     is revealed as the product outcome, with a particle burst on the axis. */
  $$('[data-mt]').forEach(function (mt) {
    var data = JSON.parse(mt.getAttribute('data-mt')), stage = $('.mt__stage', mt);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var BEAT = 4, items = [], idx = 0, running = false, hover = false, last = 0, filter = null;
    function dims() { var cs = getComputedStyle(mt); return { w: parseFloat(cs.getPropertyValue('--w')), g: parseFloat(cs.getPropertyValue('--gap')), W: mt.clientWidth }; }
    function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function next() {
      for (var n = 0; n < data.length; n++) { var d = data[idx++ % data.length]; if (!filter || filter.indexOf(d.p) > -1) return d; }
      return data[idx++ % data.length];
    }
    function make(d, x) {
      var el = doc.createElement('div'); el.className = 'mt__item'; el.style.setProperty('--pc', d.c);
      el.innerHTML = '<div class="mt__face mt__in"><span class="k">' + esc(d.k) + '</span><span class="t">' + esc(d.t) + '</span><span class="m">' + esc(d.m) + '</span><span class="ln"></span><span class="ln"></span><span class="ln"></span><span class="stamp"><i></i><i></i></span></div>' +
        '<div class="mt__face mt__out"><img src="' + BASE + 'assets/img/logo-' + d.p + '.webp" alt=""><span class="rk">' + esc(d.rk) + '</span><span class="rv">' + esc(d.rv) + '</span><ul><li>' + esc(d.rl[0]) + '</li><li>' + esc(d.rl[1]) + '</li></ul></div>';
      stage.appendChild(el);
      var it = { el: el, x: x, d: d, inF: el.firstChild, outF: el.lastChild, emitT: 0 };
      place(it, dims()); return it;
    }
    function place(it, m) {
      var axis = m.W / 2, cut = Math.max(0, Math.min(m.w, axis - it.x));
      it.el.style.transform = 'translateX(' + it.x + 'px)';
      it.inF.style.clipPath = 'inset(0 ' + (m.w - cut) + 'px 0 0)';
      it.outF.style.clipPath = 'inset(0 0 0 ' + cut + 'px)';
      it.crossing = cut > 0 && cut < m.w;
    }
    function burst(it, m) {
      var h = it.el.offsetHeight, top = mt.clientHeight / 2 - h / 2;
      for (var i = 0; i < 3; i++) {
        var p = doc.createElement('span'); p.className = 'mt__p' + (Math.random() > .5 ? ' round' : '');
        p.style.setProperty('--pc', Math.random() > .25 ? it.d.c : '#14b8a6');
        p.style.top = (top + Math.random() * h) + 'px';
        p.style.setProperty('--dx', (20 + Math.random() * 70) + 'px');
        p.style.setProperty('--dy', ((Math.random() - .5) * 90) + 'px');
        p.style.setProperty('--r', (Math.random() * 360) + 'deg');
        p.addEventListener('animationend', function () { this.remove(); });
        mt.appendChild(p);
      }
    }
    function fill() {
      var m = dims(), step = m.w + m.g;
      items.forEach(function (it) { it.el.remove(); }); items = [];
      for (var x = m.W - step * 0.35; x > -m.w - step; x -= step) items.unshift(make(next(), x));
    }
    function tick(ts) {
      if (!running) return;
      var dt = last ? Math.min((ts - last) / 1000, .05) : 0; last = ts;
      var m = dims(), speed = hover ? 0 : (m.w + m.g) / BEAT;
      items.forEach(function (it) {
        it.x += speed * dt; place(it, m);
        if (it.crossing && speed) { it.emitT -= dt; if (it.emitT <= 0) { burst(it, m); it.emitT = .16; } }
      });
      while (items.length && items[items.length - 1].x > m.W + 10) items.pop().el.remove();
      var first = items[0];
      if (!first || first.x > -m.w + m.g) items.unshift(make(next(), (first ? first.x : 0) - (m.w + m.g)));
      requestAnimationFrame(tick);
    }
    fill();
    if (reduce) return;
    mt.addEventListener('mouseenter', function () { hover = true; });
    mt.addEventListener('mouseleave', function () { hover = false; });
    var vis = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting && !running) { running = true; last = 0; requestAnimationFrame(tick); } else if (!e.isIntersecting) running = false; });
    });
    vis.observe(mt);
    var rw; window.addEventListener('resize', function () { clearTimeout(rw); rw = setTimeout(fill, 150); });
    // Follow the "I'M A —" role selector
    doc.addEventListener('rs:roles', function (e) { filter = e.detail; });
  });


  /* ---------- Home brand film: muted autoplay preview → click opens overlay player with sound ---------- */
  $$('[data-film]').forEach(function (btn) {
    var loop = btn.querySelector('.film__loop');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && loop) { loop.removeAttribute('autoplay'); loop.pause(); }
    var modal, player, lastFocus;
    function build() {
      modal = doc.createElement('div'); modal.className = 'film-modal';
      modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'RS Software film');
      modal.innerHTML = '<button class="film-modal__close" type="button" aria-label="Close video"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button><video controls playsinline preload="none"></video>';
      player = modal.querySelector('video'); player.src = btn.getAttribute('data-film');
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      modal.querySelector('.film-modal__close').addEventListener('click', close);
      modal.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') { e.preventDefault(); (doc.activeElement === player ? modal.querySelector('.film-modal__close') : player).focus(); }
      });
      doc.body.appendChild(modal);
    }
    function open() {
      if (!modal) build();
      lastFocus = btn; modal.classList.add('is-open'); doc.body.style.overflow = 'hidden';
      if (loop) loop.pause();
      player.currentTime = 0; var pr = player.play(); if (pr && pr.catch) pr.catch(function () {});
      modal.querySelector('.film-modal__close').focus();
    }
    function close() {
      player.pause(); modal.classList.remove('is-open'); doc.body.style.overflow = '';
      if (loop && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { var p = loop.play(); if (p && p.catch) p.catch(function () {}); }
      if (lastFocus) lastFocus.focus();
    }
    btn.addEventListener('click', open);
  });

  /* ---------- Rotating steppers (How we work, stakeholder carousel) ---------- */
  $$('[data-stepper]').forEach(function (wrap) {
    var data = JSON.parse(wrap.getAttribute('data-stepper'));
    var i = 0, timer, delay = +(wrap.getAttribute('data-interval') || 5000);
    var ctrls = $$('[data-step]', wrap);
    function show(n) {
      i = (n + data.length) % data.length; var d = data[i];
      wrap.style.setProperty('--step', d.color); wrap.style.setProperty('--sc', d.color);
      $$('[data-field]', wrap).forEach(function (el) {
        var f = el.getAttribute('data-field');
        if (f === 'num') el.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(data.length).padStart(2, '0');
        else if (d[f] != null) el.textContent = d[f];
      });
      ctrls.forEach(function (c) { c.setAttribute('aria-selected', +c.getAttribute('data-step') === i); });
      $$('[data-pane]', wrap).forEach(function (p) { p.classList.toggle('is-active', +p.getAttribute('data-pane') === i); });
      var vis = $('[data-bg]', wrap); if (vis && d.bg) vis.style.background = d.bg;
      $$('[data-icon]', wrap).forEach(function (p) { p.style.display = +p.getAttribute('data-icon') === i ? '' : 'none'; });
    }
    function play() { stop(); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(function () { show(i + 1); }, delay); }
    function stop() { clearInterval(timer); }
    ctrls.forEach(function (c) { c.addEventListener('click', function () { show(+c.getAttribute('data-step')); play(); }); });
    wrap.addEventListener('mouseenter', stop); wrap.addEventListener('mouseleave', play);
    wrap.addEventListener('focusin', stop);
    show(0); play();
  });

  /* ---------- Accordion ---------- */
  $$('.acc').forEach(function (acc) {
    var items = $$('.acc__item', acc);
    items.forEach(function (it) {
      var b = it.querySelector('.acc__btn');
      b.addEventListener('click', function () {
        var open = !it.classList.contains('is-open');
        items.forEach(function (x) { x.classList.remove('is-open'); x.querySelector('.acc__btn').setAttribute('aria-expanded', 'false'); });
        it.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
      });
    });
  });

  /* ---------- Deep links: #id in the URL opens a closed accordion and lands on the target
     after late layout (fonts, images, giant-header fitting) has settled ---------- */
  function goHash(smooth) {
    var id = decodeURIComponent((location.hash || '').slice(1)); if (!id) return;
    var t = doc.getElementById(id); if (!t) return;
    var it = t.closest('.acc__item') || (t.classList.contains('acc__item') ? t : null);
    var land = function () { t.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }); };
    if (it && !it.classList.contains('is-open')) {
      var b = it.querySelector('.acc__btn'); if (b) b.click();
      setTimeout(land, 550);              // wait for the accordion panels to finish opening/closing
    }
    land();
  }
  if (location.hash) {
    goHash(false);
    window.addEventListener('load', function () { setTimeout(function () { goHash(false); }, 60); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { goHash(false); });
  }
  window.addEventListener('hashchange', function () { goHash(true); });

  /* ---------- Custom dropdowns (.dd) — listbox pattern, keyboard accessible ---------- */
  function ddSet(dd, val, silent) {
    var opts = $$('[role="option"]', dd), label = $('.dd__label', dd), hit = null;
    opts.forEach(function (o) { var on = o.getAttribute('data-value') === val; o.setAttribute('aria-selected', on); if (on) hit = o; });
    if (!hit) { val = ''; hit = opts[0]; hit.setAttribute('aria-selected', 'true'); }
    dd.setAttribute('data-value', val);
    label.textContent = val ? hit.textContent : label.getAttribute('data-default');
    dd.classList.toggle('is-active', !!val);
    if (!silent) dd.dispatchEvent(new CustomEvent('dd:change', { bubbles: true }));
  }
  $$('[data-dd]').forEach(function (dd) {
    var btn = $('.dd__btn', dd), menu = $('.dd__menu', dd), opts = $$('[role="option"]', dd);
    function open() { $$('[data-dd] .dd__menu').forEach(function (m) { if (m !== menu) { m.hidden = true; m.previousElementSibling.setAttribute('aria-expanded', 'false'); } });
      menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); (opts.filter(function (o) { return o.getAttribute('aria-selected') === 'true'; })[0] || opts[0]).focus(); }
    function close(focusBtn) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (focusBtn) btn.focus(); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); menu.hidden ? open() : close(); });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    opts.forEach(function (o, i) {
      o.addEventListener('click', function (e) { e.stopPropagation(); ddSet(dd, o.getAttribute('data-value')); close(true); });
      o.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); (opts[i + 1] || opts[0]).focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); (opts[i - 1] || opts[opts.length - 1]).focus(); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); o.click(); }
        else if (e.key === 'Escape' || e.key === 'Tab') { close(e.key === 'Escape'); }
      });
    });
    doc.addEventListener('click', function (e) { if (!dd.contains(e.target)) close(); });
  });

  /* ---------- Insights filtering ---------- */
  var ilist = $('#insight-list');
  if (ilist) {
    var q = $('#f-q'), qx = $('#f-q-clear'), ty = $('#f-type'), pr = $('#f-product'), count = $('#f-count'), empty = $('#f-empty'), clr = $('#f-clear');
    if (params.get('q')) q.value = params.get('q');
    ddSet(ty, params.get('type') || '', true); ddSet(pr, params.get('product') || '', true);
    var cards = $$('.icard', ilist);
    var run = function () {
      var s = q.value.trim().toLowerCase(), t = ty.getAttribute('data-value'), p = pr.getAttribute('data-value'), n = 0;
      cards.forEach(function (c) {
        var ok = (!t || c.getAttribute('data-type') === t) && (!p || c.getAttribute('data-product') === p) && (!s || c.textContent.toLowerCase().indexOf(s) > -1);
        c.parentElement.hidden = !ok; if (ok) n++;
      });
      count.textContent = n + (n === 1 ? ' result' : ' results');
      empty.classList.toggle('is-visible', n === 0);
      qx.hidden = !s; clr.hidden = !(s || t || p);
      var u = new URLSearchParams(); if (s) u.set('q', s); if (t) u.set('type', t); if (p) u.set('product', p);
      history.replaceState(null, '', location.pathname + (u.toString() ? '?' + u : ''));
    };
    var resetAll = function () { q.value = ''; ddSet(ty, '', true); ddSet(pr, '', true); run(); };
    q.addEventListener('input', run);
    qx.addEventListener('click', function () { q.value = ''; run(); q.focus(); });
    [ty, pr].forEach(function (d) { d.addEventListener('dd:change', run); });
    clr.addEventListener('click', resetAll);
    var reset = $('#f-reset'); if (reset) reset.addEventListener('click', resetAll);
    run();
  }

  /* ---------- Whitepaper PDF (open download): if the file isn't uploaded yet, say so ---------- */
  $$('[data-doc]').forEach(function (box) {
    var link = $('[data-doc-link]', box), status = $('[data-doc-status]', box);
    fetch(box.getAttribute('data-doc'), { method: 'HEAD' }).then(function (r) {
      if (!r.ok) throw 0;
      var kb = +r.headers.get('content-length'); if (kb) status.textContent = 'Whitepaper · PDF · ' + (kb > 1048576 ? (kb / 1048576).toFixed(1) + ' MB' : Math.round(kb / 1024) + ' KB');
    }).catch(function () {
      status.textContent = 'PDF available soon';
      link.removeAttribute('download'); link.href = BASE + 'contact.html?topic=general'; link.textContent = 'Ask our team';
      link.className = 'btn btn-outline';
    });
  });

  /* ---------- Article table of contents highlight ---------- */
  var tocLinks = $$('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) tocLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    tocLinks.forEach(function (a) { var t = doc.getElementById(a.getAttribute('href').slice(1)); if (t) tio.observe(t); });
  }

  /* ---------- "See it in action" live transaction simulation ---------- */
  $$('.sim').forEach(function (sim) {
    var lines = JSON.parse(sim.getAttribute('data-lines')), log = $('.sim__log', sim), timers = [];
    function start() {
      timers.forEach(clearTimeout); timers = []; log.innerHTML = '';
      sim.classList.add('is-playing'); sim.classList.remove('is-done');
      lines.forEach(function (l, k) {
        timers.push(setTimeout(function () {
          var d = doc.createElement('div'); d.className = l[0]; d.textContent = l[1]; log.appendChild(d);
          requestAnimationFrame(function () { d.classList.add('on'); });
          if (k === lines.length - 1) sim.classList.add('is-done');
        }, 350 + k * 520));
      });
    }
    $('.sim__play', sim).addEventListener('click', start);
    $('.sim__replay', sim).addEventListener('click', start);
  });

  /* ---------- Giant header: always one line — shrink the type to fit the width ---------- */
  var giants = $$('.giant');
  function fitGiants() {
    giants.forEach(function (g) {
      g.classList.remove('is-fit'); g.style.removeProperty('--fit');
      var r = doc.createRange(); r.selectNodeContents(g);
      var avail = g.clientWidth, need = r.getBoundingClientRect().width, size = parseFloat(getComputedStyle(g).fontSize);
      if (need > avail && avail > 0) { g.style.setProperty('--fit', Math.floor(size * avail / need * 0.98) + 'px'); g.classList.add('is-fit'); }
    });
  }
  if (giants.length) {
    fitGiants();
    var gT; window.addEventListener('resize', function () { clearTimeout(gT); gT = setTimeout(fitGiants, 60); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fitGiants);
  }

  /* ---------- Forms ---------- */
  var F = CFG.forms || { provider: 'mailto' };
  function setErr(field, msg) {
    var w = field.closest('.field, .check, .cx-set'); if (!w) return;
    w.classList.toggle('has-error', !!msg);
    var e = w.querySelector('.err'); if (!e && msg && w.classList.contains('field')) { e = doc.createElement('div'); e.className = 'err'; w.appendChild(e); }
    if (e) e.textContent = msg || '';
  }
  function validate(form) {
    var ok = true, first = null;
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'hidden' || el.closest('.hp')) return;
      var msg = '';
      if (el.type === 'radio') {
        if (!el.required) return;
        var grp = form.elements[el.name], any = false;
        Array.prototype.forEach.call(grp.length != null ? grp : [grp], function (r) { if (r.checked) any = true; });
        msg = any ? '' : 'Please choose one option.';
      }
      else if (el.type === 'checkbox' && el.closest('.cx-set')) return;
      else if (el.required && ((el.type === 'checkbox' && !el.checked) || (el.type !== 'checkbox' && !String(el.value).trim()))) msg = el.type === 'checkbox' ? 'Please confirm to continue.' : 'This field is required.';
      else if (el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value)) msg = 'Enter a valid email address.';
      else if (el.type === 'tel' && el.value && !/^[+\d][\d\s().-]{6,}$/.test(el.value)) msg = 'Enter a valid phone number.';
      else if (el.type === 'file' && el.files && el.files[0]) {
        var f = el.files[0], okExt = /\.(pdf|docx?|DOCX?|PDF)$/.test(f.name);
        if (!okExt) msg = 'Allowed types: .pdf, .doc, .docx';
        else if (f.size > (F.maxUploadMB || 8) * 1048576) msg = 'File must be under ' + (F.maxUploadMB || 8) + ' MB.';
      }
      setErr(el, msg);
      if (msg) { ok = false; if (!first) first = el; }
    });
    if (first) first.focus();
    return ok;
  }
  function toMailto(form) {
    var lines = [], fd = new FormData(form);
    fd.forEach(function (v, k) { if (typeof v === 'string' && k !== 'form-name' && k !== 'bot-field' && v) lines.push(k + ': ' + v); });
    var subj = 'Website enquiry — ' + (form.getAttribute('data-title') || form.name);
    return 'mailto:' + (F.fallbackEmail || '') + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function send(form) {
    // Gatsby site: the submission adapter in src/lib/forms (registered by gatsby-browser.js) decides where data goes.
    if (window.RS_FORMS && typeof window.RS_FORMS.submit === 'function') return window.RS_FORMS.submit(form);
    var fd = new FormData(form), p = F.provider;
    // Multi-select chips (e.g. products) → one comma-separated value, so every backend receives them
    var seen = {};
    fd.forEach(function (v, k) { seen[k] = (seen[k] || 0) + 1; });
    Object.keys(seen).forEach(function (k) { if (seen[k] > 1) { var all = fd.getAll(k); fd.delete(k); fd.append(k, all.join(', ')); } });
    if (p === 'mailto') { location.href = toMailto(form); return Promise.resolve(); }
    var url = p === 'netlify' ? (form.getAttribute('action') || '/') : p === 'php' ? BASE + (F.phpEndpoint || 'api/submit.php') : F.endpoint;
    if (!url) return Promise.reject(new Error('No form endpoint configured'));
    if (p === 'netlify' && !form.querySelector('input[type=file]')) {
      return fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd).toString() })
        .then(function (r) { if (!r.ok) throw new Error(r.status); });
    }
    if (p === 'netlify') url = '/';
    return fetch(url, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); });
  }
  $$('form.js-form').forEach(function (form) {
    // Prefill from URL (?email=, ?topic=, ?role=, ?product=)
    ['email', 'topic', 'role', 'product'].forEach(function (k) {
      var v = params.get(k), el = form.elements[k === 'topic' ? 'interest' : k];
      if (!el && k === 'product') el = form.elements.products;
      if (v && el && el.length != null && el.tagName !== 'SELECT') {
        Array.prototype.forEach.call(el, function (r) { if (r.value.toLowerCase() === v.toLowerCase()) r.checked = true; });
        return;
      }
      if (v && el && !el.value) { if (el.tagName === 'SELECT') { $$('option', el).forEach(function (o) { if (o.value.toLowerCase() === v.toLowerCase()) el.value = o.value; }); } else el.value = v; }
    });
    $$('input, select, textarea', form).forEach(function (el) { el.addEventListener('input', function () { if (el.closest('.has-error')) setErr(el, ''); }); el.addEventListener('change', function () { if (el.closest('.has-error')) setErr(el, ''); }); });
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form__status'); if (status) { status.className = 'form__status'; status.textContent = ''; }
      if (form.querySelector('[name="bot-field"]') && form.querySelector('[name="bot-field"]').value) return;
      if (!validate(form)) return;
      var btn = form.querySelector('[type=submit]'), label = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Sending…';
      send(form).then(function () {
        var ok = doc.getElementById(form.getAttribute('data-success'));
        if (ok) { form.hidden = true; ok.classList.add('is-visible'); ok.setAttribute('tabindex', '-1'); ok.focus(); }
        form.reset();
      }).catch(function () {
        if (status) { status.className = 'form__status is-error'; status.innerHTML = 'Sorry — we couldn’t send that just now. Please try again, or email us at <a href="' + toMailto(form) + '">' + (F.fallbackEmail || 'our team') + '</a>.'; }
      }).then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  });
  $$('[data-reset-form]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = doc.getElementById(b.getAttribute('data-reset-form')), s = b.closest('.form-success');
      if (f) { f.hidden = false; s.classList.remove('is-visible'); var i = f.querySelector('input:not([type=hidden])'); if (i) i.focus(); }
    });
  });

  /* ---------- Page-specific prefills ---------- */
  var roleTitle = $('[data-role-title]');
  if (roleTitle && params.get('role') && params.get('role') !== 'Open application') roleTitle.textContent = 'Apply: ' + params.get('role');
  var msg = $('#f-message');
  if (msg && params.get('doc') && !msg.value) msg.value = 'Please send me: ' + params.get('doc');

  /* ---------- Custom file upload label ---------- */
  $$('.upload__input').forEach(function (inp) {
    var wrap = inp.closest('.upload'), name = wrap.querySelector('[data-file-name]');
    var sync = function () { var f = inp.files && inp.files[0]; name.textContent = f ? f.name : 'No file selected'; wrap.classList.toggle('has-file', !!f); };
    inp.addEventListener('change', sync);
    var form = inp.form; if (form) form.addEventListener('reset', function () { setTimeout(sync, 0); });
  });

  /* ---------- Share: copy link ---------- */
  $$('[data-copy-url]').forEach(function (b) {
    b.addEventListener('click', function () {
      var u = location.href.split('#')[0], done = function () { b.classList.add('is-copied'); b.setAttribute('aria-label', 'Link copied'); setTimeout(function () { b.classList.remove('is-copied'); b.setAttribute('aria-label', 'Copy link'); }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(u).then(done, done); else done();
    });
  });

  /* ---------- Hero email capture → contact page with email prefilled ---------- */
  $$('form.capture').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = f.querySelector('input').value.trim();
      if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { f.querySelector('input').setCustomValidity('Enter a valid email address'); f.reportValidity(); return; }
      location.href = BASE + 'contact.html' + (v ? '?email=' + encodeURIComponent(v) + '&topic=sales' : '') + '#message';
    });
    f.querySelector('input').addEventListener('input', function () { this.setCustomValidity(''); });
  });

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Ask AI hooks (implementation in askai.js) ---------- */
  function closeAI() { if (window.RSAskAI) window.RSAskAI.close(); }
})();
