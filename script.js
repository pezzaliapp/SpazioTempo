const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const masses = []; // Contiene tutte le masse
const particles = []; // Contiene tutte le particelle

// Disegna lo spaziotempo curvato
function drawGrid() {
  ctx.strokeStyle = 'rgba(0, 100, 255, 0.1)'; // Colore blu chiaro
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

// Disegna le masse con un effetto luminoso
function drawMasses() {
  masses.forEach(mass => {
    // Alone luminoso
    const gradient = ctx.createRadialGradient(mass.x, mass.y, 0, mass.x, mass.y, mass.mass * 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 255, 0.2)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mass.x, mass.y, mass.mass, 0, Math.PI * 2);
    ctx.fill();

    // Massa centrale
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(mass.x, mass.y, mass.mass / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Disegna e aggiorna le particelle con scia
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

    // Disegna la scia della particella
    ctx.fillStyle = `rgba(255, ${Math.floor(200 + Math.sin(particle.x * 0.01) * 55)}, 0, 0.6)`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Aggiungi massa e particelle con il click
canvas.addEventListener('click', (e) => {
  const mass = { x: e.clientX, y: e.clientY, mass: 80 };
  masses.push(mass);

  // Aggiungi particelle intorno alla nuova massa
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: e.clientX + Math.random() * 100 - 50,
      y: e.clientY + Math.random() * 100 - 50,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
});

// Loop di animazione con scia
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Sfondo nero trasparente per creare la scia
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawMasses();
  drawParticles();
  requestAnimationFrame(animate);
}

animate();
