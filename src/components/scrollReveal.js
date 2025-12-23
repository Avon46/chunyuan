/**
 * Scroll Reveal 動畫系統
 * 使用 IntersectionObserver 實現元素進入視窗時的漸進顯示動畫
 */

// 全站開關：設為 true 時不執行動畫
window.REVEAL_DISABLED = window.REVEAL_DISABLED || false;

/**
 * 初始化 Scroll Reveal 系統
 */
export function initScrollReveal() {
  // 如果全站開關開啟，直接返回
  if (window.REVEAL_DISABLED) {
    // 直接顯示所有元素
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  // 檢查 prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // 如果偏好減少動畫，直接顯示所有元素
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  // 建立 IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // 提早 10% 觸發
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      
      if (entry.isIntersecting) {
        const once = element.dataset.once !== 'false'; // 預設 true
        
        // 如果已經顯示過且只動畫一次，則跳過
        if (once && element.classList.contains('is-revealed')) {
          return;
        }
        
        // 計算延遲
        const delay = calculateDelay(element);
        
        // 套用延遲後添加 is-revealed class
        setTimeout(() => {
          element.classList.add('is-revealed');
        }, delay);
        
        // 如果只動畫一次，則停止觀察
        if (once) {
          observer.unobserve(element);
        }
      } else {
        // 如果元素離開視窗且允許重播，移除 is-revealed
        if (element.dataset.once === 'false') {
          element.classList.remove('is-revealed');
        }
      }
    });
  }, observerOptions);

  // 觀察所有帶有 data-reveal 的元素
  function observeElements() {
    const revealElements = document.querySelectorAll('[data-reveal]:not([data-observed])');
    revealElements.forEach((element) => {
      element.setAttribute('data-observed', 'true');
      observer.observe(element);
    });
  }

  // 初始觀察
  observeElements();

  // 使用 MutationObserver 監聽動態添加的元素
  const mutationObserver = new MutationObserver(() => {
    observeElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * 計算元素的延遲時間
 * @param {HTMLElement} element - 要計算延遲的元素
 * @returns {number} 延遲時間（毫秒）
 */
function calculateDelay(element) {
  // 優先使用元素自身的 data-delay
  if (element.dataset.delay) {
    return parseInt(element.dataset.delay, 10);
  }
  
  // 檢查父層是否有 data-stagger
  const parent = element.closest('[data-stagger]');
  if (parent) {
    const staggerDelay = parseInt(parent.dataset.stagger, 10) || 80;
    
    // 計算在同層級中的索引
    const siblings = Array.from(parent.children).filter(
      (child) => child.hasAttribute('data-reveal')
    );
    const index = siblings.indexOf(element);
    
    return index * staggerDelay;
  }
  
  // 預設無延遲
  return 0;
}

