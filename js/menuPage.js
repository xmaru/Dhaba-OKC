/**
 * Dine-in / takeout menu page — loads menu data from /data/dineInMenuSample.json
 */
(function () {
  "use strict";

  const root = document.getElementById("menu-page-root");
  if (!root) return;

  function renderPriceBlock(item) {
    const wrap = document.createElement("div");
    wrap.className = "menu-row-prices";

    if (item.small && item.large) {
      [["Small", item.small], ["Large", item.large]].forEach(([label, val]) => {
        const pair = document.createElement("span");
        pair.className = "menu-price-pair";
        const lab = document.createElement("span");
        lab.className = "menu-price-label";
        lab.textContent = `${label}:`;
        const amt = document.createElement("span");
        amt.className = "menu-price-value";
        amt.textContent = val;
        pair.appendChild(lab);
        pair.appendChild(amt);
        wrap.appendChild(pair);
      });
      return wrap;
    }

    const single = document.createElement("span");
    single.className = "menu-row-price-single";
    single.textContent = item.price || "";
    wrap.appendChild(single);
    return wrap;
  }

  function renderRow(item) {
    const row = document.createElement("article");
    row.className = "menu-row";

    const head = document.createElement("div");
    head.className = "menu-row-head";

    const name = document.createElement("h3");
    name.className = "menu-row-name";
    name.textContent = item.name;

    head.appendChild(name);
    head.appendChild(renderPriceBlock(item));

    const desc = document.createElement("p");
    desc.className = "menu-row-desc";
    desc.textContent = item.description;

    row.appendChild(head);
    row.appendChild(desc);

    if (item.note) {
      const note = document.createElement("p");
      note.className = "menu-row-note";
      note.textContent = item.note;
      row.appendChild(note);
    }

    return row;
  }

  function render(data) {
    root.innerHTML = "";

    const header = document.createElement("section");
    header.className = "menu-page-header";

    const titleWrap = document.createElement("div");
    titleWrap.className = "menu-page-title-wrap";

    const h1 = document.createElement("h1");
    h1.className = "menu-page-title";
    h1.id = "menu-page-title";
    h1.textContent = data.title;

    titleWrap.appendChild(h1);

    const sub = document.createElement("p");
    sub.className = "menu-page-subtitle";
    sub.textContent = data.subtitle;

    header.appendChild(titleWrap);
    header.appendChild(sub);
    root.appendChild(header);

    data.sections.forEach((section) => {
      const sec = document.createElement("section");
      sec.className = "menu-section";
      sec.setAttribute("aria-labelledby", `section-${section.id}`);

      const headRow = document.createElement("div");
      headRow.className = "menu-section-head";

      const h2 = document.createElement("h2");
      h2.className = "menu-section-title";
      h2.id = `section-${section.id}`;
      h2.textContent = section.title;

      headRow.appendChild(h2);

      if (section.sectionNote) {
        const sn = document.createElement("p");
        sn.className = "menu-section-note";
        sn.textContent = section.sectionNote;
        headRow.appendChild(sn);
      }

      const list = document.createElement("div");
      list.className = "menu-section-list";

      section.items.forEach((item) => {
        list.appendChild(renderRow(item));
      });

      sec.appendChild(headRow);
      sec.appendChild(list);
      root.appendChild(sec);
    });
  }

  fetch("/data/dineInMenuSample.json")
    .then((r) => {
      if (!r.ok) throw new Error("Menu unavailable");
      return r.json();
    })
    .then(render)
    .catch(() => {
      root.innerHTML =
        '<p class="menu-page-error">We couldn’t load the menu. Please refresh or try again later.</p>';
    });
})();
