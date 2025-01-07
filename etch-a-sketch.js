const container = document.querySelector('#container');
container.style.padding = (container.width / 10);

const sketchArea = document.querySelector('#sketch-area');

const squareClass = document.querySelector('.square');

let size = 16;


const squares = [];

for (i = 0; i < (size * size); i++) {
    squares.push(document.createElement('div'));
}


for (i = 0; i < squares.length; i++) {
    squares[i].id = `square${i+1}`;
    squares[i].className = 'square';
    squares[i].style.flex = `1 0 ${(1/16) * 100}%`;
    if (((i +1) % size) !== 0){
        sketchArea.appendChild(squares[i]);
    } else {
        sketchArea.appendChild(squares[i]);
        const rowBreak = document.createElement('div');
        rowBreak.className = 'row-break';
        sketchArea.appendChild(rowBreak);
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
        const newOpacity = ((parseFloat(currentOpacity) + .1));
        console.log(newOpacity);
    
        choice.style.opacity = newOpacity;
    }  
    
});
