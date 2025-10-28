// Global JS + home page (index.html) JS

"use strict";

// ////////////////////////
// Dark Mode Toggle Logic //
// ////////////////////////
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

// ////////////////////////
// Navigation Code     //
////////////////////////
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  // change icon when menu is open
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

// Close menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    const icon = hamburger.querySelector("i");
    icon.className = "fa-solid fa-bars";
  }
});

// ///////////////////////
// Buffet Section Code  //
// ///////////////////////

const buffetHeader = document.querySelector(".buffet-header h2");
const days = [
  "Sunday's",
  "Monday's",
  "Tuesday's",
  "Wednesday's",
  "Thursday's",
  "Friday's",
  "Saturday's",
];
const todayDay = new Date().getDay();
buffetHeader.textContent = `${days[todayDay]} Buffet`;

// ================================
// Dynamic Buffet Rotation Logic
// ================================

// 10/11/2025 - Chana Daal, Chana Masala, Daal Makhani.
// 10/11/2025 - Mixed Veggie, Aloo Tori, Aloo Baingan.
// Wednesday's Special: Goat Curry

const daalItems = [
  {
    title: "Chana Daal",
    description: "Yellow split chickpeas cooked with spices.",
    image: "assets/images/buffetItems/chanaDaal.jpg",
    alt: "Chana Daal",
    category: "vegetarian",
  },
  {
    title: "Chana Masala",
    description: "Chickpeas cooked in a spicy tomato-based sauce.",
    image: "assets/images/buffetItems/chanaMasala.jpg",
    alt: "Chana Masala",
    category: "vegetarian",
  },
  {
    title: "Daal Makhani",
    description: "Black lentils cooked with butter and cream.",
    image: "assets/images/buffetItems/daalMakh.jpg",
    alt: "Daal Makhani",
    category: "vegetarian",
  },
];

const veggieItems = [
  {
    title: "Mixed Veggie",
    description: "A mix of potatoes, carrots, and peas cooked with spices.",
    image: "assets/images/buffetItems/mixedVeggie.jpg",
    alt: "Mixed Veggie",
    category: "vegetarian",
  },
  {
    title: "Aloo Tori",
    description: "Potatoes and zucchini cooked with spices.",
    image: "assets/images/buffetItems/alooTori.jpg",
    alt: "Aloo Tori",
    category: "vegetarian",
  },
  {
    title: "Aloo Baingan",
    description: "Potatoes and eggplant cooked with spices.",
    image: "assets/images/buffetItems/alooBaingan.jpg",
    alt: "Aloo Baingan",
    category: "vegetarian",
  },
];
// Dynamic render of daal and veggie items (each day there is one item from each category)
const startDate = new Date("2025-10-11"); // Start date for rotation
const today = new Date();
const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

// Determine today's item index for both lists
const daalIndex = daysPassed % daalItems.length;
const veggieIndex = daysPassed % veggieItems.length;

const todayDaal = daalItems[daalIndex];
const todayVeggie = veggieItems[veggieIndex];

// Update the daal card DOM elements
const daalCard = document.querySelector(".veggie-daal-card");
if (daalCard) {
  daalCard.querySelector(".buffet-card-title").innerHTML =
    todayDaal.title +
    `<span class="tag tag-vegetarian"><i class="fa-solid fa-leaf"></i>Vegetarian</span>`;
  daalCard.querySelector("p").textContent = todayDaal.description;
  daalCard.querySelector("img").src = todayDaal.image;
  daalCard.querySelector("img").alt = todayDaal.alt;
}

// Update the veggie card DOM elements
const veggieCard = document.querySelector(".veggie-curry-card");
if (veggieCard) {
  veggieCard.querySelector(".buffet-card-title").innerHTML =
    todayVeggie.title +
    `<span class="tag tag-vegetarian"><i class="fa-solid fa-leaf"></i>Vegetarian</span>`;
  veggieCard.querySelector("p").textContent = todayVeggie.description;
  veggieCard.querySelector("img").src = todayVeggie.image;
  veggieCard.querySelector("img").alt = todayVeggie.alt;
}

// ==================================
// Special Day Item Logic - Wednesday
// ===================================

let day = new Date().getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
// For testing purposes, uncomment the next line to set day to Wednesday
// day = 3;

if (day === 3) {
  // Grab Chicken Curry card and Special Day card elements
  const chickenCurryCard = document.querySelector(".chicken-curry-card");
  // Hide the Chicken Curry card on Wednesdays
  chickenCurryCard.style.display = "none";
} else {
  // Hide the Special Day card (goat curry) on all other days
  const specialDayCard = document.querySelector(".special-day-card");
  specialDayCard.style.display = "none";
}

// ///////////////////
//   Contact Section  //
///////////////////////

// Fetch Weather from Netlify function
fetch("/.netlify/functions/getWeather")
  .then((response) => response.json())
  .then((data) => {
    const weatherCondition = document.querySelector(".weather-condition");
    const weatherTemp = document.querySelector(".weather-temp");
    const errorIcon = document.querySelector(".error-icon");
    const weatherCard = document.querySelector(".weather-card");

    if (data.error) {
      if (weatherCondition)
        weatherCondition.textContent = "Error loading weather.";
      if (weatherTemp) weatherTemp.textContent = "";
      console.error("Weather API Error:", data.error);
      return;
    }

    // Update text
    if (weatherCondition) {
      weatherCondition.textContent = data.current.condition.text;
    }
    if (weatherTemp) {
      weatherTemp.textContent = `${data.current.temp_f} °F`;
    }

    // Replace error icon with weather icon
    const apiImg = document.createElement("img");
    apiImg.src = `https:${data.current.condition.icon}`;
    apiImg.alt = data.current.condition.text || "Weather";
    apiImg.className = "weather-icon-img";
    apiImg.width = 56;
    apiImg.height = 56;

    if (weatherCard) {
      if (errorIcon) errorIcon.remove();
      weatherCard.insertBefore(apiImg, weatherCard.firstChild);
    }
  })
  .catch((error) => {
    const weatherCondition = document.querySelector(".weather-condition");
    const weatherTemp = document.querySelector(".weather-temp");
    if (weatherCondition) {
      weatherCondition.textContent = "Unable to retrieve weather data.";
    }
    if (weatherTemp) {
      weatherTemp.textContent = "";
    }
    console.error("Error fetching weather data:", error);
  });

//      Footer        //
// ////////////////////
const currentYear = new Date().getFullYear();
document.querySelector(".footer").innerHTML = `
  <p>&copy; ${currentYear} Dhaba OKC. All rights reserved.</p>
  <p>
    Developed by
    <a class="footer-link" href="https://github.com/xmaru" target="_blank">Umar</a>
  </p>
`;
