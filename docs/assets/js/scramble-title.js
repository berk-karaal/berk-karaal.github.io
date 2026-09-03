(function () {
  "use strict";

  var CONFIG = {
    window: 7,
    ticks: 10,
    tickMs: 10,
    pool: "0123456789!@#$%&*+-=/\\<>?^~|:;",
  };

  var PAGE_PATTERNS = [/^\/notes\/.+\/$/, /^\/blog\/\d{4}\/\d{2}\/\d{2}\/.+\/$/];
  var TITLE_SELECTOR = ".md-content__inner h1";

  var attached = [];

  function isTargetPage() {
    var path = window.location.pathname;
    return PAGE_PATTERNS.some(function (re) {
      return re.test(path);
    });
  }

  function isSpace(ch) {
    return /\s/.test(ch);
  }

  function randomChar() {
    return CONFIG.pool[Math.floor(Math.random() * CONFIG.pool.length)];
  }

  function wrapChars(h1) {
    var spans = [];
    Array.prototype.slice.call(h1.childNodes).forEach(function (node) {
      if (node.nodeType !== Node.TEXT_NODE) return;
      var frag = document.createDocumentFragment();
      var word = null;
      Array.from(node.textContent).forEach(function (ch) {
        var span = document.createElement("span");
        span.className = "scramble-char";
        span.textContent = ch;
        span.dataset.char = ch;
        span.setAttribute("aria-hidden", "true");
        spans.push(span);
        if (isSpace(ch)) {
          word = null;
          frag.appendChild(span);
          return;
        }
        if (!word) {
          word = document.createElement("span");
          word.className = "scramble-word";
          frag.appendChild(word);
        }
        word.appendChild(span);
      });
      node.replaceWith(frag);
    });
    return spans;
  }

  function lockWidths(spans) {
    spans.forEach(function (span) {
      span.classList.remove("is-locked");
      span.style.width = "";
    });
    var widths = spans.map(function (span) {
      return span.getBoundingClientRect().width;
    });
    spans.forEach(function (span, i) {
      if (isSpace(span.dataset.char)) return;
      span.classList.add("is-locked");
      span.style.width = widths[i] + "px";
    });
  }

  function attach(h1) {
    if (h1.dataset.scramble) return;
    h1.dataset.scramble = "on";

    var spans = wrapChars(h1);
    h1.setAttribute(
      "aria-label",
      spans
        .map(function (span) {
          return span.dataset.char;
        })
        .join("")
        .trim()
    );
    attached.push(spans);
    document.fonts.ready.then(function () {
      lockWidths(spans);
    });

    var run = 0;
    var active = [];

    function restore(list) {
      list.forEach(function (span) {
        span.textContent = span.dataset.char;
        span.classList.remove("is-scrambling");
      });
    }

    function burst(center) {
      var half = Math.floor(CONFIG.window / 2);
      var next = [];
      for (var i = center - half; i <= center + half; i++) {
        if (spans[i] && !isSpace(spans[i].dataset.char)) next.push(spans[i]);
      }
      restore(
        active.filter(function (span) {
          return next.indexOf(span) === -1;
        })
      );
      active = next;
      var id = ++run;
      var tick = 0;

      function step() {
        if (id !== run) return;
        tick++;
        if (tick >= CONFIG.ticks) {
          restore(active);
          active = [];
          return;
        }
        active.forEach(function (span) {
          span.textContent = randomChar();
          span.classList.add("is-scrambling");
        });
        setTimeout(step, CONFIG.tickMs);
      }
      step();
    }

    spans.forEach(function (span, i) {
      span.addEventListener("mouseenter", function () {
        burst(i);
      });
    });
    h1.addEventListener("mouseleave", function () {
      run++;
      restore(active);
      active = [];
    });
  }

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!isTargetPage()) return;
    var h1 = document.querySelector(TITLE_SELECTOR);
    if (h1) attach(h1);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      attached = attached.filter(function (spans) {
        return spans.length && spans[0].isConnected;
      });
      attached.forEach(lockWidths);
    }, 150);
  });

  // document$ is Material's page observable; it re-emits after navigation.instant swaps content.
  if (window.document$) {
    window.document$.subscribe(init);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
