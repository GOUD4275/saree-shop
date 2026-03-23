let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}


// URL category filter
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    filterProducts(category);
  }
};


function loadCart() {
  let cartDiv = document.getElementById("cart-items");
  let total = 0;

  cartDiv.innerHTML = "";

  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function checkout() {
  let message = "Order Details:\n";
  cart.forEach(item => {
    message += item.name + " - ₹" + item.price + "\n";
  });

  window.open(`https://wa.me/919959008593?text=${encodeURIComponent(message)}`);
}

if (document.getElementById("cart-items")) {
  loadCart();
}
