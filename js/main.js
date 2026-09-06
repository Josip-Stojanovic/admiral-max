(function () {
  "use strict";

  /* ---------- Menu rendering ---------- */
  function renderMenu() {
    var host = document.getElementById("menu-sections");
    if (!host || !window.ADMIRAL_MENU) return;

    var frag = document.createDocumentFragment();

    window.ADMIRAL_MENU.forEach(function (section) {
      var sec = document.createElement("section");
      sec.className = "menu-section";
      sec.id = section.id;

      var head = document.createElement("header");
      head.className = "menu-section-head";
      var h3 = document.createElement("h3");
      h3.textContent = section.title;
      var hr = document.createElement("p");
      hr.className = "menu-section-hr";
      hr.textContent = section.hr;
      head.appendChild(h3);
      head.appendChild(hr);
      sec.appendChild(head);

      if (section.note) {
        var note = document.createElement("p");
        note.className = "menu-section-note";
        note.textContent = section.note;
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
        name.textContent = item.en;

        var leader = document.createElement("span");
        leader.className = "dish-leader";
        leader.setAttribute("aria-hidden", "true");

        var price = document.createElement("span");
        price.className = "dish-price";
        price.textContent = formatPrice(item.price);

        row.appendChild(name);
        if (item.price) {
          row.appendChild(leader);
          row.appendChild(price);
        }
        li.appendChild(row);

        var sub = document.createElement("p");
        sub.className = "dish-hr";
        sub.lang = "hr";
        sub.textContent = item.hr;
        li.appendChild(sub);

        if (item.desc) {
          var desc = document.createElement("p");
          desc.className = "dish-desc";
          desc.textContent = item.desc;
          li.appendChild(desc);
        }

        list.appendChild(li);
      });

      sec.appendChild(list);
      frag.appendChild(sec);
    });

    host.appendChild(frag);
  }

  // "38" -> "€38", "per kg 60" -> "per kg €60", "glass 4, litre 18" -> "glass €4, litre €18"
  function formatPrice(p) {
    if (!p) return "";
    return String(p).replace(/(\d+(?:\.\d+)?)/g, "€$1");
  }

  /* ---------- Menu nav: highlight the section in view ---------- */
  function menuNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".menu-nav a"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

    var current = null;
    var io = new IntersectionObserver(function (entries) {
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
      if (el) io.observe(el);
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
    var t = now.h + now.m / 60;
    var open = t >= span[0] && t < span[1];

    if (open) {
      var left = span[1] - t;
      out.textContent = left < 1
        ? "Open now, closing at " + pad(span[1]) + ":00."
        : "Open now until " + pad(span[1]) + ":00.";
      out.classList.add("is-open");
    } else if (t < span[0]) {
      out.textContent = "Closed now. Opens today at " + pad(span[0]) + ":00.";
    } else {
      var next = HOURS[(now.day + 1) % 7];
      out.textContent = "Closed now. Opens tomorrow at " + pad(next[0]) + ":00.";
    }
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
    renderMenu();
    menuNav();
    hoursStatus();
    header();
    year();
    document.documentElement.classList.add("is-ready");
  });
})();
