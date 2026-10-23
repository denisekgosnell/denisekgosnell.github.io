(function () {
  'use strict';

  // Google Apps Script web app URL (ends in /exec). See _apps-script.gs for setup.
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxWnrEeJ99jPN607SPx9W2u9VBs7jxvuQ7yVx72HWw8IxIS0DXVJuS12dVN2wfkEWxj6g/exec';

  var EMAIL_PATTERN = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
  var MAX_NAME_LENGTH = 100;
  var MAX_EMAIL_LENGTH = 254;
  var TIMEOUT_MS = 20000;

  var MESSAGES = {
    invalid_name: 'Please enter your name.',
    invalid_email: 'Please enter a valid email address.',
    busy: 'Lots of sign-ups right now. Please try again in a minute.',
    not_configured: 'Sign-ups open shortly. Please check back soon.',
    failed: "Something went wrong and you're not on the waitlist yet. Please try again."
  };

  var form = document.getElementById('signup');
  var nameInput = document.getElementById('signup-name');
  var emailInput = document.getElementById('signup-email');
  var trapInput = document.getElementById('signup-leave-blank');
  var submitButton = form.querySelector('.submit');
  var status = document.getElementById('signup-status');
  var success = document.getElementById('signup-success');
  var successMessage = document.getElementById('signup-success-message');
  var submitLabel = submitButton.textContent;
  var submitting = false;

  function clearError() {
    status.textContent = '';
    status.classList.remove('is-error');
    nameInput.removeAttribute('aria-invalid');
    emailInput.removeAttribute('aria-invalid');
  }

  function showError(code, input) {
    status.textContent = MESSAGES[code] || MESSAGES.failed;
    status.classList.add('is-error');
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    }
  }

  function showSuccess(name, email) {
    var firstName = name.split(' ')[0];
    successMessage.textContent =
      'Thanks, ' + firstName + '. We\'ll send updates about the book to ' + email + '.';
    form.hidden = true;
    success.hidden = false;
    success.querySelector('.success-title').focus();
  }

  function setSubmitting(value) {
    submitting = value;
    submitButton.disabled = value;
    submitButton.textContent = value ? 'Joining…' : submitLabel;
  }

  nameInput.addEventListener('input', clearError);
  emailInput.addEventListener('input', clearError);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitting) return;
    clearError();

    var name = nameInput.value.replace(/\s+/g, ' ').trim();
    var email = emailInput.value.trim();

    if (!name || name.length > MAX_NAME_LENGTH) return showError('invalid_name', nameInput);
    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
      return showError('invalid_email', emailInput);
    }
    if (!ENDPOINT) return showError('not_configured');

    var body = new URLSearchParams();
    body.set('name', name);
    body.set('email', email);
    body.set('leave_blank', trapInput.value);

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller && setTimeout(function () { controller.abort(); }, TIMEOUT_MS);

    setSubmitting(true);
    fetch(ENDPOINT, {
      method: 'POST',
      body: body,
      credentials: 'omit',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      signal: controller ? controller.signal : undefined
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (result) {
        // Only report success once the sheet has confirmed the write.
        if (result && result.ok === true) return showSuccess(name, email);
        var code = result && MESSAGES[result.error] ? result.error : 'failed';
        var input = { invalid_name: nameInput, invalid_email: emailInput }[code];
        showError(code, input);
      })
      .catch(function () {
        showError('failed');
      })
      .then(function () {
        clearTimeout(timer);
        setSubmitting(false);
      });
  });
})();
