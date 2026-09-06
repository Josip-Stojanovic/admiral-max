(function () {
  "use strict";

  var LANGS = ["en", "hr", "de", "it"];
  var lang = "en";

  function t(key) {
    var d = window.ADMIRAL_I18N || {};
    return (d[lang] && d[lang][key]) || (d.en && d.en[key]) || "";
  }

  /* ---------- Language ---------- */
  function pickLanguage() {
    var fromUrl = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    if (fromUrl && LANGS.indexOf(fromUrl) !== -1) return fromUrl;
    try {
      var saved = localStorage.getItem("admiral-lang");
      if (saved && LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.languages || [navigator.language || "en"]);
    for (var i = 0; i < nav.length; i++) {
      var code = String(nav[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) !== -1) return code;
    }
    return "en";
  }

  function setLanguage(code) {
    if (LANGS.indexOf(code) === -1) code = "en";
    lang = code;
    try { localStorage.setItem("admiral-lang", code); } catch (e) {}

    document.documentElement.lang = code;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("metaDescription"));

    applyStrings();
    renderMenu();
    hoursStatus();

    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute("data-lang") === code;
      buttons[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function applyStrings() {
    var i, els;
    els = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < els.length; i++) {
      var s = t(els[i].getAttribute("data-i18n"));
      if (s) els[i].textContent = s;
    }
    els = document.querySelectorAll("[data-i18n-alt]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("alt", t(els[i].getAttribute("data-i18n-alt")));
    els = document.querySelectorAll("[data-i18n-aria]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("aria-label", t(els[i].getAttribute("data-i18n-aria")));
    els = document.querySelectorAll("[data-i18n-title]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("title", t(els[i].getAttribute("data-i18n-title")));
  }

  function langButtons() {
    var nav = document.querySelector(".lang");
    if (!nav) return;
    nav.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-lang]");
      if (!b) return;
      setLanguage(b.getAttribute("data-lang"));
    });
  }

  /* ---------- Menu rendering ---------- */
  var menuObserver = null;

  function pick(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  }

  // Croatian is the "house" name shown under each dish, unless the page is
  // already in Croatian, in which case the English name is shown.
  function subName(obj) {
    if (!obj || typeof obj === "string") return "";
    return lang === "hr" ? (obj.en || "") : (obj.hr || "");
  }

  function unitLabel(unit) {
    var map = { two: "unitTwo", kg: "unitKg", "100g": "unit100g", three: "unitThree" };
    return unit && map[unit] ? t(map[unit]) : "";
  }

  function renderMenu() {
    var host = document.getElementById("menu-sections");
    var nav = document.getElementById("menu-nav");
    if (!host || !window.ADMIRAL_MENU) return;

    // clear previous render but keep <noscript>
    var old = host.querySelectorAll(".menu-section");
    for (var k = 0; k < old.length; k++) host.removeChild(old[k]);
    if (nav) nav.innerHTML = "";

    var frag = document.createDocumentFragment();

    window.ADMIRAL_MENU.forEach(function (section) {
      if (nav) {
        var a = document.createElement("a");
        a.href = "#" + section.id;
        a.textContent = pick(section.title);
        nav.appendChild(a);
      }

      var sec = document.createElement("section");
      sec.className = "menu-section";
      sec.id = section.id;

      var head = document.createElement("header");
      head.className = "menu-section-head";
      var h3 = document.createElement("h3");
      h3.textContent = pick(section.title);
      head.appendChild(h3);
      var sub = subName(section.title);
      if (sub) {
        var hr = document.createElement("p");
        hr.className = "menu-section-hr";
        hr.lang = lang === "hr" ? "en" : "hr";
        hr.textContent = sub;
        head.appendChild(hr);
      }
      sec.appendChild(head);

      if (section.note) {
        var note = document.createElement("p");
        note.className = "menu-section-note";
        note.textContent = pick(section.note);
        sec.appendChild(note);
      }

      var list = document.createElement("ul");
      list.className = "dishes";

      section.items.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "dish";

        var row = document.createElement("div");
        row.className = "dish-row";

        var name = document.createElement("span");
        name.className = "dish-name";
        name.textContent = pick(item.name);
        row.appendChild(name);

        if (item.price) {
          var leader = document.createElement("span");
          leader.className = "dish-leader";
          leader.setAttribute("aria-hidden", "true");
          var price = document.createElement("span");
          price.className = "dish-price";
          var u = unitLabel(item.unit);
          price.textContent = (u ? u + " " : "") + "€" + item.price;
          row.appendChild(leader);
          row.appendChild(price);
        }
        li.appendChild(row);

        var s = subName(item.name);
        if (s) {
          var subEl = document.createElement("p");
          subEl.className = "dish-hr";
          subEl.lang = lang === "hr" ? "en" : "hr";
          subEl.textContent = s;
          li.appendChild(subEl);
        }

        var d = pick(item.desc);
        if (d) {
          var desc = document.createElement("p");
          desc.className = "dish-desc";
          desc.textContent = d;
          li.appendChild(desc);
        }

        list.appendChild(li);
      });

      sec.appendChild(list);
      frag.appendChild(sec);
    });

    host.appendChild(frag);
    menuNav();
  }

  /* ---------- Menu nav: highlight the section in view ---------- */
  function menuNav() {
    if (menuObserver) { menuObserver.disconnect(); menuObserver = null; }
    var links = Array.prototype.slice.call(document.querySelectorAll(".menu-nav a"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

    var current = null;
    menuObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (current) current.removeAttribute("aria-current");
          current = byId[e.target.id];
          if (current) current.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) menuObserver.observe(el);
    });
  }

  /* ---------- Open / closed right now (Europe/Zagreb) ---------- */
  var HOURS = {
    0: [13, 22], // Sunday
    1: [13, 22],
    2: [13, 22],
    3: [18, 22], // Wednesday
    4: [13, 22],
    5: [13, 22],
    6: [13, 22]
  };

  function hoursStatus() {
    var out = document.getElementById("hours-status");
    if (!out) return;

    var now;
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Zagreb", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      now = { day: days[map.weekday], h: parseInt(map.hour, 10) % 24, m: parseInt(map.minute, 10) };
    } catch (e) {
      var d = new Date();
      now = { day: d.getDay(), h: d.getHours(), m: d.getMinutes() };
    }

    var span = HOURS[now.day];
    var tm = now.h + now.m / 60;
    var open = tm >= span[0] && tm < span[1];
    var msg;

    out.classList.remove("is-open");
    if (open) {
      msg = (span[1] - tm < 1 ? t("closingSoon") : t("openUntil")).replace("{t}", pad(span[1]) + ":00");
      out.classList.add("is-open");
    } else if (tm < span[0]) {
      msg = t("opensToday").replace("{t}", pad(span[0]) + ":00");
    } else {
      var next = HOURS[(now.day + 1) % 7];
      msg = t("opensTomorrow").replace("{t}", pad(next[0]) + ":00");
    }
    out.textContent = msg;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Header: shrink once past the hero ---------- */
  function header() {
    var top = document.querySelector(".top");
    var hero = document.querySelector(".hero");
    if (!top || !hero || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      top.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }, { rootMargin: "-80px 0px 0px 0px", threshold: 0 });
    io.observe(hero);
  }

  /* ---------- Footer year ---------- */
  function year() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    langButtons();
    setLanguage(pickLanguage());
    header();
    year();
    document.documentElement.classList.add("is-ready");
  });
})();
