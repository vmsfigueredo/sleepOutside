import { getLocalStorage, setLocalStorage } from "./utils.js";
import ExternalServices from "./ExternalServices.js";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  let simplifiedItems;
  if (items) {
  simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  }
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
  }

  getSubtotal() {
    const contents = getLocalStorage("so-cart");
    let pricesArray;
    let subTotal;
    if (contents){
    pricesArray = contents.map((item) => item.FinalPrice);
    }
    if (pricesArray){
    subTotal = pricesArray.reduce((acc, curr) => acc + curr);
    }
    return subTotal;
    
  }

  displayStuff() {
    const subTotal = this.getSubtotal();

    document.getElementById(
      "subTotal"
    ).innerHTML = `Subtotal: $${subTotal.toFixed(2)}`;

    this.tax = this.getSubtotal() * 0.06;
    document.getElementById("tax").innerHTML = `Tax: $${this.tax.toFixed(2)}`;

    const contentLength = getLocalStorage("so-cart").length;

    this.shipping = (contentLength - 1) * 2 + 10;
    document.getElementById(
      "ship"
    ).innerHTML = `Shipping Estimate: $${this.shipping.toFixed(2)}`;

    this.orderTotal = (this.getSubtotal() + this.tax + this.shipping).toFixed(
      2
    );
    document.getElementById(
      "orderTotal"
    ).innerHTML = `Order total: $${this.orderTotal}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    console.log(json);

    try {
      const res = await services.checkout(json);
      console.log(res);
      location.assign("../checkout/checkedout.html");
      localStorage.clear();

    } catch (err) {
      console.log(err);
      location.assign("../checkout/failed.html");
    }
  }
}
