const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let step = 0;

function resizeCanvas() {
  width = canvas.width = canvas.offsetWidth;
  height = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawWave() {
  ctx.clearRect(0, 0, width, height);

  const cols = 50;
  const rows = 15;
  const spacingX = width / cols;
  const spacingY = height / rows;

  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      const offsetX = x * spacingX;
      const perspective = 1 - y / rows;
      const offsetY =
        y * spacingY +
        Math.sin((x + step) * 0.3 + y * 0.2) * 10 * perspective;

      const radius = 3.2 * perspective;
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 0, 0.95)`;
      ctx.fill();

      ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  step += 0.15;
  requestAnimationFrame(drawWave);
}

// Hanya aktif di desktop
if (window.innerWidth >= 768) {
  drawWave();
}
