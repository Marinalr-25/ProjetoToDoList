document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  const mais = document.querySelectorAll('.fa-solid.fa-plus');
  const cancelar = document.querySelector('.cancelarButton');
  const ok = document.querySelector('.okButton');
  const adicionando = document.querySelector('.adicionando');
  const textarea = document.querySelector('.caixa_texto');

  console.log(ok);
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
      adicionando.style.display = 'flex';
    });
  });

  cancelar.addEventListener('click', function () {
    adicionando.style.display = 'none';
  });

  textarea.addEventListener('blur', function () {
    const textareavalue = this.value;
    console.log(textareavalue);
  });
});
