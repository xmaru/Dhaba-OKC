fetch("cateringMenu.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("cateringMenu");

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";

      let priceHTML = "";

      if (item.type === "tray") {
        priceHTML = `
          <p>Quarter: $${item.prices.quarter}</p>
          <p>Small: $${item.prices.small}</p>
          <p>Medium: $${item.prices.medium}</p>
          <p>Large: $${item.prices.large}</p>
        `;
      } else if (item.type === "piece") {
        priceHTML = `
          <p>Each: $${item.prices.each}</p>
        `;
      }

      card.innerHTML = `
        <h3>${item.name}</h3>
        ${priceHTML}
      `;

      container.appendChild(card);
    });
  });
