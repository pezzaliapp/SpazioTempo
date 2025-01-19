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
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: centralMass.x,
      y: centralMass.y,
      vx: (Math.random() - 0.5) * 6, // Velocità casuale
      vy: (Math.random() - 0.5) * 6,
      size: Math.random() * 3 + 2, // Dimensione casuale tra 2 e 5
      color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Colore casuale
    });
  }
}

// Disegna il testo descrittivo
function drawDescription() {
  ctx.fillStyle = 'white';
  ctx.font = '18px Arial';
  ctx.fillText(
    'Simulazione: La massa centrale proietta particelle che si disperdono nello spaziotempo.',
    10,
    30
  );
}

// Disegna la massa centrale con alone
function drawCentralMass() {
  // Alone luminoso
  const gradient = ctx.createRadialGradient(
    centralMass.x,
    centralMass.y,
    0,
    centralMass.x,
    centralMass.y,
    centralMass.radius * 2
  );
  gradient.addColorStop(0, 'rgba(138, 43, 226, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centralMass.x, centralMass.y, centralMass.radius * 2, 0, Math.PI * 2);
  ctx.fill();

  // Massa centrale
  ctx.fillStyle = 'rgba(138, 43, 226, 1)';
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

    // Cambia colore dinamicamente
    particle.color = `hsl(${Math.random() * 360}, 100%, 70%)`;

    // Disegna particella
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Controlla se la particella esce dai bordi e la riporta al centro
    if (
      particle.x < 0 ||
      particle.x > canvas.width ||
      particle.y < 0 ||
      particle.y > canvas.height
    ) {
      particle.x = centralMass.x;
      particle.y = centralMass.y;
      particle.vx = (Math.random() - 0.5) * 6; // Reimposta velocità
      particle.vy = (Math.random() - 0.5) * 6;
    }
  });
}

// Loop di animazione
function animate() {
  // Sfondo trasparente per scie fluide
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawDescription(); // Disegna il testo descrittivo
  drawCentralMass(); // Disegna la massa centrale
  drawParticles(); // Disegna particelle con scia

  requestAnimationFrame(animate);
}

// Inizializza particelle e avvia animazione
createParticles();
animate();
