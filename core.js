/* add the helper classes */
(function() {
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
  })()

/* add the css */

  
    var s = document.currentScript;
    if (!s) {
      var scripts = document.getElementsByTagName("script");
      s = scripts[scripts.length - 1];
    }
    var src = (s && s.src) || "";
    // Replace .../rating-stars(.min).js?x=y  ->  .../rating-stars.css?x=y
    cssHref = src.replace(/core(\.min)?\.js(\?.*)?$/i, "core.css$2");
    // Fallback hard URL (edit to your latest tag if needed)
    if (!/\.css/i.test(cssHref)) {
      cssHref = "https://cdn.jsdelivr.net/gh/postcaptain/report-boxes@v0.8.0/core.css";
    }

  // Inject CSS <link> once
  if (!document.querySelector('link[rel="stylesheet"][href="'+cssHref+'"]')) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    document.head.appendChild(link);
  }
