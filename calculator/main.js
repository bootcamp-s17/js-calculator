/*-------------------------------ES5 Syntax-----------------------------------*/

// Initialize variables
var value = []; // Stores input
var num = true; // Determines if a number was selected last

// Waits for page to load before firing
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        // Initialize your application or run some code.
        //create event handles for each button.
        var buttons = document.getElementsByClassName("key");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", buttonLogic);
        }
    }
};

//Decide what button was pressed. Save the value
function buttonLogic(evt) {
    var btnValue = evt.target.innerHTML; // grab button text
    if (btnValue === "C") { // calls clear when "C" is clicked
        clear();
    } else if (btnValue === '=') { // calls calculate when "=" is clicked
        calculate();
    } else {
        // if button is 0 to 9 or .
        if ( (0 <= btnValue && btnValue <= 9) || btnValue === '.') {
            num = true;
            value.push(btnValue);
            document.getElementById("display").value = value.join('');
        } else if (value.length > 0) { // only fire if a number exists
            if (num) {
                value.push(btnValue); // if number was last selected
            } else {
                // if an operator was last selected, replace it
                value.splice(value.length - 1, 1, btnValue);
            }
            num = false;
            document.getElementById("display").value = value.join('');
        }
    }
}

//Perform the calculation
function calculate() {
    if (!num) {
        value.pop(); // remove operator at the end
    }
    value = value.join('').replace('X', '*'); // replace X with *
    document.getElementById("display").value = eval(value);
    value = [eval(value)]; // eval calculates a string
}

//clear all values
function clear() {
    document.getElementById("display").value = 0;
    value = [];
}
