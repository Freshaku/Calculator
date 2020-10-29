let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operator');
let decimalBtn = document.getElementById('decimal');
let NegativeBtn = document.getElementById('minus-btn');
let clearBtns = document.querySelectorAll('.clear-btn');
let display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (let i = 0 ; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function(e){
        numberPress(e.target.textContent);
    });
};

for (let i = 0 ; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e){
        operation(e.target.textContent);
    });
};

for (let i = 0 ; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.srcElement.id);
    });
};

decimalBtn.addEventListener('click', decimal);

NegativeBtn.addEventListener('click', positiveAndNegative);


function numberPress(number) {
    if(MemoryNewNumber){
        if(display.value==='-'){
            display.value += number;
            MemoryNewNumber = false;
          }else{
             display.value = number;
          MemoryNewNumber = false;
        }
    } else {
        if(display.value === '0'){
            display.value = number;
        } else {
            display.value += number;
        };
    };
    
};

function operation(op) {
    let localOperationMemory = display.value;
    

    if (MemoryNewNumber && MemoryPendingOperation !== '=' && MemoryPendingOperation !== '√'){
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if(MemoryPendingOperation === '+'){
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-'){
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*'){
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/'){
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        }else if (MemoryPendingOperation === 'xy'){
            MemoryCurrentNumber = parseFloat(Math.pow(MemoryCurrentNumber, localOperationMemory));
        }else if (MemoryPendingOperation === '√'){
            MemoryCurrentNumber = Math.sqrt(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };

        display.value = parseFloat(MemoryCurrentNumber.toFixed(16));
        MemoryPendingOperation = op;

    };

};

function positiveAndNegative(op) {
    let localNegativeNumber = display.value;
  if (localNegativeNumber === '0') {
    MemoryNewNumber=false;
    localNegativeNumber = '-';
  } else {
    MemoryNewNumber=true;
    localNegativeNumber = '-';
  }
  display.value=localNegativeNumber;
};

function decimal() {
    let localDecimalMemory = display.value;

    if(MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1 ){
            localDecimalMemory += '.';
        };       
    };

    display.value = localDecimalMemory;
};

function clear(id){
    if(id === 'ce'){
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c'){
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };

};




