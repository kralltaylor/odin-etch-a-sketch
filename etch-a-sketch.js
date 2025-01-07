const container = document.querySelector('#container');
container.style.padding = (container.width / 10);

const sketchArea = document.querySelector('#sketch-area');

const changeGrid = document.querySelector('#grid-size');

let size = 16;
let squares = [];

createGrid();




function createGrid () {
    sketchArea.innerHTML = '';
    squares = [];
    for (i = 0; i < (size * size); i++) {
        squares.push(document.createElement('div'));
    }
    
    
    for (i = 0; i < squares.length; i++) {
        squares[i].id = `square${i+1}`;
        squares[i].className = 'square';
        squares[i].style.flex = `1 0 ${(1/size) * 100}%`;
        if (((i +1) % size) !== 0){
            sketchArea.appendChild(squares[i]);
        } else {
            sketchArea.appendChild(squares[i]);
            const rowBreak = document.createElement('div');
            rowBreak.className = 'row-break';
            sketchArea.appendChild(rowBreak);
        }
        
    }
}



sketchArea.addEventListener('mouseover', (e) => {
    const choice = e.target;
    const choiceStyle = getComputedStyle(choice)
    if (!choice.classList.contains('row-break') && choice.classList.contains('square')) {
        if (!choice.classList.contains('has-color')){
            const newColor = Math.floor(Math.random()*16777215).toString(16);
            choice.style.backgroundColor = "#" + newColor;
            choice.classList.toggle('has-color');
        }
        const currentOpacity = choiceStyle.opacity;
        console.log(currentOpacity);
        const newOpacity = ((parseFloat(currentOpacity) + .2));
        console.log(newOpacity);
    
        choice.style.opacity = newOpacity;
    }  
    
});

changeGrid.addEventListener('click', (e) => {
    changeGridSize();
});

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