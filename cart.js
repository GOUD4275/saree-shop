let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
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

// LOAD CART
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

// INCREASE QTY
function increaseQty(index) {
  cart[index].qty += 1;
  saveAndReload();
}

// DECREASE QTY
function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  }
  saveAndReload();
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  saveAndReload();
}

// CLEAR CART
function clearCart() {
  cart = [];
  saveAndReload();
}

// SAVE + RELOAD
function saveAndReload() {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// CHECKOUT
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

// AUTO LOAD
if (document.getElementById("cart-items")) {
  loadCart();
}
