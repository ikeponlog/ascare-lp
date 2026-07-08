(() => {
  'use strict';

  /* Scroll/entrance reveal for brand panel copy */
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

  /* Password show/hide toggle */
  const passwordInput = document.getElementById('passwordInput');
  const passwordToggle = document.getElementById('passwordToggle');

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const isVisible = passwordInput.type === 'text';
      passwordInput.type = isVisible ? 'password' : 'text';
      passwordToggle.setAttribute('aria-pressed', String(!isVisible));
      passwordToggle.setAttribute('aria-label', isVisible ? 'パスワードを表示する' : 'パスワードを隠す');
      passwordToggle.querySelector('.icon-eye').hidden = !isVisible;
      passwordToggle.querySelector('.icon-eye-off').hidden = isVisible;
    });
  }

  /* Form validation + demo submit */
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('emailInput');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const alertBox = document.getElementById('loginAlert');
  const submitBtn = form ? form.querySelector('.login-submit') : null;

  const setFieldError = (input, errorEl, message) => {
    input.closest('.field').classList.toggle('has-error', Boolean(message));
    errorEl.textContent = message || '';
  };

  const showAlert = (message, isError) => {
    alertBox.textContent = message;
    alertBox.hidden = false;
    alertBox.classList.toggle('is-error', Boolean(isError));
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alertBox.hidden = true;

      let valid = true;
      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value;

      if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setFieldError(emailInput, emailError, 'メールアドレスの形式が正しくありません。');
        valid = false;
      } else {
        setFieldError(emailInput, emailError, '');
      }

      if (!passwordValue || passwordValue.length < 8) {
        setFieldError(passwordInput, passwordError, 'パスワードは8文字以上で入力してください。');
        valid = false;
      } else {
        setFieldError(passwordInput, passwordError, '');
      }

      if (!valid) {
        showAlert('入力内容をご確認ください。', true);
        return;
      }

      submitBtn.dataset.loading = 'true';
      submitBtn.textContent = 'ログイン中…';

      window.setTimeout(() => {
        submitBtn.dataset.loading = 'false';
        submitBtn.textContent = 'ログイン';
        showAlert('このページはデモ画面です。実際の認証・ログインは行われません。', false);
      }, 700);
    });
  }

  const ssoButton = document.getElementById('ssoButton');
  if (ssoButton) {
    ssoButton.addEventListener('click', () => {
      showAlert('このページはデモ画面です。SSO連携は行われません。', false);
    });
  }
})();
