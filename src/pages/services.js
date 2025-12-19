import { servicesKPIs, serviceCards } from '../data/servicesExtras.js';

// SVG Icons
const icons = {
  building: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
  </svg>`,
  bridge: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
  </svg>`,
  clipboard: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>`
};

function renderKPIs() {
  const container = document.querySelector('[data-services-kpis]');
  if (!container) return;

  container.innerHTML = servicesKPIs.map(kpi => `
    <div class="kpi-card bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
      <p class="text-xs sm:text-sm text-white/80 mb-1">${kpi.label}</p>
      <p class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
        ${kpi.value}${kpi.unit ? ` <span class="text-base sm:text-lg">${kpi.unit}</span>` : ''}
      </p>
    </div>
  `).join('');
}

function renderServiceCards() {
  const container = document.querySelector('[data-service-cards]');
  if (!container) return;

  const iconMap = {
    '建築工程': icons.building,
    '土木工程': icons.bridge,
    '專案管理': icons.clipboard
  };

  container.innerHTML = serviceCards.map((card, index) => `
    <article class="card h-full flex flex-col">
      <div class="card-inner space-y-4 flex-1 flex flex-col" style="min-height: 400px;">
        <div class="flex items-center gap-3">
          <div class="text-brand-green flex-shrink-0">
            ${iconMap[card.type] || ''}
          </div>
          <p class="tag tag-soft inline-flex">${card.type}</p>
        </div>
        <h2 class="text-xl font-semibold text-slate-900">${card.title}</h2>
        <p class="text-sm text-slate-700 flex-grow">
          ${card.summary}
        </p>
        <ul class="space-y-2 text-sm text-slate-600">
          ${card.bullets.map(bullet => `
            <li class="flex items-start gap-2">
              <span class="text-brand-green mt-1.5 flex-shrink-0">•</span>
              <span>${bullet}</span>
            </li>
          `).join('')}
        </ul>
        <a href="/services/${card.type === '建築工程' ? 'building' : card.type === '土木工程' ? 'civil' : 'management'}/" 
           class="inline-flex items-center gap-1 text-sm font-medium text-brand-green hover:text-brand-green-dark mt-auto service-link">
          查看${card.type}子頁
          <span aria-hidden="true" class="arrow">→</span>
        </a>
      </div>
    </article>
  `).join('');

  // Arrow hover effect is handled by CSS, no need for JS
}


function setupSmoothScroll() {
  const scrollLink = document.querySelector('[href="#capabilities"]');
  if (scrollLink) {
    scrollLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('capabilities');
      if (target) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  }
}

function initServicesPage() {
  renderKPIs();
  renderServiceCards();
  setupSmoothScroll();
}

initServicesPage();

