/*alert('Hello! Good luck and enjoy!')
alert('200 seconds to answer 10 questions once you click start...How will you stack up?')
alert('Any questions not answered in time are lost points. Wrong answers will remove 30 seconds. Be quick, but be careful.')
*/

const Question_Set = [
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
    },
    {question:"", 
    answers: [],
    correctanswer:,
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