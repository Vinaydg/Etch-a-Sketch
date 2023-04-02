let canvas = document.querySelector('.canvas');
let gridLength = 16;
let currentColor = "#333333";
let colorMode = 'color';
let colorButton = document.getElementById('color')
let resetButton = document.getElementById('reset');
let rainbowButton = document.getElementById('rainbow');
let eraser = document.getElementById('eraser');
colorButton.classList.add('active');

rainbowButton.addEventListener('click', (e) => {
    e.target.classList.add('active');
    colorButton.classList.remove('active');
    eraser.classList.remove('active');
});

eraser.addEventListener('click', (e) => {
    e.target.classList.add('active');
    colorButton.classList.remove('active');
    rainbowButton.classList.remove('active');
});

colorButton.addEventListener('click', (e) => {
    e.target.classList.add('active');
    rainbowButton.classList.remove('active');
    eraser.classList.remove('active');
});

colorPicker.oninput = (e) => setCurrentColor(e.target.value);

function setCurrentColor (color) {
    currentColor = color;
}

colorButton.addEventListener('click', (e) => {
    colorMode = 'color';
});

resetButton.addEventListener('click', (e) => {
    colorMode = 'color';
    reloadGrid();
});

rainbowButton.addEventListener('click', (e) => {
    colorMode = 'rainbow';
});

eraser.addEventListener('click', (e) => {
    colorMode = 'eraser';
});

function init () {
    buildCanvas();
}

let slider = document.getElementById("myRange");
let size = document.getElementById("gridSize");
slider.onmousemove = (e) => updateSizeValue(e.target.value);
slider.onchange = (e) => changeSize(e.target.value);

function updateSizeValue(value) {
    size.innerText = `${value} x ${value}`
}

function changeSize(value) {
    updateGridLength(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateGridLength(value) {
    gridLength = value;
}

function reloadGrid() {
    clearGrid();
    buildCanvas();
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function buildCanvas() {
    canvas.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`
    for (let i = 0; i < gridLength * gridLength; i++) {
        addElement();
    }
}

function addElement () {
    const div = document.createElement('div');
    div.classList.add('gridElement');
    div.addEventListener('mouseover', changeColor);
    div.addEventListener('mousedown', changeColor);
    canvas.appendChild(div);
}

function changeColor (e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (colorMode === 'color') {
    e.target.style.backgroundColor = currentColor;
    }
    else if (colorMode === 'rainbow') {
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }
    else if (colorMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

function clearGrid (){
    canvas.innerHTML = '';
}

init ();