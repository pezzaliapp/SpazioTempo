const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Massa centrale
const centralMass = { x: canvas.width / 2, y: canvas.height / 2, mass: 150 };

// Disegna la curvatura dello spaziotempo
function drawSpacetimeCurvature() {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; // Colore bianco trasparente
  ctx.lineWidth = 0.5; // Linee sottili

  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 24) {
    for (let radius = 50; radius <= 300; radius += 20) {
      const x = centralMass.x + Math.cos(angle) * radius;
      const y = centralMass.y + Math.sin(angle) * radius;

      const dx = centralMass.x - x;
      const dy = centralMass.y - y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2) || 1;

      // Deformazione della linea causata dalla massa
      const force = centralMass.mass / (distance ** 1.8);
      const offsetX = dx / distance * force * 10;
      const offsetY = dy / distance * force * 10;

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

// Loop di animazione
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Sfondo nero
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSpacetimeCurvature(); // Disegna la curvatura dello spaziotempo
  drawCentralMass(); // Disegna la massa centrale

  requestAnimationFrame(animate);
}

animate();
