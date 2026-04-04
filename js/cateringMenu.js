/**
 * Catering menu: loads menu.json, tabs (Chicken, Beef, Goat, …), search, no prices.
 */
(function () {
  "use strict";

  const TABS = [
    "all",
    "Chicken",
    "Beef",
    "Goat",
    "Veggie",
    "Appetizers",
    "Dessert",
    "Others",
  ];

  const TAB_LABELS = {
    all: "All",
    Chicken: "Chicken",
    Beef: "Beef",
    Goat: "Goat",
    Veggie: "Veggie",
    Appetizers: "Appetizers",
    Dessert: "Dessert",
    Others: "Others",
  };

  const tabsEl = document.getElementById("catering-tabs");
  const gridEl = document.getElementById("catering-menu");
  const searchInput = document.getElementById("catering-search");
  const searchBtn = document.getElementById("catering-search-btn");

  if (!tabsEl || !gridEl) return;

  let items = [];
  let activeTab = "all";

  function deriveCateringTab(row) {
    const cat = row.category;
    const id = row.id.toLowerCase();
    const name = row.name.toLowerCase();

    if (cat === "Veggie") return "Veggie";
    if (cat === "Appetizers") return "Appetizers";
    if (cat === "Dessert") return "Dessert";
    if (cat === "Meat") {
      if (/\bbeef\b/.test(name) || id.includes("beef")) return "Beef";
      if (/\bgoat\b/.test(name) || id.includes("goat")) return "Goat";
      if (
        /mutton|\bghost\b|ghosht|nargasi/i.test(name) ||
        id.includes("nargasi")
      ) {
        return "Goat";
      }
      if (/\bchicken\b/.test(name) || id.includes("chicken")) return "Chicken";
      return "Chicken";
    }
    return "Others";
  }

  function normalizeItems(data) {
    return data.map((row) => ({
      id: row.id,
      name: row.name,
      tab: deriveCateringTab(row),
    }));
  }

  function getSearchQuery() {
    return (searchInput && searchInput.value ? searchInput.value : "").trim();
  }

  function filteredList() {
    const q = getSearchQuery().toLowerCase();
    return items.filter((item) => {
      if (activeTab !== "all" && item.tab !== activeTab) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q);
    });
  }

  function sortByName(a, b) {
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  }

  function renderTabs() {
    tabsEl.innerHTML = "";
    TABS.forEach((tab) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "catering-tab" + (activeTab === tab ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", activeTab === tab ? "true" : "false");
      btn.dataset.tab = tab;
      btn.textContent = TAB_LABELS[tab];
      btn.addEventListener("click", () => {
        activeTab = tab;
        tabsEl.querySelectorAll(".catering-tab").forEach((b) => {
          const on = b.dataset.tab === activeTab;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        renderGrid();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderGrid() {
    const list = filteredList().sort(sortByName);
    gridEl.innerHTML = "";

    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "catering-empty";
      empty.textContent = getSearchQuery()
        ? "No dishes match your search. Try another word or pick a different category."
        : "No items in this category.";
      gridEl.appendChild(empty);
      return;
    }

    list.forEach((item) => {
      const card = document.createElement("article");
      card.className = "catering-card";
      const title = document.createElement("p");
      title.className = "catering-card-title";
      title.textContent = item.name;
      card.appendChild(title);
      gridEl.appendChild(card);
    });
  }

  function onSearchChange() {
    renderGrid();
  }

  if (searchInput) {
    searchInput.addEventListener("input", onSearchChange);
    searchInput.addEventListener("search", onSearchChange);
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.focus();
      onSearchChange();
    });
  }

  fetch("/menu.json")
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load menu");
      return r.json();
    })
    .then((data) => {
      items = normalizeItems(data);
      renderTabs();
      renderGrid();
    })
    .catch((err) => {
      console.error(err);
      gridEl.innerHTML =
        '<p class="catering-menu-error">Unable to load the catering menu. Please try again later.</p>';
    });
})();
