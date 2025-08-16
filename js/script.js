// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Theme toggle
document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Music visualizer (simple bars)
const canvas = document.getElementById('music-visualizer');
if(canvas){
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let bars = 50;

  function drawVisualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bars; i++) {
      let height = Math.sin(Date.now()/300 + i) * 50 + 60;
      ctx.fillStyle = `hsl(${i*10}, 80%, 60%)`;
      ctx.fillRect(i*(canvas.width/bars), canvas.height-height, (canvas.width/bars)-2, height);
    }
    requestAnimationFrame(drawVisualizer);
  }
  drawVisualizer();
}

// Dynamic Updates (JSON)
fetch('updates.json')
  .then(res => res.json())
  .then(data => {
    const updatesContainer = document.getElementById('updates');
    const albumGrid = document.getElementById('album-grid');
    if(updatesContainer){
      data.posts.forEach(post => {
        const article = document.createElement('div');
        article.classList.add('p-4','bg-gray-100','dark:bg-gray-800','rounded-xl','shadow');
        article.innerHTML = `<h4 class="font-bold">${post.title}</h4><p>${post.content}</p>`;
        updatesContainer.appendChild(article);
      });
    }
    if(albumGrid){
      data.albums.forEach(album => {
        const div = document.createElement('div');
        div.classList.add('bg-gray-100','dark:bg-gray-800','p-4','rounded-xl','shadow','hover:scale-105','transition-transform');
        div.innerHTML = `<img src="${album.cover}" class="rounded-lg mb-2"><p>${album.title}</p>`;
        albumGrid.appendChild(div);
      });
    }
  });