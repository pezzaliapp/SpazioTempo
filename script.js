const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa e griglia
const masses = [];
const gridSize = 30;

// Funzione per disegnare la griglia
function drawGrid() {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      let dx = 0, dy = 0;

      // Calcolo deformazione della griglia
      masses.forEach(mass => {
        const distance = Math.sqrt((x - mass.x) ** 2 + (y - mass.y) ** 2);
        const force = mass.mass / (distance || 1);
        dx += force * (mass.x - x) / distance;
        dy += force * (mass.y - y) / distance;
      });

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y + dy);
      ctx.stroke();
    }
  }
}

// Funzione per disegnare le masse
function drawMasses() {
  masses.forEach(mass => {
    ctx.beginPath();
    ctx.arc(mass.x, mass.y, mass.mass, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
}

// Aggiunta delle masse con il click
canvas.addEventListener('click', (e) => {
  masses.push({ x: e.clientX, y: e.clientY, mass: 50 });
});

// Loop di animazione
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawMasses();
  requestAnimationFrame(animate);
}

animate();
