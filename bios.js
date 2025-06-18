document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-bio");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const bio = document.getElementById(targetId);
      const text = bio.querySelector("p");

      // Fermer les autres bios
      document.querySelectorAll(".bio-hidden").forEach((el) => {
        if (el !== bio) {
          el.classList.remove("visible");
          const p = el.querySelector("p");
          p.style.animation = "none"; // reset
        }
      });

      // Ouvrir la bio
      bio.classList.toggle("visible");

      // Rejouer animation texte si visible
      if (bio.classList.contains("visible")) {
        text.style.animation = "none"; // reset
        void text.offsetWidth; // force reflow
        text.style.animation = "typing 2.5s steps(40, end), blink 0.75s step-end infinite";
      }
    });
  });
});
