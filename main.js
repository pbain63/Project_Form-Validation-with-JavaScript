// Form elements

const form = document.getElementById("signup-form");

const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const emailInput = document.getElementById("mail");
const countrySelect = document.getElementById("country");
const postalCodeInput = document.getElementById("postal-code");

// Error elements
const nameError = document.getElementById("name-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const emailError = document.getElementById("email-error");
const postalCodeError = document.getElementById("postal-code-error");

// Success elements
const successMessage = document.querySelector(".success-message");
const userName = document.querySelector(".user-name");
const backToFormButton = document.querySelector(".back-to-form");

// Postal-code rules
const postalConstraints = {
  ch: {
    pattern: /^(CH-)?\d{4}$/,
    message:
      "Swiss postal codes must have exactly 4 digits. Example: CH-1950 or 1950.",
  },

  fr: {
    pattern: /^(F-)?\d{5}$/,
    message:
      "French postal codes must have exactly 5 digits. Example: F-75012 or 75012.",
  },

  de: {
    pattern: /^(D-)?\d{5}$/,
    message:
      "German postal codes must have exactly 5 digits. Example: D-12345 or 12345.",
  },

  nl: {
    pattern: /^(NL-)?\d{4}\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$/,
    message:
      "Dutch postal codes must contain 4 digits followed by 2 letters except SA, SD and SS. Example: 1234VF",
  },

  bd: {
    pattern: /^\d{4}$/,
    message:
      "Bangladesh postal codes must have exactly 4 digits. Example: 1213.",
  },
};

// Helper functions
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("active");
}

function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("active");
  errorElement.classList.remove("success");
}

function showSuccess(errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.remove("active");
  errorElement.classList.add("success");
}

// Name validation
function validateName() {
  if (nameInput.validity.valueMissing) {
    showError(nameError, "Please enter your name.");

    return false; //Stop! It can't pass
  }
  clearError(nameError);

  return true; // Go. It passes
}

// Email validation
function validateEmail() {
  if (emailInput.validity.valueMissing) {
    showError(emailError, "Please enter an email address.");

    return false;
  } else if (emailInput.validity.typeMismatch) {
    showError(emailError, "Please enter a valid email address.");

    return false;
  } else if (emailInput.validity.tooShort) {
    showError(
      emailError,
      `Email must contain at least ${emailInput.minLength} characters. You entered ${emailInput.value.length}.`
    );

    return false;
  }

  clearError(emailError);

  return true;
}

// Password validation
function validatePassword() {
  if (passwordInput.validity.valueMissing) {
    showError(passwordError, "Please enter a password.");

    return false;
  } else if (passwordInput.validity.tooShort) {
    showError(
      passwordError,
      `Password must contain at least ${passwordInput.minLength} characters. You entered ${passwordInput.value.length}.`
    );

    return false;
  }

  clearError(passwordError);

  return true;
}

// Password confirmation validation
function validateConfirmPassword() {
  if (confirmPasswordInput.value === "") {
    confirmPasswordInput.setCustomValidity("");
    showError(confirmPasswordError, "Please confirm your password.");

    return false;
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords do not match.");
    showError(confirmPasswordError, "Passwords do not match.");

    return false;
  }

  confirmPasswordInput.setCustomValidity("");
  showSuccess(confirmPasswordError, "✓ Passwords match.");

  return true;
}

// Postal-code validation
function validatePostalCode() {
  const country = countrySelect.value;
  const rule = postalConstraints[country];

  if (postalCodeInput.value === "") {
    postalCodeInput.setCustomValidity("");
    showError(postalCodeError, "Please enter a postal code.");

    return false;
  } else if (!rule.pattern.test(postalCodeInput.value)) {
    postalCodeInput.setCustomValidity(rule.message);
    showError(postalCodeError, rule.message);

    return false;
  }

  postalCodeInput.setCustomValidity("");
  clearError(postalCodeError);

  return true;
}

// Validate while typing
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", () => {
  validatePassword();

  if (confirmPasswordInput.value !== "") {
    validateConfirmPassword();
  }
});

confirmPasswordInput.addEventListener("input", validateConfirmPassword);
postalCodeInput.addEventListener("input", validatePostalCode);
countrySelect.addEventListener("change", validatePostalCode);

// Submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isPostalCodeValid = validatePostalCode();

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPostalCodeValid;

  if (!isFormValid) {
    return;
  }

  // Show success message
  userName.textContent = nameInput.value;
  form.classList.add("blur");
  successMessage.hidden = false;
});

// Back to Form
backToFormButton.addEventListener("click", () => {
  // Reset input values
  form.reset();

  // Clear custom validation
  postalCodeInput.setCustomValidity("");
  confirmPasswordInput.setCustomValidity("");

  // Clear error messages
  clearError(nameError);
  clearError(emailError);
  clearError(passwordError);
  clearError(confirmPasswordError);
  clearError(postalCodeError);

  // Remove blur
  form.classList.remove("blur");

  // Hide success message
  successMessage.hidden = true;

  // Clear displayed name
  userName.textContent = "";

  // Put cursor in name field
  nameInput.focus();
});
