import { loadHeaderFooter, renderSuperscript } from "./utils.js";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems !== null && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    let total = 0;

    const finalTotal = cartItems
      .map((item) => (total += item.FinalPrice))
      .pop();

    const showTotal = `<h3>Total: $${finalTotal.toFixed(2)}<h3/>`;
    document.querySelector(".products").innerHTML += showTotal;
  } else {
    document.querySelector(".product-list").innerHTML = "";
    const showTotal = "<h3>Total: $0<h3/>";
    document.querySelector(".products").innerHTML += showTotal;
  }
}

function renderCartItem(item) {
  const newItem = `<li class='cart-card divider' data-id='${item.Id}'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <p class='remove'>x</p>
</li>`;

  return newItem;
}

getCartContents();
loadHeaderFooter();

function removeItemFromCart(e) {
  const itemId = e.path[1].dataset.id;

  const localStorageItems = getLocalStorage("so-cart");

  let newCartItems = [];

  localStorageItems.map((item) => {
    if (item.Id != itemId) {
      newCartItems.push(item);
    }
  });

  localStorage.setItem("so-cart", JSON.stringify(newCartItems));

  const headings = [...document.querySelector(".products").children];
  headings[2].remove();
  headings[3].remove();

  getCartContents();
  addRemoveListener();
  renderSuperscript();
}

function addRemoveListener() {
  const removeItemsList = [...document.querySelectorAll(".remove")];

  removeItemsList.map((item) =>
    item.addEventListener("click", removeItemFromCart)
  );
}

document.getElementById("checkoutButton").onclick = function (event) {
  event.preventDefault();
  location.href = "/checkout";
};

addRemoveListener();
