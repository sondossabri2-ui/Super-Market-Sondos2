document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTS =====
  const itemsBox = document.getElementById("checkoutCartItems");
  const totalBox = document.getElementById("orderTotal");
  const form     = document.getElementById("checkoutForm");
  const popup    = document.getElementById("orderPopup");
  const closeBtn = document.getElementById("closePopup");

  if (!itemsBox || !totalBox) return;

  // ===== GET CART =====
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  itemsBox.innerHTML = "";

  // ===== RENDER ORDER SUMMARY =====
  if (cart.length === 0) {
    itemsBox.innerHTML = `<p>Your cart is empty 🛒</p>`;
  } else {
    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      itemsBox.innerHTML += `
        <div class="order-item">
          <img
            src="${item.img || './img/placeholder.png'}"
            alt="${item.name}"
            onerror="this.src='./img/placeholder.png'"
          >

          <div class="order-info">
            <h5>${item.name}</h5>
            <span class="order-qty">Qty: ${item.qty}</span>
          </div>

          <div class="order-price">
            $${itemTotal.toFixed(2)}
          </div>
        </div>
      `;
    });
  }

  // ===== TOTAL =====
  totalBox.textContent = total.toFixed(2);

  // ===== PLACE ORDER =====
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      // Show popup
      popup.style.display = "flex";

      // Clear cart
      localStorage.removeItem("cart");

      // Reset UI
      itemsBox.innerHTML = `<p>Your cart is empty 🛒</p>`;
      totalBox.textContent = "0.00";
    });
  }

  // ===== CLOSE POPUP =====
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

});





