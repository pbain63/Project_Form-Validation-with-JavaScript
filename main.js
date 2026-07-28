const form = document.querySelector("form");
const yourName = document.getElementById("name");
const yourNameError = document.querySelector("#name + span.error");

yourName.addEventListener("input", (event) => {
  if (yourName.validity.valid) {
    yourNameError.textContent = "";
    yourNameError.textContent = "error";
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
