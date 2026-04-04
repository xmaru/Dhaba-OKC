/**
 * Catering menu: loads menu.json with category tabs + search (no prices).
 */
(function () {
  "use strict";

  const TABS = [
    "all",
    "Meat",
    "Seafood",
    "Veggies",
    "Rice and Others",
    "Bread",
    "Appetizers",
    "Desserts",
    "Others",
  ];

  const TAB_LABELS = {
    all: "All",
    Meat: "Meat",
    Seafood: "Seafood",
    Veggies: "Veggies",
    "Rice and Others": "Rice and Others",
    Bread: "Bread",
    Appetizers: "Appetizers",
    Desserts: "Desserts",
    Others: "Others",
  };

  const tabsEl = document.getElementById("catering-tabs");
  const gridEl = document.getElementById("catering-menu");
  const searchInput = document.getElementById("catering-search");
  const searchBtn = document.getElementById("catering-search-btn");

  if (!tabsEl || !gridEl) return;

  let items = [];
  let activeTab = "all";
  let lastManualTab = "Meat";
  let searchForcedAll = false;

  const metaEl = document.createElement("p");
  metaEl.className = "catering-results-meta";
  tabsEl.insertAdjacentElement("afterend", metaEl);

  function deriveCateringTab(row) {
    const cat = (row.category || "").trim();
    if (cat === "Meat") return "Meat";
    if (cat === "Seafood") return "Seafood";
    if (cat === "Veggie") return "Veggies";
    if (cat === "Rice & Others") return "Rice and Others";
    if (cat === "Bread") return "Bread";
    if (cat === "Appetizers") return "Appetizers";
    if (cat === "Dessert") return "Desserts";
    if (cat === "Others") return "Others";
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

  function updateTabUI() {
    tabsEl.querySelectorAll(".catering-tab").forEach((btn) => {
      const on = btn.dataset.tab === activeTab;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function setActiveTab(nextTab) {
    if (!TAB_LABELS[nextTab]) return;
    activeTab = nextTab;
    if (nextTab !== "all") {
      lastManualTab = nextTab;
    }
    updateTabUI();
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
        searchForcedAll = false;
        setActiveTab(tab);
        renderGrid();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderGrid() {
    const list = filteredList().sort(sortByName);
    gridEl.innerHTML = "";
    const q = getSearchQuery();

    if (!q) {
      const scopeLabel = activeTab === "all" ? "all categories" : activeTab;
      metaEl.textContent = `Showing ${list.length} ${
        list.length === 1 ? "item" : "items"
      } in ${scopeLabel}.`;
    } else {
      metaEl.textContent =
        activeTab === "all"
          ? `Showing ${list.length} results for "${q}" across all categories.`
          : `Showing ${list.length} results for "${q}" in ${activeTab}.`;
    }

    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "catering-empty";
      empty.textContent = q
        ? "No items match your search. Try another word."
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
    const hasQuery = Boolean(getSearchQuery());
    if (hasQuery && activeTab !== "all") {
      searchForcedAll = true;
      setActiveTab("all");
    } else if (!hasQuery && searchForcedAll && activeTab === "all") {
      searchForcedAll = false;
      setActiveTab(lastManualTab);
    }
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
