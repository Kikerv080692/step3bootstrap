import Board from "./board.js";
import { Collapse } from "bootstrap";
class Visit {
  form = {
    fullName: {
      label: "Прізвище",
      value: "",
      type: "text",
    },
    doctor: {
      label: "Доктор",
      value: "",
      type: "select",
      options: [
        {
          value: "cardio",
          label: "Кардіолог",
        },
        {
          value: "dantist",
          label: "Стоматолог",
        },
        {
          value: "terapevt",
          label: "Терапевт",
        },
      ],
    },
    meta: {
      label: "Мета візиту",
      value: "",
      type: "text",
    },
    description: {
      label: "Опис візиту",
      value: "",
      type: "text",
    },
    term: {
      label: "Терміновість",
      value: "",
      type: "select",

      options: [
        {
          label: "Звичайна",
          value: "Звичайна",
        },
        {
          label: "Пріоритетна",
          value: "Пріоритетна",
        },
        {
          label: "Невідкладна",
          value: "Невідкладна",
        },
      ],
    },
  };
  constructor(dataStr, board, boardObj) {
    const { id, data } = dataStr;

    this.form.doctor.value = data.doctor;
    this.form.description.value = data.description;
    this.form.term.value = data.term;
    this.form.meta.value = data.meta;
    this.form.fullName.value = data.fullName;
    this.id = id;
    this.board = board;
    this.collapse = true;
    this.edited = false;
    this.boardObj = boardObj;
  }

  appendCard(content) {
    console.log(15,content)
    const card = document.createElement("div");
    this.card = card;
    card.classList.add("col-4");
    card.innerHTML = content;
    this.board.appendChild(card);
    const myCollapse = document.getElementById(`collapse${this.id}`);
    const bsCollapse = new Collapse(myCollapse, {
      toggle: false,
    });
    const button = document.getElementById(`button${this.id}`);
    const edit = document.getElementById(`edit${this.id}`);
    button.addEventListener("click", (event) => {
      event.preventDefault();
      bsCollapse.toggle();
      button.innerText = this.collapse ? "Згорнути" : "Показати більше";
      this.collapse = !this.collapse;
      if (this.collapse) {
        edit.classList.add("d-none");
        button.classList.remove("d-none");
      } else {
        edit.classList.remove("d-none");
      }
    });

    edit.addEventListener("click", (e) => {
      if (this.edited) {
        this.edited = false;
        edit.textContent = "Редагувати";
        edit.classList.add("btn-primary");
        edit.classList.remove("btn-success");
        button.classList.remove("d-none");
        this.card.querySelectorAll("input, select").forEach((element) => {
          element.disabled = true;
        });
        const form = document.getElementById(`editForm${this.id}`);
        form.querySelectorAll("input, select").forEach((element) => {
          console.log(3, element.getAttribute("name"), element.value);
        });
        const visitObj = this.boardObj.visits.filter((element) => {
          element.id === this.id;
        });
        // to do зробити збереження змін до локального сховища
        console.log(10, visitObj);
      } else {
        this.edited = true;
        edit.textContent = "Зберегти";
        edit.classList.remove("btn-primary");
        edit.classList.add("btn-success");
        button.classList.add("d-none");
        this.card.querySelectorAll("input, select").forEach((element) => {
          element.disabled = false;
        });
      }
    });
  }

  removeVisit() {
    this.card.remove();
  }

  renderVisit(form) {
    console.log(9, form);
    let fields = "";
    for (let element in form) {
      let field;
      form[element].value = !form[element].value ? "" : form[element].value;
      switch (form[element].type) {
        case "text":
          field = `
                   <div class="mb-3">
                     <label for="${element}"  class="form-label">${form[element].label}</label>
                     <input type="text" name="${element}" class="form-control" id="${form[element].name}" value="${form[element].value}" disabled>
                  </div>`;
          break;
        case "select":
          field = `
              <div class="mb-3">
                  <label for="${form[element].name}" class="form-label">${
            form[element].label
          }</label>
                  <select
                      disabled
                      name="${element}"
                      id="${form[element].name}"
                      class="form-select"
                      aria-label="Пример выбора по умолчанию"
                  >
                  ${form[element].options
                    .map((option) => {
                      return `<option value="${option.value}" ${
                        form[element].value === option.value ? "selected" : null
                      }>${option.label}</option>`;
                    })
                    .join("")}
                  </select>
              </div>
              `;
          break;
        default:
          field = `
           <div class="mb-3">
              <label for="${element}"  class="form-label">Мета візиту</label>
              <input type="text" name="${element}" class="form-control" id="${form[element].name}" value="${form[element].value}" disabled>
           </div>`;
      }

      if (element === "meta") {
        field = `<div class="collapse"  id="collapse${this.id}">` + field;
      }
      fields += field;
    }
    fields += `</div><button  class="btn btn-primary" type="button" id="button${this.id}">Показати більше</button>
                     <button  class="btn btn-primary d-none" type="button" id="edit${this.id}">Редагувати</button>`;
    return ` <div class="card">
                 <div class='card-header d-flex justify-content-end'> <button type="button" id="btnClose${this.id}" class="btn-close " aria-label="Close" ></button></div>
                   <form class="card-body" id="editForm${this.id}">
                      ${fields}
                   </form>
                </div>
        `;
  }
}

export default Visit;
