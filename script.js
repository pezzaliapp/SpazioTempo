const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa centrale
const centralMass = { x: canvas.width / 2, y: canvas.height / 2, mass: 200 };

// Disegna la griglia curva (spaziotempo)
function drawSpacetimeCurvature() {
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)'; // Colore visibile (ciano semi-trasparente)
  ctx.lineWidth = 1; // Linee sottili

  for (let x = 0; x < canvas.width; x += 20) {
    for (let y = 0; y < canvas.height; y += 20) {
      const dx = centralMass.x - x;
      const dy = centralMass.y - y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2) || 1;

      // Calcola lo spostamento causato dalla massa centrale
      const force = centralMass.mass / distance ** 2;
      const offsetX = (dx / distance) * force * 10; // Amplifica visivamente l'effetto
      const offsetY = (dy / distance) * force * 10;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + offsetX, y + offsetY);
      ctx.stroke();
    }
  }
}

// Disegna la massa centrale
function drawCentralMass() {
  const gradient = ctx.createRadialGradient(
    centralMass.x,
    centralMass.y,
    0,
    centralMass.x,
    centralMass.y,
    centralMass.mass
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(138, 43, 226, 0.5)'); // Alone viola
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centralMass.x, centralMass.y, centralMass.mass, 0, Math.PI * 2);
  ctx.fill();
}

// Disegna particelle in orbita
function drawOrbitingParticles(particles) {
  particles.forEach(particle => {
    particle.angle += particle.speed; // Aggiorna angolo
    const x = centralMass.x + Math.cos(particle.angle) * particle.distance;
    const y = centralMass.y + Math.sin(particle.angle) * particle.distance;

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(x, y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Aggiungi particelle in orbita
const orbitingParticles = [];
for (let i = 0; i < 5; i++) {
  const angle = (Math.PI * 2 * i) / 5;
  orbitingParticles.push({
    angle: angle,
    distance: 150 + Math.random() * 50,
    speed: 0.02 + Math.random() * 0.01,
    size: 5 + Math.random() * 3,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  });
}

// Loop di animazione
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Sfondo trasparente per effetto scia
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSpacetimeCurvature(); // Disegna la curvatura dello spaziotempo
  drawCentralMass(); // Disegna la massa centrale
  drawOrbitingParticles(orbitingParticles); // Disegna le particelle in orbita

  requestAnimationFrame(animate);
}

animate();
