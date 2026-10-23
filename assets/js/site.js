// Riveldell — 亮暗切换、筛选、图集切换、搜索。没有任何依赖。
(function () {
  "use strict";

  // ---------- 亮色 / 暗色 ----------
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var sysDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function saved() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return sysDark && sysDark.matches ? "dark" : "light";
  }
  function syncToggle() {
    var dark = current() === "dark";
    if (toggle) {
      toggle.setAttribute("aria-pressed", dark ? "true" : "false");
      toggle.title = dark ? "切换到亮色" : "切换到暗色";
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#161920" : "#FFFFFF");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncToggle();
    });
  }
  if (sysDark) {
    var followSystem = function () {
      var s = saved();
      if (s !== "light" && s !== "dark") {
        root.setAttribute("data-theme", sysDark.matches ? "dark" : "light");
        syncToggle();
      }
    };
    if (sysDark.addEventListener) sysDark.addEventListener("change", followSystem);
    else if (sysDark.addListener) sysDark.addListener(followSystem);
  }
  syncToggle();

  // ---------- 左侧目录：宽屏展开，窄屏默认收起 ----------
  var sidebar = document.querySelector("details.sidebar");
  var wide = window.matchMedia("(min-width: 1060px)");
  function syncSidebar() {
    if (sidebar && wide.matches) sidebar.open = true;
  }
  if (sidebar) {
    sidebar.open = wide.matches;
    if (wide.addEventListener) wide.addEventListener("change", syncSidebar);
    else if (wide.addListener) wide.addListener(syncSidebar);
    // 列表很长时，把当前条目滚到目录中间
    var here = sidebar.querySelector('.tree-item[aria-current="page"]');
    if (here && wide.matches && sidebar.scrollHeight > sidebar.clientHeight) {
      var top = here.getBoundingClientRect().top - sidebar.getBoundingClientRect().top + sidebar.scrollTop;
      sidebar.scrollTop = Math.max(0, top - sidebar.clientHeight / 2);
    }
  }

  // ---------- 筛选 ----------
  var active = {};
  function matches(el) {
    return Object.keys(active).every(function (key) {
      var want = active[key];
      if (!want) return true;
      var have = (el.getAttribute("data-f-" + key) || "").split("|");
      return have.indexOf(want) !== -1;
    });
  }
  function applyFilters() {
    document.querySelectorAll("[data-filterable]").forEach(function (el) {
      el.hidden = !matches(el);
    });
    var anyInTree = false;
    document.querySelectorAll(".tree-group").forEach(function (g) {
      var visible = g.querySelector("[data-filterable]:not([hidden])");
      g.hidden = !visible;
      if (visible) anyInTree = true;
    });
    var treeEmpty = document.querySelector(".tree-empty");
    if (treeEmpty) treeEmpty.hidden = anyInTree;
    var grid = document.querySelector(".entry-grid");
    var gridEmpty = document.querySelector(".empty-note");
    if (grid && gridEmpty) gridEmpty.hidden = !!grid.querySelector("[data-filterable]:not([hidden])");
  }
  document.querySelectorAll("[data-filter-key]").forEach(function (box) {
    var key = box.getAttribute("data-filter-key");
    box.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-value]");
      if (!btn) return;
      active[key] = btn.getAttribute("data-value");
      box.querySelectorAll("button[data-value]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilters();
    });
  });

  // ---------- 车模图集：点缩略图换主图 ----------
  var mainImg = document.getElementById("gallery-main-img");
  var mainCap = document.getElementById("gallery-main-cap");
  var thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach(function (t) {
    t.addEventListener("click", function () {
      if (!mainImg) return;
      var cap = t.getAttribute("data-caption") || "";
      mainImg.src = t.getAttribute("data-src");
      mainImg.alt = cap;
      if (mainCap) {
        mainCap.textContent = cap;
        mainCap.hidden = !cap;
      }
      thumbs.forEach(function (o) {
        o.setAttribute("aria-pressed", o === t ? "true" : "false");
      });
    });
  });

  // ---------- 搜索 ----------
  var input = document.getElementById("site-search");
  var box = document.getElementById("search-results");
  var index = null;
  function load() {
    if (index) return Promise.resolve(index);
    return fetch(document.body.getAttribute("data-search"))
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data.filter(Boolean); return index; })
      .catch(function () { index = []; return index; });
  }
  function render(hits) {
    box.textContent = "";
    if (!hits.length) {
      var p = document.createElement("p");
      p.className = "sr-empty";
      p.textContent = "没有找到";
      box.appendChild(p);
    } else {
      hits.forEach(function (h) {
        var a = document.createElement("a");
        a.href = h.u;
        var name = document.createElement("span");
        name.textContent = h.t + (h.s ? " · " + h.s : "");
        var mod = document.createElement("span");
        mod.className = "sr-mod";
        mod.textContent = h.m;
        a.appendChild(name);
        a.appendChild(mod);
        box.appendChild(a);
      });
    }
    box.hidden = false;
  }
  if (input && box) {
    input.addEventListener("focus", load);
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { box.hidden = true; box.textContent = ""; return; }
      load().then(function (items) {
        var hits = items.filter(function (it) {
          return [it.t, it.s, it.k, it.m].join(" ").toLowerCase().indexOf(q) !== -1;
        }).slice(0, 8);
        render(hits);
      });
    });
    input.addEventListener("keydown", function (e) {
      var first = box.querySelector("a");
      if (e.key === "Enter" && first) { window.location.href = first.href; }
      if (e.key === "ArrowDown" && first) { e.preventDefault(); first.focus(); }
      if (e.key === "Escape") { box.hidden = true; }
    });
    box.addEventListener("keydown", function (e) {
      var links = Array.prototype.slice.call(box.querySelectorAll("a"));
      var i = links.indexOf(document.activeElement);
      if (e.key === "ArrowDown" && i < links.length - 1) { e.preventDefault(); links[i + 1].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); if (i > 0) links[i - 1].focus(); else input.focus(); }
      if (e.key === "Escape") { box.hidden = true; input.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search")) box.hidden = true;
    });
  }
})();
