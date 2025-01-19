const canvas = document.getElementById('spacetime');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Disegna un cerchio colorato che si muove
  const time = Date.now() * 0.002;
  const x = canvas.width / 2 + Math.sin(time) * 200;
  const y = canvas.height / 2 + Math.cos(time) * 200;

  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fillStyle = `hsl(${(time % 360)}, 100%, 50%)`;
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();
