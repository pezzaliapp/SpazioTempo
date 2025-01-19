const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa principale e particelle
const centralMass = { x: canvas.width / 2, y: canvas.height / 2, mass: 150 }; // Massa centrale
const orbitingParticles = []; // Particelle in orbita
const randomParticles = []; // Particelle casuali

// Aggiungi particelle in orbita
for (let i = 0; i < 5; i++) {
  const angle = (Math.PI * 2 * i) / 5;
  orbitingParticles.push({
    angle: angle,
    distance: 200 + Math.random() * 50, // Distanza dall'orbita
    speed: 0.02 + Math.random() * 0.01, // Velocità angolare
    size: 5 + Math.random() * 3, // Dimensione della particella
    color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Colore casuale
  });
}

// Aggiungi particelle casuali
for (let i = 0; i < 50; i++) {
  randomParticles.push({
    x: centralMass.x,
    y: centralMass.y,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    size: 2,
    color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
  });
}

// Disegna la massa centrale con alone
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
  gradient.addColorStop(1, 'rgba(138, 43, 226, 0.5)'); // Colore viola
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centralMass.x, centralMass.y, centralMass.mass, 0, Math.PI * 2);
  ctx.fill();
}

// Disegna la griglia curva
function drawSpacetimeCurvature() {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; // Linee bianche trasparenti
  ctx.lineWidth = 0.5; // Linee sottili

  for (let x = 0; x < canvas.width; x += 20) {
    for (let y = 0; y < canvas.height; y += 20) {
      const dx = centralMass.x - x;
      const dy = centralMass.y - y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2) || 1;

      // Calcola lo spostamento causato dalla massa
      const force = centralMass.mass / distance ** 2;
      const offsetX = dx / distance * force * 10;
      const offsetY = dy / distance * force * 10;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + offsetX, y + offsetY);
      ctx.stroke();
    }
  }
}

// Disegna particelle in orbita
function drawOrbitingParticles() {
  orbitingParticles.forEach(particle => {
    particle.angle += particle.speed; // Aggiorna angolo
    const x = centralMass.x + Math.cos(particle.angle) * particle.distance;
    const y = centralMass.y + Math.sin(particle.angle) * particle.distance;

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(x, y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Disegna e aggiorna particelle casuali
function drawRandomParticles() {
  randomParticles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Aggiungi scia
    ctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
}

// Loop di animazione
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Sfondo trasparente per effetto scia
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSpacetimeCurvature(); // Disegna la griglia curva
  drawCentralMass(); // Disegna la massa centrale
  drawOrbitingParticles(); // Disegna le particelle in orbita
  drawRandomParticles(); // Disegna le particelle casuali

  requestAnimationFrame(animate);
}

animate();
