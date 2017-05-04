//store values between button presses
var value1;
var value2;
var SelectedFunc = null;
var funkClicked = false;
var previousButton = '';

function start() {
    //create event handles for each button.
    var buttons = document.getElementsByClassName("key");
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", ButtonLogic);
    }
}

// Waits for page to load before firing
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        // Initialize your application or run some code.
        start();
    }
};

//Decide what button was pressed. Save the value
function ButtonLogic(evt) {
  var BtnValue = evt.target.innerHTML;

  if ( (0 <= BtnValue && BtnValue <= 9) || BtnValue === '.') {
    Num(BtnValue);
  } else {
    Func(BtnValue);
  }

  previousButton = BtnValue;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Handle numbers
function Num(n) {

  if (previousButton === '=') {
    // We just executed a calculation.
    // User pressed a number.
    // Pretend as if the calculator was cleared
    // before this number was pressed.
    Clear();
  } 

  if (!funkClicked) {
      value1 = value1 === undefined ? n : value1.concat(n);
      document.getElementById("display").value = value1;
  } else {
      value2 = value2 === undefined ? n : value2.concat(n);
      document.getElementById("display").value = value2;
  }
}

//Handle functions
function Func(f) {
  funkClicked = true;

  if (f == "C") {
    funkClicked = false;
    Clear();
  } else if (f == "=") {
    funkClicked = false;
    Calculate();
  } else {

    if (previousButton === '=') {
      // We just executed a calculation.
      // User pressed an operator.
      // Save the total as value1, 
      // then continue as normal.
      value1 = document.getElementById("display").value;
    } 

    SelectedFunc = f;
  }
}

//Perform the calculation
function Calculate() {
  var Total = 0;

  switch (SelectedFunc) {
    case "/":
      Total = Number(value1) / Number(value2);
      break;
    case "X":
      Total = Number(value1) * Number(value2);
      break;
    case "-":
      Total = Number(value1) - Number(value2);
      break;
    case "+":
      Total = Number(value1) + Number(value2);
      break;
    default:
      alert("No Function Selected");
      break;
  }
  value1 = Total;
  value2 = undefined;
  funkClicked = false;
  justCalculated = true;
  document.getElementById("display").value = Total;
}

//clear all values
function Clear() {
  document.getElementById("display").value = 0;
  value1 = undefined;
  value2 = undefined;
  SelectedFunc = null;
  funkClicked = false;
}