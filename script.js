const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa centrale
const centralMass = { x: canvas.width / 2, y: canvas.height / 2, mass: 80 }; // Massa ridimensionata

// Particelle in orbita
const orbitingParticles = [];
const randomParticles = [];

// Aggiungi particelle in orbita
for (let i = 0; i < 5; i++) {
  orbitingParticles.push({
    angle: (Math.PI * 2 * i) / 5, // Angolo iniziale
    distance: 150, // Distanza dall'orbita
    speed: 0.02, // Velocità angolare
    size: 5, // Dimensione particella
    color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Colore casuale
  });
}

// Aggiungi particelle proiettate
for (let i = 0; i < 30; i++) {
  randomParticles.push({
    x: centralMass.x,
    y: centralMass.y,
    vx: (Math.random() - 0.5) * 5, // Velocità orizzontale casuale
    vy: (Math.random() - 0.5) * 5, // Velocità verticale casuale
    size: 3, // Dimensione particella
    color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`, // Colore trasparente
  });
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
  gradient.addColorStop(1, 'rgba(138, 43, 226, 0.5)'); // Colore viola
  ctx.fillStyle = gradient;
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

// Disegna particelle proiettate con scia
function drawRandomParticles() {
  randomParticles.forEach(particle => {
    // Aggiorna posizione
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Disegna particella
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Disegna scia sfumata
    ctx.fillStyle = `rgba(0, 0, 0, 0.1)`; // Colore sfumato
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
}

// Loop di animazione
function animate() {
  // Pulizia del canvas con trasparenza per la scia
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCentralMass(); // Disegna la massa centrale
  drawOrbitingParticles(); // Disegna particelle in orbita
  drawRandomParticles(); // Disegna particelle proiettate

  requestAnimationFrame(animate);
}

animate();
