const form = document.querySelector("form");
const yourName = document.getElementById("name");
const yourNameError = document.querySelector("#name + span.error");

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.email-error");

// Name
yourName.addEventListener("input", (event) => {
  if (yourName.validity.valid) {
    yourNameError.textContent = "";
    // yourNameError.textContent = "error";
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
  //   yourNameError.className = "error active";
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
