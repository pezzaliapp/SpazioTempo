const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa centrale
const centralMass = { x: canvas.width / 2, y: canvas.height / 2, radius: 50 };

// Particelle proiettate
const particles = [];

// Funzione per creare particelle proiettate
function createParticles() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: centralMass.x,
      y: centralMass.y,
      vx: (Math.random() - 0.5) * 8, // Velocità iniziale casuale
      vy: (Math.random() - 0.5) * 8,
      size: 3, // Dimensione particella
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
    });
  }
}

// Disegna la massa centrale
function drawCentralMass() {
  ctx.fillStyle = 'rgba(138, 43, 226, 1)'; // Viola
  ctx.beginPath();
  ctx.arc(centralMass.x, centralMass.y, centralMass.radius, 0, Math.PI * 2);
  ctx.fill();
}

// Disegna particelle con scie
function drawParticles() {
  particles.forEach(particle => {
    // Aggiorna posizione
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Disegna particella
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Controlla se la particella esce dai bordi
    if (
      particle.x < 0 ||
      particle.x > canvas.width ||
      particle.y < 0 ||
      particle.y > canvas.height
    ) {
      particle.x = centralMass.x; // Riporta al centro
      particle.y = centralMass.y;
      particle.vx = (Math.random() - 0.5) * 8; // Nuova velocità casuale
      particle.vy = (Math.random() - 0.5) * 8;
    }
  });
}

// Loop di animazione
function animate() {
  // Sfondo con trasparenza per le scie
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCentralMass(); // Disegna la massa centrale
  drawParticles(); // Disegna particelle con scia

  requestAnimationFrame(animate);
}

// Inizializza particelle e avvia animazione
createParticles();
animate();
