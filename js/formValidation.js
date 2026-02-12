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
   * Validates the name field.
   * @returns {boolean} true if valid, otherwise false.
   */
  function validateName() {
    const val = nameInput.value.trim();
    const el = createFeedbackEl(nameInput);
    if (val.length < 2) {
      el.textContent = "Bitte gib deinen Namen ein.";
      return false;
    }
    el.textContent = "";
    return true;
  }

  /**
   * Validates the email field.
   * @returns {boolean} true if valid, otherwise false.
   */
  function validateEmail() {
    const val = emailInput.value.trim();
    const el = createFeedbackEl(emailInput);
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      el.textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
      return false;
    }
    el.textContent = "";
    return true;
  }

  /**
   * Validates the message field.
   * @returns {boolean} true if valid, otherwise false.
   */
  function validateMessage() {
    const val = messageInput.value.trim();
    const el = createFeedbackEl(messageInput);
    if (val.length < 5) {
      el.textContent = "Bitte gib eine Nachricht ein.";
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
   * @returns {boolean} true if the form is valid, otherwise false.
   */
  function checkForm() {
    const valid =
      validateName() &&
      validateEmail() &&
      validateMessage() &&
      validatePrivacy();
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
    submitBtn.textContent = "Wird gesendet...";
    setTimeout(function () {
      submitBtn.textContent = "Say Hello ;)";
      form.reset();
      Array.from(form.querySelectorAll(".input-feedback")).forEach(
        (el) => (el.textContent = ""),
      );
      alert("Danke für deine Nachricht!");
      submitBtn.disabled = false;
    }, 1200);
  });

  // Initial-Check
  checkForm();
});
