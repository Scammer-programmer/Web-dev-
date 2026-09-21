// Вкладки на странице мероприятия.
export function initTabs(tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];

  tablist.addEventListener('click', (evt) => {
    const clicked = evt.target.closest('[role="tab"]');
    if (!clicked) {
      return;
    }

    tabs.forEach((tab) => tab.setAttribute('aria-selected', String(tab === clicked)));
    panels.forEach((panel) => {
      panel.hidden = panel.getAttribute('aria-labelledby') !== clicked.id;
    });
  });
}
