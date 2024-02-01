class Visit {
  form = [
    {
      label: "Прізвище",
      value: this.fullName,
      type: "text",
      name: "fullName",
    },

    {
      label: "Доктор",
      value: this.doctor,
      type: "text",
      name: "doctor",
    },
    {
      label: "Мета візиту",
      value: this.meta,
      type: "text",
      name: "meta",
    },
    {
      label: "Терміновість",
      value: this.term,
      type: "select",
      name: "term",
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
  ];
  constructor(dataStr) {
      const data = JSON.parse(dataStr)
      console.log(6, data)
    
    this.form[0].value = data.data.fullName
    this.description = data.data.description;
    this.term = data.data.term;
    this.meta = data.data.meta;
    this.form[1].value = data.doctor;
    this.id = data.id;
    console.log(7, this.form)
  }

  deleteVisit() {
    delete this;
  }

  editVisit() {}

  renderVisit() {
    console.log(1, this.form)
    const fields = this.form
      .map((element) => {
        let field;
        console.log(5, element)
        switch (element.type) {
          case "text":
            field = `
                     <div class="mb-3">
                       <label for="${element.name}"  class="form-label">Мета візиту</label>
                       <input type="text" name="${element.name}" class="form-control" id="${element.name}" value="${element.value}" desabled>
                    </div>`;
            break;
          case "select":
            field = `
                <div class="mb-3">
                    <label for="${element.name}" class="form-label">${
              element.label
            }</label>
                    <select
                        desabled
                        name="${element.name}"
                        id="${element.name}"
                        class="form-select"
                        aria-label="Пример выбора по умолчанию"
                    >
                    ${element
                      .options.map((option) => {
                        return `<option value="${option.value}" ${
                          element.value === option.value ? "selected" : null
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
                <label for="${element.name}"  class="form-label">Мета візиту</label>
                <input type="text" name="${element.name}" class="form-control" id="${element.name}" value="${element.value}">
             </div>`;
        }
        return field
      })
      .join("");
      console.log(8, fields)
    return `
        <div class="col-4 border">
            <form id="editForm${this.id}">
                ${fields}
                <button type="submit" class="btn btn-primary">Оновити</button>
            </form>
        </div>`;
  }
}

export default Visit;
