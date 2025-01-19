const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa centrale
const centralMass = { x: canvas.width / 2, y: canvas.height / 2, mass: 150 };

// Particelle in orbita
const orbitingParticles = [];

// Aggiungi particelle in orbita
for (let i = 0; i < 5; i++) {
  orbitingParticles.push({
    angle: (Math.PI * 2 * i) / 5, // Angolo iniziale
    distance: 200, // Distanza dall'orbita
    speed: 0.02, // Velocità angolare
    size: 5, // Dimensione particella
    color: 'white', // Colore delle particelle
  });
}

// Disegna la massa centrale
function drawCentralMass() {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(centralMass.x, centralMass.y, centralMass.mass, 0, Math.PI * 2);
  ctx.fill();
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

// Loop di animazione
function animate() {
  // Pulizia del canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCentralMass(); // Disegna la massa centrale
  drawOrbitingParticles(); // Disegna le particelle in orbita

  requestAnimationFrame(animate);
}

animate();
