let items = [];

fetch("wishlist.json")
  .then(response => response.json())
  .then(data => {
    items = data;
    render();
  })
  .catch(error => {
    console.error("Error loading wishlist.json:", error);
  });


const grid = document.getElementById('grid');
const backdrop = document.getElementById('backdrop');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const modalMeta = document.getElementById('modalMeta');
const closeBtn = document.getElementById('closeBtn');

function makeCard(item, idx) {
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;
  card.innerHTML = `
    ${item.image ? `<img loading="lazy" src="${item.image}" alt="${escapeHtml(item.title)}" class="thumb">` : `<div class="placeholder">No image</div>`}
    <div class="meta">
      <h4 class="title">${escapeHtml(item.title)}</h4>
      <p class="desc">${escapeHtml(item.description || '')}</p>
      ${item.tag ? `<div class="badge">${escapeHtml(item.tag)}</div>` : ''}
    </div>`;

  card.addEventListener('click', () => openModal(item));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openModal(item);
  });

  return card;
}

function render() {
  grid.innerHTML = '';
  items.forEach((it, i) => grid.appendChild(makeCard(it, i)));
}

function openModal(item) {
  modalImage.src = item.image || '';
  modalImage.alt = item.title || '';
  modalTitle.textContent = item.title || '';
  modalDesc.textContent = item.description || '';
  modalLink.href = item.url || '#';
  modalMeta.textContent = item.tag ? `Category: ${item.tag}` : '';
  backdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.style.display = 'none';
  document.body.style.overflow = '';
}

backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeModal();
});

closeBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    }[c];
  });
}

render();
