"use strict";
const celdas = document.querySelectorAll(
  "#taula_propietats tr > td:nth-child(even)"
);
const elValorMaxJS = celdas[0],
  elAlturaTotalPantalla = celdas[1],
  elAlturaInternaVentana = celdas[2],
  elURL = celdas[3];
elValorMaxJS.textContent = Number.MAX_VALUE;
elAlturaTotalPantalla.textContent = screen.height;
elAlturaInternaVentana.textContent = window.innerHeight;
elURL.textContent = window.location.href;

// <<===========||===========||===========||===========>>

const btnCuentaAtras = document.querySelector("button.start-countdown"),
  inputMinutos = document.querySelector("input.input-minutos"),
  inputSegundos = document.querySelector("input.input-segundos");

btnCuentaAtras.addEventListener("click", (event) => {
  console.log(inputMinutos.value);
  console.log(inputSegundos.value);
});
