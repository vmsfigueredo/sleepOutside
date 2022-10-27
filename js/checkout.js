import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./CheckoutProcess.js";

loadHeaderFooter();

const checkOut = new CheckoutProcess("so-cart", ".checkout-summary");
checkOut.init();

function checkoutTotal() {
  checkOut.getSubtotal();
}

function calcShipping() {
  checkOut.displayStuff();
}

window.addEventListener("load", checkoutTotal);

document.querySelector("#zip").addEventListener("blur", calcShipping);

document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    checkOut.checkout();
  });
