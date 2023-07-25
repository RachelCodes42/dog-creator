const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Coordinates of the dots that form the dog head
const dots = [
    { x: 250, y: 100 },
    { x: 250, y: 200 },
    { x: 250, y: 300 },
    { x: 180, y: 250 },
    { x: 320, y: 250 },
    { x: 220, y: 320 },
    { x: 280, y: 320 },
    { x: 200, y: 200 },
    { x: 300, y: 200 },
    { x: 200, y: 230 },
    { x: 300, y: 230 },
];

const dotRadius = 5;
const dotDistanceThreshold = 15;
let connectedDots = [];

function drawDot(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawDog() {
    for (let i = 0; i < dots.length; i++) {
        drawDot(dots[i].x, dots[i].y);
    }

    for (let i = 1; i < connectedDots.length; i++) {
        const prevDot = dots[connectedDots[i - 1]];
        const currentDot = dots[connectedDots[i]];
        drawLine(prevDot.x, prevDot.y, currentDot.x, currentDot.y);
    }
}

function connectDots(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
        if (distance <= dotDistanceThreshold) {
            if (connectedDots.length === 0 || connectedDots[connectedDots.length - 1] === i - 1) {
                connectedDots.push(i);
                break;
            }
        }
    }

    redraw();
}

function checkWin() {
    if (connectedDots.length === dots.length) {
        let correctOrder = true;
        for (let i = 0; i < connectedDots.length - 1; i++) {
            if (connectedDots[i] + 1 !== connectedDots[i + 1]) {
                correctOrder = false;
                break;
            }
        }

        if (correctOrder) {
            alert("Congratulations! You connected all the dots and won!");
        } else {
            alert("Oops! The dots are not connected in the correct order. Please try again.");
        }
    }
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDog();
    checkWin();
}

canvas.addEventListener('mousedown', (event) => {
    connectDots(event);
});

redraw();



