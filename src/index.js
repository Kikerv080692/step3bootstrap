import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';


import Enter from "./componets/auth.js";



const modal = document.getElementById('modal')
const modalBody = document.getElementById('modalBody')

const modalLabel = document.getElementById('modalLabel')
const enter = new Enter ('enter',{modal, modalBody, modalLabel})