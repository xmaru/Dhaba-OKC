# Dhaba OKC

A simple static website for a small business in Oklahoma City.
Website with a hero, daily buffet, menu, catering, contact with embedded map and a small weather widget. The project is built with plain HTML, CSS and vanilla JavaScript.
With a growing customer base, we needed a faster way to communicate the prices of regular menu and catering menu. What better way to do that than create a website that can be viewed on a desktop or mobile.

## Table of Contents

- Project overview
- Features
- Project structure
- Running locally
- Weather API note
- Next Steps
- License
- Contact / Author

## Project overview

This repository contains the front-end files for a small restaurant site. It's intentionally simple (no build step) so it can be deployed to any static host.

Primary files:

- `index.html` — landing page with hero, buffet, about and contact sections.
- `pages/menuPage.html` — menu page (styles live in `css/menuPage.css`).
- `pages/cateringPage.html` — catering page.
- `css/index.css`, `css/menuPage.css`, `css/cateringPage.css` — stylesheets.
- `js/script.js` — site JavaScript (theme toggle, navigation, buffet rotation, weather fetch, footer generation).
- `assets/` — images, favicons, and data.

## Features

- Responsive layout
- Light/dark theme toggle (stored in localStorage)
- Hamburger mobile navigation
- Daily rotating buffet items (date-based selection)
- Google maps iframe to pinpoint the location of the restaurant.
- Small weather card (uses WeatherAPI currently)

## Project structure

```
index.html
pages/
	menuPage.html
	cateringPage.html
css/
	index.css
	menuPage.css
	cateringPage.css
js/
	script.js
assets/
	images/
	data/
```

## Running locally

You can use `Live Server` extension to run this project as there is no build command or anything of that sort.
It is pure HTML/CSS and JavaScript. The weather API will not work locally because I am pulling the API key from Netlify environment variable.
You are free to go to https://www.weatherapi.com/ and create an account for your own API key.

- You will have to adjust the code to use your own API key.

## Weather API note

Usually people develop a weather app to showcase that they know how to work with APIs, going on that similar path.
Instead of making a full weather app, I simply implemented the weather condition and temperature in OKC.

## Next Steps:

- Refactoring the code to export header and footer html to avoid duplicate coding and re-designing the header and footer.
- Develop and create the menu page with no search functionality as it will be short.
  No images, mini square cards for each items. Food will be divided by Meat, vegetable, appetizer, and sweets category.
- Catering page will consist of 50-70+ items with 4 sizes: quarter, small, medium, large. I will pull the data
  from JSON file and render to html using JavaScript. This page will have a search functionality as it consists of more than 50+ items.

Longterm goals:

- Payment your catering bill online, update prices from admin dashboard.
- Different project but will develop a Dhaba POS System for customers to view the catering menu, create orders, and submit orders.
  - For the staff/admins: Using the order, generate an invoice and have a functionality to export the invoice as PDF.
  - Mark invoices as notpaid/paid.
  - Pay for the invoice online.
  - Store invoices in database (maybe for upto 30-60days)

## License

This project is provided under the MIT License.

## Contact / Author

Developed by Umar — https://github.com/xmaru

---
