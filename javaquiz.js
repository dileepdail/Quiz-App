const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
//console.log(choices);

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which of the following option leads to the portability and security of Java?",
        choice1: "Bytecode is executed by JVM",
        choice2: "The applet makes the Java code secure and portable",
        choice3: "Use of exception handling",
        choice4: "Dynamic binding between objects",
        answer: 1

    },
    {
        question: "Which of the following is not a Java features?",
        choice1: "Dynamic",
        choice2: "Architecture Neutral",
        choice3: "Use of pointers",
        choice4: "Object-oriented",
        answer: 3

    },
    {
        question: "Which of the following creates a List of 3 visible items and multiple selections abled?",
        choice1: "new List(false, 3)",
        choice2: "new List(3, true)",
        choice3: "new List(true, 3)",
        choice4: "new List(3, false)",
        answer: 2

    },
    {
        question: "_____ is used to find and fix bugs in the Java programs.",
        choice1: "JVM",
        choice2: "JRE",
        choice3: "JDK",
        choice4: "JDB",
        answer: 4

    },
    {
        question: "What is the return type of the hashCode() method in the Object class?",
        choice1: "Object",
        choice2: "int",
        choice3: "long",
        choice4: "void",
        answer: 4

    }
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startQuiz = () => {
    questionCounter =0;
    score =0;
    availableQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        // goto the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const quesIndex =  Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[quesIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(quesIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        var classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer){
            classToApply = "correct";
            incrementScore(CORRECT_BONUS);
        }
        //console.log(classToApply);
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000)
        
    })
});

incrementScore = num => {
    score+= num;
    scoreText.innerText = score;
}

startQuiz();