import '../styles/main.css';
import { events } from '../data/events.js';
import { renderCard, renderSkeleton } from '../components/event-card.js';
import { renderPagination } from '../components/pagination.js';

const PER_PAGE = 6;
const state = { query: '', category: 'Все', formats: ['offline'], sort: 'new', page: 1 };

const list = document.querySelector('#events-list');
const count = document.querySelector('#results-count');
const pages = document.querySelector('#pagination');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const chips = document.querySelector('#chips');
const filters = document.querySelector('#filters');
const filtersForm = document.querySelector('#filters-form');

function getFound() {
  const query = state.query.trim().toLowerCase();

  const found = events.filter((event) => {
    const byQuery = !query || event.title.toLowerCase().includes(query);
    const byCategory = state.category === 'Все' || event.category === state.category;
    const byFormat = state.formats.length === 0 || state.formats.includes(event.format);
    return byQuery && byCategory && byFormat;
  });

  if (state.sort === 'seats') {
    return found.sort((a, b) => b.seats - a.seats);
  }
  return found.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function render() {
  const found = getFound();
  const total = Math.max(1, Math.ceil(found.length / PER_PAGE));
  state.page = Math.min(state.page, total);

  count.textContent = `${found.length} событий`;

  if (found.length === 0) {
    list.innerHTML = `
      <div class="empty">
        <p><b>Ничего не нашлось</b></p>
        <p class="empty__text">Попробуйте изменить запрос или сбросить фильтры.</p>
        <button class="button button--ghost" type="button" id="empty-reset">Сбросить фильтры</button>
      </div>
    `;
    pages.innerHTML = '';
    return;
  }

  const start = (state.page - 1) * PER_PAGE;
  list.innerHTML = found
    .slice(start, start + PER_PAGE)
    .map(renderCard)
    .join('');
  pages.innerHTML = renderPagination(state.page, total);
}

function reset() {
  state.query = '';
  state.category = 'Все';
  state.formats = ['offline'];
  state.sort = 'new';
  state.page = 1;

  search.value = '';
  sort.value = 'new';
  filtersForm.reset();
  markChips();
  render();
}

function markChips() {
  chips.querySelectorAll('.chip').forEach((chip) => {
    const isActive = chip.dataset.category === state.category;
    chip.classList.toggle('chip--active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
}

search.addEventListener('input', () => {
  state.query = search.value;
  state.page = 1;
  render();
});

sort.addEventListener('change', () => {
  state.sort = sort.value;
  render();
});

document.querySelector('#reset').addEventListener('click', reset);

chips.addEventListener('click', (evt) => {
  const chip = evt.target.closest('.chip');
  if (!chip) {
    return;
  }

  state.category = chip.dataset.category;
  state.page = 1;
  markChips();
  render();
});

filtersForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  state.formats = new FormData(filtersForm).getAll('format');
  state.page = 1;
  render();
  filters.classList.remove('filters--open');
});

pages.addEventListener('click', (evt) => {
  const button = evt.target.closest('[data-page]');
  if (button) {
    state.page = Number(button.dataset.page);
    render();
  }
});

list.addEventListener('click', (evt) => {
  if (evt.target.id === 'empty-reset') {
    reset();
    return;
  }

  const button = evt.target.closest('.card__favorite');
  if (!button) {
    return;
  }

  const event = events.find((item) => item.id === button.closest('.card').dataset.id);
  event.favorite = !event.favorite;
  button.classList.toggle('card__favorite--on', event.favorite);
  button.setAttribute('aria-pressed', String(event.favorite));
  button.textContent = event.favorite ? '♥' : '♡';
});

// На узких экранах панель фильтров закрыта и открывается кнопкой.
document.querySelector('#filters-toggle').addEventListener('click', (evt) => {
  const isOpen = filters.classList.toggle('filters--open');
  evt.currentTarget.setAttribute('aria-expanded', String(isOpen));
});

// Небольшая задержка нужна, чтобы было видно состояние загрузки.
list.innerHTML = renderSkeleton().repeat(PER_PAGE);
markChips();
setTimeout(render, 300);
