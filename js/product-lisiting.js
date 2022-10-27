import { loadHeaderFooter } from "./utils.js";
import getParams from "./utils.js";
import ExternalServices from "./ExternalServices.js";
import ProductListing from "./productList.js";

loadHeaderFooter();

const category = getParams("category");

const externalServices = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductListing(category, externalServices, listElement);

productList.init();
