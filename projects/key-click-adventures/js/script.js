 /* --------------------------------------
 Scripts for [] 
 ---------------------------------------*/


/* SUPPORTING FUNCTIONS
-----------------------*/

function checkUserAnswer(cellEvent, userAnswer) {

  // Correct answers
  const correctAnswers = {  
    click: ["i did", "yes i did", "noticed", "i noticed", "ok", "yes"],
    keydown: ["typing machine"],
    mousedown: ["treasure box", "treasure chest"],
    contextmenu: ["notes", "list", "menu"],
    dblclick: ["gold", "chest", "gold chest", "trunk"]
  };
  
  // Additional text content into specific blocks
  const additionalContent = {
    keydown: `…and look — <span class="game-block__hightlight_orange">keydown</span> is back in action!`,
    mousedown: `Oh, so that’s how <span class="game-block__hightlight_orange">mousedown</span> works.`,
    contextmenu: `You just explored the <span class="game-block__hightlight_orange">contextmenu</span> event!`,
    dblclick: `<span class="game-block__hightlight_orange">double click</span> is quite useful thing :-)`,
  }

  // Getting points counter wich is on the bottom of the page
  const counterText = document.getElementById("game__stats-counter");
  let counter = Number(counterText.textContent); // Transform value to int number

  // Is there such type of event?
  if (correctAnswers[cellEvent]) {
    // Normalizing user answer
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    // Checking if user anwer is correct
    if (correctAnswers[cellEvent].includes(normalizedAnswer)) {
      // Updating counter
      counter += 1;
      counterText.textContent = counter.toString(); // Transform value back to string
      // Showing a notification, correct answer
      showNotification(true);
    } else {
      // Showing a notification, wrong answer
      showNotification(false);
    }
  }

  // Insert additional information inside specific boxes
  switch (cellEvent) {
    case "keydown": {
      // Creating new paragraph
      const newTextBlock = document.createElement("p");
      newTextBlock.className = "game-block__hightlight_white";
      newTextBlock.innerHTML = additionalContent.keydown; // Insert necessary content
      allGameBlocks[2].appendChild(newTextBlock); // Append to the box
      break;
    }
    case "mousedown": {
      // Creating new paragraph
      const newTextBlock = document.createElement("p");
      newTextBlock.className = "game-block__hightlight_white";
      newTextBlock.innerHTML = additionalContent.mousedown; // Insert necessary content
      allGameBlocks[3].appendChild(newTextBlock); // Append to the box
      break;
    }
    case "contextmenu": {
      // Creating new paragraph
      const newTextBlock = document.createElement("p");
      newTextBlock.className = "game-block__hightlight_white";
      newTextBlock.innerHTML = additionalContent.contextmenu; // Insert necessary content
      allGameBlocks[6].appendChild(newTextBlock); // Append to the box
      break;
    }
    case "dblclick": {
      // Creating new paragraph
      const newTextBlock = document.createElement("p");
      newTextBlock.className = "game-block__hightlight_white";
      newTextBlock.innerHTML = additionalContent.dblclick; // Insert necessary content
      allGameBlocks[7].appendChild(newTextBlock); // Append to the box
      break;
    }
  }

}


function getUserAnswer() {

  // Getting the interactive field, where user put its answer
  const userAnswer = document.getElementById("game__user-interact-input").value;

  return userAnswer;

}


function checkBtnCLick(cellEvent) {

  // Gathering elements we work with
  const interactiveBox = document.querySelector(".game__user-interact-box");
  const userInput = document.getElementById("game__user-interact-input");

  currentEvent = cellEvent; // Cathing current event's name
  
  // Prevent to user's re-answer to the same question 
  if (answeredBlocks[currentEvent]) {
    btnCheckAnswer.disabled = true; // Disable button
    interactiveBox.classList.remove("game__user-interact-box_highlight"); // Delete block highlightment
    return;
  }

  btnCheckAnswer.disabled = false; // Activating button

  // Highlighting the box
  interactiveBox.classList.add("game__user-interact-box_highlight");
  // Clear input field
  userInput.value = "";
  // Remove highlighment when user start typing it's answer
  userInput.addEventListener("input", function handler() {
    interactiveBox.classList.remove("game__user-interact-box_highlight");
    userInput.removeEventListener("input", handler);
  });

}


function showNotification(isCorrect) {

  // Message text inside the notification box
  const msgText = ["Right \u{1F609}", "Wrong \u{1F615}"]; // 😉 & 😕
  // Notification box style names
  const notifyBoxStyles = ["game__user-notify_correct", "game__user-notify_wrong"];
  // Message to user when question is answered
  const message = isCorrect ? msgText[0] : msgText[1]; 
  // Creating notification box
  const notifyBox = document.createElement("div");

  // Adding necessary attributes
  notifyBox.className = `game__user-notify ${isCorrect ? notifyBoxStyles[0] : notifyBoxStyles[1]}`;
  notifyBox.textContent = message;
  // Append box to the page
  document.body.appendChild(notifyBox);

  // Showing the box with applied transition effect
  setTimeout(() => notifyBox.classList.add("game__user-notify_show"), 10);
  // After a 2.5 sec hiding the box and smoothly deleting it
  setTimeout(() => {
    notifyBox.classList.remove("game__user-notify_show");
    setTimeout(() => notifyBox.remove(), 500);
  }, 2500);

}
    

/* GENERAL
----------*/

//  Current event
let currentEvent = null;
// Answered blocks
const answeredBlocks = {};
// Placeholder content showing on specific event
const blockContent = {
  mouseover: `<p>Let’s start exploring JavaScript events!”</p><p>In this level, you’ll discover how the <span class="game-block__hightlight_orange">mouseover</span> works.</p>`,
  click: `<p>Now we’re working with the <span class="game-block__hightlight_orange">click</span> event. Did you notice the background changed?</p>`,
  keydown: `<p>What is this?</p>`,
  mousedown: `<p>And the answer is…</p>`,
  keyup: `<p class="game-block__spec-char">&#128275;</p><p>Woooh! That was the <span class="game-block__hightlight_orange">keyup</span> event in action.</p>`,
  mouseup: `<p>No empty answers!</p><p>That’s how the <span class="game-block__hightlight_orange">mouseup</span> event works!</p>`,
  contextmenu: `<p>Hey! The right mouse button has powers too!</p>`,
  dblclick: `<p>Let’s give it a name…</p>`,
  mouseout: ` <p>Before you go, check out <span class="game-block__hightlight_orange">mouseout</span> magic.</p><p>Thanks for playing!</p>`
};

//  Gathering page elements we work with
const allGameBlocks = document.getElementsByClassName("game-block__cell");


/* BUTTON LISTENERS
------------------ */

// Check answer button click
// Gathering button into user ineractive box
const btnCheckAnswer = document.getElementById("game__user-interact-btn");
btnCheckAnswer.addEventListener("click", () => {
  if (!currentEvent) return; // If no one event --> nothing to do

  const userAnswer = getUserAnswer(); // Getting user answer
  checkUserAnswer(currentEvent, userAnswer); // Checking is user answer correct
  // Mark question as answered
  answeredBlocks[currentEvent] = true;

  // Clear input field
  document.getElementById("game__user-interact-input").value = "";
  // Disabling button actions
  btnCheckAnswer.disabled = true;
  // Remove highlightment when button clicked
  document.querySelector(".game__user-interact-box").classList.remove("game__user-interact-box_highlight");
});

// Start a game button click
// Gathering button we work with
const btnStartGame = document.getElementById("game__desc-btn");
btnStartGame.addEventListener("click", () => {
  // Replacemnt header text
  const headerContent = `
    <h2 class="game__name-head">&#127965;&#65039; Key & Click Adventures</h2> <!-- 🏝️ -->
    <h3 class="game__desc-head">The blocks below hide different kinds of events. <br> Jump in and start exploring — let the adventures begin! &#128540;</h3> <!-- 😜 -->
      <ul class="game__desc-list">
        <li>Earn points by answering the questions inside each block</li>
        <li>You can collect up to 5 points in total</li>
        <li>Score shown right under the blocks</li>
      </ul>`;

  // Deleting start button
  btnStartGame.remove();
  // Change header
  document.querySelector(".game__desc-container").innerHTML = headerContent;
  // Unhiding necessaries game blocks
  document.querySelector(".game__main-container").classList.remove("game__main-container_start");
  document.querySelector(".game-block__container_hidden").className = "game-block__container";
  document.querySelector(".game__stats-footer_hidden").className = "game__stats-footer";
  document.querySelector(".game__user-interact-box_hidden").className = "game__user-interact-box";
});


/* BLOCKS LISTENERS
------------------ */

// Starting block
allGameBlocks[0].addEventListener("mouseover", function handler() {
  // Hightlight first paragraph
  const welcomeText = allGameBlocks[0].querySelectorAll("p")[0];
  welcomeText.classList.add("game-block__cell-capital-highlight");
  // Placing additional content
  allGameBlocks[0].innerHTML += blockContent.mouseover;
  allGameBlocks[0].removeEventListener("mouseover", handler);
});

// click block
allGameBlocks[1].addEventListener("click", function handler() {
  // Stylization
  allGameBlocks[1].classList.add("game-block__cell_click");
  // Placing additional content
  allGameBlocks[1].innerHTML += blockContent.click;
  allGameBlocks[1].removeEventListener("click", handler);
  // Changing current event
  checkBtnCLick("click");
});

// keydown block
// Add keydown listener
allGameBlocks[2].addEventListener("mouseover", function focusHandler() {
  // Focus to the block
  allGameBlocks[2].setAttribute("tabindex", "0");
  allGameBlocks[2].focus();
  allGameBlocks[2].classList.add("game-block__cell-focused"); // Stylization
  
  // Catching keydown
  allGameBlocks[2].addEventListener("keydown", function handler() {
    // Add content only when block is empty
    allGameBlocks[2].innerHTML = blockContent.keydown;
    allGameBlocks[2].querySelector("p").classList.add("game-block__cell-highlight");
    allGameBlocks[2].removeEventListener("keydown", handler);
    // Changing current event
    checkBtnCLick("keydown");
  });
});

// Unfocus from the block
allGameBlocks[2].addEventListener("mouseout", () => {
  allGameBlocks[2].blur();
  allGameBlocks[2].removeAttribute("tabindex");
  if (allGameBlocks[2].querySelector("p")) {
    allGameBlocks[2].querySelector("p").classList.remove("game-block__cell-highlight");
  }
  allGameBlocks[2].classList.remove("game-block__cell-focused"); // Reset stylization
});

// mousedown block
allGameBlocks[3].addEventListener("mousedown", function handler() {
  // Placing additional content
  allGameBlocks[3].innerHTML = blockContent.mousedown;
  allGameBlocks[3].querySelector("p").classList.add("game-block__cell-highlight");
  allGameBlocks[3].removeEventListener("mousedown", handler);
  // Changing current event
  checkBtnCLick("mousedown");
});

// keyup block
// Add keyup listener
allGameBlocks[4].addEventListener("mouseover", function focusHandler() {
  // Focus to the block
  allGameBlocks[4].setAttribute("tabindex", "0");
  allGameBlocks[4].focus();
  allGameBlocks[4].classList.add("game-block__cell-focused"); // Stylization
  
  // Catching keyup
  allGameBlocks[4].addEventListener("keyup", function handler() {
    // Add content only when block is empty
    allGameBlocks[4].innerHTML = blockContent.keyup;
    allGameBlocks[4].removeEventListener("keyup", handler);
  });
});

// Unfocus from the block
allGameBlocks[4].addEventListener("mouseout", () => {
  allGameBlocks[4].blur();
  allGameBlocks[4].removeAttribute("tabindex");
  allGameBlocks[4].classList.remove("game-block__cell-focused"); // Reset stylization
});

// mouseup block
allGameBlocks[5].addEventListener("mouseup", function handler() {
  // Stylization
  allGameBlocks[5].classList.add("game-block__cell_mouseup");
  // Placing additional content
  allGameBlocks[5].innerHTML = blockContent.mouseup;
  allGameBlocks[5].removeEventListener("mouseup", handler);
});

// contextmenu block
allGameBlocks[6].addEventListener("contextmenu", function handler(event) {
  event.preventDefault(); // Prevent showing context menu
  // Stylization
  allGameBlocks[6].classList.add("game-block__cell_contextmenu");
  // Placing additional content
  allGameBlocks[6].innerHTML = blockContent.contextmenu;
  allGameBlocks[6].removeEventListener("contextmenu", handler);
  // Changing current event
  checkBtnCLick("contextmenu");
});

// dblclick block
allGameBlocks[7].addEventListener("dblclick", function handler() {
  allGameBlocks[7].style.userSelect = "none"; // Prevent text default selection
  // Placing additional content
  allGameBlocks[7].innerHTML = blockContent.dblclick;
  allGameBlocks[7].querySelector("p").classList.add("game-block__cell-highlight");
  allGameBlocks[7].removeEventListener("dblclick", handler);
  // Changing current event
  checkBtnCLick("dblclick");
});

// Ending block
allGameBlocks[8].addEventListener("mouseout", function handler() {
  // Hightlight first paragraph
  const welcomeText = allGameBlocks[8].querySelectorAll("p")[0];
  welcomeText.classList.add("game-block__cell-capital-highlight");
  // Placing additional content
  allGameBlocks[8].innerHTML += blockContent.mouseout;
  allGameBlocks[8].removeEventListener("mouseout", handler);
});