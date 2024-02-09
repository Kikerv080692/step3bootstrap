import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";

import Enter from "./componets/auth.js";
import { getCookie, eraseCookie } from "./componets/cookie.js";
import CreateVisit from "./componets/createVisit.js";
import Board from "./componets/board.js";
import Filter from "./componets/filter.js";

const button = document.getElementById("enter");
const buttonExit = document.getElementById("exit");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalLabel = document.getElementById("modalLabel");
const enter = new Enter("enter", { modal, modalBody, modalLabel });
const boardObj = new Board();


if (getCookie("token")) {
  button.textContent = "Створити візит";
  boardObj.getVisits();
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  if (getCookie("token")) {
    const createVisit = new CreateVisit({ modal, modalBody, modalLabel });
    createVisit.create(boardObj);
  } else {
    enter.login(boardObj)
    //  boardObj.getVisits();
  }
});

buttonExit.addEventListener("click", (event) => {
  event.preventDefault();
  buttonExit.classList.add('d-none')
  boardObj.visits = []
  boardObj.defaultBoard();
  enter.changeTitle()
  eraseCookie("token");
  //  boardObj = null;
});

const formFilter = document.getElementById("filter__form");
formFilter.addEventListener("submit" , filterObj.collectDataFromFilterForm);

