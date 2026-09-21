import '../styles/main.css';

const form = document.querySelector('#register-form');
const submit = document.querySelector('#submit');
const success = document.querySelector('#success');
const email = document.querySelector('#email');
const name = document.querySelector('#name');
const agree = document.querySelector('#agree');

const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(field, message) {
  document.querySelector(`#${field.id}-error`).textContent = message;
  field.closest('.field').classList.toggle('field--error', Boolean(message));
  if (message) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }
}

function validate() {
  let isValid = true;

  if (name.value.trim().length < 2) {
    setError(name, 'Укажите имя и фамилию');
    isValid = false;
  } else {
    setError(name, '');
  }

  if (!EMAIL_RULE.test(email.value.trim())) {
    setError(email, 'Введите корректный e-mail');
    isValid = false;
  } else {
    setError(email, '');
  }

  const format = form.querySelector('input[name="format"]:checked');
  document.querySelector('#format-error').textContent = format ? '' : 'Выберите формат участия';
  document.querySelector('#agree-error').textContent = agree.checked
    ? ''
    : 'Нужно согласиться с правилами';

  return isValid && Boolean(format) && agree.checked;
}

// Проверяем почту сразу, как пользователь ушёл из поля.
email.addEventListener('blur', () => {
  if (email.value.trim() !== '') {
    setError(email, EMAIL_RULE.test(email.value.trim()) ? '' : 'Введите корректный e-mail');
  }
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validate()) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  submit.disabled = true;
  submit.textContent = 'Отправка...';

  setTimeout(() => {
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }, 800);
});
