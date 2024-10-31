document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  const mais = document.querySelectorAll('.fa-solid.fa-plus');
  console.log(mais);
  let dragCard = null;

  cards.forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      dragCard = card;
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('dragend', (e) => {
      e.currentTarget.classList.remove('dragging');
      dragCard = null;
    });
  });

  colunas.forEach((coluna) => {
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
  });

  mais.forEach((adicionar) => {
    adicionar.addEventListener;
  });

  const radios = document.querySelectorAll('input[name="prioridade"]');

  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        // Exibe a opção selecionada no console
        const selecionado = ${radio.nextElementSibling.textContent}`
        );
      }
    });
  });
});
