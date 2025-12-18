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

      <!-- Mobile Menu Overlay (Background) -->
      <div class="lg:hidden fixed inset-0 z-50 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300" data-mobile-menu-overlay></div>
      
      <!-- Mobile Menu Panel -->
      <div class="lg:hidden fixed inset-0 z-[51] pointer-events-none" data-mobile-menu-container>
        <div class="fixed inset-0 bg-slate-900 overflow-y-auto opacity-0 -translate-y-full transition-all duration-300 pointer-events-auto" style="height: 100dvh; -webkit-overflow-scrolling: touch;" data-mobile-menu-panel>
          <div class="min-h-full px-4 sm:px-6 pt-3 sm:pt-4 pb-5 sm:pb-6">
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
                class="inline-flex items-center justify-center rounded-full border border-white/30 text-white h-9 w-9 hover:bg-white/10"
                type="button"
                aria-label="關閉選單"
                data-mobile-menu-close
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav class="flex flex-col gap-2 mb-8">
              ${NAV_LINKS.map(
                (link) => `
                <a href="${link.href}"
                   class="flex items-center justify-between rounded-xl px-4 py-4 transition-all duration-200 ${
                     currentPath === normalizePath(link.href)
                       ? 'bg-white text-brand-green shadow-sm'
                       : 'text-slate-100 hover:bg-white/8 active:bg-white/12'
                   }"
                >
                  <span class="text-[17px] font-semibold leading-tight">${link.label}</span>
                  <svg class="w-3.5 h-3.5 opacity-40 ${currentPath === normalizePath(link.href) ? 'text-brand-green opacity-60' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              `
              ).join('')}
            </nav>
            <div class="space-y-3 pt-2">
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
  const mobileOverlay = document.querySelector('[data-mobile-menu-overlay]');
  const mobileContainer = document.querySelector('[data-mobile-menu-container]');
  const mobilePanel = document.querySelector('[data-mobile-menu-panel]');

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
    if (!mobileOverlay || !mobileContainer || !mobilePanel) return;
    const body = document.body;
    
    if (open) {
      // 開啟選單 - 只鎖定滾動，不改變位置
      body.style.overflow = 'hidden';
      
      // 顯示 overlay
      mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
      mobileOverlay.classList.add('opacity-100', 'pointer-events-auto');
      
      // 顯示 container 和 panel
      mobileContainer.classList.remove('pointer-events-none');
      mobileContainer.classList.add('pointer-events-auto');
      
      mobilePanel.classList.remove('opacity-0', '-translate-y-full');
      mobilePanel.classList.add('opacity-100', 'translate-y-0');
    } else {
      // 關閉選單 - 恢復滾動
      body.style.overflow = '';
      
      // 隱藏 overlay
      mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
      mobileOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      
      // 隱藏 container 和 panel
      mobileContainer.classList.add('pointer-events-none');
      mobileContainer.classList.remove('pointer-events-auto');
      
      mobilePanel.classList.add('opacity-0', '-translate-y-full');
      mobilePanel.classList.remove('opacity-100', 'translate-y-0');
    }
  };

  // 點擊開啟按鈕
  mobileToggle?.addEventListener('click', () => setMenuOpen(true));
  
  // 點擊關閉按鈕
  mobileClose?.addEventListener('click', () => setMenuOpen(false));
  
  // 點擊 overlay（遮罩）關閉
  mobileOverlay?.addEventListener('click', () => {
    setMenuOpen(false);
  });
  
  // 點擊 panel 內部（包含空白區域）不關閉選單
  mobilePanel?.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
}

function normalizePath(path) {
  if (!path.endsWith('/')) return path + '/';
  return path;
}


