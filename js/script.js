// ===== Dark / Light toggle =====
const toggle = document.getElementById('themeToggle');
// Use saved preference if present
const saved = localStorage.getItem('bready-theme');
if (saved === 'dark') document.documentElement.classList.add('dark');
if (saved === 'light') document.documentElement.classList.remove('dark');
toggle.checked = document.documentElement.classList.contains('dark');

toggle.addEventListener('change', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem(
    'bready-theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
});

// ===== Liquid-glass cursor =====
const cursor = document.getElementById('cursor');
let mx = 0, my = 0, x = 0, y = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
});

function loop() {
  // smooth follow
  x += (mx - x) * 0.18;
  y += (my - y) * 0.18;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(loop);
}
loop();

// Enlarge cursor on interactive elements
const hovers = 'a, button, .menu-btn, input, textarea, label, .switch';
document.querySelectorAll(hovers).forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Prevent text selection cursor from showing
document.body.classList.add('no-native-cursor');
