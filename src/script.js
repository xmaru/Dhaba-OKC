"use strict";

const toggleBtn = document.getElementById("modeToggle");

// Check saved preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.checked = true;
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.innerHTML = '<i class="fa-regular fa-sun"></i>';
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector("header");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-solid");
  } else {
    navbar.classList.remove("navbar-solid");
  }
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  // chance icon when menu is open
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }

  // Close menu when clicking on a link
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");

      // reset to hamburger icon
      const icon = hamburger.querySelector("i");
      icon.className = "fa-solid fa-bars";
    }
  });
});
