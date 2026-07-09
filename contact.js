(() => {
  'use strict';

  /* Entrance reveal (page loads directly, not scroll-triggered) */
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach((el) => {
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.setProperty('--delay', delay);
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    });
  });

  /* Inquiry-type segmented control, pre-selected via ?type= query param */
  const typeInput = document.getElementById('typeInput');
  const segmented = document.getElementById('typeSegmented');
  const options = segmented ? Array.from(segmented.querySelectorAll('.segmented-option')) : [];

  const setActiveType = (value) => {
    const match = options.find((btn) => btn.dataset.value === value);
    if (!match) return;
    options.forEach((btn) => btn.classList.toggle('is-active', btn === match));
    typeInput.value = value;
  };

  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get('type');
  if (requestedType) setActiveType(requestedType);

  options.forEach((btn) => {
    btn.addEventListener('click', () => setActiveType(btn.dataset.value));
  });

  /* Form validation + demo submit */
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('contactAlert');

  const fields = [
    { input: document.getElementById('companyInput'), error: document.getElementById('companyError'), validate: (v) => v.trim().length > 0, message: '会社名・法人名をご入力ください。' },
    { input: document.getElementById('nameInput'), error: document.getElementById('nameError'), validate: (v) => v.trim().length > 0, message: 'ご担当者名をご入力ください。' },
    { input: document.getElementById('cEmailInput'), error: document.getElementById('cEmailError'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: 'メールアドレスの形式が正しくありません。' },
  ];

  const setFieldError = (input, errorEl, message) => {
    input.closest('.field').classList.toggle('has-error', Boolean(message));
    errorEl.textContent = message || '';
  };

  const showAlert = (message, isError) => {
    alertBox.textContent = message;
    alertBox.hidden = false;
    alertBox.classList.toggle('is-error', Boolean(isError));
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alertBox.hidden = true;

      let valid = true;
      fields.forEach(({ input, error, validate, message }) => {
        if (!validate(input.value)) {
          setFieldError(input, error, message);
          valid = false;
        } else {
          setFieldError(input, error, '');
        }
      });

      const agreeInput = document.getElementById('agreeInput');
      const agreeError = document.getElementById('agreeError');
      if (!agreeInput.checked) {
        agreeError.textContent = 'プライバシーポリシーへの同意が必要です。';
        valid = false;
      } else {
        agreeError.textContent = '';
      }

      if (!valid) {
        showAlert('入力内容をご確認ください。', true);
        return;
      }

      const submitBtn = form.querySelector('.contact-submit');
      submitBtn.dataset.loading = 'true';
      submitBtn.textContent = '送信中…';

      window.setTimeout(() => {
        submitBtn.dataset.loading = 'false';
        submitBtn.textContent = '送信する';
        showAlert('このページはデモ画面です。実際の送信・受付は行われません。ご了承ください。', false);
        const currentType = typeInput.value;
        form.reset();
        setActiveType(currentType);
      }, 700);
    });
  }
})();
