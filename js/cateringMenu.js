/**
 * Catering menu: loads menu.json with category tabs + search (names only).
 * Defaults to all categories, grouped by section; tabs narrow the list.
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
    all: "All categories",
    Meat: "Meat",
    Seafood: "Seafood",
    Veggies: "Veggies",
    "Rice and Others": "Rice & others",
    Bread: "Bread",
    Appetizers: "Appetizers",
    Desserts: "Desserts",
    Others: "Others",
  };

  const CATEGORY_ORDER = TABS.filter((t) => t !== "all");

  const tabsEl = document.getElementById("catering-tabs");
  const listEl = document.getElementById("catering-menu");
  const searchInput = document.getElementById("catering-search");
  const searchBtn = document.getElementById("catering-search-btn");

  if (!tabsEl || !listEl) return;

  let items = [];
  let activeTab = "all";
  let lastManualTab = "all";
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
        renderList();
      });
      tabsEl.appendChild(btn);
    });
  }

  /**
   * @param {{ name: string, tab?: string }} item
   * @param {{ categoryTag?: string }} opts
   */
  function renderNameRow(item, opts) {
    const row = document.createElement("article");
    row.className = "menu-row";

    const head = document.createElement("div");
    head.className = "menu-row-head";

    const name = document.createElement("h3");
    name.className = "menu-row-name";
    name.textContent = item.name;

    head.appendChild(name);

    if (opts && opts.categoryTag) {
      const tag = document.createElement("span");
      tag.className = "catering-row-category";
      tag.textContent = opts.categoryTag;
      head.appendChild(tag);
    }

    row.appendChild(head);
    return row;
  }

  function setMetaText(list, q) {
    const total = items.length;
    if (!q && activeTab === "all") {
      metaEl.textContent = `${total} dishes below, grouped by category. Use a tab to show one category only.`;
      return;
    }
    if (!q) {
      const scope =
        activeTab === "all" ? "all categories" : TAB_LABELS[activeTab];
      metaEl.textContent = `Showing ${list.length} ${
        list.length === 1 ? "dish" : "dishes"
      } in ${scope}.`;
      return;
    }
    if (activeTab === "all") {
      metaEl.textContent = `${list.length} ${
        list.length === 1 ? "match" : "matches"
      } for “${q}” across all categories.`;
    } else {
      metaEl.textContent = `${list.length} ${
        list.length === 1 ? "match" : "matches"
      } for “${q}” in ${TAB_LABELS[activeTab]}.`;
    }
  }

  function renderList() {
    const q = getSearchQuery();
    const list = filteredList().sort(sortByName);
    listEl.innerHTML = "";
    setMetaText(list, q);

    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "catering-empty";
      empty.textContent = q
        ? "No items match your search. Try another word."
        : "No items in this category.";
      listEl.appendChild(empty);
      return;
    }

    const showCategoryOnRow = Boolean(q) && activeTab === "all";

    if (!q && activeTab === "all") {
      listEl.classList.remove("catering-list-flat");
      CATEGORY_ORDER.forEach((cat) => {
        const inCat = items
          .filter((i) => i.tab === cat)
          .sort(sortByName);
        if (inCat.length === 0) return;

        const sec = document.createElement("section");
        sec.className = "menu-section";

        const headRow = document.createElement("div");
        headRow.className = "menu-section-head";

        const h2 = document.createElement("h2");
        h2.className = "menu-section-title";
        const slug = cat.replace(/\s+/g, "-").replace(/&/g, "and").toLowerCase();
        h2.id = `catering-cat-${slug}`;
        h2.textContent = TAB_LABELS[cat];

        headRow.appendChild(h2);

        const listWrap = document.createElement("div");
        listWrap.className = "menu-section-list";

        inCat.forEach((item) => {
          listWrap.appendChild(renderNameRow(item));
        });

        sec.setAttribute("aria-labelledby", h2.id);
        sec.appendChild(headRow);
        sec.appendChild(listWrap);
        listEl.appendChild(sec);
      });
      return;
    }

    listEl.classList.add("catering-list-flat");
    const flat = document.createElement("div");
    flat.className = "menu-section-list";

    list.forEach((item) => {
      const tag = showCategoryOnRow ? TAB_LABELS[item.tab] || item.tab : "";
      flat.appendChild(
        renderNameRow(item, showCategoryOnRow ? { categoryTag: tag } : {})
      );
    });

    listEl.appendChild(flat);
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
    renderList();
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
      renderList();
    })
    .catch((err) => {
      console.error(err);
      listEl.innerHTML =
        '<p class="catering-menu-error">Unable to load the catering menu. Please try again later.</p>';
    });
})();
