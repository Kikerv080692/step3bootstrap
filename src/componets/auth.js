import { Modal } from "bootstrap";
import { setCookie, getCookie } from "./cookie.js";

class Enter {
  isEnter = false;
  button;
  modalLogin;
  constructor(id, modal) {
    this.modal = modal;
    this.button = document.getElementById(id);
    this.buttonExit = document.getElementById("exit");

    this.modalLogin = new Modal(this.modal.modal, {
      keyboard: false,
    });
    if (getCookie('token')) {
      this.isEnter = true;
      this.changeTitle(true)
    } else {
      this.changeTitle(false)
    }
    // this.login()
  }
  changeTitle(isLogin) {
    this.isEnter = isLogin;
    let title = this.isEnter ? "Створити візит" : "Вхід";
    this.button.textContent = title;
    if (this.isEnter) {
      this.buttonExit.classList.remove("d-none");
    } 
  }

  login(boardObj) {
    this.modal.modalLabel.textContent = "Авторизація";
    this.modal.modalBody.innerHTML = `<form id="loginForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" name="password" class="form-control" id="exampleInputPassword1">
        </div> 
        </div>
        <button type="submit" class="btn btn-primary">Війти</button>
            </form>`;
    this.modalLogin.show();
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const objFormData = {};
      const formData = new FormData(form);

      for (const [key, value] of formData.entries()) {
        objFormData[key] = value;
      }

      const token = await this.fetchAuth(objFormData);
       setCookie("token", token, 7);
      this.modalLogin.hide();
      this.changeTitle(true);
      boardObj.getVisits()
    });
    this.modalLogin.hide();
  }

  async fetchAuth(data) {
    try {
      const { email, password } = data;
      const response = await fetch(
        "https://ajax.test-danit.com/api/v2/cards/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        return response.text();
      } else {
        console.log("Incorect user name or password");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Enter;
