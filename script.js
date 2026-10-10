(function () {
  "use strict";

  var PARTY_START = new Date("2026-10-31T20:00:00+09:00").getTime();

  /* ---------- countdown ---------- */
  var grid = document.getElementById("countdown");
  var live = document.getElementById("countdownLive");
  var cells = {};
  grid.querySelectorAll("[data-unit]").forEach(function (el) {
    cells[el.dataset.unit] = el;
  });

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var diff = PARTY_START - Date.now();
    if (diff <= 0) {
      grid.hidden = true;
      live.hidden = false;
      return false;
    }
    var s = Math.floor(diff / 1000);
    cells.d.textContent = pad(Math.floor(s / 86400));
    cells.h.textContent = pad(Math.floor((s % 86400) / 3600));
    cells.m.textContent = pad(Math.floor((s % 3600) / 60));
    cells.s.textContent = pad(s % 60);
    return true;
  }

  if (tick()) {
    var timer = setInterval(function () {
      if (!tick()) clearInterval(timer);
    }, 1000);
  }

  /* ---------- toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2200);
  }

  /* ---------- add to calendar (.ics) ---------- */
  document.getElementById("addToCalendar").addEventListener("click", function () {
    var ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//HAJA BAND//LETs HAJA 2026//KO",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:haja-halloween-2026@band-haja",
      "DTSTAMP:20261010T000000Z",
      "DTSTART:20261031T110000Z",
      "DTEND:20261031T200000Z",
      "SUMMARY:LET's HAJA — 하자밴드 할로윈 올나잇 파티",
      "LOCATION:용산 어썸그라운드",
      "URL:https://naver.me/5V8gEnor",
      "DESCRIPTION:참가비 40\\,000원. 할로윈 의상 필수. 21:00 깜짝 공연. 새벽까지 Free Drink & Food.",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    var url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = "LETs-HAJA-2026.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  /* ---------- share ---------- */
  document.getElementById("shareBtn").addEventListener("click", function () {
    var data = {
      title: "LET's HAJA — 하자밴드 할로윈 올나잇 파티",
      text: "2026.10.31 SAT 20:00 · 용산 어썸그라운드",
      url: location.href
    };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href).then(
        function () { showToast("링크를 복사했어요"); },
        function () { showToast("복사하지 못했어요"); }
      );
    }
  });

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  /* ---------- scroll reveal ---------- */
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealer.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { revealer.observe(el); });

  /* ---------- dock: show once the hero CTAs scroll away, hide while RSVP block is on screen ---------- */
  var dock = document.getElementById("dock");
  var heroGone = false;
  var applyVisible = false;
  function syncDock() { dock.classList.toggle("is-shown", heroGone && !applyVisible); }

  new IntersectionObserver(function (entries) {
    heroGone = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
    syncDock();
  }).observe(document.getElementById("heroActions"));

  new IntersectionObserver(function (entries) {
    applyVisible = entries[0].isIntersecting;
    syncDock();
  }).observe(document.getElementById("apply"));
})();
