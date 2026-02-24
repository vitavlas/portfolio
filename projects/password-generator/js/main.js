/* SCRIPTS FOR [PASSWORD GENERATOR] */

// ===== DOM =====

// Password
const passwordInput = document.getElementById("password");
const lengthRange = document.getElementById("length");
const lengthLabel = document.getElementById("length-label");

// Options
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

// Buttons
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

// Password strength
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");


// ===== FUNCTIONS =====

function generatePassword() {
  // Length
  const length = Number(lengthRange.value);

  // Options
  const options = {
    includeUppercase: uppercaseCheckbox.checked,
    includeLowercase: lowercaseCheckbox.checked,
    includeNumbers: numbersCheckbox.checked,
    includeSymbols: symbolsCheckbox.checked,
  };

  // Check chartype selection
  if (!options.includeUppercase && !options.includeLowercase &&
      !options.includeNumbers && !options.includeSymbols
  ) {
    alert("Please select at least one char type!");
    return;
  }

  // Create new password
  const newPassword = createRandomPassword(length, options);

  // Display generated password
  passwordInput.value = newPassword;
  // Update password strength meter
  updateStrengthMeter(newPassword);
}


function updateStrengthMeter(password) {
  // Get password length
  const length = password.length;

  // Password options
  const patterns = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSymbols: /[!@#$%^&*()-_=+[\]{}|;:,.<>?/]/.test(password),
  };

  // Pool size based on selected character types
  let poolSize = 0;

  // Increase pool size depending on selected character types
  if (patterns.hasUppercase) poolSize += 25;
  if (patterns.hasLowercase) poolSize += 20;
  if (patterns.hasNumbers) poolSize += 10;
  if (patterns.hasSymbols) poolSize += 40;

  if (poolSize === 0) return;

  // Calculate password strength
  const strength = length * Math.log2(poolSize);
  console.log(strength);

  // Ensure the strength bar width is a valid value (%)
  const safeScore = Math.max(5, Math.min(100, strength));
  strengthBar.style.width = safeScore + "%";

  // Strength bar stylization
  let strengthLabelText = "";
  let barColor = "";

  if (strength < 50) {
    // Weak password
    barColor = "var(--weak-color)";
    strengthLabelText = "Weak";
  } else if (strength < 80) {
      // Medium password
    barColor = "var(--medium-color)";
    strengthLabelText = "Medium";
  } else {
    // Strong password
    barColor = "var(--strong-color)";
    strengthLabelText = "Strong";
  }

  // Update strength bar
  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;
}


function createRandomPassword(length, options) {
  // Make string with provided char options
  let allChars = "";

  if (options.includeUppercase) allChars += charSet.uppercaseChars;
  if (options.includeLowercase) allChars += charSet.lowercaseChars;
  if (options.includeNumbers) allChars += charSet.numberChars;
  if (options.includeSymbols) allChars += charSet.symbolChars;

  // Make password
  let password = "";

  for (let i = 0; i < length; i++) {
    const charIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[charIndex];
  }

  return password;
}


function indicateCopySuccess() {
  // Change icon
  copyBtn.classList.remove("far", "fa-copy");
  copyBtn.classList.add("fas", "fa-check");
  copyBtn.style.color = "var(--copy-success)";

  // Reset state to default
  setTimeout(() => {
    copyBtn.classList.remove("fas", "fa-check");
    copyBtn.classList.add("far", "fa-copy");
    copyBtn.style.color = "";
  }, 1500);
}


// ===== INITIALIZATION =====

// Character sets
const charSet = {
  uppercaseChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercaseChars: "abcdefghijklmnopqrstuvwxyz",
  numberChars: "0123456789",
  symbolChars: "!@#$%^&*()-_=+[]{}|;:,.<>?/",
};

// ===== EVENT LISTENERS =====

// Generate new password at loading
window.addEventListener("DOMContentLoaded", generatePassword);

// Range (password length)
lengthRange.addEventListener("input", () => {
  lengthLabel.textContent = lengthRange.value;
});

// Generate button
generateBtn.addEventListener("click", generatePassword);

// Copy button
copyBtn.addEventListener("click", async() => {
  if (!passwordInput.value) return;

  try {
    await navigator.clipboard.writeText(passwordInput.value);
    indicateCopySuccess();
  } catch (error) {
    // console.log("Could not copy: ", error);
    // Silently ignore
    return;
  }
});

