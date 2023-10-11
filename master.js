/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Setting Levels
const lvls = {
  "Easy": { second: 5, words: ["hello", "code", "town", "scala", "github", "task", "runner", "roles", "test", "rust"]},
  "Normal": { second: 3, words: ["Twitter", "Leetcode", "Internet", "Styling", "Cascade", "Country", "Testing", "Linkedin", "Switch", "Language"]},
  "Hard": { second: 2, words: ["Programming", "Javascript", "Destructuring", "Paradigm", "Documentation", "Dependencies", "fearlessy", "Competition", "Tomorrow", "Disordered"]},
  };

let selectLvl = document.querySelector('.message select');
let optionSelect = document.querySelectorAll('.message select option');
let secondLvl = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word');
let comingWord = document.querySelector('.upcoming-words');
let start = document.querySelector(".start");
let input = document.querySelector('input');
let spanControlTime = document.querySelector('.control .time span');
let gotScore = document.querySelector('.score .got');
let totalScore = document.querySelector('.score .total');
let counterScore = document.querySelector('.counter-num .num');
let highScoreNum = document.querySelector('.high-score .high-num .num');
let instructions = document.querySelector('.instructions');
let spanInstructionLvl = document.querySelector('.instructions .level');
let spanInstructionSec = document.querySelector('.instructions .second');
let finish = document.querySelector('.finish');

let defaultLvl = "Normal";
let defaultLvlSecond = lvls[defaultLvl].second;
secondLvl.innerHTML = defaultLvlSecond;

spanControlTime.innerHTML = secondLvl.innerHTML;
totalScore.innerHTML = lvls[defaultLvl].words.length;

spanInstructionLvl.innerHTML = defaultLvl;
spanInstructionSec.innerHTML = secondLvl.innerHTML;

let subWord = "";
subWord = lvls[selectLvl.value].words;
console.log(subWord);

selectLvl.onchange = function () {
  subWord = lvls[selectLvl.value].words;
  secondLvl.innerHTML = lvls[selectLvl.value].second;
  spanControlTime.innerHTML = lvls[selectLvl.value].second;
  spanInstructionLvl.innerHTML = selectLvl.value;
  spanInstructionSec.innerHTML = lvls[selectLvl.value].second;
} 

if(localStorage.getItem('highScore')) {
  highScoreNum.innerHTML = localStorage.getItem('highScore');
}

start.onclick = () => {
  instructions.remove();
  start.remove();
  input.focus();
  generation();
  highScored();
}

input.onpaste = () => {
  return false;
}

function generation() {
  let randomWord = subWord[Math.floor(Math.random() * subWord.length)];
  let indexWord = subWord.indexOf(randomWord);
  subWord.splice(indexWord, 1);

  theWord.innerHTML = randomWord;

  comingWord.innerHTML = '';
  subWord.forEach((ele) => {
    createComingWords(ele);
  });
  startPlay();  
}

function startPlay () {
  if(subWord.length >= 9) {
    spanControlTime.innerHTML = lvls[selectLvl.value].second + 2;
  } else {
    spanControlTime.innerHTML = lvls[selectLvl.value].second;
  }
  let counter = setInterval(()=> {
  spanControlTime.innerHTML--;
  
  if(spanControlTime.innerHTML == '0' || input.value == theWord.innerHTML) {
      clearInterval(counter);

      if(input.value == theWord.innerHTML) {
        gotScore.innerHTML++;
        input.value = '';
        if(subWord.length > 0) {
          generation();
        } else {
          goodGame();
          savaInfoInLocalStorage();
          saveHigScoreInLocalStorage(); 
        }
      } else {
        gameOver();
        savaInfoInLocalStorage()
        clearInterval(counterSec);
        counterScore.innerHTML = "0";
      }
    }
    
  }, 1000);
}


function createComingWords(ele) {
  let div = document.createElement('div');
    let text = document.createTextNode(ele);
    div.appendChild(text);
    comingWord.appendChild(div);
}

function goodGame() {
  let span = document.createElement('span');
  span.classList.add('good');
  span.innerHTML = "Good Game";
  spanControlTime.innerHTML = "0";
  finish.append(span);
  input.remove();
  theWord.remove();
  comingWord.remove();
}

function gameOver() {
  let span = document.createElement('span');
  span.classList.add('bad');
  span.innerHTML = "Game Over";
  finish.append(span);
  input.remove();
  theWord.remove();
  comingWord.remove();
}

function savaInfoInLocalStorage() {
  localStorage.setItem('Score', gotScore.innerHTML);
  let today = new Date();
  let date = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  localStorage.setItem('Time', date);
}

let counterSec;
function highScored() {
  counterSec = setInterval(() => {
    counterScore.innerHTML++;
    if(subWord.length <= 0) {
      clearInterval(counterSec);
      
    }
  }, 1000);
}

function saveHigScoreInLocalStorage() {
  if(localStorage.getItem('highScore') > counterScore.innerHTML) {
    highScoreNum.innerHTML = counterScore.innerHTML;
    localStorage.setItem('highScore', highScoreNum.innerHTML);
  }
}

