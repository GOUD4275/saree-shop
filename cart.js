// ================= DATA =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ================= ADD TO CART =================
function addToCart(name, price, img) {
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " cart లో add అయింది");
}

// ================= WISHLIST =================
function addToWishlist(name, img) {
  let exists = wishlist.find(item => item.name === name);

  if (!exists) {
    wishlist.push({ name, img });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    alert(name + " wishlist lo add ayindi ❤️");
  } else {
    alert("Already wishlist lo undi");
  }
}

// ================= LOAD CART =================
function loadCart() {
  let div = document.getElementById("cart-items");
  let total = 0;

  if (!div) return;

  div.innerHTML = "";

  if (cart.length === 0) {
    div.innerHTML = "<p>Cart ఖాళీగా ఉంది</p>";
    return;
  }

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    div.innerHTML += `
      <div class="cart-box">
        <img src="${item.img}" width="100">
        <p>${item.name}</p>
        <p>₹${item.price}</p>

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

// ================= QTY =================
function increaseQty(i) {
  cart[i].qty++;
  saveReload();
}

function decreaseQty(i) {
  if (cart[i].qty > 1) cart[i].qty--;
  saveReload();
}

// ================= REMOVE =================
function removeItem(i) {
  cart.splice(i, 1);
  saveReload();
}

// ================= CLEAR =================
function clearCart() {
  cart = [];
  saveReload();
}

// ================= SAVE =================
function saveReload() {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// ================= COUNT =================
function updateCartCount() {
  let el = document.getElementById("cart-count");
  if (el) el.innerText = cart.length;
}

function updateWishlistCount() {
  let el = document.getElementById("wish-count");
  if (el) el.innerText = wishlist.length;
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

  let paymentEl = document.querySelector('input[name="payment"]:checked');

  if (!paymentEl) {
    alert("Payment method select చేయండి");
    return;
  }

  let payment = paymentEl.value;

  if (!name || !phone || !address) {
    alert("Details fill చేయండి");
    return;
  }

  let msg = "🛍️ Order Details:\n\n";
  let total = 0;

  cart.forEach(item => {
    let t = item.price * item.qty;
    total += t;
    msg += `${item.name} x${item.qty} = ₹${t}\n`;
  });

  msg += "\n💰 Total: ₹" + total;
  msg += "\n👤 " + name;
  msg += "\n📞 " + phone;
  msg += "\n🏠 " + address;

  // ================= PAYMENT =================
  if (payment === "cod") {

    msg += "\n\n💵 Payment: Cash on Delivery";
    window.open("https://wa.me/919959008593?text=" + encodeURIComponent(msg));

  } else {

    msg += "\n\n💳 Payment: UPI";

    let upiLink = `upi://pay?pa=gowd20092@ibl&pn=KrupaSarees&am=${total}&cu=INR`;
    window.location.href = upiLink;
  }
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  updateWishlistCount();

  if (document.getElementById("cart-items")) {
    loadCart();
  }
});
