import React, { useState } from "react";

function Battleground() {
const playerNumber = 2;


//Setzt Grösse von Array
const setFieldNumber = (playerNumber: number) => {
  if (playerNumber == 2) {
  
   document.getElementById("rect")?.setAttribute("height", "100");
   document.getElementById("rect")?.setAttribute("width", "100");
  }
  else{
    document.getElementById("rect")?.setAttribute("height", "50");
    document.getElementById("rect")?.setAttribute("width", "50");
  }
}

const initializeFieldArray = () => {

}

const initializeField = () => {
  setFieldNumber(playerNumber);
  initializeFieldArray();

}

  return (
    <div>
<svg width="1000" height="1000">
    <rect id="rect" />

</svg>
    </div>);
}

export default Battleground;