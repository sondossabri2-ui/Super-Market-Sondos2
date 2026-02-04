document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     CART STATE
  ====================== */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* ======================
     ELEMENTS
  ====================== */
  const cartSidebar = document.getElementById("cartSidebar");
  const cartToggle  = document.getElementById("cartToggle");
  const closeCart   = document.getElementById("closeCart");
  const cartItems   = document.getElementById("cartItems");
  const cartTotal   = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartCount   = document.getElementById("cart-count"); // ✔️ مهم


  /* ======================
     ADD TO CART
  ====================== */
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {

      const name  = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const img   = btn.dataset.img || "";

      if(!name || isNaN(price)) return;

      const existing = cart.find(item => item.name === name);

      if(existing){
        existing.qty++;
      }else{
        cart.push({ name, price, img, qty: 1 });
      }

      updateCart();
    });
  });

  /* ======================
     UPDATE CART
  ====================== */
  function updateCart(){
    cartItems.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
      cartItems.innerHTML = `<p class="empty-cart">🛒 Your cart is empty</p>`;
      cartTotal.textContent = "0.00";
      if(checkoutBtn){
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = 0.5;
      }
      updateCartCount();
      saveCart();
      return;
    }

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.img}">
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="quantity-control">
          <button class="decrease">-</button>
          <span>${item.qty}</span>
          <button class="increase">+</button>
        </div>
        <button class="remove-btn">&times;</button>
      `;

      cartItems.appendChild(div);

      div.querySelector(".increase").onclick = () => {
        item.qty++;
        updateCart();
      };

      div.querySelector(".decrease").onclick = () => {
        if(item.qty > 1) item.qty--;
        else cart.splice(index, 1);
        updateCart();
      };

      div.querySelector(".remove-btn").onclick = () => {
        cart.splice(index, 1);
        updateCart();
      };
    });

    cartTotal.textContent = total.toFixed(2);

    if(checkoutBtn){
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = 1;
    }

    updateCartCount();
    saveCart();
  }

  /* ======================
     CART COUNT (BADGE)
  ====================== */
  function updateCartCount(){
    if(!cartCount) return;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    if(totalQty > 0){
      cartCount.textContent = totalQty;
      cartCount.style.display = "flex";
    }else{
      cartCount.style.display = "none";
    }
  }

  /* ======================
     SAVE CART
  ====================== */
  function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* ======================
     INITIAL LOAD
  ====================== */
  updateCart();
});
document.getElementById("search-form").addEventListener("submit", function(e){
  e.preventDefault();

  const value = document
    .getElementById("search-input")
    .value
    .toLowerCase()
    .trim();

  if(value === "") return;

  const products = document.querySelectorAll(".product-card");
  let found = false;

  products.forEach(card => {
    const name = card
      .querySelector(".product-name")
      .innerText
      .toLowerCase();

    card.classList.remove("highlight");

    if(name.includes(value) && !found){
      found = true;

      card.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      card.classList.add("highlight");
    }
  });

  if(!found){
    alert("❌ Product not found");
  }
});
document.getElementById("search-input")
  .addEventListener("input", () => {
    document.getElementById("search-form").dispatchEvent(new Event("submit"));
  });
document.addEventListener("DOMContentLoaded", () => {
  const cartToggle  = document.getElementById("cartToggle");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCart   = document.getElementById("closeCart");

  if(cartToggle){
    cartToggle.addEventListener("click", () => {
      cartSidebar.classList.add("active");
    });
  }

  if(closeCart){
    closeCart.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
    });
  }
});