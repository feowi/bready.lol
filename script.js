document.addEventListener("DOMContentLoaded", () => {
  const albumList = document.getElementById("album-list");

  if (albumList) {
    fetch("public/albums.json")
      .then(response => response.json())
      .then(albums => {
        albumList.innerHTML = albums.map(album => `
          <div class="album">
            <a href="${album.link}" target="_blank">
              <img src="${album.image}" alt="${album.title}">
              <p>${album.title}</p>
            </a>
          </div>
        `).join("");
      })
      .catch(err => console.error("Error loading albums:", err));
  }
});


async function loadAlbums() {
  try {
    const response = await fetch('public/albums.json');
    const albums = await response.json();

    const container = document.querySelector('.album-grid');
    if (!container) return;

    container.innerHTML = '';

    albums.forEach(album => {
      const card = document.createElement('div');
      card.classList.add('album-card');

      card.innerHTML = `
        <img src="${album.cover}" alt="${album.title}">
        <h3>${album.title}</h3>
        <p>${album.year}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading albums:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadAlbums);
