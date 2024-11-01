document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  const mais = document.querySelectorAll('.fa-solid.fa-plus');
  const cancelar = document.querySelector('.cancelarButton');
  const ok = document.querySelector('.okButton');
  const adicionando = document.querySelector('.adicionando');
  const textarea = document.querySelector('.caixa_texto');
  const kanbanCards = document.querySelector('.kanban-cards');

  let dragCard = null;

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

  const radios = document.querySelectorAll('input[name="prioridade"]');

  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        const selecionadoPrioridade = radio.nextElementSibling.textContent;
        document.querySelector('.card-infos').innerText = selecionadoPrioridade;
      }
    });
  });

  mais.forEach((adicionar) => {
    adicionar.addEventListener('click', function () {
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

    novoCard.innerHTML = `
        <div class="badge medium">
            <span></span>
        </div>
        <p class="card-title">teste</p>
        <div class="card-infos"> ${textareavalue}
            <div class="card-icons">
                <p>
                    <i class="fa-solid fa-trash"></i>
                </p>
                <p>
                    <i class="fa-solid fa-pen"></i>
                </p>
            </div>
            <div class="user">
                <img src="images/iconePerfil2.png" alt="avatar2" />
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
});
