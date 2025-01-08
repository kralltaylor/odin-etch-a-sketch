const container = document.querySelector('#container');
container.style.padding = (container.width / 10);

const sketchArea = document.querySelector('#sketch-area');

const changeGrid = document.querySelector('#grid-size');
const rainbowButton = document.querySelector('#rainbow-mode');
const resetButton = document.querySelector('#reset');
const eraser = document.querySelector('#eraser-mode');



let size = 16;
let rainbowMode = false;
let eraserMode = false;
let isMouseDown = false;
let squares = [];
let rowCount = 0;

createGrid();




function createGrid () {
    sketchArea.innerHTML = '';
    squares = [];
    for (r = 0; r < size; r++) {
        let tempRow = document.createElement('div');
        tempRow.id = `row-${r+1}`;  
        tempRow.className = 'row';
        for (i = 0; i < size; i++) {
            let tempSquare = document.createElement('div');
            tempSquare.id = `square-${r+1}-${i+1}`;
            tempSquare.className = 'square';

            //Create shadows on squares around the edge
            if (tempSquare.id == 'square-1-1'){
                tempSquare.style.boxShadow = 'inset 2px 2px 1px black';
            } else if (tempSquare.id.includes(`e-1-`) && tempSquare.id.includes(`-${size}`)) {
                tempSquare.style.boxShadow = 'inset -2px 2px 1px black';
            } else if (tempSquare.id.includes(`e-${size}-`) && tempSquare.id.endsWith(`-1`)) {
                tempSquare.style.boxShadow = 'inset 2px -2px 1px black';
            } else if (tempSquare.id.includes(`e-${size}-`) && tempSquare.id.endsWith(`-${size}`)) {
                tempSquare.style.boxShadow = 'inset -2px -2px 1px black';
            } else if (tempSquare.id.includes(`e-1-`)) {
                tempSquare.style.boxShadow = 'inset 0 2px 1px 0 black';
            } else if (tempSquare.id.endsWith(`-1`)) {
                tempSquare.style.boxShadow = 'inset 2px 0px 1px 0 black';
            } else if (tempSquare.id.endsWith(`-${size}`)) {
                tempSquare.style.boxShadow = 'inset -2px 0px 1px 0 black';
            } else if (tempSquare.id.includes(`e-${size}-`)) {
                tempSquare.style.boxShadow = 'inset 0px -2px 1px 0 black';
            } else {
                tempSquare.style.boxShadow = 'inset 0 0 1px 0 black';
            }
            // tempSquare.style.flex = `1 0 ${(1/size) * 100}%`;
            tempRow.appendChild(tempSquare);
        }
        sketchArea.appendChild(tempRow)
    }   
    
    // for (i = 0; i < squares.length; i++) {
    //     squares[i].id = `square${i+1}`;
    //     squares[i].className = 'square';
    //     squares[i].style.flex = `1 0 ${(1/size) * 100}%`;
    //     if (((i +1) % size) !== 0){
    //         sketchArea.appendChild(squares[i]);
    //     } else {
    //         sketchArea.appendChild(squares[i]);
    //         const rowBreak = document.createElement('div');
    //         rowBreak.className = 'row-break';
    //         sketchArea.appendChild(rowBreak);
    //     }
        
    // }
}


sketchArea.addEventListener("mousedown", (e) => {
    const choice = e.target;
    isMouseDown = true;
    if(eraserMode){
        erase(choice);
    } else {
        updateSquareColor(choice);
    } 
});
sketchArea.addEventListener('mouseover', (e) => {
    const choice = e.target;
    if (isMouseDown){
        if(eraserMode){
            erase(choice);
        } else {
            updateSquareColor(choice);
        } 
    }
    
});
sketchArea.addEventListener("mouseup", () => {
    isMouseDown = false;
});

changeGrid.addEventListener('click', (e) => {
    changeGridSize();
});

function updateSquareColor(targetSquare) {
    
    const targetStyle = getComputedStyle(targetSquare)
    if (!targetSquare.classList.contains('row-break') && targetSquare.classList.contains('square')) {
        if (rainbowMode === true){    
            const newColor = Math.floor(Math.random()*16777215).toString(16);
            targetSquare.style.backgroundColor = "#" + newColor;
        }
        else {
            targetSquare.style.backgroundColor = "black";
        }
        const currentOpacity = targetStyle.opacity;
        const newOpacity = ((parseFloat(currentOpacity) + .2));
    
        targetSquare.style.opacity = newOpacity;
    }  
}

function erase(targetSquare) {
    
    const targetStyle = getComputedStyle(targetSquare);
    if (!targetSquare.classList.contains('row-break') && targetSquare.classList.contains('square')) {
        targetSquare.style.backgroundColor = "white";
        targetSquare.style.opacity = 0.1;
    }
    
}

function changeGridSize (){
    let newsize = "";
    do {
        newSize = prompt("How many squares per side? (1 to 100)");
        if (newSize == null){
            return;
        }
        console.log(typeof(newSize));
        newSize = parseInt(newSize);
        console.log(newSize);
        if (Number.isInteger(newSize) && newSize > 0 && newSize <= 100) {
            size = newSize;
            createGrid();
        }
        else {
            alert("Invalid input. Please enter a number from 1 to 100.");
        }
    } while (!Number.isInteger(newSize) || (newSize <= 0) || (newSize > 100))
}

rainbowButton.addEventListener('click', (e) => {
    if(eraserMode){
        eraser.classList.toggle('eraser-active');
        eraserMode = !eraserMode;
    }
    rainbowButton.classList.toggle('rainbow-active');
    rainbowMode = !rainbowMode;
});

resetButton.addEventListener('click', (e) => {
    for (i = 0; i < squares.length; i++) {
        squares[i].style.opacity = 0;
        
        }
});

eraser.addEventListener('click', (e) => {
    if (rainbowMode){
        rainbowButton.classList.toggle('rainbow-active');
        rainbowMode = !rainbowMode;
    }
    eraser.classList.toggle('eraser-active');
    eraserMode = !eraserMode;
});