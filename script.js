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

// === Galerie Logik ===
document.querySelectorAll('.game-gallery').forEach(gallery => {
  const display = gallery.querySelector('.gallery-display');
  const thumbs = gallery.querySelectorAll('.thumb');
  const videoURL = gallery.dataset.video;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      if (thumb.dataset.type === 'video') {
        display.innerHTML = `<iframe src="${videoURL}?autoplay=1&mute=1" allowfullscreen></iframe>`;
      } else {
        display.innerHTML = `<img src="${thumb.src}" alt="Gallery Image">`;
      }
    });
  });
});

// === Video autoplay nur wenn sichtbar ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const iframe = entry.target.querySelector('iframe');
    if (!iframe) return;
    const src = iframe.src.split('?')[0];
    if (entry.isIntersecting) {
      iframe.src = `${src}?autoplay=1&mute=1`;
    } else {
      iframe.src = `${src}?autoplay=0&mute=1`;
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.gallery-display').forEach(display => {
  observer.observe(display);
});

document.addEventListener("DOMContentLoaded", function() {
  // Alle Formulare prüfen, die Captcha haben
  const forms = document.querySelectorAll(".contact-form form, .newsletter-form");

  forms.forEach(form => {
    form.addEventListener("submit", function(e) {
      // Prüfen, ob reCAPTCHA auf dem Formular gelöst wurde
      const captcha = form.querySelector(".g-recaptcha");
      if (captcha && grecaptcha.getResponse() === "") {
        e.preventDefault();
        alert("Bitte bestätige, dass du kein Roboter bist!");
        return false;
      }
    });
  });
});
