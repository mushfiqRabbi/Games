"use strict";

let p1 = true;
let cP1 = 0;
let cP2 = 0;
let totalP1 = 0;
let totalP2 = 0;

const resetBtn = document.querySelector(".btn-reset");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");

const sideLeft = document.querySelector(".left");
const sideRight = document.querySelector(".right");

const currentP1 = document.querySelector(".left .score-current");
const currentP2 = document.querySelector(".right .score-current");

const st1 = document.querySelector(".left .score-total");
const st2 = document.querySelector(".right .score-total");

const diceBox = document.querySelector(".dice");

function playerSelector(player) {
  if (player) {
    sideLeft.style.backgroundColor = "rgb(255, 255, 255, 0.1)";
    sideRight.style.backgroundColor = "rgb(0, 0, 0, 0.1)";
  } else {
    sideRight.style.backgroundColor = "rgb(255, 255, 255, 0.1)";
    sideLeft.style.backgroundColor = "rgb(0, 0, 0, 0.1)";
  }
}

function diceRoller() {
  return Math.ceil(Math.random() * 6);
}

function currentReset(player = 2) {
  if (player === 0) {
    cP1 = 0;
    currentP1.innerText = cP1;
  } else if (player === 1) {
    cP2 = 0;
    currentP2.innerText = cP2;
  } else {
    cP1 = 0;
    currentP1.innerText = cP1;
    cP2 = 0;
    currentP2.innerText = cP2;
  }
}

function totalReset() {
  currentReset();
  totalP1 = 0;
  totalP2 = 0;
  totalCalc();
  p1 = true;
  playerSelector(p1);
}

function totalCalc(player = 2) {
  if (player === 0) {
    totalP1 += Number(currentP1.innerText);
    st1.innerText = totalP1;
  } else if (player === 1) {
    totalP2 += Number(currentP2.innerText);
    st2.innerText = totalP2;
  } else {
    totalP1 += Number(currentP1.innerText);
    st1.innerText = totalP1;
    totalP2 += Number(currentP2.innerText);
    st2.innerText = totalP2;
  }
}

playerSelector(p1);

rollBtn.addEventListener("click", () => {
  if (p1) {
    let diceRolled = diceRoller();
    diceBox.innerText = diceRolled;
    if (diceRolled !== 1) {
      cP1 += diceRolled;
      diceBox.innerText = diceRolled;
      currentP1.innerText = cP1;
    } else {
      totalCalc(0);
      currentReset(0);
      p1 = false;
      playerSelector(p1);
    }
  } else {
    let diceRolled = diceRoller();
    diceBox.innerText = diceRolled;
    if (diceRolled !== 1) {
      cP2 += diceRolled;
      diceBox.innerText = diceRolled;
      currentP2.innerText = cP2;
    } else {
      totalCalc(1);
      currentReset(1);
      p1 = true;
      playerSelector(p1);
    }
  }
});

resetBtn.addEventListener("click", () => {
  totalReset();
});

holdBtn.addEventListener("click", () => {
  if (p1) {
    totalCalc(0);
    currentReset(0);
    p1 = false;
    playerSelector(p1);
  } else {
    totalCalc(1);
    currentReset(1);
    p1 = true;
    playerSelector(p1);
  }
});
