import { renderListWithTemplate } from "./utils.js";

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);

    // render the list
    this.renderList(list);
    // document.querySelector(".title").innerHTML = this.category;
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    const filteredList = list.filter(
      (item) => item.Id !== "989CG" && item.Id !== "880RT"
    );
    //get the template
    const template = document.getElementById("product-card-template");
    renderListWithTemplate(
      template,
      this.listElement,
      filteredList,
      this.prepareTemplate
    );
  }

  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Images.PrimaryMedium;
    template.querySelector("h3").textContent = product.Brand.Name;
    template.querySelector("h2").textContent = product.Name;
    template.querySelector("p").textContent += product.FinalPrice;

    return template;
  }
}
