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

  function addDragEvents(card) {
    card.addEventListener('dragstart', (e) => {
      dragCard = card;
      e.currentTarget.classList.add('dragging');
    });
    card.addEventListener('dragend', (e) => {
      e.currentTarget.classList.remove('dragging');
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

  ok.addEventListener('click', function () {
    const novoCard = document.createElement('div');
    novoCard.className = 'kanban-card';
    novoCard.draggable = true;

    const prioridadeClasse = corPrioridade();
    if (prioridadeClasse === null) {
      alert('Por favor, selecione uma prioridade.');
      return;
    }
    const tituloCaixa = titulo();
    const descricao = descricaotarefa();

    novoCard.innerHTML = `
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

    kanbanCards.append(novoCard);
    addDragEvents(novoCard);

    adicionando.style.display = 'none';
  });

  cancelar.addEventListener('click', function () {
    adicionando.style.display = 'none';
  });

  function updatelocalStorage() {
    localStorage.getItem();
  }
});