const sketchContainer = document.querySelector('#sketch-container');
sketchContainer.style.padding = (sketchContainer.width / 10);

const sketchArea = document.querySelector('#sketch-area');

const rainbowButton = document.querySelector('#rainbow-mode');
const resetButton = document.querySelector('#reset');
const eraser = document.querySelector('#eraser-mode');
const gridSize = document.querySelector('#grid-size');
const sizeSlider = document.querySelector('#size-slider');



let size = 16;
gridSize.textContent = size;
let rainbowMode = false;
let eraserMode = false;
let isMouseDown = false;
let isTouch = false;
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
            tempRow.appendChild(tempSquare);
        }
        sketchArea.appendChild(tempRow)
    }   
    
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

//Touch listeners for mobile
sketchArea.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const choice = e.target;
    
    isTouch = true;
    if(eraserMode){
        erase(choice);
    } else {
        updateSquareColor(choice);
    } 
});
sketchArea.addEventListener('touchmove', (e) => {
    e.preventDefault();
    // const choice = e.target;  
    let choice = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    if (isTouch){
        if(eraserMode){
            erase(choice);
        } else {
            updateSquareColor(choice);
        } 
    }
    
});
sketchArea.addEventListener("touchend", () => {
    isTouch = false;
});

sizeSlider.addEventListener('input', () => {
    size = sizeSlider.value;
    gridSize.textContent = sizeSlider.value;
    createGrid();
});

function updateSquareColor(targetSquare) {
    
    const targetStyle = getComputedStyle(targetSquare)
    if (!targetSquare.classList.contains('row-break') && targetSquare.classList.contains('square')) {
        if (rainbowMode === true){  
            if (!checkhasRainbow(targetSquare)){
                targetSquare.classList.toggle('has-rainbow');
                const newColor = Math.floor(Math.random()*16777215).toString(16);
                targetSquare.style.backgroundColor = "#" + newColor;      
            }
        } else {
            if (checkhasRainbow(targetSquare)){
                targetSquare.classList.toggle('has-rainbow');
            }
            targetSquare.style.backgroundColor = "black";
        }
        const currentOpacity = targetStyle.opacity;
        const newOpacity = ((parseFloat(currentOpacity) + .10));
    
        targetSquare.style.opacity = newOpacity;
    }  
}

function checkhasRainbow(targetSquare) {
    if (targetSquare.classList.contains('has-rainbow')){
        return true;
    } else {
        return false;
    }
}

function erase(targetSquare) {
    
    const targetStyle = getComputedStyle(targetSquare);
    if (targetSquare.classList.contains('square')) {
        targetSquare.style.removeProperty('background-color');
        targetSquare.style.opacity = 0.1;
        if(targetSquare.classList.contains('has-rainbow')){
            targetSquare.classList.toggle('has-rainbow');
        }
    }
    
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
    createGrid();
});

eraser.addEventListener('click', (e) => {
    if (rainbowMode){
        rainbowButton.classList.toggle('rainbow-active');
        rainbowMode = !rainbowMode;
    }
    eraser.classList.toggle('eraser-active');
    eraserMode = !eraserMode;
});