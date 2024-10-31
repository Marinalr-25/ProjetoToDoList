document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  const mais = document.querySelectorAll('.fa-solid.fa-plus');
  const cancelar = document.querySelector('.cancelarButton');
  const adicionando = document.querySelector('.adicionando');
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

  const radios = document.querySelectorAll('input[name="prioridade"]');

  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        const selecionadoPrioridade = radio.nextElementSibling.textContent;
        console.log(selecionadoPrioridade);
      }
    });
  });

  mais.forEach((adicionar) => {
    adicionar.addEventListener('click', function () {
      if (adicionando.classList.contains('show')) {
        adicionando.classList.remove('show');
        setTimeout(() => {
          adicionando.style.display = 'none';
        }, 500);
      } else {
        adicionando.style.display = 'flex';
        setTimeout(() => {
          adicionando.classList.add('show');
        }, 10);
      }
    });
  });

  cancelar.addEventListener('click', function () {
    adicionando.style.display = 'none';
  });
});
