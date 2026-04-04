/**
 * Injects utils/header.html into #site-header, sets active nav link, and wires nav UI.
 * Pages must include: <div id="site-header" data-active-page="home|menu|catering|about|contact"></div>
 */
(function () {
  "use strict";

  function setActiveNavLink(activePage) {
    if (!activePage) return;
    document.querySelectorAll(".nav-links a[data-nav]").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-nav") === activePage);
    });
  }

  function initHeaderNav() {
    const toggleBtn = document.getElementById("modeToggle");
    if (toggleBtn) {
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
      }

      toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
          toggleBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
          localStorage.setItem("theme", "dark");
        } else {
          toggleBtn.innerHTML = '<i class="fa-regular fa-sun"></i>';
          localStorage.setItem("theme", "light");
        }
      });
    }

    function updateHeaderSolidState() {
      const navbar = document.querySelector("header");
      if (!navbar) return;
      const isSubpage = document.body.classList.contains("page-with-fixed-nav");
      // Home: transparent + white links over dark hero until scroll. Menu/Catering:
      // light background — always use "solid" bar so links use theme text color.
      if (isSubpage || window.scrollY > 50) {
        navbar.classList.add("navbar-solid");
      } else {
        navbar.classList.remove("navbar-solid");
      }
    }

    window.addEventListener("scroll", updateHeaderSolidState);
    updateHeaderSolidState();

    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || !href.includes("#")) return;
        let hash = "";
        try {
          const url = new URL(href, window.location.href);
          hash = url.hash ? url.hash.slice(1) : "";
          if (!hash) return;
          const onIndex =
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("/index.html");
          const linkToIndex =
            url.pathname === "/" ||
            url.pathname.endsWith("/index.html");
          if (!onIndex || !linkToIndex) return;
        } catch {
          return;
        }
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        if (icon) {
          icon.className = navLinks.classList.contains("active")
            ? "fa-solid fa-xmark"
            : "fa-solid fa-bars";
        }
      });

      navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
          const icon = hamburger.querySelector("i");
          if (icon) icon.className = "fa-solid fa-bars";
        }
      });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) return;
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.querySelector(".nav-links");
      if (!hamburger || !navLinks) return;
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      const icon = hamburger.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  }

  async function loadHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const activePage = mount.dataset.activePage || "";
    const res = await fetch("/utils/header.html");
    if (!res.ok) {
      console.error("loadHeader: failed to fetch header", res.status);
      return;
    }
    const html = (await res.text()).trim();
    mount.outerHTML = html;
    setActiveNavLink(activePage);
    initHeaderNav();
  }

  loadHeader().catch((err) => console.error("loadHeader:", err));
})();
