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
  const botaoNaoDelete = document.querySelector('.botaoNao');
  const popupDelete = document.querySelector('.popupDeletar');
  const popupEditar = document.querySelector('.popupEditar');

  let dragCard = null;
  let selecionadoPrioridade = '';
  let itemEditado = null;

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
  function saveCardPosition(card, colunaId) {
    const cardID = card.getAttribute('data-id');
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const cardData = cards.find((c) => c.id === cardID);

    if (cardData) {
      cardData.coluna = colunaId; // Atualiza a coluna do card
      localStorage.setItem('cards', JSON.stringify(cards)); // Salva no localStorage
    }
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
        console.log(e.currentTarget);
        console.log(dragCard);
        const colunaAdicionada = e.currentTarget.closest('.kanban-column');
        console.log(colunaAdicionada);
        const colunaID = colunaAdicionada.dataset.id;
        console.log(colunaID);
        saveCardPosition(dragCard, colunaID);
        //salvar no localStorage
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

    const cardID = generateCardID();
    novoCard.setAttribute('data-id', cardID);

    const conteudoCard = `
        <div class= "badge ${prioridadeClasse}">
            <span>${selecionadoPrioridade} </span>
        </div>
        <p class="card-title">${tituloCaixa} </p>
        <div class="card-infos"> ${descricao}
            <div class="card-icons">
                <div class="iconeDelete">
                  <i class="fa-solid fa-trash"></i>
                </div>
                <div class="iconeEdit">
                  <i class="fa-solid fa-pen"></i>
                </div>
            </div>
            <div class="user">
                <img src="images/iconePerfilPlanejamento.png" alt="avatar2" />
            </div>
        </div>
    `;

    novoCard.innerHTML = conteudoCard;
    kanbanCards.append(novoCard);
    addDragEvents(novoCard);

    // Salvar card no localStorage
    saveCard({
      id: cardID,
      titulo: tituloCaixa,
      descricao: descricao,
      prioridade: selecionadoPrioridade,
      classe: prioridadeClasse,
      coluna: '1',
    });

    adicionando.style.display = 'none';
  });

  function saveCard(card) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  function generateCardID() {
    return `${Math.floor(Math.random() * 1000000)}`;
  }

  function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.forEach((card) => {
      const novoCard = document.createElement('div');
      novoCard.className = 'kanban-card';
      novoCard.draggable = true;
      novoCard.setAttribute('data-id', card.id);

      const conteudoCard = `
        <div class= "badge ${card.classe}">
            <span>${card.prioridade} </span>
        </div>
        <p class="card-title">${card.titulo} </p>
        <div class="card-infos"> ${card.descricao}
            <div class="card-icons">
                <div class="iconeDelete">
                  <i class="fa-solid fa-trash"></i>
                </div>
                <div class="iconeEdit">
                  <i class="fa-solid fa-pen"></i>
                </div>
            </div>
            <div class="user">
                <img src="images/iconePerfilPlanejamento.png" alt="avatar2" />
            </div>
        </div>
  `;

      novoCard.innerHTML = conteudoCard;
      const colunaDestino = document.querySelector(
        `.kanban-column[data-id="${card.coluna}"] .kanban-cards`
      );
      if (colunaDestino) {
        colunaDestino.appendChild(novoCard);
      }
      addDragEvents(novoCard);
      updateAvatarImage(novoCard);
    });
  }
  loadCards();

  function fecharPopup(botao, popup) {
    botao.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

  fecharPopup(botaoNaoDelete, popupDelete);

  function definirCorPrioridade(popup, prioridadeCard) {
    popup.classList.remove('high', 'medium', 'low');
    if (prioridadeCard.innerText === 'Alta prioridade') {
      popup.classList.add('high');
    } else if (prioridadeCard.innerText === 'Prioridade média') {
      popup.classList.add('medium');
    } else if (prioridadeCard.innerText === 'Baixa prioridade') {
      popup.classList.add('low');
    } else {
      console.log('Nao encontrei a prioridade');
    }
  }

  document.addEventListener('click', (e) => {
    const botaoDelete = e.target.closest('.iconeDelete');
    const botaoEdit = e.target.closest('.iconeEdit');
    if (botaoDelete) {
      const esteItem = e.target.closest('.kanban-card');
      itemEditado = esteItem;
      const prioridadeCard = esteItem.querySelector('span');
      const tituloCard = esteItem.querySelector('.card-title').innerText;
      const infosCard = esteItem.querySelector('.card-infos').innerText;

      const popupDeletePrioridade = popupDelete.querySelector(
        '.popupDeletar__prioridade'
      );
      const popupDeleteTitulo = popupDelete.querySelector(
        '.popupDeletar__tituloDelete'
      );
      const popupDeleteDescricao = popupDelete.querySelector(
        '.popupDeletar__descricaoDelete'
      );

      definirCorPrioridade(popupDeletePrioridade, prioridadeCard);

      popupDeletePrioridade.textContent = prioridadeCard.innerText;
      popupDeleteTitulo.textContent = tituloCard;
      popupDeleteDescricao.textContent = infosCard;

      popupDelete.style.display = 'flex';
    }
    if (botaoEdit) {
      console.log('foii o edite');
      popupEditar.style.display = 'flex';
      const esteItem = e.target.closest('.kanban-card');
      itemEditado = esteItem;
      const prioridadeCard = itemEditado.querySelector('span');
      const tituloCard = itemEditado.querySelector('.card-title').innerText;
      const descricaoCard = itemEditado.querySelector('.card-infos');
      const popupEditarPrioridade = popupEditar.querySelector(
        '.popupEditar__prioridade'
      );
      const popupDeleteTitulo = popupEditar.querySelector(
        '.popupEditar__titulo'
      );
      const popupDeleteDescricao = popupEditar.querySelector(
        '.popupEditar__descricao'
      );
      console.log(prioridadeCard.innerText);

      definirCorPrioridade(popupEditarPrioridade, prioridadeCard);

      popupEditarPrioridade.textContent = prioridadeCard.innerText;
      popupDeleteTitulo.textContent = tituloCard;
      popupDeleteDescricao = descricaoCard.innerText;
    }
  });

  const botaoSimDeletar = popupDelete.querySelector('.botaoSim');

  botaoSimDeletar.addEventListener('click', () => {
    console.log(botaoSimDeletar, 'deletou');
    console.log(itemEditado);
    if (itemEditado) {
      const idCardSelecionado = itemEditado.dataset.id;
      console.log(idCardSelecionado);
      itemEditado.remove();
      popupDelete.style.display = 'none';

      const dadosCardsExcluidos =
        JSON.parse(localStorage.getItem('cards')) || [];
      const index = dadosCardsExcluidos.findIndex(
        (card) => card.id === idCardSelecionado
      );
      if (index !== -1) {
        dadosCardsExcluidos.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(dadosCardsExcluidos));
      }
      itemEditado = null;
    }
  });

  const botaoCancelar = popupEditar.querySelector('.botaoCancelar');
  botaoCancelar.addEventListener('click', () => {
    popupEditar.style.display = 'none';
  });
});
