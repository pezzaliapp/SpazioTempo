const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const masses = []; // Contiene tutte le masse
const particles = []; // Contiene tutte le particelle

// Disegna lo spaziotempo curvato
function drawGrid() {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  for (let x = 0; x < canvas.width; x += 30) {
    for (let y = 0; y < canvas.height; y += 30) {
      let offsetX = 0;
      let offsetY = 0;

      masses.forEach(mass => {
        const dx = mass.x - x;
        const dy = mass.y - y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2) || 1; // Evita divisioni per zero
        const force = mass.mass / distance ** 2;
        offsetX += force * dx / distance;
        offsetY += force * dy / distance;
      });

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + offsetX, y + offsetY);
      ctx.stroke();
    }
  }
}

// Disegna le masse
function drawMasses() {
  masses.forEach(mass => {
    ctx.beginPath();
    ctx.arc(mass.x, mass.y, mass.mass / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
}

// Disegna e aggiorna le particelle
function drawParticles() {
  particles.forEach(particle => {
    let ax = 0;
    let ay = 0;

    masses.forEach(mass => {
      const dx = mass.x - particle.x;
      const dy = mass.y - particle.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2) || 1;
      const force = mass.mass / distance ** 2;
      ax += force * dx / distance;
      ay += force * dy / distance;
    });

    // Aggiorna velocità e posizione della particella
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

// Aggiungi massa e particelle con il click
canvas.addEventListener('click', (e) => {
  const mass = { x: e.clientX, y: e.clientY, mass: 100 };
  masses.push(mass);

  // Aggiungi particelle attorno alla nuova massa
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: e.clientX + Math.random() * 100 - 50,
      y: e.clientY + Math.random() * 100 - 50,
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
  drawParticles();
  requestAnimationFrame(animate);
}

animate();
