const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

async function convertToJson(res) {
  const response = res.json();

  if (res.ok) {
    return response;
  } else {
    throw {
      name: "servicesError",
      message: response,
    };
  }
}

export default class ExternalServices {
  constructor() {}

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(id) {
    return await fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  async loginRequest(user){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(baseURL + "login/", options).then(convertToJson);
    this.getOrders(response.accessToken);
    return response.accessToken;
  }

  async getOrders(token) {
    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };

    const orders = await fetch(baseURL + "orders/", options).then(convertToJson);
    return orders;
  }
}