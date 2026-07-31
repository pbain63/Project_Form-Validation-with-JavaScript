const form = document.querySelector("form");
const yourName = document.getElementById("name");
const yourNameError = document.querySelector(".error");

const email = document.getElementById("mail");
const emailError = document.querySelector(".email-error");

const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
// look at the below class and compare others
const postalCodeError = document.querySelector(".postal-code-error");

const password = document.getElementById("password");
const passwordError = document.querySelector(".password-error");

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password-error");

// Name
yourName.addEventListener("input", (event) => {
  if (yourName.validity.valid) {
    yourNameError.textContent = "";
    yourNameError.className = "error";
  } else {
    showError();
  }
});

form.addEventListener("submit", (event) => {
  if (!yourName.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if (yourName.validity.valueMissing) {
    yourNameError.textContent = "Please enter your name.";
  }
  yourNameError.className = "error active";
}

// Email

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "email-error";
  } else {
    emailShowError();
  }
});

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    emailShowError();
    event.preventDefault();
  }
});

function emailShowError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  emailError.className = "email-error active";
}

// Country & Postal Code

const constraints = {
  ch: [
    "^(CH-)?\\d{4}$",
    "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
  ],
  fr: [
    "^(F-)?\\d{5}$",
    "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
  ],
  de: [
    "^(D-)?\\d{5}$",
    "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
  ],
  nl: [
    "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
    "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
  ],
  bd: [
    "^\\d{4}$",
    "Bangladesh postal codes must have exactly 4 digits: e.g. 1213",
  ],
};

function checkPostalCode() {
  const countrySelectValue = countrySelect.value;

  const constraint = new RegExp(constraints[countrySelectValue][0]);

  if (postalCodeField.value === "") {
    postalCodeField.setCustomValidity("");
    postalCodeError.textContent = "";

    return;
  }

  if (constraint.test(postalCodeField.value)) {
    postalCodeField.setCustomValidity("");
    postalCodeError.textContent = "";
    postalCodeError.className = "postal-code-error";
  } else {
    const errorMessage = constraints[countrySelectValue][1];

    postalCodeField.setCustomValidity(errorMessage);
    postalCodeError.textContent = errorMessage;
    postalCodeError.className = "postal-code-error active";
  }
}

countrySelect.addEventListener("change", checkPostalCode);
postalCodeField.addEventListener("input", checkPostalCode);

form.addEventListener("submit", (event) => {
  checkPostalCode();

  if (!postalCodeField.validity.valid) {
    event.preventDefault();

    postalCodeError.textContent = postalCodeField.validationMessage;
    postalCodeError.className = "postal-code-error active";
  }
});

// Password

password.addEventListener("input", () => {
  if (password.validity.valid) {
    passwordError.textContent = "";
    passwordError.className = "password-error";
  } else {
    passwordShowError();
  }

  if (confirmPassword.value !== "") {
    checkPasswordsMatch();
  }
});

function passwordShowError() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "Please enter your password.";
  } else if (password.validity.tooShort) {
    passwordError.textContent =
      `Password should be at least ${password.minLength} characters;` +
      `you entered ${password.value.length}.`;
  }

  passwordError.className = "password-error active";
}

// Confirm Password

confirmPassword.addEventListener("input", () => {
  checkPasswordsMatch();
});

function checkPasswordsMatch() {
  if (confirmPassword.value === "") {
    confirmPassword.setCustomValidity("");

    confirmPasswordError.textContent = "";
    confirmPasswordError.className = "confirm-password-error";
  } else if (password.value === confirmPassword.value) {
    confirmPassword.setCustomValidity("");
    confirmPasswordError.textContent = "✓ Passwords match.";

    confirmPasswordError.className = "confirm-password-error match";
  } else {
    confirmPassword.setCustomValidity("Passwords do not match.");
    confirmPasswordError.textContent = "☒ Passwords do not match.";

    confirmPasswordError.className = "confirm-password-error active";
  }
}

// Form submission

form.addEventListener("submit", (event) => {
  if (!password.validity.valid) {
    passwordShowError();
    event.preventDefault();
  }

  checkPasswordsMatch();

  if (!confirmPassword.validity.valid) {
    event.preventDefault();

    if (confirmPassword.value === "") {
      confirmPasswordError.textContent = "Please confirm your password.";
      confirmPasswordError.className = "confirm-password-error active";
    }
  }
});
