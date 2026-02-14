// Form validation for contact form (onBlur, button enable, feedback)
/**
 * Initializes form validation and feedback for the contact form.
 * Adds event listeners for validation, button enable, and feedback.
 */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const privacyInput = form.querySelector('input[name="privacy"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Feedback-Elemente
  /**
   * Creates or finds a feedback element for an input field.
   * @param {HTMLInputElement|HTMLTextAreaElement} input - The input field.
   * @returns {HTMLElement} The feedback element.
   */
  function createFeedbackEl(input) {
    let el = input.parentNode.querySelector(".input-feedback");
    if (!el) {
      el = document.createElement("div");
      el.className = "input-feedback";
      el.style.fontSize = "0.95em";
      el.style.color = "#e74c3c";
      el.style.minHeight = "18px";
      el.style.margin = "2px 0 0 0";
      el.style.transition = "opacity 0.15s";
      input.parentNode.appendChild(el);
    }
    return el;
  }

  /**
   * Gets translated text for the current language.
   * @param {string} key - Translation key.
   * @returns {string} Translated text.
   */
  function getTranslation(key) {
    const lang = document.documentElement.lang || "en";

    // Check if translations are available
    if (!window.translations) {
      console.warn("Translations not loaded yet");
      return key;
    }

    if (!window.translations[lang]) {
      console.warn(`Language '${lang}' not found in translations`);
      return key;
    }

    if (!window.translations[lang][key]) {
      console.warn(`Translation key '${key}' not found for language '${lang}'`);
      return key;
    }

    return window.translations[lang][key];
  }

  /**
   * Checks if name is valid (without showing error).
   * @returns {boolean} true if valid, otherwise false.
   */
  function isNameValid() {
    const val = nameInput.value.trim();
    return val.length >= 2;
  }

  /**
   * Checks if email is valid (without showing error).
   * @returns {boolean} true if valid, otherwise false.
   */
  function isEmailValid() {
    const val = emailInput.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val);
  }

  /**
   * Checks if message is valid (without showing error).
   * @returns {boolean} true if valid, otherwise false.
   */
  function isMessageValid() {
    const val = messageInput.value.trim();
    return val.length >= 5;
  }

  /**
   * Validates the name field and shows error message.
   * @returns {boolean} true if valid, otherwise false.
   */
  function validateName() {
    const el = createFeedbackEl(nameInput);
    if (!isNameValid()) {
      el.textContent = getTranslation("contact.form.error.name");
      return false;
    }
    el.textContent = "";
    return true;
  }

  /**
   * Validates the email field and shows error message.
   * @returns {boolean} true if valid, otherwise false.
   */
  function validateEmail() {
    const el = createFeedbackEl(emailInput);
    if (!isEmailValid()) {
      el.textContent = getTranslation("contact.form.error.email");
      return false;
    }
    el.textContent = "";
    return true;
  }

  /**
   * Validates the message field and shows error message.
   * @returns {boolean} true if valid, otherwise false.
   */
  function validateMessage() {
    const el = createFeedbackEl(messageInput);
    if (!isMessageValid()) {
      el.textContent = getTranslation("contact.form.error.message");
      return false;
    }
    el.textContent = "";
    return true;
  }

  /**
   * Checks if the privacy policy was accepted.
   * @returns {boolean} true if accepted, otherwise false.
   */
  function validatePrivacy() {
    return privacyInput.checked;
  }

  /**
   * Checks the entire form for validity and enables/disables the submit button.
   * Does NOT show error messages.
   * @returns {boolean} true if the form is valid, otherwise false.
   */
  function checkForm() {
    const valid =
      isNameValid() && isEmailValid() && isMessageValid() && validatePrivacy();
    submitBtn.disabled = !valid;
    return valid;
  }

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);
  privacyInput.addEventListener("change", checkForm);
  form.addEventListener("input", checkForm);

  // Feedback nach Versand
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!checkForm()) return;
    submitBtn.disabled = true;
    submitBtn.textContent = getTranslation("contact.form.sending");
    setTimeout(function () {
      submitBtn.textContent = getTranslation("contact.form.btn");
      form.reset();
      Array.from(form.querySelectorAll(".input-feedback")).forEach(
        (el) => (el.textContent = ""),
      );
      alert(getTranslation("contact.form.success"));
      submitBtn.disabled = false;
    }, 1200);
  });

  // Initial-Check
  checkForm();
});
