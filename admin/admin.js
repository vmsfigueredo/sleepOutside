import ExternalServices from "../js/ExternalServices.js";

export default class Admin {
    constructor(outputSelector){
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    };
    async login(creds, next){
        try {
            this.token = await this.services.loginRequest(creds);
            next();
        }
        catch(err) {
            console.log(err.message);
        }

    };

    form(){
        return `<form>
        <label for="email">Email</label>
        <input name="email" id="email" type="email" required>
        <label for="password">Password</label>
        <input name="password" id="password" type="password" required>
        <input id="button" type="submit" value="Login">
        </form>`;
    }

    showLogin(){
        this.mainElement.innerHTML = this.form();

        document.getElementById("button").addEventListener("click", (e) => {
            e.preventDefault();
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            this.login({email, password});
        });
    };



}
const admin = new Admin("#form");
admin.showLogin(); 