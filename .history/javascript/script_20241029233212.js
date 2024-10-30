document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  let dragCard = null;

  cards.forEach((card) => {
    // Eventos para desktop
    card.addEventListener('dragstart', (e) => {
      dragCard = card;
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('dragend', (e) => {
      e.currentTarget.classList.remove('dragging');
      dragCard = null;
    });

    // Eventos para mobile
    card.addEventListener('touchstart', (e) => {
      dragCard = card;
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('touchend', (e) => {
      e.currentTarget.classList.remove('dragging');
      dragCard = null;
    });
  });

  colunas.forEach((coluna) => {
    // Eventos para desktop
    coluna.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.currentTarget.classList.add('cards-hover');
    });
    coluna.addEventListener('dragleave', (e) => {
      e.currentTarget.classList.remove('cards-hover');
    });
    coluna.addEventListener('drop', (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('cards-hover');
      if (dragCard) {
        e.currentTarget.appendChild(dragCard);
      }
    });

    // Eventos para mobile
    coluna.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touchLocation = e.touches[0];
      dragCard.style.position = 'absolute';
      dragCard.style.left = `${
        touchLocation.pageX - dragCard.offsetWidth / 2
      }px`;
      dragCard.style.top = `${
        touchLocation.pageY - dragCard.offsetHeight / 2
      }px`;
    });
    coluna.addEventListener('touchend', (e) => {
      e.currentTarget.classList.remove('cards-hover');
      if (dragCard && e.currentTarget.contains(dragCard)) {
        e.currentTarget.appendChild(dragCard);
      }
      dragCard.style.position = 'relative';
      dragCard.style.left = '';
      dragCard.style.top = '';
    });
  });
});
