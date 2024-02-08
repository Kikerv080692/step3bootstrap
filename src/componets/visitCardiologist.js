import Visit from "./visit.js";

class VisitCardiologist extends Visit {
  addedForm = {
    press: {
      label: "звичайний тиск",
      value: "",
      type: "text",
    },
    mass: {
      label: "Індекс маси тіла",
      value: "",
      type: "text",
    },
    heart: {
      label: "перенесені захворювання серцево-судинної системи",
      value: "",
      type: "text",
    },
    age: {
      label: "вік",
      value: "",
      type: "text",
    },
  };
  constructor(dataStr, board, boardObj) {
    super(dataStr, board, boardObj);
    this.form = { ...this.form, ...this.addedForm };
    const { id, data } = dataStr;
    console.log(11, data);

    this.form.doctor.value = data.doctor;
    this.form.description.value = data.description;
    this.form.term.value = data.term;
    this.form.meta.value = data.meta;
    this.form.fullName.value = data.fullName;
    this.id = id;

    this.form.press.value = data.press;
    this.form.mass.value = data.mass;
    this.form.heart.value = data.heart;
    this.form.age.value = data.value;

    this.board = board;
    this.collapse = true;
    this.edited = false;
    this.boardObj = boardObj;
    const content = this.renderVisit(this.form);
    this.appendCard(content);
  }
}

export default VisitCardiologist;
