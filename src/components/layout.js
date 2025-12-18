const NAV_LINKS = [
  { href: '/about/', label: '關於春原' },
  { href: '/services/', label: '核心能力' },
  { href: '/projects/', label: '工程實績' },
  { href: '/quality/', label: '品質與肯定' },
  { href: '/media/', label: '影音與消息' }
];

const EMPLOYEE_ENTRY = { href: '/employee-login/', label: '員工專區' };

export function initLayout() {
  injectHeader();
  injectFooter();
  setupHeaderBehavior();
}

function injectHeader() {
  const header = document.querySelector('#site-header');
  if (!header) return;

  const currentPath = normalizePath(window.location.pathname);

  const navItems = NAV_LINKS.map((link) => {
    const active = currentPath === normalizePath(link.href);
    return `
      <a href="${link.href}"
         class="text-sm font-medium px-3 py-2 rounded-full transition-colors ${
           active
             ? 'bg-white text-brand-green'
             : 'text-slate-100/80 hover:bg-white/10 hover:text-white'
         }"
      >${link.label}</a>
    `;
  }).join('');

  header.innerHTML = `
    <div class="fixed inset-x-0 top-0 z-40 transition-all duration-300 bg-slate-900/80 backdrop-blur">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 header-inner">
          <a href="/" class="flex items-center gap-2 sm:gap-3">
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-brand-green flex items-center justify-center text-white text-sm font-semibold shadow-elevated">
              春
            </div>
            <div class="hidden sm:block">
              <p class="text-xs sm:text-sm font-semibold tracking-wide text-white">春原營造股份有限公司</p>
              <p class="text-[10px] sm:text-xs text-slate-300">SUNHARU CONSTRUCTION</p>
            </div>
          </a>

          <nav class="hidden lg:flex items-center gap-1">
            ${navItems}
          </nav>

          <div class="hidden lg:flex items-center gap-3">
            <a href="${EMPLOYEE_ENTRY.href}" class="btn text-xs border-[0.5px] border-white/20 bg-transparent text-white/70 hover:text-white hover:bg-white/5">
              ${EMPLOYEE_ENTRY.label}
            </a>
            <a href="/contact/" class="btn btn-accent text-xs shadow-lg shadow-brand-orange/30">
              聯絡我們
            </a>
          </div>

          <button
            class="lg:hidden inline-flex items-center justify-center rounded-full border border-white/30 text-white h-9 w-9 sm:h-10 sm:w-10"
            type="button"
            aria-label="開啟選單"
            data-mobile-menu-toggle
          >
            <span class="sr-only">Toggle navigation</span>
            <svg class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <div class="lg:hidden fixed inset-x-0 top-0 z-30 origin-top scale-y-0 opacity-0 pointer-events-none transition-all duration-200 bg-slate-900/98 backdrop-blur-md" data-mobile-menu>
        <div class="mx-auto max-w-6xl px-4 sm:px-6 pt-3 sm:pt-4 pb-5 sm:pb-6">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <a href="/" class="flex items-center gap-2 sm:gap-3">
              <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-brand-green flex items-center justify-center text-white text-sm font-semibold">
                春
              </div>
              <div>
                <p class="text-xs sm:text-sm font-semibold tracking-wide text-white">春原營造股份有限公司</p>
                <p class="text-[10px] sm:text-xs text-slate-300">SUNHARU CONSTRUCTION</p>
              </div>
            </a>
            <button
              class="inline-flex items-center justify-center rounded-full border border-white/30 text-white h-9 w-9"
              type="button"
              aria-label="關閉選單"
              data-mobile-menu-close
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav class="flex flex-col gap-1 mb-4 sm:mb-5">
            ${NAV_LINKS.map(
              (link) => `
              <a href="${link.href}"
                 class="flex items-center justify-between rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium ${
                   currentPath === normalizePath(link.href)
                     ? 'bg-white text-brand-green'
                     : 'text-slate-100 hover:bg-white/5'
                 }"
              >
                <span>${link.label}</span>
                <span class="text-xs text-slate-400">前往</span>
              </a>
            `
            ).join('')}
          </nav>
          <div class="space-y-3">
            <a href="/contact/" class="btn btn-accent w-full justify-center shadow-lg shadow-brand-orange/30">
              立即聯絡專人
            </a>
            <a href="${EMPLOYEE_ENTRY.href}" class="btn w-full justify-center border-[0.5px] border-white/20 bg-transparent text-white/70 hover:text-white hover:bg-white/5">
              ${EMPLOYEE_ENTRY.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function injectFooter() {
  const footer = document.querySelector('#site-footer');
  if (!footer) return;

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <footer class="mt-16 border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div class="grid gap-8 md:grid-cols-[2fr,1fr,1fr] md:gap-10">
          <div class="space-y-3">
            <p class="text-sm font-semibold text-slate-900">春原營造股份有限公司</p>
            <p class="text-xs text-slate-500 tracking-wide">SUNHARU CONSTRUCTION CO., LTD.</p>
            <div class="mt-4 space-y-1 text-xs text-slate-600">
              <p>地址：台北市信義區示意路 123 號 10 樓</p>
              <p>電話：02-1234-5678　傳真：02-1234-5679</p>
              <p>Email：contact@sunharu.example.com</p>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold text-slate-900 mb-3">快速連結</p>
            <div class="space-y-2 text-xs text-slate-600">
              <a href="/projects/" class="block hover:text-brand-green">工程實績</a>
              <a href="/careers/" class="block hover:text-brand-green">人才招募</a>
              <a href="/quality/" class="block hover:text-brand-green">品質政策</a>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold text-slate-900 mb-3">社群與影音</p>
            <div class="space-y-2 text-xs text-slate-600">
              <a href="#" class="block hover:text-brand-green">YouTube 頻道（占位）</a>
              <a href="#" class="block hover:text-brand-green">LinkedIn 公司頁（占位）</a>
              <a href="#" class="block hover:text-brand-green">工程案例影片合輯（占位）</a>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>版權所有 © ${year} 春原營造股份有限公司</p>
          <p>本網站為 Prototype 示意版本，所有工程資訊與圖片皆為假資料與占位圖示。</p>
        </div>
      </div>
    </footer>
  `;
}

function setupHeaderBehavior() {
  const headerShell = document.querySelector('#site-header > div');
  const mobileToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileClose = document.querySelector('[data-mobile-menu-close]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (!headerShell) return;

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const current = window.scrollY;
    const inner = headerShell.querySelector('.header-inner');
    if (!inner) return;

    if (current > 40) {
      inner.classList.add('py-2');
      inner.classList.remove('py-4');
      headerShell.classList.add('shadow-md', 'bg-slate-900/95');
    } else {
      inner.classList.add('py-4');
      inner.classList.remove('py-2');
      headerShell.classList.remove('shadow-md');
      headerShell.classList.add('bg-slate-900/80');
    }

    lastScrollY = current;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenuOpen = (open) => {
    if (!mobileMenu) return;
    const body = document.body;
    if (open) {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
      mobileMenu.style.transform = 'scaleY(1)';
      body.classList.add('overflow-hidden');
    } else {
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
      mobileMenu.style.transform = 'scaleY(0)';
      body.classList.remove('overflow-hidden');
    }
  };

  mobileToggle?.addEventListener('click', () => setMenuOpen(true));
  mobileClose?.addEventListener('click', () => setMenuOpen(false));
  mobileMenu?.addEventListener('click', (evt) => {
    if (evt.target === mobileMenu) setMenuOpen(false);
  });
}

function normalizePath(path) {
  if (!path.endsWith('/')) return path + '/';
  return path;
}


