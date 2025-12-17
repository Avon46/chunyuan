import { initLayout } from '../components/layout.js';
import projectsData from '../data/projects.json';

function getProjectFromSlug(slug) {
  return projectsData.find((p) => p.slug === slug);
}

function createDetailGallery(project) {
  const images = [
    project.cover,
    '/assets/projects/gallery-placeholder-1.jpg',
    '/assets/projects/gallery-placeholder-2.jpg',
    '/assets/projects/gallery-placeholder-3.jpg'
  ];
  return images;
}

function renderProject(project) {
  const hero = document.querySelector('[data-project-hero]');
  const summary = document.querySelector('[data-project-summary]');
  const intro = document.querySelector('[data-project-intro]');
  const gallery = document.querySelector('[data-project-gallery]');
  const related = document.querySelector('[data-related-projects]');

  if (!hero || !summary || !intro || !gallery || !related) return;

  hero.innerHTML = `
    <div class="relative overflow-hidden rounded-3xl bg-slate-900 text-white">
      <div class="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 opacity-90"></div>
      <div class="relative z-10 grid gap-8 md:grid-cols-[1.4fr,1fr] p-8 md:p-10 lg:p-12">
        <div class="space-y-4">
          <p class="text-xs text-brand-green-light">
            代表工程
          </p>
          <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">${project.name}</h1>
          <p class="text-sm text-slate-200 flex flex-wrap gap-4">
            <span>${project.location}</span>
            <span class="inline-flex items-center gap-2">
              <span class="h-1 w-1 rounded-full bg-slate-400"></span>${project.type}
            </span>
            <span class="inline-flex items-center gap-2">
              <span class="h-1 w-1 rounded-full bg-slate-400"></span>${project.year} 年
            </span>
          </p>
          <div class="flex flex-wrap gap-2 pt-2">
            ${project.tags
              .map(
                (tag) =>
                  `<span class="tag tag-outline border-white/30 bg-white/5 text-white">${tag}</span>`
              )
              .join('')}
          </div>
        </div>
        <div class="rounded-2xl bg-slate-900/40 border border-white/10 p-4 md:p-5 space-y-3">
          <p class="text-xs font-medium text-slate-300">專案摘要</p>
          <dl class="grid grid-cols-2 gap-3 text-xs text-slate-100">
            <div>
              <dt class="text-slate-400 mb-1">地點</dt>
              <dd>${project.location}</dd>
            </div>
            <div>
              <dt class="text-slate-400 mb-1">工程類型</dt>
              <dd>${project.type}</dd>
            </div>
            <div>
              <dt class="text-slate-400 mb-1">規模</dt>
              <dd>${project.scale}</dd>
            </div>
            <div>
              <dt class="text-slate-400 mb-1">工期</dt>
              <dd>${project.duration}</dd>
            </div>
          </dl>
          <div class="pt-2">
            <p class="text-xs text-slate-400 mb-1">目前狀態</p>
            <p class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs">
              ${project.status}
            </p>
          </div>
          <div class="pt-2 flex flex-wrap gap-2">
            <a href="/contact/" class="btn btn-accent text-xs">
              與專案團隊聯絡
            </a>
            <a href="/projects/" class="btn btn-secondary text-xs border-white/40 text-white hover:bg-white/10">
              回工程實績一覽
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  intro.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="section-title text-xl md:text-2xl mb-2">專案介紹</h2>
        <p class="text-sm md:text-base text-slate-700 leading-relaxed">
          本專案為假想案例，用於展示工程實績詳頁的資訊架構。實際上線時，可依照實際工程內容補上設計理念、施工重點、工法特色與專案管理方式等敘述，
          讓外部訪客能夠快速理解工程價值與團隊能力。
        </p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-slate-900 mb-3">工程亮點</h3>
        <ul class="space-y-2 text-sm text-slate-700">
          <li>．導入數位工地主流程，結合 BIM 與現場管理，提升溝通效率與施工品質。</li>
          <li>．以永續與使用者體驗為核心，規劃友善動線與高效率設備配置。</li>
          <li>．透過跨專業團隊合作，於工期與品質要求下達成多方利害關係人的期待。</li>
        </ul>
      </div>
    </div>
  `;

  const galleryImages = createDetailGallery(project);
  gallery.innerHTML = '';
  galleryImages.forEach((src, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'gallery-item';
    item.innerHTML = `
      <span class="absolute inset-0 flex items-center justify-center text-[10px] text-slate-600">
        圖片占位 ${index + 1}
      </span>
    `;
    item.addEventListener('click', () =>
      openLightbox(`圖片占位 ${index + 1}`)
    );
    gallery.appendChild(item);
  });

  const relatedItems = projectsData
    .filter((p) => p.id !== project.id && p.type === project.type)
    .slice(0, 3);

  related.innerHTML = '';
  relatedItems.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-inner space-y-2">
        <p class="text-xs text-slate-500">${p.location}</p>
        <h3 class="text-sm font-semibold text-slate-900 line-clamp-2">${p.name}</h3>
        <p class="text-xs text-slate-500">${p.year} 年 · ${p.status}</p>
        <a href="/projects/detail.html?slug=${encodeURIComponent(
          p.slug
        )}" class="inline-flex items-center gap-1 text-xs font-medium text-brand-green hover:text-brand-green-dark">
          查看專案
          <span aria-hidden="true">→</span>
        </a>
      </div>
    `;
    related.appendChild(card);
  });
}

function openLightbox(label) {
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';
  backdrop.innerHTML = `
    <div class="lightbox-content relative">
      <button
        type="button"
        aria-label="關閉"
        class="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-slate-100 hover:bg-black/80"
      >
        ✕
      </button>
      <div class="aspect-video w-full flex items-center justify-center text-slate-100 text-sm">
        ${label}（Lightbox 示意）
      </div>
    </div>
  `;
  const close = () => backdrop.remove();
  backdrop
    .querySelector('button')
    ?.addEventListener('click', close);
  backdrop.addEventListener('click', (evt) => {
    if (evt.target === backdrop) close();
  });
  document.body.appendChild(backdrop);
}

function showNotFound() {
  const shell = document.querySelector('[data-project-page]');
  if (!shell) return;
  shell.innerHTML = `
    <div class="page-section">
      <div class="mx-auto max-w-3xl px-4 text-center">
        <p class="text-sm text-slate-500 mb-2">找不到專案</p>
        <h1 class="text-2xl md:text-3xl font-semibold mb-4">很抱歉，目前找不到這個工程實績</h1>
        <p class="text-sm text-slate-600 mb-6">
          請確認網址是否正確，或回到工程實績總覽頁面瀏覽其他案例。
        </p>
        <a href="/projects/" class="btn btn-primary text-xs">回工程實績列表</a>
      </div>
    </div>
  `;
}

function initProjectDetailPage() {
  initLayout();
  const url = new URL(window.location.href);
  const slug = url.searchParams.get('slug');
  if (!slug) {
    showNotFound();
    return;
  }
  const project = getProjectFromSlug(slug);
  if (!project) {
    showNotFound();
    return;
  }
  renderProject(project);
}

initProjectDetailPage();


