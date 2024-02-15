const btnGenerateSpanish = document.getElementById("spanish");
const btnGenerateRussian = document.getElementById("russian");
const btnSubmitEnglish = document.getElementById("btn_submit_english");
const btnSubmitOther = document.getElementById("btn_submit_other");
const displayEnglish = document.getElementById("english");
const displayOther = document.getElementById("other_lang");
const inputEnglishWrapper = document.getElementById("input_english_wrapper");
const inputOtherWrapper = document.getElementById("input_other_wrapper");
const inputEnglish = document.getElementById("input_english");
const inputOther = document.getElementById("input_other");
const englishWrap = document.getElementById("english_wrap");
const otherWrap = document.getElementById("other_wrap");
const wrongEnglish = document.getElementById("wrong_english");
const wrongOther = document.getElementById("wrong_other");

let currentWord;
let hideEnglish = false;
let hideOther = false;
let isCorrect = false;

// GENERATE WORD
btnGenerateSpanish.addEventListener("click", () => {
  defaultSettings();
  currentWord = getRandomWord(spanishVocabulary);
  displayWord(currentWord);
});

btnGenerateRussian.addEventListener("click", () => {
  defaultSettings();
  currentWord = getRandomWord(russianVocabulary);
  displayWord(currentWord);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    defaultSettings();
    currentWord = getRandomWord(spanishVocabulary);
    displayWord(currentWord);
  } else if (e.key === "ArrowRight") {
    defaultSettings();
    currentWord = getRandomWord(russianVocabulary);
    displayWord(currentWord);
  }
});

// TOGGLE WORD DISPLAY
displayEnglish.addEventListener("click", () => {
  hideEnglish = toggleDisplay(displayEnglish, hideEnglish, inputEnglishWrapper);
});

displayOther.addEventListener("click", () => {
  hideOther = toggleDisplay(displayOther, hideOther, inputOtherWrapper);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    hideEnglish = toggleDisplay(
      displayEnglish,
      hideEnglish,
      inputEnglishWrapper
    );
  } else if (e.key === "ArrowDown") {
    hideOther = toggleDisplay(displayOther, hideOther, inputOtherWrapper);
  }
});

// USER INPUT
inputEnglish.addEventListener("keydown", (e) => {
  if (!isCorrect && e.key === "Enter") {
    checkAnswer(currentWord, inputEnglish);
  } else if (isCorrect) {
    e.preventDefault();
  }
});

inputOther.addEventListener("keydown", (e) => {
  if (!isCorrect && e.key === "Enter") {
    checkAnswer(currentWord, inputOther);
  } else if (isCorrect) {
    e.preventDefault();
  }
});

// SUBMIT INPUT
btnSubmitEnglish.addEventListener("click", () => {
  if (!isCorrect) {
    checkAnswer(currentWord, inputEnglish);
  }
});

btnSubmitOther.addEventListener("click", () => {
  if (!isCorrect) {
    checkAnswer(currentWord, inputOther);
  }
});
