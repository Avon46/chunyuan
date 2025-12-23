/**
 * Hero 跑马灯品牌带组件
 * 提供可重用的跑马灯 HTML 片段
 */

/**
 * 渲染 Hero 跑马灯 HTML
 * @returns {string} 跑马灯 HTML 字符串
 */
export function renderHeroMarquee() {
  return `
    <div class="pointer-events-none absolute inset-0 flex items-end z-[5] pb-16 md:pb-20 lg:pb-24">
      <div class="cy-marquee w-full opacity-35 px-0">
        <div class="cy-marquee__track">
          <span class="cy-marquee__text">春原營造股份有限公司</span>
          <span class="cy-marquee__text">春原營造股份有限公司</span>
          <span class="cy-marquee__text">春原營造股份有限公司</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * 初始化 Hero 跑马灯
 * 自动在所有 Hero section 中插入跑马灯
 */
export function initHeroMarquee() {
  // 查找所有 Hero section（包含 min-height: 100vh 和 background-image 的 section）
  // 使用更宽松的选择器，匹配所有可能的 Hero section
  const heroSections = document.querySelectorAll('section[style*="min-height: 100vh"]');
  
  heroSections.forEach((section) => {
    // 检查是否有 background-image（通过 style 属性或内联样式）
    const style = section.getAttribute('style') || '';
    if (!style.includes('background-image')) {
      return;
    }

    // 检查是否已经插入过跑马灯
    if (section.querySelector('.cy-marquee')) {
      return;
    }

    // 查找所有 absolute inset-0 的 div（可能有多个 overlay）
    const overlays = section.querySelectorAll('.absolute.inset-0');
    
    if (overlays.length > 0) {
      // 在最后一个 overlay 之后插入跑马灯（确保在所有 overlay 之上）
      const lastOverlay = overlays[overlays.length - 1];
      const marqueeHTML = renderHeroMarquee();
      lastOverlay.insertAdjacentHTML('afterend', marqueeHTML);
    } else {
      // 如果没有找到 overlay，直接在 section 的第一个子元素之前插入
      const firstChild = section.firstElementChild;
      if (firstChild) {
        const marqueeHTML = renderHeroMarquee();
        firstChild.insertAdjacentHTML('beforebegin', marqueeHTML);
      }
    }
  });
}

