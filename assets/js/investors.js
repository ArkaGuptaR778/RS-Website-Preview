/* =====================================================================
   RS Software — Investor page: document libraries, filters, section nav
   Data comes from assets/js/investors-data.js (edit that file, not this one)
   ===================================================================== */
(function () {
  'use strict';
  var D = window.RS_INVESTORS; if (!D) return;
  var doc = document, BASE = doc.body.getAttribute('data-base') || '';
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var PAGE = 8;
  var ICON = {
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var libs = {};

  $$('[data-lib]').forEach(function (root) {
    var key = root.getAttribute('data-lib'), cats = (D.libraries || {})[key]; if (!cats) return;
    var st = { cat: cats[0].id, fy: '', q: '', limit: PAGE };
    root.innerHTML =
      '<div class="lib__rail" role="tablist" aria-label="Document categories">' + cats.map(function (c) {
        return '<button type="button" role="tab" data-cat="' + c.id + '" aria-selected="false"><span>' + esc(c.label) + '</span><em>' + c.docs.length + '</em></button>';
      }).join('') + '</div>' +
      '<div class="lib__panel" role="tabpanel">' +
        '<div class="lib__tools"><div class="lib__years" role="group" aria-label="Financial year"></div>' +
        '<label class="lib__search">' + ICON.search + '<span class="sr-only">Search documents</span><input type="text" placeholder="Search documents..." autocomplete="off"></label></div>' +
        '<ul class="lib__list"></ul>' +
        '<p class="lib__empty" hidden>No documents match. <button type="button" data-reset>Clear filters</button></p>' +
        '<div class="lib__foot"><span class="lib__count" aria-live="polite"></span><button type="button" class="lib__more">Show more</button></div>' +
      '</div>';
    var years = $('.lib__years', root), list = $('.lib__list', root), input = $('input', root), count = $('.lib__count', root), more = $('.lib__more', root), empty = $('.lib__empty', root);

    function current() { return cats.filter(function (c) { return c.id === st.cat; })[0] || cats[0]; }
    function row(d) {
      var href, act, attrs;
      if (d.f) { href = BASE + (D.docBase || '') + d.f; act = ICON.dl + '<span>Download</span>'; attrs = ' download'; }
      else { href = D.liveUrl; act = ICON.ext + '<span>' + (d.k === 'Archive' ? 'Open archive' : 'View') + '</span>'; attrs = ' target="_blank" rel="noopener"'; }
      var badge = d.k === 'Archive' ? 'ALL' : 'PDF';
      return '<li><a class="doc" href="' + esc(href) + '"' + attrs + '>' +
        '<span class="doc__ico' + (d.k === 'Archive' ? ' doc__ico--arch' : '') + '">' + badge + '</span>' +
        '<span class="doc__main"><span class="doc__t">' + esc(d.t) + (d.tag ? ' <i class="doc__tag">' + esc(d.tag) + '</i>' : '') + '</span>' +
        '<span class="doc__m">' + [d.m, d.fy ? 'FY' + d.fy : ''].filter(Boolean).map(esc).join(' · ') + '</span></span>' +
        '<span class="doc__act">' + act + '</span></a></li>';
    }
    function render() {
      var c = current();
      $$('[data-cat]', root).forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-cat') === c.id); });
      var fys = []; c.docs.forEach(function (d) { if (d.fy && fys.indexOf(d.fy) < 0) fys.push(d.fy); });
      if (st.fy && fys.indexOf(st.fy) < 0) st.fy = '';
      years.hidden = fys.length < 2;
      years.innerHTML = ['<button type="button" data-fy="" aria-pressed="' + !st.fy + '">All years</button>'].concat(fys.map(function (y) {
        return '<button type="button" data-fy="' + y + '" aria-pressed="' + (st.fy === y) + '">FY' + y + '</button>';
      })).join('');
      var q = st.q.toLowerCase();
      var docs = c.docs.filter(function (d) { return (!st.fy || d.fy === st.fy) && (!q || (d.t + ' ' + (d.m || '') + ' ' + (d.fy || '')).toLowerCase().indexOf(q) > -1); });
      list.innerHTML = docs.slice(0, st.limit).map(row).join('');
      empty.hidden = docs.length > 0;
      count.textContent = docs.length ? 'Showing ' + Math.min(st.limit, docs.length) + ' of ' + docs.length : '';
      more.hidden = docs.length <= st.limit;
      more.textContent = 'Show ' + Math.min(PAGE * 2, docs.length - st.limit) + ' more';
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]'), y = e.target.closest('[data-fy]');
      if (b) { st.cat = b.getAttribute('data-cat'); st.fy = ''; st.q = ''; input.value = ''; st.limit = PAGE; render(); }
      else if (y) { st.fy = y.getAttribute('data-fy'); st.limit = PAGE; render(); }
      else if (e.target.closest('[data-reset]')) { st.fy = ''; st.q = ''; input.value = ''; render(); }
    });
    $('.lib__rail', root).addEventListener('keydown', function (e) {
      var tabs = $$('[data-cat]', root), i = tabs.indexOf(doc.activeElement);
      var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
      if (d && i > -1) { e.preventDefault(); var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); n.click(); }
    });
    more.addEventListener('click', function () { st.limit += PAGE * 2; render(); });
    input.addEventListener('input', function () { st.q = input.value.trim(); st.limit = PAGE; render(); });
    libs[key] = { open: function (cat, q) { if (cat) st.cat = cat; st.fy = ''; st.q = q || ''; input.value = st.q; st.limit = PAGE; render(); } };
    render();
  });

  /* Deep links: <a href="#financials" data-open="financials:annual" data-q="…"> opens that category */
  doc.addEventListener('click', function (e) {
    var a = e.target.closest('[data-open]'); if (!a) return;
    var p = a.getAttribute('data-open').split(':'); if (libs[p[0]]) libs[p[0]].open(p[1], a.getAttribute('data-q') || '');
  });
  // ?doc=financials:annual in the URL (e.g. from the header menu)
  var qs = new URLSearchParams(location.search).get('open');
  if (qs) { var p = qs.split(':'); if (libs[p[0]]) libs[p[0]].open(p[1]); }

  /* Sticky section nav with scroll-spy */
  var links = $$('.inv-nav a');
  if (links.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id; a.classList.toggle('is-active', on);
          if (on && a.scrollIntoView && window.innerWidth < 960) { var t = a.parentElement; t.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' }); }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('.inv-sec').forEach(function (s) { spy.observe(s); });
  }
})();
