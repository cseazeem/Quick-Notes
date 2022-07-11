const activeToolElement = document.getElementById('active-tool');
const brushColorButton = document.getElementById('brush-color');
const brushIcon = document.getElementById('brush');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');
const eraser = document.getElementById('eraser');
const clearCanvasButton = document.getElementById('clear-canvas');
const downloadButton = document.getElementById('download');
const toggleIcon = document.getElementById('toggle-icon');
const canvas = document.getElementById('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');
let currentSize = 10;
let canvasColor = '#FFFFFF';
let currentColor = '#000000';
let isEraser = false;
let isMouseDown = false;

// Create Canvas
function createCanvas() {
  canvas.width = window.innerWidth+15;
  canvas.height = window.innerHeight-50;
  context.fillStyle = canvasColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  switchToBrush();
}

// Formatting Brush Size
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}

// Setting Brush Size
brushSlider.addEventListener('change', () => {
  currentSize = brushSlider.value;
  displayBrushSize();
});

// Setting Brush Color
brushColorButton.addEventListener('change', () => {
  isEraser = false;
  currentColor = `#${brushColorButton.value}`;
});


// Eraser
eraser.addEventListener('click', () => {
  isEraser = true;
  brushIcon.style.color = 'white';
  eraser.style.color = 'black';
  activeToolElement.textContent = 'Eraser';
  currentColor = canvasColor;
  currentSize = 50;
});

// Switch back to Brush
function switchToBrush() {
  isEraser = false;
  activeToolElement.textContent = 'Brush';
  brushIcon.style.color = 'black';
  eraser.style.color = 'white';
  currentColor = `#${brushColorButton.value}`;
  currentSize = 5;
  brushSlider.value = 5;
  displayBrushSize();
}



// Clear Canvas
clearCanvasButton.addEventListener('click', () => {
  createCanvas();

  // Active Tool
  activeToolElement.textContent = 'Canvas Cleared';
});

// Get Mouse Position
function getMousePosition(event) {
  const boundaries = canvas.getBoundingClientRect();
  return {
    x: event.clientX - boundaries.left,
    y: event.clientY - boundaries.top,
  };
}

// Mouse Down
canvas.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  const currentPosition = getMousePosition(event);
  context.moveTo(currentPosition.x, currentPosition.y);
  context.beginPath();
  context.lineWidth = currentSize;
  context.lineCap = 'round';
  context.strokeStyle = currentColor;
});

// Mouse Move
canvas.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const currentPosition = getMousePosition(event);
    context.lineTo(currentPosition.x, currentPosition.y);
    context.stroke();
    storeDrawn(
      currentPosition.x,
      currentPosition.y,
      currentSize,
      currentColor,
      isEraser,
    );
  } 
});



// Store Drawn Lines in DrawnArray
function storeDrawn(x, y, size, color, erase) {
  const line = {
    x,
    y,
    size,
    color,
    erase,
  };
  
}

// Mouse Up
canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
});

// Download Image
downloadButton.addEventListener('click', () => {
  downloadButton.href = canvas.toDataURL('image/jpeg', 1);
  downloadButton.download = 'img-example.jpeg';
  // Active Tool
  activeToolElement.textContent = 'Image File Saved';
});

// Event Listener
brushIcon.addEventListener('click', switchToBrush);

// On Load
createCanvas();