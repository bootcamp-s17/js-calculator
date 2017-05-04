//store values between button presses
var value1;
var value2;
var SelectedFunc = null;
let funkClicked = false;

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
}

//Decide what button was pressed. Save the value
function ButtonLogic(evt) {
  var BtnValue = evt.target.innerHTML;

  if (0 <= BtnValue && BtnValue <= 9) {
    Num(BtnValue);
  } else {
    Func(BtnValue);
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Handle numbers
function Num(n) {
  //document.getElementById('display').value = n;
  if (!funkClicked) {
      value1 = value1 === undefined ? n : value1.concat(n);
      document.getElementById("display").value = value1;
  } else {
      value2 = value2 === undefined ? n : value2.concat(n);
      document.getElementById("display").value = value2;
  }
  // if (value1 === null) {
  //   value1 = document.getElementById("display").value + n;
  //   document.getElementById("display").value = value1;
  // } else if (value2 === null) {
  //   value2 = n;
  // }
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
  document.getElementById("display").value = Total;
}

//clear all values
function Clear() {
  document.getElementById("display").value = 0;
  value1 = undefined;
  value2 = undefined;
  SelectedFunc = null;
}
