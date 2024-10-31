document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.kanban-card');
  const colunas = document.querySelectorAll('.kanban-cards');
  const mais = document.querySelectorAll('.fa-solid.fa-plus');
  const cancelar = document.querySelector('.cancelarButton');
  const ok = document.querySelector('.okButton');
  const adicionando = document.querySelector('.adicionando');
  const textarea = document.querySelector('.caixa_texto');
  const kanbanCard = document.querySelector('.kanban-card');

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
      }
    });
  });

  mais.forEach((adicionar) => {
    adicionar.addEventListener('click', function () {
      adicionando.style.display = 'flex';
    });
  });

  ok.addEventListener('click', function () {
    kanbanCard.innerHTML = `<div class="badge medium">
              <span>${selecionar()} </span>
            </div>
            <p class="card-title">${textarea} </p>
            <div class="card-infos">
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
            </div>`;
  });

  cancelar.addEventListener('click', function () {
    adicionando.style.display = 'none';
  });

  textarea.addEventListener('blur', function () {
    const textareavalue = this.value;
    console.log(textareavalue);
  });
});
