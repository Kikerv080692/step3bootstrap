import Visit from "./visit.js";
import VisitDentist from "./visitDentist.js";


class Board {
  visits = [];
  constructor() {
    console.log("start");
    this.board = document.getElementById("board");
    this.defaultBoard();
  }
  addCard(dataVisit, isNew) {
    if (isNew) {
      this.visits.push(dataVisit);
    }

    let visit = {};

    switch (dataVisit.data.doctor) {
      case "dantist":
        console.log('dant');
        visit = new VisitDentist(dataVisit, this.board, this);
        break;
      default:
        visit = new Visit(dataVisit, this.board, this);
    }
   

    const buttonClose = document.getElementById(`btnClose${dataVisit.id}`);
    buttonClose.addEventListener("click", (event) => {
      event.preventDefault();
      const isConfirm = window.confirm(
        "Ви впевнені, що хочете видалити цей елемент?"
      );
      if (isConfirm) {
        visit.removeVisit();
        this.deleteCard(dataVisit.id);
      } else {
        event.stopPropagation();
      }
    });
    this.defaultBoard();
    this.saveUpdate();
  }
  deleteCard(id) {
    this.visits = this.visits.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    this.defaultBoard();
    this.saveUpdate();
  }

  saveUpdate() {
    localStorage.setItem("visits", JSON.stringify(this.visits));
  }

  getVisits() {
    this.visits = JSON.parse(localStorage.getItem("visits"));
    if (this.visits && this.visits.length !== 0) {
      this.visits.forEach((item) => {
        this.addCard(item, false);
      });
    } else {
      this.visits = [];
    }
  }

  defaultBoard() {
    if (this.visits.length === 0) {
      const defaultHtml = `
             <div id="textContent" class="d-flex justify-content-center">
               <p class="text-danger">No items have been added</p>
             </div>`;
      this.board.innerHTML = defaultHtml;
    } else {
      const defaultHtml = document.getElementById("textContent");
      if (defaultHtml) {
        defaultHtml.remove();
      }
    }
  }
}

export default Board;
