export function createProjectCard(project) {
  const wrapper = document.createElement('article');
  wrapper.className = 'card flex flex-col';
  wrapper.setAttribute('data-reveal', 'up');
  wrapper.innerHTML = `
    <div class="relative h-40 md:h-44 w-full overflow-hidden rounded-t-2xl bg-slate-200">
      <div class="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
        圖片占位：${project.name}
      </div>
    </div>
    <div class="card-inner flex flex-1 flex-col gap-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs text-slate-500 mb-1">${project.location}</p>
          <h3 class="text-base md:text-lg font-semibold text-slate-900 line-clamp-2">${project.name}</h3>
        </div>
        <span class="tag tag-soft">${project.type}</span>
      </div>
      <div class="card-meta">
        <span>${project.year} 年</span>
        <span>${project.scale}</span>
        <span class="${
          project.status === '已完工'
            ? 'text-emerald-600'
            : project.status === '施工中'
            ? 'text-amber-600'
            : 'text-slate-600'
        }">${project.status}</span>
      </div>
      <div class="mt-auto flex items-center justify-between pt-1">
        <div class="flex flex-wrap gap-1.5">
          ${project.tags
            .slice(0, 3)
            .map(
              (tag) =>
                `<span class="tag tag-outline bg-slate-50 text-slate-700">${tag}</span>`
            )
            .join('')}
        </div>
        <a
          href="/projects/detail.html?slug=${encodeURIComponent(project.slug)}"
          class="text-xs font-medium text-brand-green hover:text-brand-green-dark"
        >
          查看詳情
        </a>
      </div>
    </div>
  `;
  return wrapper;
}

export function createServiceCard(service) {
  const wrapper = document.createElement('article');
  wrapper.className = 'card';
  wrapper.setAttribute('data-reveal', 'up');
  wrapper.innerHTML = `
    <div class="card-inner space-y-4">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green-dark text-sm font-semibold">
          ${service.badge}
        </div>
        <div>
          <h3 class="text-lg font-semibold text-slate-900 mb-1">${service.title}</h3>
          <p class="text-xs text-slate-500">${service.subtitle}</p>
        </div>
      </div>
      <ul class="space-y-1.5 text-sm text-slate-600">
        ${service.points.map((p) => `<li class="flex gap-2"><span class="mt-1 h-1 w-1 rounded-full bg-brand-green"></span><span>${p}</span></li>`).join('')}
      </ul>
      <a href="${service.href}" class="inline-flex items-center gap-1 text-sm font-medium text-brand-green hover:text-brand-green-dark">
        了解更多
        <span aria-hidden="true">→</span>
      </a>
    </div>
  `;
  return wrapper;
}

export function createNewsCard(item) {
  const wrapper = document.createElement('article');
  wrapper.className = 'card';
  wrapper.setAttribute('data-reveal', 'up');
  wrapper.innerHTML = `
    <div class="card-inner space-y-3">
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">${item.category}</span>
        <span>${item.date}</span>
      </div>
      <h3 class="text-base font-semibold text-slate-900 line-clamp-2">${item.title}</h3>
      <p class="text-sm text-slate-600 line-clamp-3">${item.summary}</p>
      <a href="#" class="inline-flex items-center gap-1 text-xs font-medium text-brand-green hover:text-brand-green-dark">
        查看詳情
        <span aria-hidden="true">→</span>
      </a>
    </div>
  `;
  return wrapper;
}

export function createVideoCard(video) {
  const wrapper = document.createElement('article');
  wrapper.className = 'card overflow-hidden';
  wrapper.setAttribute('data-reveal', 'up');
  wrapper.innerHTML = `
    <div class="relative h-40 md:h-44 w-full bg-slate-900/60 flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 opacity-80"></div>
      <button
        type="button"
        class="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/40 text-white hover:bg-white/20"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
    <div class="card-inner space-y-2">
      <p class="text-xs text-slate-500">${video.category}</p>
      <h3 class="text-base font-semibold text-slate-900 line-clamp-2">${video.title}</h3>
    </div>
  `;
  return wrapper;
}


