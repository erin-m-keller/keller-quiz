var quizQuestions = [
  {
      question: "Javascript is an _______ language?",
      choices: ["Object-Oriented","Object-Based","Procedural","None of the above"],
      answer: "Object-Oriented",
      progress: 10
  },
  {
      question: "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["var","let","Both A and B", "None of the above"],
      answer: "Both A and B",
      progress: 20
  },
  {
      question: "Which of the following methods is used to access HTML elements using Javascript?",
      choices: ["getElementById()","getElementsByClassName()","Both A and B","None of the above"],
      answer: "Both A and B",
      progress: 30
  },
  {
      question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
      choices: ["Throws an error","Ignores the statements","Gives a warning","None of the above"],
      answer: "Ignores the statements",
      progress: 40
  },
  {
      question: "Which of the following methods can be used to display data in some form using Javascript?",
      choices: ["document.write()","console.log()","window.alert()","All of the above"],
      answer: "All of the above",
      progress: 50
  },
  {
      question: "How can a datatype be declared to be a constant type?",
      choices: ["const","var","let","constant"],
      answer: "const",
      progress: 60
  },
  {
      question: "What keyword is used to check whether a given property is valid or not?",
      choices: ["in","is in","exists","lies"],
      answer: "in",
      progress: 70
  },
  {
      question: "What is the use of the <noscript> tag in Javascript?",
      choices: ["The contents are displayed by non-JS-based browsers","Clears all the cookies and cache","Both A and B","None of the above"],
      answer: "The contents are displayed by non-JS-based browsers",
      progress: 80
  },
  {
      question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
      choices: ["Boolean","Undefined","Object","Integer"],
      answer: "Object",
      progress: 90
  },
  {
      question: "What does the Javascript “debugger” statement do?",
      choices: ["It will debug all the errors in the program at runtime","It acts as a breakpoint in the program","It will debug the error in the current statement if any","All of the above"],
      answer: "It acts as a breakpoint in the program",
      progress: 95
  }
];

var timeRemaining = 100,
    totalPoints = 0,
    qId = -1,
    lastQuestionFlag = false;

function handleForm(event) { 
  event.preventDefault();
  checkAnswer();
};

function timesUp() {
  // redirect to times up page
  window.location.href = "./times-up.html";
}

function startQuiz() {
  var parent = document.getElementById("time-wrapper"),
      para = document.createElement("p"),
      span = document.createElement("span");
  para.setAttribute("class","time-remaining");
  // run set interval to reduce the time remaining by 1 each second
  var quizTimer = setInterval(function () {
    var node = document.createTextNode(timeRemaining);
    // empty elements before appending
    span.innerHTML = "";
    para.innerHTML = "";
    // append the time remaining to the span and then the para
    span.appendChild(node);
    para.appendChild(span);
    // reduce by 1
    timeRemaining--;
    if (timeRemaining <= 0) {
      // time is up
      node = document.createTextNode("0");
      span.appendChild(node);
      para.appendChild(span);
      span.innerHTML = "";
      para.innerHTML = "";
      timesUp();
      clearInterval(quizTimer);
    }
  }, 1000); // 1000 milliseconds = 1 second
  // append para to parent element to display on screen
  parent.appendChild(para);
  // hide start wrapper, fade in question wrapper
  document.getElementsByClassName("start-wrapper")[0].style.display = "none";
  // display questions
  document.getElementsByClassName("question-wrapper")[0].style.opacity = 1;
  renderQuestion();
};

function renderQuestion() {
  // initialize variables
  qId++;
  var currentProgress = quizQuestions[qId].progress,
      question = document.getElementById("question"),
      choicesForm = document.getElementById("choices-form"),
      btnContainer = document.getElementById("btn-container"),
      progressBar = document.getElementById("progress-bar"),
      currentQuestion = document.createTextNode(quizQuestions[qId].question),
      radioBtnForm = document.createElement('form'),
      msgWrapper = document.getElementById("message-wrapper");
  // set last question to true when on the last question
  msgWrapper.innerHTML = "";
  if (qId === (quizQuestions.length - 1)) {
    lastQuestionFlag = true;
  } 
  // clear success/error message
  msgWrapper.innerHTML = "";
  // prevent page refresh on form submit
  radioBtnForm.addEventListener('submit', handleForm);
  // add id to form
  radioBtnForm.setAttribute("id","quiz-form")
  // empty the content before adding new content
  question.innerHTML = "";
  choicesForm.innerHTML = "";
  btnContainer.innerHTML = "";
  // increment bootstrap progress bar
  progressBar.ariaValueNow = currentProgress;
  progressBar.style.width = currentProgress + "%";
  // append the question to the top of the card
  question.appendChild(currentQuestion);
  // loop through the choices and create a radio button/label for each
  for (var i = 0; i < quizQuestions[qId].choices.length; i++) {
    // initialize elements
    var currentChoice = quizQuestions[qId].choices[i],
        radio = document.createElement("input"),
        label = document.createElement("label"),
        lineBreak = document.createElement("br");
    // create radio button and append to the form
    radio.className = "form-check-input"
    radio.setAttribute("type","radio");
    radio.setAttribute("name","choice-" + qId);
    radio.setAttribute("required",true);
    radio.setAttribute("id","q-" + qId + "-radio-" + i);
    radio.value = currentChoice;
    radioBtnForm.appendChild(radio);
    // create radio button label and append to the form
    label.setAttribute("for", "q-" + qId + "-radio-" + i);
    label.className = "form-check-label";
    label.textContent = currentChoice;
    radioBtnForm.appendChild(label);
    // add line break to push radio buttons to a new line
    radioBtnForm.appendChild(lineBreak);
  }
  // append the new form to the form wrapper
  choicesForm.appendChild(radioBtnForm);
  // create check answer button
  var checkAnswerBtn = document.createElement("input");
  checkAnswerBtn.type = "submit";
  checkAnswerBtn.value = "Check Answer";
  checkAnswerBtn.className = "btn btn-primary quiz-submit"
  radioBtnForm.appendChild(checkAnswerBtn);
};

function checkAnswer() {
  // initialize variables
  var radioInput = document.getElementsByName("choice-" + qId),
      quizSubmit = document.getElementsByClassName("quiz-submit"),
      quizForm = document.getElementById("quiz-form"),
      msgWrapper = document.getElementById("message-wrapper"),
      nextBtn = document.createElement("input");
  
  // creates next button when user is not on the last question
  if (!lastQuestionFlag) {
    // create next button and append to the form
    nextBtn.type = "button";
    nextBtn.value = "Next";
    nextBtn.className = "btn btn-primary quiz-next";
    nextBtn.setAttribute("onclick","renderQuestion()");
    quizForm.appendChild(nextBtn);
  } else {
    // create submit button for last page
    var submitQuizBtn = document.createElement("input");
    submitQuizBtn.type = "button";
    submitQuizBtn.value = "Submit Quiz";
    submitQuizBtn.setAttribute("onclick","submitQuiz()");
    submitQuizBtn.className = "btn btn-primary quiz-submit";
    quizForm.appendChild(submitQuizBtn);
  }
  // hide the check answer button
  quizSubmit[0].style.display = "none";
  // loop through the possible answers for the question
  for (var i = 0; i < radioInput.length; i++) {
    // initialize variables
    var selectedAnswer = radioInput[i].value,
        checkedRadio = radioInput[i].checked;
    // verify radio button is selected
    if (checkedRadio) {
      // check if user response equals the correct answer
      if (selectedAnswer === quizQuestions[qId].answer) {
        // increment the score by 10
        totalPoints += 10;
        localStorage.setItem("currentQuizScore", totalPoints)
        // display success message to the user
        msgWrapper.innerHTML = "<div class='alert alert-success' role='alert'>Correct! " + selectedAnswer + " is the correct response. Great job!</div>";
      } else {
        // deduct time from the timer
        timeRemaining -= 10;
        // display error message to the user
        msgWrapper.innerHTML = "<div class='alert alert-danger' role='alert'>Incorrect. " + selectedAnswer + " is not the correct response. The correct choice was " + quizQuestions[qId].answer + ". Time has been deducted from the timer.</div>";
      }
      // end once checked radio is available
      break;
    }
  }
  // disable all radio buttons to prevent selection change after clicking check answer
  for (var j = 0; j < 4; j++) {
    var radioId = document.getElementById("q-" + qId + "-radio-" + j);
    radioId.classList.add("disabled");
    radioId.disabled = true;
  }
};

function submitQuiz() {
  // initialize variables
  var progressBar = document.getElementById("progress-bar"),
      submissionWrapper = document.getElementById("submission-wrapper"),
      heading = document.createElement("h2"),
      para = document.createElement("p"),
      initialsForm = document.createElement('form'),
      formGroup = document.createElement('div'),
      label = document.createElement("label"),
      txtInput = document.createElement("input"),
      saveBtn = document.createElement("button");
  
  // hide question wrapper, fade in submission wrapper
  document.getElementsByClassName("question-wrapper")[0].style.opacity = 0;
  document.getElementsByClassName("question-wrapper")[0].innerHTML = "";
  document.getElementById("submission-wrapper").style.opacity = 1;
  // increment bootstrap progress bar
  progressBar.ariaValueNow = 100;
  progressBar.style.width = "100%";
  // set title and paragraph, then append to wrapper
  heading.innerHTML = "You reached the end!";
  para.innerHTML = "Keep a record of your high scores.";
  submissionWrapper.appendChild(heading)
  submissionWrapper.appendChild(para);
  // set class on div
  formGroup.className = "form-group"; 
  // create radio button label and append to the form
  label.setAttribute("for","initials-input");
  label.textContent = "Enter your initials:";
  formGroup.appendChild(label);
  // create text input and append to the form
  txtInput.setAttribute("id","initials-input");
  txtInput.className = "form-control";
  txtInput.placeholder = "Enter your initials";
  txtInput.type = "text";
  txtInput.setAttribute("required",true);
  formGroup.appendChild(txtInput);
  // append submit button to the form
  saveBtn.type = "submit";
  saveBtn.textContent = "Save Highscore";
  saveBtn.className = "btn btn-primary quiz-submit m-4"
  formGroup.appendChild(saveBtn);
  // append form to div
  initialsForm.appendChild(formGroup);
  initialsForm.addEventListener("submit", saveHighscore);
  // add div wrapper
  submissionWrapper.appendChild(initialsForm);
};

function saveHighscore(e) {
  // initialize variables
  var userInitials = document.getElementById('initials-input').value,
      existingScores = JSON.parse(localStorage.getItem("quizHighScores")),
      highscoreObj = { name: userInitials, score: localStorage.getItem("currentQuizScore") }
      newArr = [];

  // prevent form reloading the page
  e.preventDefault();
  // check if local storage exists for the high scores
  if (existingScores) {
    // if exists, concatenate the old list with the new one
    newArr.push(highscoreObj);
    existingScores = existingScores.concat(newArr);
    localStorage.setItem("quizHighScores", JSON.stringify(existingScores));
    localStorage.removeItem("currentQuizScore");
  } else {
    // save to local storage
    newArr.push(highscoreObj);
    localStorage.setItem("quizHighScores", JSON.stringify(newArr));
    localStorage.removeItem("currentQuizScore");
  }
  // redirect to highscores page
  window.location.href = "./high-scores.html";
};