 /* --------------------------------------
    JS SCRIPTS
    TARINAPELI - main game handler
 -------------------------------------- */

/* ------------
   INIT
------------ */

// Getting all necessary elements we work with
const descBlock = document.getElementById("descBlock");
const workBlock = document.getElementById("workBlock");
const nextBtn = document.getElementById("nextBtn");
const reloadBtn = document.getElementById("reloadBtn");

// Define current level variable
let currentLevel;
// Define maximum game levels
const maxLevel = 10;
// "Päivitä" button flag
let flagBtnPressed = false;

// Add event listeners to control buttons
// "Päivitä" button 
reloadBtn.addEventListener("click", reloadPage);
// "Seuraava" button 
nextBtn.addEventListener("click", changeLevel);


/* ------------
   FUNCTIONS
------------ */

function initLevel(lvl_id) {
   /* Initialize level
      with filling game blocks by appropriate content
      accordingly to current level */
      
   // Save current level number
   sessionStorage.setItem("level", lvl_id);
      
   // Checking current state of the "Päivitä" button flag
   if (sessionStorage.getItem("updBtnFlag") !== "true") {
      // Reset flag state / disable "Seuraava" button
      flagBtnPressed = false;
      nextBtn.disabled = true;
   } else {
      // Button pressed => YES
      flagBtnPressed = true;
      nextBtn.disabled = false;
   }
   
   // Save "Päivitä" button flag
   sessionStorage.setItem("updBtnFlag", flagBtnPressed);
   
   // Skip content loading if level = 0
   if (lvl_id === 0) { return; }
   
   // Hide "Seuraava" button at first level only
   if (lvl_id === 1) { 
      nextBtn.classList.add("invisible");
      // Make "Seurava" button visible permanently at first level
      if (flagBtnPressed === true) {
         nextBtn.classList.remove("invisible");
      }
   }

   // Finish the game when reached max level
   if (lvl_id === maxLevel) {
      flagBtnPressed = true;
      sessionStorage.setItem("updBtnFlag", flagBtnPressed);
      reloadBtn.style.display = "none";
      nextBtn.innerText = "Lopeta";
   }

   // Otherwise (if level > 0) loading current level content
   const levelContent = loadLevelData(lvl_id);
   descBlock.innerHTML = levelContent.description;
   workBlock.innerHTML = levelContent.story;
}


function loadLevelData(lvl_id) {
   /* Loads level data from current <template id="level_X"> */

   // Gathering correct template from game levels
   const level = document.getElementById(`level_${lvl_id}`);
   // Make level content copy
   const clonedLevel = document.importNode(level.content, true);
   // Select task description (ohjeet)
   const gameDesc = clonedLevel.querySelector("task").innerHTML;
   // Select game story (tarina)
   const gameStory = clonedLevel.querySelector("story").innerHTML;

   // Return level data
   return {
      "description": gameDesc,
      "story": gameStory
   };
}


function changeLevel() {
   /* Controls clicks on "Seuraava" button */
   
   // "Päivitä" button pressed => NO => show message
   if (flagBtnPressed === false) {
      showNotification("updateButton");
      return;
   }

   // Increase level by one
   ++currentLevel;
   
   // Does current level exeeds max level?
   // YES => show "game over" notification
   if (currentLevel > maxLevel) {
      nextBtn.disabled = true; // Lock "Seuraava" button
      reloadBtn.disabled = true; // Lock "Päivitä" button
      // Raise notification - game finished
      showNotification("maxLevel");
      return;
   }
   
   // "Päivitä" button pressed => YES => loading next level
   initLevel(currentLevel);

   // Max level reached? => finish game, button state => YES
   // Otherwise reset "Päivitä" button state => NO
   flagBtnPressed = currentLevel === maxLevel ? true : false;
   sessionStorage.setItem("updBtnFlag", flagBtnPressed);
   nextBtn.disabled = false; // Unlock "Seuraava" button
}


async function reloadPage() {
   /* Controls clicks on "Päivitä" button
      when user change and save source code file */

   // Button pressed => YES => save current state
   flagBtnPressed = true;
   sessionStorage.setItem("updBtnFlag", flagBtnPressed);
   // Save current progress (level)
   sessionStorage.setItem("level", currentLevel);
   // Make "Seurava" button visible. For 1st level only.
   aloitaPeli();

   // Set reload page flag to YES
   sessionStorage.setItem("reloadState", "true");

   // This flag set to be correctly working
   // of internal scripts and changes made by user
   sessionStorage.setItem("reinitScript", "true");

   location.reload();
}


async function handleLevelScript(lvl_id) {
   // Gathering correct template from game levels
   const level = document.getElementById(`level_${lvl_id}`);

   // Check existance of scripts
   const levelScript = level.content.querySelector("script");
   if (!levelScript) { return; } // Skip if no script content

   // Script exist? => YES
   // Creating new actual script-tag
   const newScriptTag = document.createElement("script");
   // Add content to the script
   newScriptTag.textContent = levelScript.textContent;
      
   // Place new script tag to the end of body
   document.body.appendChild(newScriptTag);

   // Ensuring that all elements loaded to DOM
   if (window.levelScriptPromise) {
      await window.levelScriptPromise;
   }
}


function showNotification(notifyId) {
   /* Shows appropriate notification to the user
      accordingly to the event */

   // List of notifications
   const notifications = {
      maxLevel: `<p>Kiitos kun osallistuit.</p><p>Toivottavasti innostuit koodaamisesta. &#128526;!</p>`,
      updateButton: `<p>Muistathan klikata "Päivitä" -painiketta</p>`,
      welcomeScreen: `<h2 class="game-workBlock__header">KodeBasics</h2>
                     <p>Tervetuloa kokeilemaan ohjelmointia käytännössä pelin muodossa.</p>
                     <button class="gameBtn_start" type="button" id="startBtn">Aloita</button>`
   }

   // Creating new notification window
   // Overlay (shadow) window
   const overlayWindow = document.createElement("div");
   overlayWindow.className = "game-notifyBox_overlay";
   // Content window
   const notifyWindow = document.createElement("div");
   notifyWindow.className = "game-notifyBox_window";
   // "Close (X)" button
   const closeBtn = document.createElement("button");
   closeBtn.className = "gameBtn_close";
   closeBtn.innerHTML = "&times;"; // X
   // Add functionality to "close" button
   closeBtn.addEventListener("click", () => { 
      if (notifyId === "maxLevel" || notifyId === "welcomeScreen") {
         // Reset level and flag value
         currentLevel = 0;
         flagBtnPressed = false;
         sessionStorage.setItem("level", currentLevel);
         sessionStorage.setItem("updBtnFlag", flagBtnPressed);
         // Reload page
         location.reload();
      }
      // Delete overlay window
      overlayWindow.remove();
   });
   
   // Put window content (inside of the block)
   notifyWindow.innerHTML = notifications[notifyId];

   // Display notification on the page
   notifyWindow.appendChild(closeBtn);
   overlayWindow.appendChild(notifyWindow);
   document.body.appendChild(overlayWindow);

   // Add button listener to "Aloita" button
   if (notifyId === "welcomeScreen") {
      // Activate button
      const startBtn = document.getElementById("startBtn");
      startBtn.addEventListener("click", () => {
         overlayWindow.remove();
         currentLevel++;
         sessionStorage.setItem("level", currentLevel);
         startGame();
      });
   }
}


function displayPopUpNotification () {
   /* Displays tiny notification pop-up windows
      at the right side of the screen when user click the "Päivitä" button */
   
   // Create new pop-up window
   const popUpWindow = document.createElement("div");
   popUpWindow.className = "game-popUp_window";
   // Pop-up content
   popUpWindow.textContent = "\u2714 päivitetty";

   // Display pop-up on the page
   document.body.appendChild(popUpWindow);

   // Delete pop-up window
   setTimeout(() => { popUpWindow.remove(); }, 3000);
}


function aloitaPeli() {
   /* Funktio toimii Tasolla 1.
   Sen tarkoitus palauttaa sivulle puuttuvan painikkeen "Seuraava" */

   nextBtn.classList.remove("invisible");
}


function startGame() {
   /* Main function which starts a game cycle */

   // Getting current flag states of the game
   const savedLevel = sessionStorage.getItem("level");
   const savedBtnFlag = sessionStorage.getItem("updBtnFlag");
   
   // Set correct current level
   currentLevel = savedLevel ? parseInt(savedLevel) : 0;
   
   // Show welcome window at game start (level = 0)
   if (currentLevel === 0) {
      showNotification("welcomeScreen");
   }

   // Otherwise (if level > 0) loading current game level
   initLevel(currentLevel);
   
   // "Päivitä" button flag => NO 
   flagBtnPressed = savedBtnFlag === "true"; // boolean => true
   nextBtn.disabled = false; // Unlock "Seuraava" button
}


/* ------------
   GAME CYCLE
------------ */

document.addEventListener("DOMContentLoaded", async function() {
   /* Starting game / loading next level
      only when all page content loaded. */

   // Start the game
   startGame();

   // Display pop-up notification window informing
   // that page has been updated when "Päivitä" button pressed by user.
   if (sessionStorage.getItem("reloadState") === "true") {
      sessionStorage.removeItem("reloadState");
      displayPopUpNotification();
   }

   // Reload user made changes into the source file "tarinapeli.html"
   if (sessionStorage.getItem("reinitScript") === "true") {
      sessionStorage.removeItem("reinitScript");
      initLevel(currentLevel);
      await handleLevelScript(currentLevel);
   }
});
