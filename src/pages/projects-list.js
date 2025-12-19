import { initLayout } from '../components/layout.js';
import { createProjectCard } from '../components/cards.js';
import projectsData from '../data/projects.json';

async function loadProjects() {
  try {
    // Try to use imported data first (works in both dev and production)
    if (projectsData && Array.isArray(projectsData) && projectsData.length > 0) {
      return projectsData;
    }
    // Fallback to fetch (for development)
    const res = await fetch('/src/data/projects.json');
    if (!res.ok) {
      console.error('Failed to load projects.json');
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

function getUniqueValues(projects, key) {
  return Array.from(new Set(projects.map((p) => p[key]))).filter(Boolean);
}

function renderFilters(projects) {
  const typeContainers = document.querySelectorAll('[data-filter-types]');
  const statusContainers = document.querySelectorAll('[data-filter-status]');
  if (!typeContainers.length || !statusContainers.length) return;

  const types = getUniqueValues(projects, 'type');
  const statuses = getUniqueValues(projects, 'status');

  const typeButtonsHTML = `
    <button type="button" class="filter-pill filter-pill-active" data-filter-type="all">全部類型</button>
    ${types
      .map(
        (t) =>
          `<button type="button" class="filter-pill" data-filter-type="${t}">${t}</button>`
      )
      .join('')}
  `;

  const statusButtonsHTML = `
    <button type="button" class="filter-pill filter-pill-active" data-filter-status="all">全部狀態</button>
    ${statuses
      .map(
        (s) =>
          `<button type="button" class="filter-pill" data-filter-status="${s}">${s}</button>`
      )
      .join('')}
  `;

  // Render to all containers (desktop and mobile)
  typeContainers.forEach((container) => {
    container.innerHTML = typeButtonsHTML;
  });

  statusContainers.forEach((container) => {
    container.innerHTML = statusButtonsHTML;
  });
}

function attachFilterHandlers(projects) {
  const listContainer = document.querySelector('[data-project-list]');
  const counter = document.querySelectorAll('[data-project-count]');

  if (!listContainer) {
    console.error('Project list container not found');
    return;
  }

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

  // Attach event listeners to filter buttons using event delegation
  const handleFilterClick = (e) => {
    const target = e.target.closest('[data-filter-type], [data-filter-status]');
    if (!target || target.tagName !== 'BUTTON') return;

    e.preventDefault();
    e.stopPropagation();

    if (target.hasAttribute('data-filter-type')) {
      // Handle type filter
      const allTypeButtons = document.querySelectorAll('[data-filter-type]');
      allTypeButtons.forEach((b) => b.classList.remove('filter-pill-active'));
      allTypeButtons.forEach((b) => {
        if (b.dataset.filterType === target.dataset.filterType) {
          b.classList.add('filter-pill-active');
        }
      });
      currentType = target.dataset.filterType || 'all';
      applyFilters();
    } else if (target.hasAttribute('data-filter-status')) {
      // Handle status filter
      const allStatusButtons = document.querySelectorAll('[data-filter-status]');
      allStatusButtons.forEach((b) => b.classList.remove('filter-pill-active'));
      allStatusButtons.forEach((b) => {
        if (b.dataset.filterStatus === target.dataset.filterStatus) {
          b.classList.add('filter-pill-active');
        }
      });
      currentStatus = target.dataset.filterStatus || 'all';
      applyFilters();
    }
  };

  // Use event delegation on document to handle all filter buttons
  document.addEventListener('click', handleFilterClick, true);

  // Initial render
  applyFilters();
}

async function initProjectsPage() {
  initLayout();
  const projects = await loadProjects();
  if (!projects.length) {
    console.warn('No projects found');
    return;
  }
  renderFilters(projects);
  attachFilterHandlers(projects);
}

initProjectsPage();
