const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa e griglia
const masses = [];
const particles = [];
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

// Particelle che si muovono nello spaziotempo
function updateParticles() {
  particles.forEach(particle => {
    let ax = 0, ay = 0;

    masses.forEach(mass => {
      const dx = mass.x - particle.x;
      const dy = mass.y - particle.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const force = mass.mass / (distance ** 2 || 1);

      ax += force * dx / distance;
      ay += force * dy / distance;
    });

    // Aggiorna velocità e posizione
    particle.vx += ax;
    particle.vy += ay;
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Disegna la particella
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
  });
}

// Aggiungi massa con un click
canvas.addEventListener('click', (e) => {
  masses.push({ x: e.clientX, y: e.clientY, mass: 50 });

  // Aggiungi particelle attorno alla nuova massa
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: e.clientX + Math.random() * 50 - 25,
      y: e.clientY + Math.random() * 50 - 25,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
});

// Loop di animazione
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawMasses();
  updateParticles();
  requestAnimationFrame(animate);
}

animate();
