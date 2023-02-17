// initialize the global variables
var quizQuestions = [],
    timeRemaining = 100,
    totalPoints = 0,
    qId = -1,
    lastQuestionFlag = false,
    selectedQuiz = "";
/**
 * @handleForm
 * prevents form refresh on submit
 * calls @checkAnswer function
 */
function handleForm(event) { 
  // prevent default behavior
  event.preventDefault();
  // call function
  checkAnswer();
};
/**
 * @timesUp
 * handles page redirect
 */
function timesUp() {
  // redirect to times up page
  window.location.href = "./times-up.html";
}
/**
 * @fetchQuizData
 * async function returns a promise and
 * callback executes another function once
 * data is available and this function
 * has completed
 */
async function fetchQuizData(callback) {
  // initialize variables
  var selectionRadio = document.getElementsByName("quizSelection");
  // loop through the available radio buttons
  for (i = 0; i < selectionRadio.length; i++) {
    // check if radio button is selected
    if (selectionRadio[i].checked) {
      // assign value to global variable
      selectedQuiz = selectionRadio[i].value;
      // break out of the loop, we have what we need
      break;
    }
  }
  // if/else statement dependent on quiz selection type
  if (selectedQuiz === "HTML") {
    // fetch the html questions
    await fetch("./assets/data/html-questions.json").then(response => response.json()).then(json => quizQuestions = json);
  } else if (selectedQuiz === "CSS") {
    // fetch the css questions
    await fetch("./assets/data/css-questions.json").then(response => response.json()).then(json => quizQuestions = json);
  } else if (selectedQuiz === "JavaScript") {
    // fetch the js questions
    await fetch("./assets/data/js-questions.json").then(response => response.json()).then(json => quizQuestions = json);
  }
  // end - execute the next function
  callback();
}
/**
 * @startQuiz
 * function starts a timer, displays the question
 * wrapper and calls the function to render 
 * a question
 */
function startQuiz(e) {
  // initialize variables
  var parent = document.getElementById("time-wrapper"),
      para = document.createElement("p"),
      span = document.createElement("span");
  // set a class on the paragraph element
  para.setAttribute("class","time-remaining");
  // prevent default behavior
  e.preventDefault();
  // run set interval to reduce the time remaining by 1 each second
  var quizTimer = setInterval(function () {
    // initialize variables
    var node = document.createTextNode(timeRemaining);
    // empty elements before appending
    span.innerHTML = "";
    para.innerHTML = "";
    // append the time remaining to the span and then the para
    span.appendChild(node);
    para.appendChild(span);
    // reduce by 1
    timeRemaining--;
    // if time is less than or equal to 0
    if (timeRemaining <= 0) {
      // time is up and set the timer to 0
      node = document.createTextNode("0");
      span.appendChild(node);
      para.appendChild(span);
      span.innerHTML = "";
      para.innerHTML = "";
      // call the @timesUp function
      timesUp();
      // stop the interval function
      clearInterval(quizTimer);
    }
  }, 1000); // 1000 milliseconds = 1 second
  // append para to parent element to display on screen
  parent.appendChild(para);
  // hide start wrapper, fade in question wrapper
  document.getElementsByClassName("start-wrapper")[0].style.display = "none";
  // display questions
  document.getElementsByClassName("question-wrapper")[0].style.opacity = 1;
  // callback function will execute renderQuestion() once fetchQuizData has completed
  fetchQuizData(function() {
    // call @renderQuestion function
    renderQuestion();
  });
};
/**
 * @renderQuestion
 * function renders the current question
 */
function renderQuestion() {  
  // increment question ID
  qId++;
  // initialize variables
  var currentProgress = quizQuestions[qId].progress,
      question = document.getElementById("question"),
      choicesForm = document.getElementById("choices-form"),
      btnContainer = document.getElementById("btn-container"),
      progressBar = document.getElementById("progress-bar"),
      radioBtnForm = document.createElement('form'),
      msgWrapper = document.getElementById("message-wrapper"),
      currentQuestion = document.createTextNode(quizQuestions[qId].question);
  // empty the msgWrapper element
  msgWrapper.innerHTML = "";
  // set last question to true when on the last question
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
  // create check answer button and append to the form
  var checkAnswerBtn = document.createElement("input");
  checkAnswerBtn.type = "submit";
  checkAnswerBtn.value = "Check Answer";
  checkAnswerBtn.className = "btn btn-primary quiz-submit"
  radioBtnForm.appendChild(checkAnswerBtn);
};
/**
 * @checkAnswer
 * checks the users answer and display
 * a success or an error message depending
 * on whether or not the choice was correct
 */
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
        localStorage.setItem("currentQuizScore", totalPoints);
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
/**
 * @submitQuiz
 * submits the quiz and displays the
 * add a high score div container
 */
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
/**
 * @getExistingScores
 * function returns existing local storage
 */
function getExistingScores() {
  // initialize variables
  var existingScores = [];
  // check if the user selected a quiz
  if (selectedQuiz) {
    // if/else checks for selected quiz type (html/css/js) to save the data correctly
    if (selectedQuiz === "HTML") {
      // add to HtmlQuizHighScores local storage
      existingScores = JSON.parse(localStorage.getItem("HtmlQuizHighScores"));
    } else if (selectedQuiz === "CSS") {
      // add to CssQuizHighScores local storage
      existingScores = JSON.parse(localStorage.getItem("CssQuizHighScores"));
    } else if (selectedQuiz === "JavaScript") {
      // add to JsQuizHighScores local storage
      existingScores = JSON.parse(localStorage.getItem("JsQuizHighScores"));
    }
  }
  // return the data
  return existingScores;
}
/**
 * @saveToLocalStorage
 * saves the initials and high score in local
 * storage then redirects the user to the
 * high scores page
 */
function saveToLocalStorage(arr) {
    // if/else checks for selected quiz type (html/css/js) to save the data correctly
    if (selectedQuiz === "HTML") {
      // add to HtmlQuizHighScores local storage
      localStorage.setItem("HtmlQuizHighScores", JSON.stringify(arr));
    } else if (selectedQuiz === "CSS") {
      // add to CssQuizHighScores local storage
      localStorage.setItem("CssQuizHighScores", JSON.stringify(arr));
    } else if (selectedQuiz === "JavaScript") {
      // add to JsQuizHighScores local storage
      localStorage.setItem("JsQuizHighScores", JSON.stringify(arr));
    }
    // remove the current score, we no longer need it
    localStorage.removeItem("currentQuizScore");
}
/**
 * @saveHighscore
 * saves the initials and high score in local
 * storage then redirects the user to the
 * high scores page
 */
function saveHighscore(e) {
  // initialize variables
  var currentQuizScore = localStorage.getItem("currentQuizScore"),
      userInitials = document.getElementById('initials-input').value,
      existingScores = null,
      highscoreObj = { name: userInitials, score: currentQuizScore }
      newArr = [],
      existingScores = getExistingScores(),
      timesupGroup = document.getElementById("error-msg");
  // prevents default behavior
  e.preventDefault();
  if (currentQuizScore != null) {
    // check if local storage exists for the high scores
    if (existingScores) {
      // if exists, concatenate the old list with the new one and save to local storage
      newArr.push(highscoreObj);
      existingScores = existingScores.concat(newArr);
      saveToLocalStorage(existingScores);
    } else {
      // save the new data to local storage
      newArr.push(highscoreObj);
      saveToLocalStorage(newArr);
    }
    // redirect to highscores page
    window.location.href = "./high-scores.html";
  } else {
    timesupGroup.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">No quiz data found.<br />Return to the home page and take the quiz.</div>"
    console.log("Quiz data not found");
  }
};