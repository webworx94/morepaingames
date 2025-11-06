// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Video sicher starten
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');

  // Versuche autoplay
  video.play().catch(() => {
    console.log("Autoplay blockiert – klicke zum Starten des Videos");

    // Fallback: Klick zum Starten
    const clickHandler = () => {
      video.play();
      document.body.removeEventListener('click', clickHandler);
    };
    document.body.addEventListener('click', clickHandler);
  });
});
