const container = document.querySelector("#container");
container.style.padding = (container.width / 10);

let size = 16;

const squares = [];

for (i = 0; i < (size * size); i++) {
    squares.push(document.createElement('div'));
}


for (i = 0; i < squares.length; i++) {
    squares[i].id = `square${i+1}`;
    squares[i].className = 'square';
    if (((i +1) % size) !== 0){
        sketcher.appendChild(squares[i]);
    } else {
        sketcher.appendChild(squares[i]);
        const rowBreak = document.createElement('div');
        rowBreak.className = "rowBreak";
        sketcher.appendChild(rowBreak);
    }
    
}
