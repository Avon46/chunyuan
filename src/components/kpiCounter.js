/**
 * KPI 數字跳轉動畫組件
 * 自動為所有 KPI 卡片添加數字跳轉動畫效果
 */

/**
 * 解析數字值（支援 +、項、件、類、人、年等後綴）
 * @param {string} text - 包含數字的文字
 * @returns {Object} { value: number, suffix: string, isNumber: boolean }
 */
function parseNumber(text) {
  if (!text) return { value: 0, suffix: '', isNumber: false };
  
  // 移除所有空白
  const cleanText = text.trim().replace(/\s+/g, '');
  
  // 如果不是數字開頭（如 "多項"），直接返回
  if (!/^\d/.test(cleanText)) {
    return { value: 0, suffix: cleanText, isNumber: false };
  }
  
  // 匹配數字和後綴（如 "300+億"、"200+"、"3類"、"1988"）
  const match = cleanText.match(/^(\d+)([+\-]?)\s*([億萬千百十]|項|件|類|人|年)?/);
  
  if (!match) {
    return { value: 0, suffix: cleanText, isNumber: false };
  }
  
  const value = parseInt(match[1], 10);
  const hasPlus = match[2] === '+';
  const suffix = (match[2] || '') + (match[3] ? ' ' + match[3] : '');
  
  return { value, suffix, isNumber: true, hasPlus };
}

/**
 * 格式化數字顯示
 * @param {number} num - 數字
 * @param {string} suffix - 後綴
 * @param {boolean} hasPlus - 是否有 + 號
 * @returns {string}
 */
function formatNumber(num, suffix, hasPlus) {
  return `${num}${hasPlus ? '+' : ''}${suffix}`;
}

/**
 * 動畫數字跳轉
 * @param {HTMLElement} element - 要動畫的元素
 * @param {number} targetValue - 目標值
 * @param {string} suffix - 後綴
 * @param {boolean} hasPlus - 是否有 + 號
 * @param {number} duration - 動畫持續時間（毫秒）
 */
function animateNumber(element, targetValue, suffix, hasPlus, duration = 2000) {
  const startValue = 0;
  const startTime = performance.now();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // 如果偏好減少動畫，直接顯示目標值
    element.textContent = formatNumber(targetValue, suffix, hasPlus);
    return;
  }
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用 easeOutCubic 緩動函數
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
    
    element.textContent = formatNumber(currentValue, suffix, hasPlus);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // 確保最終值正確
      element.textContent = formatNumber(targetValue, suffix, hasPlus);
    }
  }
  
  requestAnimationFrame(update);
}

/**
 * 初始化所有 KPI 卡片的數字跳轉動畫
 */
export function initKPICounters() {
  // 使用 Intersection Observer 來觸發動畫（當元素進入視窗時）
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        
        const numberElement = entry.target.querySelector('[data-kpi-value]');
        if (numberElement) {
          const originalText = numberElement.textContent;
          const parsed = parseNumber(originalText);
          
          if (parsed.isNumber) {
            // 先設為 0
            numberElement.textContent = formatNumber(0, parsed.suffix, parsed.hasPlus);
            
            // 延遲一點開始動畫（讓視覺更自然）
            setTimeout(() => {
              animateNumber(
                numberElement,
                parsed.value,
                parsed.suffix,
                parsed.hasPlus,
                2000
              );
            }, 100);
          }
        }
      }
    });
  }, observerOptions);
  
  // 找到所有包含 data-kpi-value 的元素所在的卡片
  const kpiElements = document.querySelectorAll('[data-kpi-value]');
  
  kpiElements.forEach((element) => {
    // 找到最近的 .card 父元素
    const card = element.closest('.card');
    if (card && !card.dataset.observed) {
      card.dataset.observed = 'true';
      observer.observe(card);
    }
  });
}

