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

// 10/11/2025 - Chana Daal, Chana Masala, Daal Makhani.
// 10/11/2025 - Mixed Veggie, Aloo Tori, Aloo Baingan.
// Wednesday's Special: Goat Curry
