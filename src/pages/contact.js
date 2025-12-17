import { initLayout } from '../components/layout.js';

function initForm() {
  const form = document.querySelector('[data-contact-form]');
  const success = document.querySelector('[data-form-success]');

  if (!form) return;

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);
    const requiredFields = ['name', 'company', 'email', 'message'];
    let hasError = false;

    form
      .querySelectorAll('[data-error]')
      .forEach((el) => (el.textContent = ''));

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

    const email = String(formData.get('email') || '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const errorEl = form.querySelector('[data-error="email"]');
      if (errorEl) {
        errorEl.textContent = '請輸入有效的 Email';
      }
      hasError = true;
    }

    if (hasError) return;

    form.reset();
    if (success) {
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function initContactPage() {
  initLayout();
  initForm();
}

initContactPage();


