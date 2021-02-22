let equationsContainer = document.querySelector('#equations');
let operationSigns = ["+", "-", "/", "*", "="];
let selectedOperand = "";

function captureSelectedValues() {
    document.querySelectorAll('.buttons')
        .forEach(button => {
            button.addEventListener('click', () => {
                let convertedInt = parseInt(button.innerHTML)
                    ? parseInt(button.innerHTML)
                    : button.innerHTML;

                if (convertedInt !== "C"
                    && !operationSigns.includes(getLastValue()))
                    equationsContainer.innerHTML += convertedInt;

                if (operationSigns.includes(getLastValue()) &&
                    typeof convertedInt === typeof parseInt(getLastValue()))
                    equationsContainer.innerHTML += convertedInt;
            })
        });
}

function splitValues() {
    document.querySelector('#equal__sign')
        .addEventListener('click', (e) => {
            // getLastValue();
            let operandSplit = equationsContainer.innerHTML.split(selectedOperand);
            let firstNumber = parseInt(operandSplit[0]);
            let secondNumber = parseInt(operandSplit[1].split('=')[0]);
        
            document.querySelector('#results').innerHTML = calculateResults(selectedOperand, firstNumber, secondNumber);
            console.log(calculateResults(selectedOperand, firstNumber, secondNumber));
        });
}

function calculateResults(operator, firstNum, secondNum) {
    switch(operator){
        case '+':
            return firstNum + secondNum;
        case '-':
            return firstNum - secondNum;
        case '/':
            divisorByZero(secondNum);
            return firstNum / secondNum;
        case '*':
            return firstNum * secondNum;
    }
}

function divisorByZero(secondNum) {
    if(secondNum === 0) return "Cannot divide by zero.";
}

function getLastValue() {
    let splitEquation = equationsContainer.innerHTML.split('');
    let endValue = splitEquation.slice(-1)[0];

    return endValue;
}

function setOperator() {
    document.querySelectorAll('.operator')
        .forEach(operator => {
            operator.addEventListener('click', () => {
                selectedOperand = operator.innerHTML;
            });
        });
}

captureSelectedValues();
splitValues();
setOperator();