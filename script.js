// ===== Smooth reveal on scroll =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Smooth scrolling (native) =====
document.documentElement.style.scrollBehavior = 'smooth';

// ===== Particles background =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, dpr, particles;
function resize(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = innerWidth * dpr;
  h = canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  initParticles();
}
function initParticles(){
  const count = Math.round((innerWidth * innerHeight) / 22000); // density
  particles = Array.from({length: count}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 * dpr + 0.6,
    a: Math.random() * Math.PI * 2,
    v: 0.2 + Math.random() * 0.5,
    o: 0.06 + Math.random() * 0.14
  }));
}
function draw(){
  ctx.clearRect(0,0,w,h);
  for(const p of particles){
    p.a += 0.002 + (p.v/500);
    p.x += Math.cos(p.a) * p.v;
    p.y += Math.sin(p.a) * p.v;
    if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
    if(p.y < 0) p.y = h; if(p.y > h) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = "#000";   // black background
    ctx.fillRect(0, 0, w, h); // cover canvas each frame
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
window.addEventListener('resize', resize);
resize(); draw();

// ===== Custom cursor (liquid glass) =====
const cursor = document.getElementById('cursor');
let mx=0,my=0,cx=0,cy=0;
window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
function loop(){
  cx += (mx - cx) * 0.16;
  cy += (my - cy) * 0.16;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(loop);
}
loop();
// enlarge on interactive
document.querySelectorAll('a, button, .menu-btn').forEach(el=>{
  el.addEventListener('mouseenter', ()=> cursor.classList.add('hover'));
  el.addEventListener('mouseleave', ()=> cursor.classList.remove('hover'));
});
