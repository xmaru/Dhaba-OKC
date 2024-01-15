"use strict";

const h1 = document.querySelector("h1");
h1.addEventListener("mouseenter", () => {
  h1.style.backgroundColor = "#f44336";
});

h1.addEventListener("mouseleave", () => {
  h1.style.backgroundColor = "#ffffff";
});
