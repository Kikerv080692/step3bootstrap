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
      type: "text",
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
  constructor(dataStr) {
    const { id, data } = dataStr;

    this.form.doctor.value = data.doctor;
    this.form.description.value = data.description;
    this.form.term.value = data.term;
    this.form.meta.value = data.meta;
    this.form.fullName.value = data.fullName;
    this.id = id;
  }

  deleteVisit() {
    delete this;
  }

  editVisit() {}

  renderVisit() {
    let fields = "";
    for (let element in this.form) {
      console.log(5, element);
      let field;
      this.form[element].value =  !this.form[element].value ?  '' :  this.form[element].value
      switch (this.form[element].type) {
        case "text":
          field = `
                   <div class="mb-3">
                     <label for="${this.form[element].name}"  class="form-label">${this.form[element].label}</label>
                     <input type="text" name="${this.form[element].name}" class="form-control" id="${this.form[element].name}" value="${this.form[element].value}" disabled>
                  </div>`;
          break;
        case "select":
          field = `
              <div class="mb-3">
                  <label for="${this.form[element].name}" class="form-label">${
            this.form[element].label
          }</label>
                  <select
                      disabled
                      name="${this.form[element].name}"
                      id="${this.form[element].name}"
                      class="form-select"
                      aria-label="Пример выбора по умолчанию"
                  >
                  ${this.form[element].options
                    .map((option) => {
                      return `<option value="${option.value}" ${
                        this.form[element].value === option.value
                          ? "selected"
                          : null
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
              <label for="${this.form[element].name}"  class="form-label">Мета візиту</label>
              <input type="text" name="${this.form[element].name}" class="form-control" id="${this.form[element].name}" value="${this.form[element].value}" disabled>
           </div>`;
      }
     
      if(element === 'meta'){
      field = `<button  class="btn btn-primary" type="button" id="button${this.id}">Показати більше</button>
      <div class="collapse" id="collapse${this.id}">` + field

      }
      fields += field;
    }
    fields += `</div>`
    console.log(8, fields);
    return `
        
            <form id="editForm${this.id}">
              <div class="d-flex justify-content-end">
                  <button type="button" id="btnClose${this.id}" class="btn-close " aria-label="Close" ></button>
              </div>
                ${fields}
  
            </form>
        `;
  }
}

export default Visit;
