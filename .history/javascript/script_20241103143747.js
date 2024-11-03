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
      case 'Alta prioridade':
        return 'high';
      case 'Prioridade média':
        return 'medium';
      case 'Baixa prioridade':
        return 'low';
      default:
        return null;
    }
  }

  function titulo() {
    return title.value;
  }

  function descricaotarefa() {
    return textarea.value;
  }

  mais.forEach((adicionar) => {
    adicionar.addEventListener('click', function () {
      title.value = '';
      textarea.value = '';
      radios.forEach((radio) => {
        radio.checked = false;
      });
      selecionadoPrioridade = '';
      adicionando.style.display = 'flex';
    });
  });

  textarea.addEventListener('blur', function () {
    const textareavalue = this.value;
    console.log(textareavalue);
  });
  cancelar.addEventListener('click', function () {
    adicionando.style.display = 'none';
  });

  ok.addEventListener('click', function () {
    const novoCard = document.createElement('div');
    novoCard.className = 'kanban-card';
    novoCard.draggable = true;

    const prioridadeClasse = corPrioridade();
    const campoTexto = textarea.value;
    if (prioridadeClasse === null) {
      alert('Por favor, selecione uma prioridade.');
      return;
    } else if (campoTexto === '') {
      alert('Por favor, descreva sua tarefa.');
      return;
    }
    const tituloCaixa = titulo();
    const descricao = descricaotarefa();

    const conteudoCard = `
        <div class= "badge ${prioridadeClasse}">
            <span>${selecionadoPrioridade} </span>
        </div>
        <p class="card-title">${tituloCaixa} </p>
        <div class="card-infos"> ${descricao}
            <div class="card-icons">
                <p>
                    <i class="fa-solid fa-trash"></i>
                </p>
                <p>
                    <i class="fa-solid fa-pen"></i>
                </p>
            </div>
            <div class="user">
                <img src="images/iconePerfilPlanejamento.png" alt="avatar2" />
            </div>
        </div>
    `;

    novoCard.innerHTML = conteudoCard;

    updatelocalStorage(conteudoCard);

    kanbanCards.append(novoCard);
    addDragEvents(novoCard);

    adicionando.style.display = 'none';
  });

  // document
  //   .getElementById('clear-storage')
  //   .addEventListener('click', function () {
  //     localStorage.clear();
  //     alert('Local storage limpo!');
  //   });

  function updatelocalStorage(conteudoCard) {
    let cardList = JSON.parse(localStorage.getItem('kanban-card')) || [];

    cardList.push(conteudoCard);

    localStorage.setItem('kanban-card', JSON.stringify(cardList));
  }

  function loadCards() {
    const cardList = JSON.parse(localStorage.getItem('kanban-card')) || [];

    cardList.forEach((cardData) => {
      novoCard.innerHTML = cardData;
      kanbanCards.append(cardData);
      addDragEvents(cardData);
    });
  }
  loadCards();
});
