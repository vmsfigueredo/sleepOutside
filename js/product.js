import getParams from "./utils.js";
import ExternalServices from "./ExternalServices.js";
import ProductDetails from "./productDetails.js";

const productId = getParams("product");

const product = new ExternalServices();
const details = new ProductDetails(productId, product);

details.init();
