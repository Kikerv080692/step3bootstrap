import Visit from "./visit.js";

class VisitTherapist extends Visit {
  addedForm = {
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
   

    this.form.doctor.value = data.doctor;
    this.form.description.value = data.description;
    this.form.term.value = data.term;
    this.form.meta.value = data.meta;
    this.form.fullName.value = data.fullName;
    this.form.age.value = data.age;
    this.id = id;
    this.board = board;
    this.collapse = true;
    this.edited = false;
    this.boardObj = boardObj;
    const content = this.renderVisit(this.form);
    this.appendCard(content);
  }
}

export default VisitTherapist;
