document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');

  cards.forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      e.currentTarget.classList.add('dragging');
    });
  });
});
