const lengthSlider = document.querySelector(".pass-length input");
const generateBtn = document.querySelector(".generate-btn");
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const span = document.querySelector(".pass-length span");
const copyIcon = document.querySelector(".input-box span");
const charaters = {
  lowercase: "abcdifghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: '`~!@#$%^&*()_+{}[]:;""<,>.?/',
};

function updatePassIndicator() {
  if (lengthSlider.value >= 16) {
    passIndicator.id = "strong";
  } else if (lengthSlider.value >= 7) {
    passIndicator.id = "medium";
  } else {
    passIndicator.id = "weak";
  }
}
function updateSlider() {
  span.innerHTML = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}
function generatePassword() {
  let staticPassword = "";
  let passLength = lengthSlider.value;
  let excludeDuplicate = false;
  let randomPassword = "";
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += charaters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {
    // randomPassword +=
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
}
updateSlider();
function copyPassword() {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
  }, 1500);
}
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
