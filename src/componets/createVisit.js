import { Modal } from "bootstrap";
import { getCookie } from "./cookie.js";

class CreateVisit {
  constructor(modal) {
    this.modal = modal;
    this.modalLogin = new Modal(this.modal.modal, {
      keyboard: false,
    });
    

  }

  create(boardObj) {
    this.modal.modalLabel.textContent = "Створення візиту";
    this.modal.modalBody.innerHTML = `<form class="p-3" id="createForm">
            <div class="mb-3">
              <label for="fullName"  class="form-label">ПІБ</label>
              <input type="text" name="fullName" class="form-control" id="fullName" required>
            </div> 

            <div class="mb-3">
              <label for="doctor" class="form-label">Лікар</label>
              <select
              name="doctor"
              id="doctor"
              class="form-select"
              aria-label="Пример выбора по умолчанию"
              required
            >
              <option value="" disabled selected>Вибір лікаря</option>
              <option value="cardio">Кардіолог</option>
              <option value="dantist">Стоматолог</option>
              <option value="terapevt">Терапевт</option>
            </select>
            </div>
            

            <div class="mb-3">
                <label for="meta"  class="form-label">Мета візиту</label>
                <input type="text" name="meta" class="form-control" id="meta" required>
            </div> 

            <div class="mb-3">
                <label for="description"  class="form-label">Короткий опис візиту</label>
                <input type="text" name="description" class="form-control" id="description" required>
            </div> 

            <div class="mb-3">
                <label for="term" class="form-label">Терміновість</label>
                <select
                    name="term"
                    id="term"
                    class="form-select"
                    aria-label="Пример выбора по умолчанию"
                    required
                >
                    <option value="" disabled selected>Терміновість</option>
                    <option value="Звичайна">Звичайна</option>
                    <option value="Пріоритетна">Пріоритетна</option>
                    <option value="Невідкладна">Невідкладна</option>
                </select>
            </div>

           

            <fieldset class="d-none"  id="cardio">
                <div class="mb-3">
                    <label for="press"  class="form-label">Звичайний тиск</label>
                    <input type="text" name="press" class="form-control" id="press">
                </div> 
                <div class="mb-3">
                    <label for="mass"  class="form-label">маса тіла</label>
                     <input type="text" name="mass" class="form-control" id="mass">
                </div> 
                <div class="mb-3">
                    <label for="heart"  class="form-label">перенесені захворювання серцево-судинної системи</label>
                    <input type="text" name="heart" class="form-control" id="heart">
                </div> 
                <div class="mb-3">
                    <label for="age"  class="form-label">Вік</label>
                    <input type="text" name="age" class="form-control" id="age">
                </div> 
            </fieldset >

            <fieldset class="d-none" id="dantist">
              <div class="mb-3">
                <label for="date"  class="form-label">Дата останнього відвідування</label>
                 <input type="text" name="date" class="form-control" id="date">
              </div> 
            </fieldset >


            <fieldset class="d-none" id="terapevt">
              <div class="mb-3">
                <label for="age"  class="form-label">Вік</label>
                <input type="text" name="age" class="form-control" id="age">
              </div>  
            </fieldset>
            <button type="submit" class="btn btn-primary">Cтворити</button>
            <button type="reset" class="btn btn-primary">Закрити</button>
                </form>`;
    this.modalLogin.show();

    const doctor = document.getElementById("doctor");
    doctor.addEventListener("change", (event) => {
      const doctorValue = doctor.value;
      Array.from(document.querySelectorAll("#createForm fieldset")).forEach(
        (element) => {
          element.classList.add("d-none");
        }
      );
      const fields = document.getElementById(doctorValue);
      if (fields) {
        fields.classList.remove("d-none");
      }
    });

    const form = document.getElementById("createForm");
    form.addEventListener("reset", (e) => {
        this.modalLogin.hide();
    })
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const objFormData = {};
      const formData = new FormData(form);

      for (const [key, value] of formData.entries()) {
        if (value !== "") {
          objFormData[key] = value;
        }
      }
      const dataVisit = await this.fetchCreate(objFormData);

      this.modalLogin.hide();
      boardObj.addCard(dataVisit, true)
      
    });
    this.modalLogin.hide();
  }

  async fetchCreate(data) {
    const token = getCookie("token");
    try {
      const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data,
        }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.log("Incorect form");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CreateVisit;
