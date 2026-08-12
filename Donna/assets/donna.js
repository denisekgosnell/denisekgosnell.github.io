/* BUILD YOUR OWN DONNA · copy buttons + Gmail/Outlook tab toggle */
(function () {
  "use strict";

  /* ---------- copy buttons ---------- */

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for non-secure contexts (e.g. plain http dry runs)
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var block = btn.closest(".prompt");
      var pre = block && block.querySelector("pre");
      if (!pre) return;
      copyText(pre.innerText.trim()).then(
        function () {
          var original = btn.textContent;
          btn.textContent = "Copied ✓";
          btn.classList.add("copied");
          window.setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove("copied");
          }, 1800);
        },
        function () {
          var original = btn.textContent;
          btn.textContent = "Press ⌘C / Ctrl+C";
          var range = document.createRange();
          range.selectNodeContents(pre);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          window.setTimeout(function () { btn.textContent = original; }, 4000);
        }
      );
    });
  });

  /* ---------- Gmail / Outlook tab toggle ---------- */

  var STORE_KEY = "donna-mail-tab";

  function selectTab(group, name) {
    group.querySelectorAll(".tab").forEach(function (tab) {
      var on = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    group.querySelectorAll(".tab-panel").forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== name;
    });
  }

  var groups = document.querySelectorAll(".tabs");

  function choose(name) {
    // Remember the choice so every toggle on every page follows it
    try { window.localStorage.setItem(STORE_KEY, name); } catch (e) { /* private mode */ }
    groups.forEach(function (g) { selectTab(g, name); });
  }

  groups.forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll(".tab"));
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { choose(tab.dataset.tab); });
    });
    var list = group.querySelector(".tab-list");
    if (list) {
      // WAI-ARIA tabs pattern: arrow keys move focus and selection between tabs
      list.addEventListener("keydown", function (e) {
        var i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        choose(tabs[next].dataset.tab);
        tabs[next].focus();
      });
    }
  });

  var saved = null;
  try { saved = window.localStorage.getItem(STORE_KEY); } catch (e) { /* private mode */ }
  if (saved) {
    groups.forEach(function (g) {
      if (g.querySelector('.tab[data-tab="' + saved + '"]')) selectTab(g, saved);
    });
  }
})();
