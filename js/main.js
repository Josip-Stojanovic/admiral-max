(function () {
  "use strict";

  /*
   * Settings the owner may need to change.
   *
   * RESERVATION_EMAIL: requests from the form are relayed by FormSubmit
   *   (formsubmit.co) to this inbox. No account is needed, but the FIRST
   *   request triggers an activation email to that inbox; the owner must
   *   click the link in it once, or nothing is delivered. Leave it empty
   *   and the form is hidden, so only the phone number shows.
   *   The address below is the one listed for Obrt UNICO on istrabiz.hr;
   *   confirm it with the owner.
   *
   * HOURS_CONFIRMED: the live "open now" line under the opening hours is
   *   shown only when true. Until then a note says Wednesday hours are
   *   being confirmed. Wednesday was still unconfirmed on 2026-09-06.
   */
  var RESERVATION_EMAIL = "u.o.unico@gmail.com";
  var HOURS_CONFIRMED = false;

  var lang = (document.documentElement.lang || "en").slice(0, 2);
  var S = window.ADMIRAL_STRINGS || {};

  function t(key) { return S[key] || ""; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

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

  function zagrebNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Zagreb", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: days[map.weekday], h: parseInt(map.hour, 10) % 24, m: parseInt(map.minute, 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), h: d.getHours(), m: d.getMinutes() };
    }
  }

  function hoursStatus() {
    var out = document.getElementById("hours-status");
    if (!out) return;
    if (!HOURS_CONFIRMED) {
      out.textContent = t("hoursUnconfirmed");
      return;
    }
    var now = zagrebNow();
    var span = HOURS[now.day];
    var tm = now.h + now.m / 60;
    var msg;
    if (tm >= span[0] && tm < span[1]) {
      msg = (span[1] - tm < 1 ? t("closingSoon") : t("openUntil")).replace("{t}", pad(span[1]) + ":00");
      out.classList.add("is-open");
    } else if (tm < span[0]) {
      msg = t("opensToday").replace("{t}", pad(span[0]) + ":00");
    } else {
      msg = t("opensTomorrow").replace("{t}", pad(HOURS[(now.day + 1) % 7][0]) + ":00");
    }
    out.textContent = msg;
  }

  /* ---------- Reservation form ---------- */
  function todayISO() {
    try {
      return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zagreb", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  function reservationForm() {
    var col = document.getElementById("reserve-form-col");
    var form = document.getElementById("rform");
    if (!col || !form) return;
    if (!RESERVATION_EMAIL) { col.hidden = true; return; }

    var time = document.getElementById("f-time");
    var blank = document.createElement("option");
    blank.value = ""; blank.textContent = "";
    time.appendChild(blank);
    for (var h = 13; h <= 21; h++) {
      for (var m = 0; m < 60; m += 30) {
        if (h === 21 && m === 30) break;
        var o = document.createElement("option");
        o.value = o.textContent = pad(h) + ":" + pad(m);
        time.appendChild(o);
      }
    }
    form.elements.date.min = todayISO();

    var err = document.getElementById("rform-error");
    var ok = document.getElementById("rform-success");
    var send = document.getElementById("rform-send");

    function fail(msg) {
      err.textContent = msg;
      err.hidden = false;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.hidden = true;

      var f = form.elements;
      var name = f.name.value.trim(), phone = f.phone.value.trim(), email = f.email.value.trim();
      var date = f.date.value, when = f.time.value;
      var guests = parseInt(f.guests.value, 10);

      if (!name || !phone || !date || !when || !(guests >= 1)) return fail(t("errRequired"));
      if (date < todayISO()) return fail(t("errPast"));
      var day = new Date(date + "T12:00:00").getDay();
      if (day === 3 && when < "18:00") return fail(t("errWed"));
      if (f._honey.value) { ok.hidden = false; form.hidden = true; return; } // bot: pretend success

      var payload = {
        _subject: "Reservation request: " + name + ", " + date + " " + when + ", " + guests + " guests",
        _template: "table",
        _captcha: "false",
        Name: name,
        Phone: phone,
        Email: email,
        Date: date,
        Time: when,
        Guests: guests,
        Seating: f.seating.options[f.seating.selectedIndex].textContent,
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
        if (!(data && (data.success === "true" || data.success === true))) throw new Error("relay refused");
        form.hidden = true;
        ok.hidden = false;
        ok.scrollIntoView({ block: "nearest" });
      }).catch(function () {
        fail(t("fError"));
      }).then(function () {
        send.disabled = false;
        send.textContent = label;
      });
    });
  }

  /* ---------- Photo gallery lightbox ---------- */
  function gallery() {
    var thumbs = document.getElementById("thumbs");
    var lb = document.getElementById("lb");
    if (!thumbs || !lb) return;

    var items = Array.prototype.slice.call(thumbs.querySelectorAll(".thumb"));
    var img = document.getElementById("lb-img");
    var cap = document.getElementById("lb-cap");
    var count = document.getElementById("lb-count");
    var open = false, index = 0, lastFocus = null;

    function show(i) {
      var n = items.length;
      index = (i + n) % n;
      var btn = items[index];
      img.src = btn.getAttribute("data-full");
      img.alt = btn.querySelector("img").alt;
      var text = btn.querySelector(".cap").textContent;
      var price = btn.querySelector(".price");
      cap.textContent = price ? text + ", " + price.textContent : text;
      count.textContent = t("lbCounter").replace("{i}", index + 1).replace("{n}", n);
      [index + 1, index - 1].forEach(function (k) {
        var pre = new Image();
        pre.src = items[(k + n) % n].getAttribute("data-full");
      });
    }

    function openAt(i) {
      lastFocus = document.activeElement;
      open = true;
      lb.hidden = false;
      document.body.classList.add("lb-open");
      show(i);
      document.getElementById("lb-close").focus();
    }

    function close() {
      open = false;
      lb.hidden = true;
      document.body.classList.remove("lb-open");
      img.src = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest(".thumb");
      if (b) openAt(parseInt(b.getAttribute("data-index"), 10) || 0);
    });
    document.getElementById("lb-close").addEventListener("click", close);
    document.getElementById("lb-prev").addEventListener("click", function () { show(index - 1); });
    document.getElementById("lb-next").addEventListener("click", function () { show(index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

    document.addEventListener("keydown", function (e) {
      if (!open) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "Tab") {
        var f = lb.querySelectorAll("button");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
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

  document.addEventListener("DOMContentLoaded", function () {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
    menuNav();
    hoursStatus();
    reservationForm();
    gallery();
    header();
    document.documentElement.classList.add("is-ready");
  });
})();
