// Пагинация каталога.
export function renderPagination(current, total) {
  if (total <= 1) {
    return '';
  }

  let buttons = '';
  for (let page = 1; page <= total; page += 1) {
    const isCurrent = page === current;
    buttons += `
      <button
        class="pagination__button ${isCurrent ? 'pagination__button--current' : ''}"
        type="button"
        data-page="${page}"
        ${isCurrent ? 'aria-current="page"' : ''}
      >${page}</button>
    `;
  }

  return `
    <nav class="pagination" aria-label="Страницы каталога">
      <button class="pagination__button" type="button" data-page="${current - 1}"
        ${current === 1 ? 'disabled' : ''} aria-label="Назад">‹</button>
      ${buttons}
      <button class="pagination__button" type="button" data-page="${current + 1}"
        ${current === total ? 'disabled' : ''} aria-label="Вперёд">›</button>
    </nav>
  `;
}
