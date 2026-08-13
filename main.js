/* ==========================================================================
   Philipp Axt — Portfolio
   Vanilla JS. Ein scroll-linked Effekt (Hero + Lineal), sonst IntersectionObserver.
   ========================================================================== */
(function () {
  'use strict';

  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var map = function (p, a, b, from, to) {
    return from + (to - from) * clamp((p - a) / (b - a), 0, 1);
  };

  var stage  = document.getElementById('stage');
  var mark   = document.getElementById('mark');
  var reveal = document.getElementById('reveal');
  var hint   = document.getElementById('hint');
  var fill   = document.getElementById('rulerFill');
  var head   = document.getElementById('rulerHead');
  var val    = document.getElementById('rulerVal');
  var nav    = document.getElementById('topnav');

  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  var queued = false;

  /* ---------- Ein rAF-Tick für Lineal, Hero und Nav ---------- */
  function render() {
    queued = false;

    // Telemetrie: globaler Seitenfortschritt 0…1
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var gp  = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;

    fill.style.height = (gp * 100) + '%';
    // Zeiger 16px vom Rand einrücken (= Padding des Lineals), sonst wird die Zahl bei 0 und 1 angeschnitten
    head.style.top    = (16 + gp * (window.innerHeight - 32)).toFixed(1) + 'px';
    val.textContent   = gp.toFixed(3);

    // Navigation einblenden, sobald der Hero durchlaufen ist
    nav.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.85);

    if (motion.matches) { return; }

    // Fortschritt der gepinnten Sektion: 0 = Anfang, 1 = Ende
    var r    = stage.getBoundingClientRect();
    var span = r.height - window.innerHeight;
    var p    = span > 0 ? clamp(-r.top / span, 0, 1) : 0;

    // Fortschritt direkt auf CSS-Werte abbilden
    mark.style.transform = 'scale(' + map(p, 0, .42, 1, 7).toFixed(3) + ')';
    mark.style.opacity   = map(p, .06, .34, 1, 0).toFixed(3);
    mark.style.filter    = 'blur(' + map(p, .12, .42, 0, 14).toFixed(1) + 'px)';

    reveal.style.opacity   = map(p, .32, .56, 0, 1).toFixed(3);
    reveal.style.transform = 'translateY(' + map(p, .32, .72, 40, 0).toFixed(1) + 'px)';
    hint.style.opacity     = map(p, 0, .12, 1, 0).toFixed(3);
  }

  function onScroll() {
    if (!queued) { queued = true; requestAnimationFrame(render); }
  }

  // Inline-Styles entfernen, wenn auf reduzierte Bewegung umgeschaltet wird
  function clearHero() {
    [mark, reveal, hint].forEach(function (el) {
      el.style.transform = '';
      el.style.opacity   = '';
      el.style.filter    = '';
    });
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });

  if (typeof motion.addEventListener === 'function') {
    motion.addEventListener('change', function () { clearHero(); render(); });
  }

  render();

  /* ---------- Reveals: einmal auslösen, dann abmelden ---------- */
  var risers = document.querySelectorAll('.rise');

  if (motion.matches || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(risers, function (el) { el.classList.add('in'); });
  } else {
    var riseObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) { return; }
        setTimeout(function () { e.target.classList.add('in'); }, i * 90);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(risers, function (el) { riseObserver.observe(el); });
  }

  /* ---------- Aktiver Abschnitt in der Navigation ---------- */
  if ('IntersectionObserver' in window) {
    var links = {};
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = links[e.target.id];
        if (!a) { return; }
        if (e.isIntersecting) {
          Array.prototype.forEach.call(nav.querySelectorAll('a'), function (other) {
            other.classList.remove('is-active');
            other.removeAttribute('aria-current');
          });
          a.classList.add('is-active');
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Array.prototype.forEach.call(document.querySelectorAll('section.block'), function (s) {
      navObserver.observe(s);
    });
  }
})();
