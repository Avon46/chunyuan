import { initLayout } from '../components/layout.js';
import { createProjectCard } from '../components/cards.js';

async function loadProjects() {
  const res = await fetch('/src/data/projects.json');
  if (!res.ok) {
    console.error('Failed to load projects.json');
    return [];
  }
  return res.json();
}

function getUniqueValues(projects, key) {
  return Array.from(new Set(projects.map((p) => p[key]))).filter(Boolean);
}

function renderFilters(projects) {
  const typeContainer = document.querySelector('[data-filter-types]');
  const statusContainer = document.querySelector('[data-filter-status]');
  if (!typeContainer || !statusContainer) return;

  const types = getUniqueValues(projects, 'type');
  const statuses = getUniqueValues(projects, 'status');

  typeContainer.innerHTML = `
    <button class="filter-pill filter-pill-active" data-filter-type="all">全部類型</button>
    ${types
      .map(
        (t) =>
          `<button class="filter-pill" data-filter-type="${t}">${t}</button>`
      )
      .join('')}
  `;

  statusContainer.innerHTML = `
    <button class="filter-pill filter-pill-active" data-filter-status="all">全部狀態</button>
    ${statuses
      .map(
        (s) =>
          `<button class="filter-pill" data-filter-status="${s}">${s}</button>`
      )
      .join('')}
  `;
}

function attachFilterHandlers(projects) {
  const listContainer = document.querySelector('[data-project-list]');
  const counter = document.querySelectorAll('[data-project-count]');
  const mobileToggle = document.querySelector('[data-filter-drawer-toggle]');
  const mobileDrawer = document.querySelector('[data-filter-drawer]');
  const mobileApply = document.querySelector('[data-filter-apply]');

  if (!listContainer) return;

  let currentType = 'all';
  let currentStatus = 'all';

  const applyFilters = () => {
    const filtered = projects.filter((p) => {
      const matchType = currentType === 'all' || p.type === currentType;
      const matchStatus = currentStatus === 'all' || p.status === currentStatus;
      return matchType && matchStatus;
    });

    listContainer.innerHTML = '';
    filtered.forEach((project) => {
      listContainer.appendChild(createProjectCard(project));
    });
    counter.forEach((c) => {
      c.textContent = String(filtered.length);
    });
  };

  // Use event delegation for filter buttons
  document.addEventListener('click', (e) => {
    const typeBtn = e.target.closest('[data-filter-type]');
    const statusBtn = e.target.closest('[data-filter-status]');
    
    if (typeBtn) {
      e.preventDefault();
      const allTypeButtons = document.querySelectorAll('[data-filter-type]');
      allTypeButtons.forEach((b) => b.classList.remove('filter-pill-active'));
      typeBtn.classList.add('filter-pill-active');
      currentType = typeBtn.dataset.filterType || 'all';
      applyFilters();
    }
    
    if (statusBtn) {
      e.preventDefault();
      const allStatusButtons = document.querySelectorAll('[data-filter-status]');
      allStatusButtons.forEach((b) => b.classList.remove('filter-pill-active'));
      statusBtn.classList.add('filter-pill-active');
      currentStatus = statusBtn.dataset.filterStatus || 'all';
      applyFilters();
    }
  });

  const setDrawerOpen = (open) => {
    if (!mobileDrawer) return;
    const body = document.body;
    if (open) {
      mobileDrawer.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
      mobileDrawer.classList.add('opacity-100');
      body.classList.add('overflow-hidden');
    } else {
      mobileDrawer.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
      mobileDrawer.classList.remove('opacity-100');
      body.classList.remove('overflow-hidden');
    }
  };

  mobileToggle?.addEventListener('click', () => setDrawerOpen(true));
  mobileApply?.addEventListener('click', () => setDrawerOpen(false));
  mobileDrawer?.addEventListener('click', (evt) => {
    if (evt.target === mobileDrawer) setDrawerOpen(false);
  });

  applyFilters();
}

async function initProjectsPage() {
  initLayout();
  const projects = await loadProjects();
  if (!projects.length) return;
  renderFilters(projects);
  attachFilterHandlers(projects);
}

initProjectsPage();


