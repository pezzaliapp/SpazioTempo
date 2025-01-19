const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Disegna un cerchio rosso al centro del canvas
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
ctx.fill();

// Log nella console
console.log("Canvas test: Cerchio rosso disegnato!");
