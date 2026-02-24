/* SCRIPTS FOR [QUIZ GAME] */

// ===== DOM elements =====

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionElem = document.getElementById("current-question");
const totalQuestionElem = document.getElementById("total-questions");
const scoreElem = document.getElementById("score");
const finalScoreElem = document.getElementById("final-score");
const maxScoreElem = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");


// ===== Initialization =====

// Quiz questions
const quizQuestions = [
  {
    question: "Which country has the largest population in the world?",
    answers: [
      { text: "India", correct: false },
      { text: "United States", correct: false },
      { text: "China", correct: true },
      { text: "Indonesia", correct: false },
    ],
  },
  {
    question: "Which planet is the largest in solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the deepest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Which country invented paper?",
    answers: [
      { text: "China", correct: true },
      { text: "Egypt", correct: false },
      { text: "Italy", correct: false },
      { text: "Greece", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Quartz", correct: false },
      { text: "Diamond", correct: true },
    ],
  },
];

// State vars
let currentQuestionIndex = 0;
let answersDisabled =false;
let score = 0;

totalQuestionElem.textContent = quizQuestions.length;
maxScoreElem.textContent = quizQuestions.length;


// ===== Functions =====

function startQuiz() {
  // reset state
  currentQuestionIndex = 0;
  score = 0;
  scoreElem.textContent = 0;

  // change screen
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  // show question
  showQuestion();
}


function restartQuiz() {
  // show start screen
  resultScreen.classList.remove("active");

  startQuiz();
}


function showQuestion() {
  // reset state
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressLevel = (currentQuestionIndex / quizQuestions.length) * 100;

  // set question
  currentQuestionElem.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;

  // update progress bar
  progressBar.style.width = progressLevel + "%";

  // empty answers
  answersContainer.innerHTML = "";

  // show answers list
  currentQuestion.answers.forEach((answer) => {

    // button
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.className = "answer-btn";

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    // make list of answers
    answersContainer.appendChild(button);
  });
}


function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  // check answer -> visually display to user
  // whether answer correct or not
  const selectedAnswer = event.target;
  const isCorrect = selectedAnswer.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedAnswer) {
      button.classList.add("incorrect");
    }
  });

  // update score
  if (isCorrect) {
    score++;
    scoreElem.textContent = score;
  }

  // visualization
  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}


function showResults() {
  // change screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // display final score
  finalScoreElem.textContent = score;

  // display the results
  const total = (score / quizQuestions.length) * 100;
  let message = "";

  if (total === 100) {
    message = "Awesome! You crushed this quiz!"
  } else if (total >= 80) {
    message = "Perfect! You're genius!";
  } else if (total >= 60) {
    message = "Nice job! A little more practice and you'll shine!";
  } else if (total >= 40) {
    message = "Good effort! Keep learning!";
  } else {
    message = "Don’t worry! Every mistake is a step forward!";
  }

  resultMessage.textContent = message;
}


// ===== Event listeners =====
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
