
// get display element
const display = document.querySelector(".display");
let firstNum = "";
let secondNum = "";
let operator = null;
let resetNext = false;

function updateDisplay(value){
    display.textContent = value;
}

const buttons = document.querySelectorAll(".calculator button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
    const value = button.textContent;

    // clear button
    if (button.id === "clear"){
        firstNum = "";
        secondNum = "";
        operator = null;
        updateDisplay(0);
        return;
    }

    // backspace button
    if (value === "⌫"){
        if (!operator){
            firstNum = firstNum.slice(0, -1);
            updateDisplay(firstNum || "0");
        }else{
            secondNum = secondNum.slice(0, -1);
            updateDisplay(secondNum || "0");
        }
        return;
    }

    //operator
    if (["+", "-", "x", "/"].includes(value)){
        if(firstNum !== ""){
            operator = value;
            resetNext = true;
        }
        return;
    }

    //equal
    if(button.id === "equal"){
        if(firstNum && operator && secondNum){
            let result;
            const num1 = parseFloat(firstNum);
            const num2 = parseFloat(secondNum);

            switch(operator){
                case "+": result = num1 + num2; break;
                case "-": result = num1 - num2; break;
                case "x": result = num1 * num2; break;
                case "/":
                    result = num2 !== 0 ? num1 / num2 : "Error";
                    break;
            }

            updateDisplay(result);
            firstNum =  result.toString();
            secondNum = "";
            operator = null;
        }
        return;
    }

    //Number or decimal
    if(!operator){
        if(resetNext){ firstNum = ""; resetNext = false; }
        firstNum += value;
        updateDisplay(firstNum);
    } else{
        secondNum += value;
        updateDisplay(secondNum);
    }
});
});

//initialize
updateDisplay("0");