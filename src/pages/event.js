import '../styles/main.css';
import { events } from '../data/events.js';
import { initTabs } from '../components/tabs.js';

const id = new URLSearchParams(window.location.search).get('id');
const event = events.find((item) => item.id === id) ?? events[0];

const signUp = document.querySelector('#sign-up');
const favorite = document.querySelector('#favorite');

document.querySelector('#event-title').textContent = event.title;
document.querySelector('#event-category').textContent = event.category;
document.querySelector('#event-summary').textContent = event.summary;
document.querySelector('#event-date').textContent = event.dateText;
document.querySelector('#event-place').textContent = event.place;
document.querySelector('#event-organizer').textContent = event.organizer;
document.querySelector('#event-seats').textContent =
  `Осталось ${event.seats} из ${event.seatsTotal} мест`;

// Если мест нет, записаться нельзя.
if (event.seats === 0) {
  signUp.disabled = true;
  signUp.textContent = 'Мест нет';
}

signUp.addEventListener('click', () => {
  signUp.disabled = true;
  signUp.textContent = 'Записываем...';

  setTimeout(() => {
    signUp.classList.add('button--success');
    signUp.textContent = 'Вы записаны';
    window.location.href = `/register.html?id=${event.id}`;
  }, 800);
});

favorite.addEventListener('click', () => {
  event.favorite = !event.favorite;
  favorite.setAttribute('aria-pressed', String(event.favorite));
  favorite.textContent = event.favorite ? '♥ В избранном' : '♡ В избранное';
});

initTabs(document.querySelector('#tabs'));
