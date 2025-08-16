// --- Cursor ---
const cursor = document.getElementById('cursor');
const interactiveElements = document.querySelectorAll('button, a, input, textarea');

// Smooth cursor movement
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor with slight delay for smooth float
function animateCursor() {
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;
  cursor.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects for liquid glass
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// --- Dark/Light mode toggle ---
const themeCheckbox = document.getElementById('themeToggle');
const sunIcon = themeCheckbox.nextElementSibling.querySelector('span:first-child');
const moonIcon = themeCheckbox.nextElementSibling.querySelector('span:last-child');

themeCheckbox.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  sunIcon.classList.toggle('hidden');
  moonIcon.classList.toggle('hidden');
});

// --- Music visualizer ---
const canvas = document.getElementById('music-visualizer');
if(canvas){
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  let bars = 50;
  function drawVisualizer(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<bars;i++){
      let height = Math.abs(Math.sin(Date.now()/300+i)) * 80 + 40;
      ctx.fillStyle = `hsl(${i*10},80%,60%)`;
      ctx.fillRect(i*(canvas.width/bars), canvas.height-height, (canvas.width/bars)-4, height);
    }
    requestAnimationFrame(drawVisualizer);
  }
  drawVisualizer();
}

// --- Contact form demo ---
const contactForm = document.querySelector('form');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks! Your message has been sent.');
    contactForm.reset();
  });
}

// --- Dynamic updates / albums ---
fetch('updates.json')
  .then(res => res.json())
  .then(data => {
    const updatesContainer = document.getElementById('updates');
    const albumGrid = document.getElementById('album-grid');
    if(updatesContainer){
      data.posts.forEach(post=>{
        const article=document.createElement('div');
        article.classList.add('p-4','bg-white/10','backdrop-blur-sm','rounded-xl','shadow');
        article.innerHTML=`<h4 class="font-bold">${post.title}</h4><p>${post.content}</p>`;
        updatesContainer.appendChild(article);
      });
    }
    if(albumGrid){
      data.albums.forEach(album=>{
        const div=document.createElement('div');
        div.classList.add('card','hover:scale-105','transition-transform');
        div.innerHTML=`<img src="${album.cover}" class="rounded-lg mb-2"><p>${album.title}</p>`;
        albumGrid.appendChild(div);
      });
    }
  });
