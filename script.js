document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('customCursor');
  const copyrightText = document.getElementById('copyrightText');

  if (!cursor || !copyrightText) {
    console.error('Custom cursor or copyright text element not found.');
    return;
  }

  // Custom Cursor Logic
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Show copyright text after the fade-in animation is complete
  setTimeout(() => {
    copyrightText.style.visibility = 'visible';
    copyrightText.style.animationPlayState = 'running'; // Start the animation
  }, 500); // Wait 2 seconds after fade-in of the title (to be safe)
});
