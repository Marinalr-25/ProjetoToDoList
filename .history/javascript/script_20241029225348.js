document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');

  cards.forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('dragend', (e) => {
      e.currentTarget.classList.remove('dragging');
    });
  });

  colunas.forEach((coluna) => {});
});
