/* ZOTO shared behaviour: mobile nav, chip filters, tabs. */

// Mobile menu
document.addEventListener('click', (e) => {
  const t = e.target.closest('.menu-toggle');
  if (!t) return;
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
  t.setAttribute('aria-expanded', nav.classList.contains('open'));
});

/*
 * Chip filter groups.
 * Markup: <div class="filter-row" data-filter-group="price"> <button class="chip" data-value="all">…
 * Cards declare data-<group>="value". "all" always matches.
 * Multiple groups AND together. After toggling, cards not matching every
 * active group are hidden; an optional [data-empty] element shows when none match.
 */
function applyFilters(scope) {
  const groups = [...scope.querySelectorAll('[data-filter-group]')];
  const active = {};
  groups.forEach(g => {
    const on = g.querySelector('.chip[aria-pressed="true"]');
    active[g.dataset.filterGroup] = on ? on.dataset.value : 'all';
  });
  let visible = 0;
  scope.querySelectorAll('[data-item]').forEach(card => {
    const show = Object.entries(active).every(([k, v]) =>
      v === 'all' || (card.dataset[k] || '').split(' ').includes(v));
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const empty = scope.querySelector('[data-empty]');
  if (empty) empty.style.display = visible === 0 ? '' : 'none';
}

document.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip[data-value]');
  if (!chip) return;
  const group = chip.closest('[data-filter-group]');
  group.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
  chip.setAttribute('aria-pressed', 'true');
  applyFilters(chip.closest('[data-filter-scope]') || document);
});

// Tabs: <button class="tab" data-tab="panelId"> shows #panelId, hides siblings marked [data-panel]
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab[data-tab]');
  if (!tab) return;
  const tablist = tab.closest('.tabs');
  tablist.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', 'false'));
  tab.setAttribute('aria-selected', 'true');
  const scope = tablist.closest('[data-tab-scope]') || document;
  scope.querySelectorAll('[data-panel]').forEach(p => {
    p.style.display = p.id === tab.dataset.tab ? '' : 'none';
  });
});
