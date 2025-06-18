document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-bio');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const bio = document.getElementById(targetId);
      bio.classList.toggle('visible');
    });
  });
});
