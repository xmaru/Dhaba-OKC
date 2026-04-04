/**
 * Renders a shared footer block with dynamic year.
 * Used by pages that do not load /js/script.js.
 */
(function () {
  "use strict";

  const mount = document.querySelector("footer .footer");
  if (!mount) return;

  const currentYear = new Date().getFullYear();
  mount.innerHTML = `
    <div class="footer-contact">
      <div class="footer-contact-grid">
        <section class="footer-contact-col">
          <h3 class="footer-contact-title">Dhaba OKC</h3>
          <p class="footer-contact-text">
            Authentic Pakistani cuisine in Oklahoma City, served with warm hospitality and traditional flavor.
          </p>
        </section>

        <nav class="footer-contact-col" aria-label="Footer quick links">
          <h4 class="footer-contact-heading">Quick Links</h4>
          <ul class="footer-contact-links">
            <li><a class="footer-link" href="/">Home</a></li>
            <li><a class="footer-link" href="/pages/menu.html">Menu</a></li>
            <li><a class="footer-link" href="/pages/catering.html">Catering</a></li>
            <li><a class="footer-link" href="/#contact">Contact</a></li>
          </ul>
        </nav>

        <section class="footer-contact-col">
          <h4 class="footer-contact-heading">Connect With Us</h4>
          <p class="footer-contact-text">
            <a
              class="footer-link footer-contact-direct"
              href="https://maps.app.goo.gl/xEgLADxViKi1H4MJ6"
              target="_blank"
              rel="noopener noreferrer"
              >4600 NE 120th St,<br />Oklahoma City, OK 73013</a
            >
          </p>
          <p class="footer-contact-text">
            <a class="footer-link footer-contact-direct" href="tel:+14054782151"
              >(405) 478-2151</a
            >
          </p>
        </section>
      </div>
      <p class="footer-contact-copy">&copy; ${currentYear} Dhaba OKC. All rights reserved.</p>
    </div>
  `;
})();
