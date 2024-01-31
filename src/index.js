import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';


import Enter from "./componets/auth.js";
import { getCookie } from './componets/cookie.js';
import CreateVisit from './componets/createVisit.js';




  const button = document.getElementById('enter')
  if(getCookie('token')){
    button.textContent = 'Створити візит'
  }
  button.addEventListener('click', (event) => {
      event.preventDefault()
      const modal = document.getElementById('modal')
      const modalBody = document.getElementById('modalBody')
      const modalLabel = document.getElementById('modalLabel')
    if(getCookie('token')){
        console.log('hi')
        const createVisit = new CreateVisit ({modal, modalBody, modalLabel})
        const visit = createVisit.create()
        console.log(1,visit)
    }else{
        new Enter ('enter',{modal, modalBody, modalLabel})
    }
  })


