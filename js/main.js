(function () {
  "use strict";

  var LANGS = ["en", "hr", "de", "it"];
  var lang = "en";

  /*
   * Reservation requests are relayed by FormSubmit (formsubmit.co), which
   * emails each request to the address below. No account is needed, but the
   * FIRST request triggers an activation email to that inbox; the owner must
   * click the link in it once, or nothing is delivered.
   *
   * The address comes from the istrabiz.hr listing for Obrt UNICO.
   * Confirm it with the owner, then change it here if needed.
   */
  var RESERVATION_EMAIL = "u.o.unico@gmail.com";

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
    fillFormSelects();
    if (lbState.open) document.getElementById("lb-next").click(), document.getElementById("lb-prev").click();

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


  /* ---------- Reservation form ---------- */
  function fillFormSelects() {
    var time = document.getElementById("f-time");
    if (!time) return;

    var keepT = time.value;
    time.innerHTML = "";
    var opt = document.createElement("option");
    opt.value = ""; opt.textContent = "";
    time.appendChild(opt);
    for (var h = 13; h <= 21; h++) {
      for (var m = 0; m < 60; m += 30) {
        if (h === 21 && m === 30) break;
        var v = pad(h) + ":" + pad(m);
        var o = document.createElement("option");
        o.value = v; o.textContent = v;
        time.appendChild(o);
      }
    }
    if (keepT) time.value = keepT;

    var date = document.querySelector('#rform input[name="date"]');
    if (date && !date.min) date.min = todayISO();
  }

  function todayISO() {
    try {
      var p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zagreb", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
      return p; // en-CA gives YYYY-MM-DD
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  function reservationForm() {
    var form = document.getElementById("rform");
    if (!form) return;
    var err = document.getElementById("rform-error");
    var ok = document.getElementById("rform-success");
    var send = document.getElementById("rform-send");

    function fail(msg) {
      err.textContent = msg;
      err.hidden = false;
      err.focus && err.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.hidden = true;

      var f = form.elements;
      var name = f.name.value.trim(), phone = f.phone.value.trim(), email = f.email.value.trim();
      var date = f.date.value, time = f.time.value;
      var guests = parseInt(f.guests.value, 10);

      if (!name || !phone || !date || !time || !(guests >= 1)) return fail(t("errRequired"));
      if (date < todayISO()) return fail(t("errPast"));
      var day = new Date(date + "T12:00:00").getDay();
      if (day === 3 && time < "18:00") return fail(t("errWed"));
      if (f._honey.value) { ok.hidden = false; form.hidden = true; return; } // bot: pretend success

      var seatingLabel = f.seating.options[f.seating.selectedIndex].textContent;
      var payload = {
        _subject: "Reservation request: " + name + ", " + date + " " + time + ", " + guests + " guests",
        _template: "table",
        _captcha: "false",
        Name: name,
        Phone: phone,
        Email: email || "",
        Date: date,
        Time: time,
        Guests: guests,
        Seating: seatingLabel,
        Message: f.message.value.trim(),
        Language: lang.toUpperCase()
      };
      if (email) payload._replyto = email;

      send.disabled = true;
      var label = send.textContent;
      send.textContent = t("fSending");

      fetch("https://formsubmit.co/ajax/" + RESERVATION_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      }).then(function (data) {
        if (data && (data.success === "true" || data.success === true)) {
          form.hidden = true;
          ok.hidden = false;
          ok.scrollIntoView({ block: "nearest" });
        } else {
          throw new Error("relay refused");
        }
      }).catch(function () {
        fail(t("fError"));
      }).then(function () {
        send.disabled = false;
        send.textContent = label;
      });
    });
  }


  /* ---------- Photo gallery lightbox ---------- */
  var lbState = { open: false, index: 0, items: [], lastFocus: null };

  function gallery() {
    var thumbs = document.getElementById("thumbs");
    var lb = document.getElementById("lb");
    if (!thumbs || !lb) return;

    lbState.items = Array.prototype.slice.call(thumbs.querySelectorAll(".thumb"));
    var img = document.getElementById("lb-img");
    var cap = document.getElementById("lb-cap");
    var count = document.getElementById("lb-count");

    function show(i) {
      var n = lbState.items.length;
      lbState.index = (i + n) % n;
      var btn = lbState.items[lbState.index];
      var src = btn.querySelector("img");
      img.src = src.getAttribute("src");
      img.alt = src.alt;
      cap.textContent = btn.querySelector(".thumb-cap").textContent;
      count.textContent = t("lbCounter").replace("{i}", lbState.index + 1).replace("{n}", n);
      // warm the neighbours
      [lbState.index + 1, lbState.index - 1].forEach(function (k) {
        var b = lbState.items[(k + n) % n];
        if (b) { var pre = new Image(); pre.src = b.querySelector("img").getAttribute("src"); }
      });
    }

    function open(i) {
      lbState.lastFocus = document.activeElement;
      lbState.open = true;
      lb.hidden = false;
      document.body.classList.add("lb-open");
      show(i);
      document.getElementById("lb-close").focus();
    }

    function close() {
      lbState.open = false;
      lb.hidden = true;
      document.body.classList.remove("lb-open");
      img.src = "";
      if (lbState.lastFocus && lbState.lastFocus.focus) lbState.lastFocus.focus();
    }

    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest(".thumb");
      if (!b) return;
      open(parseInt(b.getAttribute("data-index"), 10) || 0);
    });
    document.getElementById("lb-close").addEventListener("click", close);
    document.getElementById("lb-prev").addEventListener("click", function () { show(lbState.index - 1); });
    document.getElementById("lb-next").addEventListener("click", function () { show(lbState.index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

    document.addEventListener("keydown", function (e) {
      if (!lbState.open) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(lbState.index + 1);
      else if (e.key === "ArrowLeft") show(lbState.index - 1);
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        var f = lb.querySelectorAll("button");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // swipe on touch screens
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(lbState.index + (dx < 0 ? 1 : -1));
    });
  }

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
    reservationForm();
    gallery();
    setLanguage(pickLanguage());
    header();
    year();
    document.documentElement.classList.add("is-ready");
  });
})();
