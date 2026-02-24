/* SCRIPTS FOR [MY PORTFOLIO] */


// ===== DARK MODE TOGGLE =====

// Button
const btnDarkMode = document.querySelector('.dark-mode-btn');

// Check is dark mode currently active in OS
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  btnDarkMode.classList.add('dark-mode-btn--active');
  document.body.classList.add('dark');
}

// Check is dark mode saved to local storage
if (localStorage.getItem('darkMode') === 'dark') {
  btnDarkMode.classList.add('dark-mode-btn--active');
  document.body.classList.add('dark');
} else if (localStorage.getItem('darkMode') === 'light') {
  btnDarkMode.classList.remove('dark-mode-btn--active');
  document.body.classList.remove('dark');
}

// Activate/deactivate dark mode by OS system settings
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  const colorScheme = event.matches ? "dark" : "light";

  if (colorScheme === "dark") {
    btnDarkMode.classList.add('dark-mode-btn--active');
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'dark');
  } else {
    btnDarkMode.classList.remove('dark-mode-btn--active');
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'light');
  }
});

// Toggle dark mode by button click
btnDarkMode.addEventListener("click", () => {
  btnDarkMode.classList.toggle('dark-mode-btn--active');
  const isDArk = document.body.classList.toggle('dark');

  // Save dark mode state
  if (isDArk) {
    localStorage.setItem('darkMode', 'dark');
  } else {
    localStorage.setItem('darkMode', 'light');
  }
});


// ===== ACTIVE LINK HANDLER =====

const currentURL = window.location.pathname;
const menuLinks = document.querySelectorAll(".nav-list__link");

menuLinks.forEach(link => {

  // Change path for using GitHub Pages
  const REPO_NAME = "/portfolio/";
  const linkURL = link.getAttribute("href").replace("./", REPO_NAME);

  if (linkURL === currentURL) {
    link.classList.add("nav-list__link--active");
  } else {
    link.classList.remove("nav-list__link--active");
  }
});