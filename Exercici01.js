"use strict";
const infoCells = document.querySelectorAll(
  "#llista_propietats tr > td:nth-child(even)"
);
const elMinValueJS = infoCells[0],
  elTotalScreenWidth = infoCells[1],
  elTotalInnerWidth = infoCells[2],
  elTitle = infoCells[3],
  elTime = infoCells[4];
elMinValueJS.textContent = Number.MIN_VALUE;
elTotalScreenWidth.textContent = screen.width;
elTotalInnerWidth.textContent = window.innerWidth;
elTitle.textContent = document.title;
elTime.textContent = `${new Date().getHours()}h`;
