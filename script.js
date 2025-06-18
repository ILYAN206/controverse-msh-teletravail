function Alerte() {
  alert("Bonne visite 🙂");
}

document.addEventListener("DOMContentLoaded", function () {
  // ==== Animation texte titre (lettres gauche / droite) ====
  const textWrapperLeft = document.querySelector('.letters-left');
  const textWrapperRight = document.querySelector('.letters-right');

  function wrapLettersByWord(element) {
    if (!element) return;
    const words = element.textContent.trim().split(' ');
    const wrappedWords = words.map(word => {
      const letters = word.split('').map(letter =>
        `<span class="letter">${letter}</span>`
      ).join('');
      return `<span class="word">${letters}</span>`;
    });
    element.innerHTML = wrappedWords.join(' ');
    element.style.opacity = '1';
  }

  wrapLettersByWord(textWrapperLeft);
  wrapLettersByWord(textWrapperRight);

  // Animation Anime.js pour le titre
  if (window.anime) {
    anime.timeline({ loop: false })
      .add({
        targets: '.line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeInOutExpo",
        duration: 800
      })
      .add({
        targets: '.letters-left .letter',
        translateX: [-60, 0],
        rotateZ: [-180, 0],
        opacity: [0, 1],
        easing: "easeOutElastic(1, .7)",
        duration: 1000,
        delay: anime.stagger(60)
      }, '-=500')
      .add({
        targets: '.letters-right .letter',
        translateX: [60, 0],
        rotateZ: [180, 0],
        opacity: [0, 1],
        easing: "easeOutElastic(1, .7)",
        duration: 1000,
        delay: anime.stagger(40)
      }, '-=800');
  } else {
    console.warn("anime.js n'est pas chargé.");
  }

  // ==== Apparition des paragraphes avec fade-in ====
  const contenu = document.querySelectorAll('#contenu p, #contenu h2, #contenu h3, #contenu ul');
  contenu.forEach((el, index) => {
    el.classList.add('fade-in');
    setTimeout(() => {
      el.classList.add('visible');
    }, 500 + index * 150);
  });

  // ==== IntersectionObserver pour apparition progressive des sections ====
  const sections = document.querySelectorAll("#contenu section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-appear");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach((section, i) => {
    section.classList.add("section-hidden");
    section.style.transitionDelay = `${i * 150}ms`;
    observer.observe(section);
  });

  // ==== Bouton surprise ====
  const surpriseBtn = document.getElementById("surpriseBtn");
  const explosionZone = document.getElementById("explosion-zone");

  if (surpriseBtn && explosionZone) {
    surpriseBtn.addEventListener("click", function () {
      const body = document.body;

      // Shake doux
      body.classList.add('shake-soft');
      setTimeout(() => body.classList.remove('shake-soft'), 600);

      // Fond temporairement modifié
      const originalBg = body.style.background;
      body.style.background = 'radial-gradient(circle at center, #4b6cb7, #182848)';
      setTimeout(() => {
        body.style.background = originalBg;
      }, 3000);

      // Icônes flottantes
      const icons = ["💻", "☕", "📶", "📝", "📅"];
      for (let i = 0; i < 12; i++) {
        const span = document.createElement("span");
        span.className = "icon-float";
        span.innerText = icons[Math.floor(Math.random() * icons.length)];
        span.style.left = `${Math.random() * 90 + 5}%`;
        span.style.top = `${Math.random() * 80 + 10}%`;
        explosionZone.appendChild(span);
        setTimeout(() => span.remove(), 3500);
      }

      // Son
      const audio = new Audio("https://actions.google.com/sounds/v1/ui/click.ogg");
      audio.play();
    });
  }
});
