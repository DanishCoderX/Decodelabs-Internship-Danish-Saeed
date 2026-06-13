'use strict';

const form          = document.querySelector('.js-reg-form');
const submitBtn     = document.querySelector('.js-submit-btn');
const btnText       = document.querySelector('.js-btn-text');
const btnSpinner    = document.querySelector('.js-btn-spinner');
const successBanner = document.querySelector('.js-success-banner');
const successName   = document.querySelector('.js-success-name');

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;

const REGEX_PHONE = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,5}[-\s\.]?[0-9]{4,10}$/;

const PASSWORD_RULES = {
  length:  { regex: /.{8,}/,             label: 'length' },
  upper:   { regex: /(?=.*?[A-Z])/,      label: 'upper' },
  lower:   { regex: /(?=.*?[a-z])/,      label: 'lower' },
  digit:   { regex: /(?=.*?[0-9])/,      label: 'digit' },
  special: { regex: /(?=.*?[#?!@$%^&*-])/, label: 'special' },
};

function validateName() {
  const input = document.getElementById('input-name');
  const val   = input.value.trim();

  if (val === '') return 'Full name is required.';
  if (val.length < 2) return 'Name must be at least 2 characters.';
  if (val.length > 60) return 'Name must be 60 characters or fewer.';
  return '';
}

function validateEmail() {
  const input = document.getElementById('input-email');
  const val   = input.value.trim();

  if (val === '') return 'Email address is required.';
  if (!REGEX_EMAIL.test(val)) return 'Please enter a valid email address (e.g. you@example.com).';
  return '';
}

function validatePhone() {
  const input = document.getElementById('input-phone');
  const val   = input.value.trim();

  if (val === '') return '';
  if (!REGEX_PHONE.test(val)) return 'Please enter a valid phone number.';
  return '';
}

function validatePassword() {
  const input = document.getElementById('input-password');
  const val   = input.value;

  if (val.trim() === '') return 'Password is required.';

  if (val.length < 8) return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(val)) return 'Password must contain at least one uppercase letter [A-Z].';
  if (!/[a-z]/.test(val)) return 'Password must contain at least one lowercase letter [a-z].';
  if (!/[0-9]/.test(val)) return 'Password must contain at least one digit [0-9].';
  if (!/[#?!@$%^&*-]/.test(val)) return 'Password must contain at least one special character [#?!@$%^&*-].';

  if (!REGEX_PASSWORD.test(val)) return 'Password does not meet the security requirements.';
  return '';
}

function validateConfirm() {
  const password = document.getElementById('input-password').value;
  const confirm  = document.getElementById('input-confirm').value;

  if (confirm.trim() === '') return 'Please confirm your password.';
  if (confirm !== password)  return 'Passwords do not match. Please re-enter.';
  return '';
}

function validateTerms() {
  const checkbox = document.getElementById('input-terms');
  if (!checkbox.checked) return 'You must agree to the Terms of Service to continue.';
  return '';
}

function setFieldError(fieldId, inputId, errorId, message) {
  const fieldEl = document.getElementById(fieldId);
  const inputEl = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);

  fieldEl.classList.remove('is-valid');
  fieldEl.classList.add('is-error');

  inputEl.setAttribute('aria-invalid', 'true');

  errorEl.textContent = message;
}

function setFieldValid(fieldId, inputId, errorId) {
  const fieldEl = document.getElementById(fieldId);
  const inputEl = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);

  fieldEl.classList.remove('is-error');
  fieldEl.classList.add('is-valid');

  inputEl.setAttribute('aria-invalid', 'false');

  errorEl.textContent = '';
}

function clearFieldState(fieldId, inputId, errorId) {
  const fieldEl = document.getElementById(fieldId);
  const inputEl = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);

  fieldEl.classList.remove('is-error', 'is-valid');
  inputEl.setAttribute('aria-invalid', 'false');
  errorEl.textContent = '';
}

function validateField(fieldName) {
  const validators = {
    name:     { fn: validateName,     fieldId: 'field-name',     inputId: 'input-name',     errorId: 'error-name' },
    email:    { fn: validateEmail,    fieldId: 'field-email',    inputId: 'input-email',    errorId: 'error-email' },
    phone:    { fn: validatePhone,    fieldId: 'field-phone',    inputId: 'input-phone',    errorId: 'error-phone' },
    password: { fn: validatePassword, fieldId: 'field-password', inputId: 'input-password', errorId: 'error-password' },
    confirm:  { fn: validateConfirm,  fieldId: 'field-confirm',  inputId: 'input-confirm',  errorId: 'error-confirm' },
    terms:    { fn: validateTerms,    fieldId: 'field-terms',    inputId: 'input-terms',    errorId: 'error-terms' },
  };

  const v = validators[fieldName];
  if (!v) return true;

  const errorMsg = v.fn();

  if (errorMsg) {
    setFieldError(v.fieldId, v.inputId, v.errorId, errorMsg);
    return false;
  } else {
    const inputEl = document.getElementById(v.inputId);
    const hasValue = inputEl.type === 'checkbox'
      ? inputEl.checked
      : inputEl.value.trim() !== '';

    if (hasValue) {
      setFieldValid(v.fieldId, v.inputId, v.errorId);
    } else {
      clearFieldState(v.fieldId, v.inputId, v.errorId);
    }
    return true;
  }
}

document.getElementById('input-name')    .addEventListener('blur', () => validateField('name'));
document.getElementById('input-email')   .addEventListener('blur', () => validateField('email'));
document.getElementById('input-phone')   .addEventListener('blur', () => validateField('phone'));
document.getElementById('input-password').addEventListener('blur', () => validateField('password'));
document.getElementById('input-confirm') .addEventListener('blur', () => validateField('confirm'));

document.getElementById('input-password').addEventListener('input', () => {
  updateStrengthMeter();
  if (document.getElementById('input-confirm').value !== '') {
    validateField('confirm');
  }
});

const strengthFill  = document.querySelector('.js-strength-fill');
const strengthMeter = document.querySelector('.strength-meter');

function updateStrengthMeter() {
  const val   = document.getElementById('input-password').value;
  const rules = document.querySelectorAll('.js-rule');
  let   score = 0;

  rules.forEach(ruleEl => {
    const ruleName = ruleEl.dataset.rule;
    const passes   = PASSWORD_RULES[ruleName].regex.test(val);

    ruleEl.classList.toggle('is-met', passes);
    if (passes) score++;
  });

  strengthFill.setAttribute('data-strength', score > 0 ? String(score) : '0');
}

document.getElementById('input-password').addEventListener('focus', () => {
  strengthMeter.classList.add('is-visible');
  updateStrengthMeter();
});

document.querySelectorAll('.js-toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const input    = document.getElementById(targetId);

    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
      btn.setAttribute('aria-label', 'Hide password');
    } else {
      input.type = 'password';
      btn.textContent = '👁';
      btn.setAttribute('aria-label', 'Show password');
    }
  });
});

form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();

  const results = [
    validateField('name'),
    validateField('email'),
    validateField('phone'),
    validateField('password'),
    validateField('confirm'),
    validateField('terms'),
  ];

  const isFormValid = results.every(Boolean);

  if (!isFormValid) {
    const firstError = form.querySelector('.is-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.querySelector('input, textarea, select')?.focus();
    }
    return;
  }

  showLoadingState();

  setTimeout(() => {
    hideLoadingState();
    showSuccessState();
  }, 1500);
});

function showLoadingState() {
  submitBtn.disabled = true;
  btnText.textContent = 'Creating account…';
  btnSpinner.classList.remove('is-hidden');
}

function hideLoadingState() {
  submitBtn.disabled = false;
  btnText.textContent = 'Create Account';
  btnSpinner.classList.add('is-hidden');
}

function showSuccessState() {
  const name  = document.getElementById('input-name').value.trim();
  const email = document.getElementById('input-email').value.trim();

  successBanner.classList.remove('is-hidden');
  successName.textContent = `Welcome, ${name}! We sent a confirmation to ${email}.`;

  successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const payload = {
    fullName: name,
    email:    email,
    phone:    document.getElementById('input-phone').value.trim() || null,
  };
  console.log('✅ Valid Payload (JSON):', JSON.stringify(payload, null, 2));

  setTimeout(() => {
    form.reset();
    document.querySelectorAll('.js-field').forEach(field => {
      field.classList.remove('is-error', 'is-valid');
    });
    document.querySelectorAll('.js-input').forEach(input => {
      input.setAttribute('aria-invalid', 'false');
    });
    document.querySelectorAll('.js-error').forEach(span => {
      span.textContent = '';
    });
    strengthMeter.classList.remove('is-visible');
    strengthFill.setAttribute('data-strength', '0');
  }, 3000);
}
