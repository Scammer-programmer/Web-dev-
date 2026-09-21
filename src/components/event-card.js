// Карточка мероприятия. Повторяется в каталоге, поэтому вынесена отдельно.
export function renderCard(event) {
  const isFull = event.seats === 0;

  return `
    <article class="card" data-id="${event.id}">
      <div class="card__cover"></div>
      <button
        class="card__favorite ${event.favorite ? 'card__favorite--on' : ''}"
        type="button"
        aria-pressed="${event.favorite}"
        aria-label="В избранное"
      >${event.favorite ? '♥' : '♡'}</button>
      <p class="badge">${event.category}</p>
      <h3><a class="card__link" href="/event.html?id=${event.id}">${event.title}</a></h3>
      <p class="card__meta">
        <time datetime="${event.date}">${event.dateText}</time> · ${event.place}
      </p>
      <p class="card__seats ${isFull ? 'card__seats--full' : ''}">
        ${isFull ? 'мест нет' : `${event.seats} мест`}
      </p>
    </article>
  `;
}

// Серый скелет показываем, пока данные не пришли.
export function renderSkeleton() {
  return `
    <article class="card">
      <div class="card__cover"></div>
      <p class="skeleton"></p>
      <p class="skeleton"></p>
    </article>
  `;
}
