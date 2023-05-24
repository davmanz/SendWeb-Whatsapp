import {
  version,
  phoneNumberId,
  phoneNumberServer,
  token,
} from "../config/config.js";

// Variables del DOM
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");

//API de conexion

function post(mensaje) {
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const postData = {
    messaging_product: "whatsapp", // Agrega el parámetro messaging_product con el valor adecuado
    recipient_type: "individual",
    to: phoneNumberServer,
    type: "text",
    text: {
      preview_url: false,
      body: mensaje,
    },
    access_token: token,
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Respuesta exitosa:");
        console.log(xhr.responseText);
      } else {
        console.error("Error en la solicitud POST. Estado:", xhr.status);
        console.error(xhr.responseText);
      }
    }
  };

  xhr.send(JSON.stringify(postData));
}

//Funcion de envio de datos atra vez de API

function enviarWhatsApp(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  if (validarForm()){
  const mensaje = `Nombre y Apellido: ${nombre.value} ${apellido.value}
Telefono: ${telefono.value}
Direccion: ${direccion.value}`;

  post(mensaje);
}}

//Funcion de chequeo de areas de texto

function validarForm() {
  const campos = [nombre, apellido, telefono, direccion];
  let formValido = true;

  campos.forEach((campo) => {
    const input = campo;
    
    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      input.classList.add('shake');
      formValido = false;
    } else {
      input.style.border = "1px solid #ccc";
      input.classList.remove('shake');
    }
  });

  return formValido;
}

document.querySelector("form").addEventListener("submit", enviarWhatsApp);