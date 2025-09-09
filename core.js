/* core.js */
(function() {
  // Run once DOM is ready
  function init() {
    const rows = document.querySelectorAll(".report_row");
    const attr = "data-type"; 
    const maxCols = 4;

    let i = 0;
    while (i < rows.length) {
      const val = rows[i].getAttribute(attr);
      let j = i;
      while (j < rows.length && rows[j].getAttribute(attr) === val) j++;
      const runLength = j - i;

      // clamp to maxCols
      const clamped = Math.min(runLength, maxCols);

      for (let k = i; k < j; k++) {
        const row = rows[k];
        row.classList.add(`stack${clamped}`);
        
        // add highlight if text starts with "%"
        const text = row.textContent.trim();
        if (text.startsWith("%")) {
          row.classList.add("highlight");
        }
      }
      i = j;
    }

    /* if a query has no results, show "no results" */
    function checkQueries() {
      document.querySelectorAll('.report_part[data-type="query"] table tbody').forEach(tbody => {
        if (!tbody.querySelector('tr') && !tbody.dataset.noResultsInjected) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = tbody.closest('table').querySelectorAll('thead th').length || 1;
          td.textContent = "No results";
          td.classList.add("no-results");
          tr.appendChild(td);
          tbody.appendChild(tr);
          tbody.dataset.noResultsInjected = "true"; // ✅ don’t run twice
        }
      });
    }
    
    checkQueries(); // run once immediately
    
    const observer = new MutationObserver(() => {
      checkQueries();
    });
    
    document.querySelectorAll('.report_part[data-type="query"]').forEach(part => {
      observer.observe(part, { childList: true, subtree: true });
    });
  }

  // Inject CSS <link> once
  function injectCSS() {
    let s = document.currentScript;
    if (!s) {
      const scripts = document.getElementsByTagName("script");
      s = scripts[scripts.length - 1];
    }
    let src = (s && s.src) || "";

    // Replace .../report-boxes/core(.min).js?x=y -> .../report-boxes/core.css?x=y
    let cssHref = src.replace(/core(\.min)?\.js(\?.*)?$/i, "core.css$2");

    // Fallback hard URL (edit to your latest tag if needed)
    if (!/\.css/i.test(cssHref)) {
      cssHref = "https://cdn.jsdelivr.net/gh/postcaptain/report-boxes@v0.8.5/core.css";
    }

    if (!document.querySelector(`link[rel="stylesheet"][href="${cssHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
    }
  }

  // Inject Fonts
  function injectFonts() {
    const href = "https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=DM+Sans&display=swap";
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }


  // Initialize
  injectCSS();
  injectFonts();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
