document.addEventListener("DOMContentLoaded", () => {
  // Product Images Data
  const productImages = [
    "https://img.freepik.com/premium-photo/t-shirt-plain-red-color-3d-mockup_1057389-78.jpg",
    "https://nikfashions.in/wp-content/uploads/2020/05/Royal-Blue-T-shirt-Mockup.jpg",
    "https://i.pinimg.com/originals/6c/3d/dd/6c3ddd4f609acc5e3fff3e13255cfc15.jpg",
    "https://img.freepik.com/premium-photo/tshirt-plain-black-color_1057389-52.jpg",
  ];

  // Colors Data
  const colors = [
    { name: "Red", hex: "#ff4c4c" },
    { name: "Blue", hex: "#4c6eff" },
    { name: "Green", hex: "#4cff6e" },
    { name: "Black", hex: "#000000" },
  ];

  // Pair Well With Products Data
  const pairWellProducts = [
    { title: "Product A", price: 25.99, img: "https://a2jackets.com/wp-content/uploads/2022/10/Mens-JCM106-Bomber-Brown-Varsity-Jacket.jpg" },
    { title: "Product B", price: 30.49, img: "https://tse2.mm.bing.net/th/id/OIP.ZxTFdQjYoVlQQIQIPYM4SwHaE7?pid=Api&P=0&h=220" },
    { title: "Product C", price: 18.75, img: "https://tse1.mm.bing.net/th/id/OIP.AoRhHI38jOO5hG1Xn4IUTQHaJe?pid=Api&P=0&h=220" },
  ];

  // Bundle products data
  const bundleProducts = [
    { title: "Product A", price: 25.99 },
    { title: "Product B", price: 30.49 },
    { title: "Product C", price: 18.75 },
  ];

  // DOM Elements
  const thumbnailContainer = document.getElementById("thumbnailContainer");
  const mainProductImage = document.getElementById("mainProductImage");
  const colorSwatchesContainer = document.getElementById("colorSwatches");
  const pairCarousel = document.getElementById("pairCarousel");
  const sizeChartBtn = document.getElementById("sizeChartBtn");
  const sizeChartModal = document.getElementById("sizeChartModal");
  const compareColorsBtn = document.getElementById("compareColorsBtn");
  const compareColorsModal = document.getElementById("compareColorsModal");
  const compareColorsContainer = document.getElementById("compareColorsContainer");
  const modalCloseButtons = document.querySelectorAll(".close-modal");
  const mainAddToCartBtn = document.querySelector(".add-to-cart-btn");
  const buyNowBtn = document.querySelector(".buy-now-btn");
  const addBundleCartBtn = document.querySelector(".add-bundle-cart-btn");

  let cart = [];

  // Utility - calculate total in cart
  function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  // Populate thumbnails
  productImages.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Thumbnail ${idx + 1}`;
    if (idx === 0) img.classList.add("active");
    img.addEventListener("click", () => {
      mainProductImage.src = src;
      document.querySelectorAll("#thumbnailContainer img").forEach(t => t.classList.remove("active"));
      img.classList.add("active");
    });
    thumbnailContainer.appendChild(img);
  });

  // Populate color swatches
  colors.forEach(({ name, hex }) => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = hex;
    swatch.title = name;
    swatch.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("selected"));
      swatch.classList.add("selected");
    });
    colorSwatchesContainer.appendChild(swatch);
  });

  // Populate "Pair Well With" carousel
  pairWellProducts.forEach(({ title, price, img }) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${img}" alt="${title}">
      <div class="title">${title}</div>
      <div class="price">$${price.toFixed(2)}</div>
      <button class="add-to-cart-btn" style="padding:0.3rem 0.5rem; font-size:0.9rem;">Add to Cart</button>
    `;
    pairCarousel.appendChild(card);
  });

  // Main Add to Cart button
  if (mainAddToCartBtn) {
    mainAddToCartBtn.addEventListener("click", () => {
      alert("Main product added to cart!");
      // Implement actual cart logic here if needed
    });
  }
  if (buyNowBtn) {
  buyNowBtn.addEventListener("click", () => {
    alert("Thank you for your purchase! Redirecting to checkout...");
    // Redirect to checkout page or proceed with purchase logic here
    // window.location.href = "/checkout"; // example redirect
  });
}

  // Event delegation for pair products Add to Cart buttons
  pairCarousel.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const card = e.target.closest(".product-card");
      const productName = card.querySelector(".title").textContent;
      alert(`Added ${productName} to cart!`);
      // Implement actual cart logic here if needed
    }
  });

  // Add Bundle to Cart
  if (addBundleCartBtn) {
    addBundleCartBtn.addEventListener("click", () => {
      cart = [...cart, ...bundleProducts];
      const productList = bundleProducts.map(p => `${p.title} - $${p.price.toFixed(2)}`).join("\n");
      const total = calculateTotal(cart);
      alert(`Bundle added to cart:\n${productList}\n\nTotal Price: $${total}`);
      // Optionally implement UI update or localStorage here
    });
  }

  // Modal open helper
  function openModal(modal) {
    modal.classList.remove("hidden");
    modal.querySelector(".close-modal").focus();
  }

  // Modal close helper
  function closeModal(modal) {
    modal.classList.add("hidden");
  }

  // Size Chart modal controls
  if (sizeChartBtn) {
    sizeChartBtn.addEventListener("click", () => openModal(sizeChartModal));
  }

  // Compare Colours modal controls
  if (compareColorsBtn) {
    compareColorsBtn.addEventListener("click", () => {
      compareColorsContainer.innerHTML = "";
      const selectedSwatches = Array.from(document.querySelectorAll(".color-swatch.selected"));
      if (selectedSwatches.length < 2) {
        alert("Please select at least two colors to compare.");
        return;
      }
      selectedSwatches.forEach(swatch => {
        const clone = swatch.cloneNode(true);
        clone.classList.remove("selected");
        clone.style.margin = "0 10px";
        compareColorsContainer.appendChild(clone);
      });
      openModal(compareColorsModal);
    });
  }

  // Close modals when close button clicked
  modalCloseButtons.forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });

  // Close modals on clicking outside modal content
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Close modals on ESC key
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal:not(.hidden)").forEach(closeModal);
    }
  });

  // Tabs controls
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.tab;
      document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.toggle("active", content.id === target);
      });
    });
  });
});
