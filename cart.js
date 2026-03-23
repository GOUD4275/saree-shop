let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " cart లో add అయింది");
}

// FILTER PRODUCTS
function filterProducts(category) {
  let products = document.querySelectorAll(".product");

  products.forEach(p => {
    if (category === "all") {
      p.style.display = "block";
    } else if (p.classList.contains(category)) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// URL CATEGORY FILTER
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    filterProducts(category);
  }
};

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

  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Cart ఖాళీగా ఉంది");
    return;
  }

  let message = "Order Details:\n";

  cart.forEach(item => {
    message += item.name + " - ₹" + item.price + "\n";
  });

  window.open("https://wa.me/919959008593?text=" + encodeURIComponent(message));
}

// AUTO LOAD CART
if (document.getElementById("cart-items")) {
  loadCart();
}
