alert('200 seconds to answer 10 questions once you click Start...How will you stack up?')
alert( 'Wrong answers will remove 30 seconds. Be quick, but be careful, as your final time is also your final score.' )

var qHeaderEl = document.querySelector(".qheader");
var qContentEl = document.querySelector(".qcontent");
var quizFooterEl = document.querySelector("footer");
var hsEl = document.querySelector(".highscore");
var timerEl = document.querySelector(".timer");
var headerEl = document.querySelector("header");

var timer = 200;
var currentQuestion = 0;
var timeout;
var QAList = [
    {  question:"What does DOM stand for?", 
answer: 1,
    options: ["Dead on Movie", "Document Object Model","Document Over Matter", "Deers on the Move"],
    },
    {question:"What is considered the most popular programming langauge in the world?", 
answer: 1,
    options: ["Java", "JavaScript","HTML", "CSS"],
    },
    {question:"What is the application that allows you to edit and see code in-browser?", 
answer: 2,
    options: ["VS-Code", "Honey","Google Dev Tools", "Google Chrome"],
    },
    {question:"Where is a local repository?", 
    answer: 0,
    options: ["Your personal computer", "Google","The Cloud", "Github"],
    },
    {question:"What is the shortcut to creating the HTML 'skeleton' in VS-Code*?", 
answer: 3,
    options: ["html 3", "html please","skeleton", "html 5"],
    },
    {question:"what is the command to move your work to a remote repository?", 
answer: 1,
    options: ["git push main origin", "git push origin main","git go over there", "git weee"],
    },
    {question:"What does HTML stand for?", 
answer: 2,
    options: ["Harry Tom Mary Lou", "Hi text leo's mom","Hypertext Markup Language", "Hypotext Markup Language"],
    },
    {question:"What is the CSS command that you can use as a 'base' to call back common items (colors, dimensions, etc.)?", 
answer: 0,
    options: [":root", "body","header", "footer"],
    },
    {question:"What type of file is a README?", 
answer: 2,
    options: [".text", ".doc",".md", ".css"],
    },
    {question:"What musical artist is known for ad libs such as 'Dale!' and 'MR WORLDWIDE!' ?", 
answer: 3,
    options: ["Ke$ha", "Tupac","Snoop Dogg", "Pitbull"],
    },
];
var countdown = function () {
    if (timer > 0) {
        timer--;
        timerEl.textContent = timer;
        timeout = setTimeout(countdown, 1000);
    }
    else {
        clearTimeout(timeout);
    }
};
var quizContentHandler = function (event) {
    if (event.target.getAttribute("id") === "start") {
        countdown();
        buildQuestion(QAList[currentQuestion]);
        return;
    }
    else if (event.target.getAttribute("id") === "submit") {
        var initialInput = document.querySelector("input[name='initials']").value;
        setHighScore(timer, initialInput);
        return;
    }
    else if (event.target.getAttribute("id") === "back") {
        resetGame();
        return;
    }
    else if (event.target.getAttribute("id") === "clear") {
        clearHighScores();
        resetGame();
        return;
    }
    else if (event.target.className === "highscore") {
        buildHighScores();
        return;
    }
    var correct = parseInt(event.target.getAttribute("data-answer-id")) === QAList[currentQuestion].answer
    if (correct) {
        setQuizFooter("Correct");
    }
    else {
        setQuizFooter("Incorrect");
        if (timer - 30 > 0) {
            timer -= 30;
        }
        else {
            timer = 0;
        }   
    }
    if (timer<=0){
        alert("Unfortunately, you have run out of time, try again next time!"); 
    }
    currentQuestion++;
    if (currentQuestion >= QAList.length) {
        clearTimeout(timeout);
        timerEl.textContent = timer;
        setTimeout(setQuizFooter, 1500,"clear");
        buildScoreSubmit();  
    }
    else {
        buildQuestion(QAList[currentQuestion]);
        return
    }
};
var setQuizHeader = function (content) {
    qHeaderEl.innerHTML = content;
};
var setQuizFooter = function (content) {
    if (content === "clear") {
        quizFooterEl.remove();
        return;
    }
    var footerContentEl = document.createElement("h2");
    footerContentEl.className = "quiz-footer"
    footerContentEl.textContent = content;
    quizFooterEl.replaceChildren(footerContentEl); 
};
var setQuizContent = function (element) {
    qContentEl.replaceChildren(element);
};
var buildHighScores = function (hsArray) {
    headerEl.setAttribute("style", "display:none");
    if (!hsArray) {
        var score = localStorage.getItem("highscores");
        hsArray = JSON.parse(score);
    }
    setQuizHeader("High Scores");
    var backButtonEl = document.createElement("button");
    backButtonEl.className = "button";
    backButtonEl.setAttribute("id", "back");
    backButtonEl.textContent = "Go back";
    if (hsArray) {
        var scoreOlEl = document.createElement("ol");
        scoreOlEl.className = "hs-table";
        for (var i = 0; i < hsArray.length; i++) {
            var scoreLiEl = document.createElement("li");
            scoreLiEl.className = "hs-entry";
            scoreLiEl.textContent = hsArray[i].initials + " - " + hsArray[i].score;
            scoreOlEl.appendChild(scoreLiEl);
        }
        qContentEl.replaceChildren(scoreOlEl);
        qContentEl.appendChild(backButtonEl);
    }
    else {
        qContentEl.replaceChildren(backButtonEl);
    }
    var clearButtonEl = document.createElement("button");
    clearButtonEl.className = "button";
    clearButtonEl.setAttribute("id", "clear");
    clearButtonEl.textContent = "Clear high scores";
    qContentEl.appendChild(clearButtonEl);
};
var buildScoreSubmit = function () {
    setQuizHeader("All Done!<p>Your final score is " + timer + ".");
    var formEl = document.createElement("form");
    var divEl = document.createElement("div");
    divEl.className = "score-form";
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "initials");
    inputEl.setAttribute("placeholder", "Enter Initials");
    inputEl.setAttribute("style", "margin-right:10px;font-size:24px;padding:10px");
    divEl.appendChild(inputEl);
    var buttonEl = document.createElement("button");
    buttonEl.className = "button";
    buttonEl.setAttribute("id", "submit");
    buttonEl.textContent = "Submit?";
    divEl.appendChild(buttonEl);
    setQuizContent(divEl);
};
var buildQuestion = function (questionObj) {
    setQuizHeader(questionObj.question);
    buildQuizoptionss(questionObj.options);
};
var buildQuizoptionss = function (optionsArray) {
    var listEL = document.createElement("ol");  
    for (var i = 0; i < optionsArray.length; i++){
        var listItemEl = document.createElement("li");
        listItemEl.className = "button";
        listItemEl.setAttribute("data-answer-id", i);
        listItemEl.textContent = optionsArray[i];
        listEL.appendChild(listItemEl);
    }
    setQuizContent(listEL);
};
var resetGame = function () {   
    headerEl.removeAttribute("style");
    currentQuestion = 0;
    timer = 200; 
    timerEl.textContent = timer;
    setQuizHeader("Time to take a quiz! <p style='font-size:20px'>Do your best to answer all the questions to the best of your ability. Keep in mind wrong answers will bring down your score by 30.");
    startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "sbutton";
    startButtonEl.setAttribute("id", "start");
    setQuizContent(startButtonEl);
};
var clearHighScores = function () {
    confirm = window.confirm("You sure you want to reset the leaderboard?")
    if (confirm) {
        localStorage.removeItem("high-scores");
        window.alert("Alright, the leaderboard has been cleared! Let's see what the next leaderboard will look like!")
    }
};
var setHighScore = function (highScore, initial) {
    var score = localStorage.getItem("high-scores");
    if (!score) {
        var scoreObj = [{score:highScore,initials:initial}]
        localStorage.setItem("high-scores", JSON.stringify(scoreObj));
        return buildHighScores(scoreObj);
    }
    var scoreObj = JSON.parse(score);
    for (var i = 0; i < scoreObj.length; i++){
        if (parseInt(highScore) >= parseInt(scoreObj[i].score)) {
            var Obj = [{ score: highScore, initials: initial }];
            scoreObj.splice(i, 0, Obj[0]);
            break;
        }
        if (i === scoreObj.length - 1) {
            var Obj = [{ score: highScore, initials: initial }];
            scoreObj.push(Obj[0]);
        }
    }
    if (scoreObj.length > 10) {
        scoreObj.pop();
    }
    localStorage.setItem("high-scores", JSON.stringify(scoreObj)); 
    buildHighScores(scoreObj);
};
resetGame();
hsEl.addEventListener("click", quizContentHandler);
qContentEl.addEventListener("click", quizContentHandler);