import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";

import Enter from "./componets/auth.js";
import { getCookie } from "./componets/cookie.js";
import CreateVisit from "./componets/createVisit.js";
import Board from "./componets/board.js";

const button = document.getElementById("enter");
let boardObj = null;
if (getCookie("token")) {
  button.textContent = "Створити візит";
  boardObj = new Board();
  boardObj.getVisits()
}
button.addEventListener("click", (event) => {
  event.preventDefault();
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const modalLabel = document.getElementById("modalLabel");
  if (getCookie("token")) {
    const createVisit = new CreateVisit({ modal, modalBody, modalLabel });
    createVisit.create(boardObj);
  } else {
    new Enter("enter", { modal, modalBody, modalLabel });
  }
});
