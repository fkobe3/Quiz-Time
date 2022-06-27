/*alert('Hello! Good luck and enjoy!')
alert('200 seconds to answer 10 questions once you click start...How will you stack up?')
alert('Any questions not answered in time are lost points. Wrong answers will remove 30 seconds. Be quick, but be careful.')
*/

const Question_Set = [
    {question:"What does DOM stand for?", 
    answers: ["Dead on Movie", "Document Object Model","Document Over Matter", "Deers on the Move"],
    correctanswer: 1,
    },
    {question:"What is considered the most popular programming langauge in the world?", 
    answers: ["Java", "JavaScript","HTML", "CSS"],
    correctanswer: 1,
    },
    {question:"What is the application that allows you to edit and see code in-browser?", 
    answers: ["VS-Code", "Honey","Google Dev Tools", "Google Chrome"],
    correctanswer: 2,
    },
    {question:"Where is a local repository?", 
    answers: ["Your personal computer'", "Google","The Cloud", "Github"],
    correctanswer: 0,
    },
    {question:"What is the shortcut to creating the HTML 'skeleton' in VS-Code*?", 
    answers: ["html 3", "html please","skeleton", "html 5"],
    correctanswer: 3,
    },
    {question:"what is the command to move your work to a remote repository?", 
    answers: ["git push main origin", "git push origin main","git go over there", "git weee"],
    correctanswer: 1,
    },
    {question:"What does HTML stand for?", 
    answers: ["Harry Tom Mary Lou", "Hi text leo's mom","Hypertext Markup Language", "Hypotext Markup Language"],
    correctanswer: 2,
    },
    {question:"What is the CSS command that you can use as a 'base' to call back common items (colors, dimensions, etc.)?", 
    answers: [":root", "body","header", "footer"],
    correctanswer: 2,
    },
    {question:"What type of file is a README?", 
    answers: [".text", ".doc",".md", ".css"],
    correctanswer: 2,
    },
    {question:"What musical artist is known for ad libs such as 'Dale!' and 'MR WORLDWIDE!' ?", 
    answers: ["Ke$ha", "Tupac","Snoop Dogg", "Pitbull"],
    correctanswer: 3,
    },
];
const Timer = 20000;
const Penalty = 30;
const TickSpeed = 1000;
const Exam = Question_Set.length;
const Answers = 4;
const Button_ID = 4;
const correct_message = "Correct";
const incorrect_message = "Incorrect";
const key = "quiz-time";

var qcounter = 0;
var timecount = 0;
var control = 0
var currentscore = {initials: "", score: 0};
var highscores = [];
var hsindex = 0;

var startquizbutton = document.querySelector("#start-quiz");
var choicesbutton = document.querySelector ("#choices");
var initialsform = document.querySelector ("#high-score-submission");
var backbutton = document.querySelector ("#go-back");
var clearbutton = document.querySelector ("#clear-hs");
var olhslist = document.querySelector ("#high-score-list");
var seehsbutton = document.querySelector ("#view-high-scores");

var main = document.querySelector ("main");
var top = document.querySelector ("header");
var questions = main.removeChild(document.querySelector ("article"));
var done = main.removeChild(document.querySelector ("section"));
var hs = main.removeChild(document.querySelector ("#hs"));

var processhs = function () {
    clearInterval (control);
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    main.appendChild (seehsbutton);
    highscores = [];
    storedhs = localStorage.setItem(key);
    if (storedhs) {
        highscores =localStorage.getItem (key);
}
displayhighscores();
};

var processclear =function () {
    clearhs();
    localStorage.setItem(key, highscores);
};

var clearhs = function () {
    while (olhslist.firstChild) {
        olhslist.removeChild(olhslist.firstChild);
    }
    highscores.length = 0;
};

var goback =function () {
    main.removeChild(hs);
    main.appendChild(top);
    main.appendChild(questions);
    timecount = 0
    document.querySelector("#timer").innerHTML = "";
    clearhs();
};

var displayhs =function () {
    highscores.sort((a,b)=> (a.score > b.score ? -1: 1));
    var highscoreslength =highscores.length;
    for (var i = 0; i < highscoreslength; ++i) {
        var liElement = document.createElement("li");
        liElement.className = "hs-list";
        liElement.innerHTML = highscores[i].initials + " - " + highscores[i].score;
        olhslist.appendChild(liElement);
        
    }
};