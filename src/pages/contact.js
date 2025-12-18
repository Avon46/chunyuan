import { initLayout } from '../components/layout.js';

function initForm() {
  const form = document.querySelector('[data-contact-form]');
  const success = document.querySelector('[data-form-success]');

  if (!form) return;

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);
    const requiredFields = ['name', 'email', 'topic', 'message'];
    let hasError = false;

    // 清除所有錯誤訊息
    form
      .querySelectorAll('[data-error]')
      .forEach((el) => (el.textContent = ''));

    // 驗證必填欄位
    requiredFields.forEach((field) => {
      const value = String(formData.get(field) || '').trim();
      if (!value) {
        const errorEl = form.querySelector(`[data-error="${field}"]`);
        if (errorEl) {
          errorEl.textContent = '此欄位為必填';
        }
        hasError = true;
      }
    });

    // Email 格式驗證
    const email = String(formData.get('email') || '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const errorEl = form.querySelector('[data-error="email"]');
      if (errorEl) {
        errorEl.textContent = '請輸入有效的 Email 格式';
      }
      hasError = true;
    }

    if (hasError) return;

    // 表單送出成功
    form.reset();
    if (success) {
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 3 秒後自動隱藏成功訊息
      setTimeout(() => {
        success.classList.add('hidden');
      }, 5000);
    }
  });
}

function initContactPage() {
  initLayout();
  initForm();
}

initContactPage();


