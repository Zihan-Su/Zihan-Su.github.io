/* Local interactions for both editions. No analytics or network requests. */
(function () {
  function ready() {
    setupCites();
    setupBib();
    setupToc();
  }

  function setupCites() {
    const tip = document.createElement("div");
    tip.className = "cite-tip";
    document.body.appendChild(tip);
    document.querySelectorAll("a.cite").forEach(function (link) {
      const href = link.getAttribute("href") || "";
      const reference = href.startsWith("#")
        ? document.getElementById(href.slice(1))
        : null;
      if (!reference) return;
      link.addEventListener("mouseenter", function () {
        tip.textContent = reference.textContent.replace(/\s+/g, " ").trim();
        tip.classList.add("on");
        const rect = link.getBoundingClientRect();
        tip.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - 360)) + "px";
        tip.style.top = rect.bottom + 8 + "px";
      });
      link.addEventListener("mouseleave", function () { tip.classList.remove("on"); });
      link.addEventListener("click", function (event) {
        event.preventDefault();
        tip.classList.remove("on");
        document.querySelectorAll(".refs li.flash").forEach(function (item) {
          item.classList.remove("flash");
        });
        reference.classList.add("flash");
        reference.scrollIntoView({ behavior: "smooth", block: "center" });
        // Some local-file browsers restrict History API changes.
        try { history.replaceState(null, "", href); } catch (_) {}
        setTimeout(function () { reference.classList.remove("flash"); }, 1600);
      });
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {}
    }
    const field = document.createElement("textarea");
    const focused = document.activeElement;
    field.value = text;
    field.readOnly = true;
    field.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0";
    document.body.appendChild(field);
    field.select();
    try {
      return document.execCommand("copy");
    } catch (_) {
      return false;
    } finally {
      field.remove();
      if (focused && typeof focused.focus === "function") focused.focus({ preventScroll: true });
    }
  }

  function setupBib() {
    document.querySelectorAll(".bib-copy").forEach(function (button) {
      const code = button.closest(".bib").querySelector("code");
      if (!code) return;
      const label = button.textContent;
      button.addEventListener("click", async function () {
        button.disabled = true;
        const copied = await copyText(code.textContent);
        if (copied) {
          button.textContent = "✓";
        } else {
          const selection = window.getSelection();
          if (selection) {
            const range = document.createRange();
            range.selectNodeContents(code);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          button.textContent = document.documentElement.lang === "zh-Hans"
            ? "请手动复制" : "Copy selected text";
        }
        setTimeout(function () {
          button.textContent = label;
          button.disabled = false;
        }, copied ? 1200 : 3000);
      });
    });
  }

  function setupToc() {
    const items = Array.from(document.querySelectorAll(".toc a")).map(function (link) {
      return { link: link, section: document.getElementById(link.getAttribute("href").slice(1)) };
    }).filter(function (item) { return item.section; });
    if (!items.length) return;
    function sync() {
      let current = items[0];
      items.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= 140) current = item;
      });
      items.forEach(function (item) { item.link.classList.toggle("on", item === current); });
    }
    document.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
