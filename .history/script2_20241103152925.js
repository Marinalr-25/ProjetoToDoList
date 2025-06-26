document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  const mais = document.querySelectorAll('.fa-solid.fa-plus');
  const cancelar = document.querySelector('.cancelarButton');
  const ok = document.querySelector('.okButton');
  const adicionando = document.querySelector('.adicionando');
  const textarea = document.querySelector('.caixa_texto');
  const kanbanCards = document.querySelector('.kanban-cards');
  const title = document.getElementById('title');
  const radios = document.querySelectorAll('input[name="prioridade"]');


  let dragCard = null;
  let selecionadoPrioridade = '';


  function updateAvatarImage(card) {
    const column = card.closest('.kanban-column');
    const avatarImage = card.querySelector('.user img');


    // Define a imagem com base no `data-id` da coluna
    switch (column.getAttribute('data-id')) {
      case '1':
        avatarImage.src = 'images/iconePerfilPlanejamento.png';
        break;
      case '2':
        avatarImage.src = 'images/iconePerfilPendente.png';
        break;
      case '3':
        avatarImage.src = 'images/iconePerfilEmAndamento.png';
        break;
      case '4':
        avatarImage.src = 'images/iconePerfilFinalizada.png';
        break;
      case '5':
        avatarImage.src = 'images/iconePerfilCancelada.png';
        break;
    }
  }


  function addDragEvents(card) {
    card.addEventListener('dragstart', (e) => {
      dragCard = card;
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('dragend', (e) => {
      e.currentTarget.classList.remove('dragging');
      updateAvatarImage(dragCard);
      dragCard = null;
    });
  }


  cards.forEach((card) => addDragEvents(card));
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


  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        selecionadoPrioridade = radio.nextElementSibling.textContent;
        console.log(selecionadoPrioridade);
      }
    });
  });


  function corPrioridade() {
    switch (selecionadoPrioridade) {

