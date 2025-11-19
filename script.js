/* =========================
   SCRIPT GALÁXIA INTERATIVA
========================= */

const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// -------------------------
// ESTRELAS
// -------------------------
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.1
  });
}
// -------------------------
// PLANETAS
// -------------------------
const planets = [];
for (let i = 0; i < 5; i++) {
  planets.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 30 + 20,
    angle: Math.random() * Math.PI * 2,
    speed: (Math.random() - 0.5) * 0.01,
    color: `hsl(${Math.random()*360},70%,50%)`
  });
}
// -------------------------
// METEOROS
// -------------------------
const meteors = [];
for (let i = 0; i < 10; i++) {
  meteors.push({
    x: Math.random() * width,
    y: Math.random() * height,
    length: Math.random() * 80 + 20,
    speed: Math.random() * 5 + 2
  });
      }
// -------------------------
// NAVE INTERATIVA
// -------------------------
const ship = { x: width/2, y: height/2 };

// -------------------------
// ANIMAÇÃO
// -------------------------
function animate() {
  ctx.clearRect(0,0,width,height);

  // estrelas
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    star.x -= star.speed;
    if(star.x < 0) star.x = width;
  });
// planetas girando
  planets.forEach(p => {
    p.angle += p.speed;
    const px = p.x + Math.cos(p.angle)*50;
    const py = p.y + Math.sin(p.angle)*50;
    ctx.beginPath();
    ctx.arc(px, py, p.radius, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
// meteoros
  meteors.forEach(m => {
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x + m.length, m.y + m.length/3);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    m.x -= m.speed;
    m.y += m.speed / 2;
    if(m.x < -100 || m.y > height + 100) {
      m.x = Math.random() * width;
      m.y = -50;
    }
  });
  // nave seguindo cursor
  ctx.beginPath();
  ctx.moveTo(ship.x, ship.y - 15);
  ctx.lineTo(ship.x - 10, ship.y + 15);
  ctx.lineTo(ship.x + 10, ship.y + 15);
  ctx.closePath();
  ctx.fillStyle = '#ff0';
  ctx.fill();

  requestAnimationFrame(animate);
}

animate();

// -------------------------
// NAVE SEGUE CURSOR
// -------------------------
document.addEventListener('mousemove', e => {
  ship.x = e.clientX;
  ship.y = e.clientY;
});
// -------------------------
// AJUSTA CANVAS AO REDIMENSIONAR
// -------------------------
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
