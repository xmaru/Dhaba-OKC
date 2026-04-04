/**
 * Dine-in / takeout menu page — loads sample data from /data/dineInMenuSample.json
 */
(function () {
  "use strict";

  const root = document.getElementById("menu-page-root");
  if (!root) return;

  function renderSpice(level) {
    if (!level || level < 1) return null;
    const max = 3;
    const n = Math.min(Math.max(Math.round(level), 1), max);
    const wrap = document.createElement("div");
    wrap.className = "menu-card-spice";
    wrap.setAttribute("aria-label", `Spice level ${n} of ${max}`);
    for (let i = 0; i < n; i++) {
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-fire";
      icon.setAttribute("aria-hidden", "true");
      wrap.appendChild(icon);
    }
    const label = document.createElement("span");
    label.className = "menu-card-spice-label";
    label.textContent = "Spicy";
    wrap.appendChild(label);
    return wrap;
  }

  function renderCard(item) {
    const card = document.createElement("article");
    card.className = "menu-card";

    const top = document.createElement("div");
    top.className = "menu-card-top";

    const name = document.createElement("h3");
    name.className = "menu-card-name";
    name.textContent = item.name;

    const price = document.createElement("span");
    price.className = "menu-card-price";
    price.textContent = item.price;

    top.appendChild(name);
    top.appendChild(price);

    const desc = document.createElement("p");
    desc.className = "menu-card-desc";
    desc.textContent = item.description;

    card.appendChild(top);
    card.appendChild(desc);

    const spice = renderSpice(item.spicy);
    if (spice) card.appendChild(spice);

    if (item.note) {
      const note = document.createElement("p");
      note.className = "menu-card-note";
      note.textContent = item.note;
      card.appendChild(note);
    }

    return card;
  }

  function render(data) {
    root.innerHTML = "";

    const header = document.createElement("header");
    header.className = "menu-page-header";

    const h1 = document.createElement("h1");
    h1.className = "menu-page-title";
    h1.id = "menu-page-title";
    h1.textContent = data.title;

    const sub = document.createElement("p");
    sub.className = "menu-page-subtitle";
    sub.textContent = data.subtitle;

    header.appendChild(h1);
    header.appendChild(sub);
    root.appendChild(header);

    data.sections.forEach((section) => {
      const sec = document.createElement("section");
      sec.className = "menu-section";
      sec.setAttribute("aria-labelledby", `section-${section.id}`);

      const h2 = document.createElement("h2");
      h2.className = "menu-section-title";
      h2.id = `section-${section.id}`;
      h2.textContent = section.title;

      const grid = document.createElement("div");
      grid.className = "menu-card-grid";

      section.items.forEach((item) => {
        grid.appendChild(renderCard(item));
      });

      sec.appendChild(h2);
      sec.appendChild(grid);
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
