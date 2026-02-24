/* PROJECT PAGE ROUTING HANDLER */


/* Project descriptions */
const projects = {
  passgen: {
    title: "Password Generator",
    link: "./../../projects/password-generator",
    img: "./../../img/projects/passgen-big.jpg",
    content: [
      "A modern and user-friendly password generator focused on both usability and security.",
      "Allows users to customize password length, character sets and letter casing. Includes a visual strength indicator (weak to strong) to provide immediate feedback. Сopy to clipboard functionality is also implemented for user convenience.",
      "Designed with attention to clean UI and practical everyday use.",
    ],
    stack: ["HTML", "CSS", "JS"],
    git: "https://github.com/vitavlas/password-generator.git",
  },

  studygame: {
    title: "Study Adventure Game",
    link: "./../../projects/key-click-adventures",
    img: "./../../img/projects/studygame-big.jpg",
    content: [
      "An interactive mini-game designed to explore JavaScript event handling in a playful way.",
      "Users interact with blocks using mouse and keyboard actions (hover, click, key press). Some blocks contain short challenges — correct answers earn points.",
      "Built to reinforce understanding of core JavaScript events through hands-on interaction and immediate feedback.",
    ],
    stack: ["HTML", "CSS", "JS"],
    git: "https://github.com/vitavlas/key-click-adventures.git",
  },

  todo: {
    title: "Todo App",
    link: "./../../projects/todo",
    img: "./../../img/projects/todo-big.jpg",
    content: [
      "A classic Todo application that many developers build at the start of their journey — reimagined with a clean and modern user experience.",
      "Supports task organization by status (active, completed, all), includes a counter for remaining tasks, and allows users to clear completed items. Data is persisted using local storage for a seamless experience across sessions.",
      "Features a fresh UI along with a built-in date and time display to help users stay focused and organized.",
    ],
    stack: ["HTML", "CSS", "JS", "Local Storage"],
    git: "https://github.com/vitavlas/todo.git",
  },

  quiz: {
    title: "Funny Simple Quiz",
    link: "./../../projects/quiz-game",
    img: "./../../img/projects/quiz-big.jpg",
    content: [
    "A classic quiz application designed to test knowledge through short and engaging questions.",
    "Features five questions with four possible answers each. Provides clear visual feedback on correct and incorrect answers, tracks the score, and allows users to retake the quiz.",
    "Includes a smooth, user-friendly interface and a motivational message upon completion.",
    ],
    stack: ["HTML", "CSS", "JS"],
    git: "https://github.com/vitavlas/quiz-game.git",
  },

  quest: {
    title: "Mysterious Quest Game",
    link: "./../../projects/quest-game",
    img: "./../../img/projects/quest-big.jpg",
    content: [
      "An educational web-based quest game designed for high school students exploring programming and web development.",
      "The game guides players through ten progressively challenging levels, starting with HTML fundamentals and gradually introducing interactive JavaScript concepts. Each level presents tasks, hints, and mini-challenges. All wrapped in a fun and engaging story. Illustrations were generated using AI to enhance the visual experience.",
      "The current UI content is in Finnish, as the project was originally created for local users. English localization will be implemented soon.",
      "Goal: Inspire curiosity in web programming by showing, how with just a few lines of plain text code come alive as a working game or app.",
    ],
    stack: ["HTML", "CSS", "JS", "Session Storage"],
    git: "https://github.com/vitavlas/quest-game.git",
  },
  
  landing: {
    title: "Fitness Landing Page",
    link: "./../../projects/fitness-landing",
    img: "./../../img/projects/landing-big.jpg",
    content: [
      "Fitness Club Landing Page",
      "A clean and visually engaging landing page built from a Figma design and slightly enhanced.",
      "Implemented with a focus on responsive layout and smooth adaptation across different screen sizes, ensuring a consistent user experience on both desktop and mobile devices.",
    ],
    stack: ["HTML", "CSS", "JS"],
    git: "https://github.com/vitavlas/fitness-landing.git",
  },
};

// Getting requested project id
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

// Select project
const project = projects[projectId];

// Add content to page blocks
document.querySelectorAll("[data-project]").forEach(el => {
  const key = el.dataset.project;

  switch(key) {
    case "title":
      el.textContent = project.title;
      break;
    case "link":
      el.href = project.link;
      break;
    case "image":
      el.src = project.img;
      el.alt = project.title;
      break;
    case "content":
      el.innerHTML = "";
      project.content.forEach(text => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        el.appendChild(paragraph);
      });

      break;
    case "stack":
      el.innerHTML = "";
      const label = document.createElement("strong");
      const text = document.createTextNode(project.stack.join(", "));

      label.textContent = "Stack: ";
      el.appendChild(label);
      el.appendChild(text);

      break;
    case "git":
      el.href = project.git;
      break;
  }
});