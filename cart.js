// ================= CART DATA =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ❤️ WISHLIST START */
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(name) {
  if (!wishlist.includes(name)) {
    wishlist.push(name);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(name + " wishlist lo add ayindi ❤️");
  } else {
    alert("Already wishlist lo undi");
  }
}
/* ❤️ WISHLIST END */

// ================= FIX OLD DATA =================
cart = cart.map(item => ({
  ...item,
  qty: item.qty || 1
}));

// ================= ADD TO CART =================
function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " cart లో add అయింది");
}

// ================= SEARCH PRODUCTS =================
function searchProducts() {
  let input = document.getElementById("searchBox").value.toLowerCase();
  let products = document.querySelectorAll(".product");

  products.forEach(p => {
    let text = p.innerText.toLowerCase();

    // 🔥 Telugu + English keywords
    if (
      text.includes(input) ||
      (input.includes("dola") && text.includes("డోలా")) ||
      (input.includes("cotton") && text.includes("కాటన్")) ||
      (input.includes("linen") && text.includes("లినెన్"))
    ) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// ================= FILTER PRODUCTS =================
function filterProducts(category) {
  let products = document.querySelectorAll(".product");

  products.forEach(p => {
    if (category === "all") {
      p.style.display = "block";
    } 
    else if (p.classList.contains(category)) {
      p.style.display = "block";
    } 
    else {
      p.style.display = "none";
    }
  });
}

// ================= CATEGORY LOAD =================
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  let category = params.get("category");

  if (category) {
    category = category.trim().toLowerCase();
    filterProducts(category);
  }
});

// ================= LOAD CART =================
function loadCart() {
  let cartDiv = document.getElementById("cart-items");
  let total = 0;

  if (!cartDiv) return;

  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>మీ కార్ట్ ఖాళీగా ఉంది</p>";
    document.getElementById("total").innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div class="cart-box">
        <p>${item.name} - ₹${item.price}</p>

        <button onclick="decreaseQty(${index})">➖</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${index})">➕</button>

        <p>Subtotal: ₹${itemTotal}</p>

        <button onclick="removeItem(${index})">❌ Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

// ================= QTY CONTROLS =================
function increaseQty(index) {
  cart[index].qty += 1;
  saveAndReload();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  }
  saveAndReload();
}

// ================= REMOVE =================
function removeItem(index) {
  cart.splice(index, 1);
  saveAndReload();
}

// ================= CLEAR CART =================
function clearCart() {
  cart = [];
  saveAndReload();
}

// ================= SAVE + RELOAD =================
function saveAndReload() {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ================= CHECKOUT =================
function checkout() {

  if (cart.length === 0) {
    alert("Cart ఖాళీగా ఉంది");
    return;
  }

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Details fill చేయండి");
    return;
  }

  let message = "🛍️ Order Details:\n\n";
  let total = 0;

  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    message += `${item.name} x${item.qty} = ₹${itemTotal}\n`;
  });

  message += "\n💰 Total: ₹" + total;
  message += "\n\n👤 Name: " + name;
  message += "\n📞 Phone: " + phone;
  message += "\n🏠 Address: " + address;

  window.open("https://wa.me/919959008593?text=" + encodeURIComponent(message));
}

// ================= AUTO LOAD CART =================
if (document.getElementById("cart-items")) {
  loadCart();
}