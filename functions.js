function getRandomNum(num) {
  return Math.floor(Math.random() * Number(num));
}

function getWordPair(lang) {
  const randomIndex = getRandomNum(lang.length);

  return lang[randomIndex];
}

function displayWord(word) {
  displayEnglish.textContent = word.english;
  displayOther.textContent = word.hasOwnProperty("spanish")
    ? word.spanish
    : word.russian;
}

function toggleDisplay(element, isHidden, input) {
  if (!isCorrect) {
    element.style.opacity = isHidden ? 1 : 0;
  }
  input.style.display = isHidden ? "none" : "flex";

  return !isHidden;
}

function getRandomWord(vocabulary) {
  defaultSettings();
  return getWordPair(vocabulary);
}

function checkAnswer(word, input) {
  const userInput = input.value.trim().toLowerCase();

  if (
    (hideEnglish && checkInput(word.english, userInput)) ||
    (hideOther &&
      (checkInput(word.spanish, userInput) ||
        checkInput(word.russian, userInput)))
  ) {
    correctEffect();
  } else {
    wrongEffect(word, userInput);
  }
}

function checkInput(word, input) {
  if (containsSlash(word)) {
    const parts = splitSlash(word);
    return checkMultipleWords(parts, input);
  } else {
    return input === word;
  }
}

function containsSlash(str) {
  return str && str.includes("/");
}

function splitSlash(str) {
  return str.toLowerCase().split(" / ");
}

function checkMultipleWords(parts, input) {
  return parts.some((part) => input.includes(part));
}

function correctEffect() {
  if (hideEnglish) {
    englishWrap.style.backgroundColor = "var(--correct-color)";
    displayEnglish.style.opacity = 1;
    wrongEnglish.style.display = "none";
  } else if (hideOther) {
    otherWrap.style.backgroundColor = "var(--correct-color)";
    displayOther.style.opacity = 1;
    wrongOther.style.display = "none";
  }

  clearInputField();
  isCorrect = true;
}

function wrongEffect(word, input) {
  if (hideEnglish) {
    englishWrap.style.backgroundColor = "var(--wrong-color)";
    wrongEnglish.style.display = "block";
  } else if (hideOther) {
    otherWrap.style.backgroundColor = "var(--wrong-color)";
    wrongOther.style.display = "block";
  }
  failedInput(word, input);
  clearInputField();
}

function failedInput(word, input) {
  let guessHelp = [];
  const currentWord = hideEnglish
    ? word.english
    : word.hasOwnProperty("spanish")
    ? word.spanish
    : word.russian;

  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i + 1] === "/") {
      break;
    }
    if (currentWord[i] === input[i]) {
      guessHelp.push(input[i]);
    } else {
      guessHelp.push("_");
    }
  }

  if (hideEnglish) {
    revealEnglishVerb(currentWord, guessHelp);
    wrongEnglish.textContent = guessHelp.join("");
  } else if (hideOther) {
    wrongOther.textContent = guessHelp.join("");
  }
}

function revealEnglishVerb(word, guessHelp) {
  const verbStr = "to ";
  if (word.startsWith(verbStr)) {
    guessHelp.splice(0, verbStr.length, ...verbStr);
  }
}

function clearInputField() {
  inputEnglish.value = "";
  inputOther.value = "";
}

function hideWord() {
  if (hideEnglish) {
    displayEnglish.style.opacity = 0;
  } else if (hideOther) {
    displayOther.style.opacity = 0;
  }
}

function defaultSettings() {
  englishWrap.style.backgroundColor = "var(--word-field-color)";
  otherWrap.style.backgroundColor = "var(--word-field-color)";
  wrongEnglish.style.display = "none";
  wrongOther.style.display = "none";
  isCorrect = false;
  clearInputField();
  hideWord();
}
