const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [{
        question: " What does HTML stand for?",
        choices: ["Hyper Type Multi Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: " Which HTML element is used to define a section that is self-contained and reusable?",
        choices: ["<div>", "<section>", "<article>", "<span>"],
        answer: "<article>"
    },
    {
        question: " Which attribute is used to provide alternative text for an image?",
        choices: ["alt", "title", "src", "href"],
        answer: "alt"
    },
    {
        question: " Which CSS property is used to change the text color of an element?",
        choices: ["text-color", "fgcolor", "color", "font-color"],
        answer: "color"
    },
    {
        question: " What does the z-index property in CSS control?",
        choices: ["Text shadow", "Element rotation", "Vertical alignment", "Stacking order of elements"],
        answer: "Stacking order of elements"
    },
    {
        question: " Which unit is relative in CSS?",
        choices: ["px", "em ", "cm", "mm"],
        answer: "em"
    },
    {
        question: " What is the output of typeof null in JavaScript?",
        choices: ["null", "object", "undefined", "boolean"],
        answer: "object"
    },
    {
        question: " Which method converts a JSON string into a JavaScript object?",
        choices: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
        answer: "JSON.parse()"
    },
    {
        question: " Which of the following is not a JavaScript data type?",
        choices: ["String", "Number", "Float", "Boolean"],
        answer: "Float"
    },
    {
        question: " Which symbol is used for single-line comments in JavaScript?",
        choices: ["<!-- -->", "//", "/* */", "#"],
        answer: "//"
    },
    {
        question: " What is the correct syntax to create a React component using a function?",
        choices: ["React.createComponent()", "function MyComponent() { return <div></div>; } ", "new React.Component()", "React.useComponent()"],
        answer: "function MyComponent() { return <div></div>; }"
    },
    {
        question: " Which hook is used to handle side effects in functional components?",
        choices: ["useContext", "useState", "useEffect", "useReducer"],
        answer: "useEffect"
    },
    {
        question: "What does JSX stand for?",
        choices: ["JavaScript XML", "Java Syntax Extension ", "Java Server Extension", "JSON Syntax Extension"],
        answer: "JavaScript XML"
    },
    {
        question: " What is the purpose of the key prop in React?",
        choices: ["To encrypt components", "To uniquely identify elements in a list", "To handle routing", "To store state"],
        answer: "To uniquely identify elements in a list"
    },
    {
        question: " What is the default behavior of React's useState hook?",
        choices: ["Performs side effects", "Creates a global state", "Returns a variable and a function to update it", "Renders HTML elements"],
        answer: "Returns a variable and a function to update it"
    },
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 30;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    } else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 30;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if (confirmUser) {
                timeLeft = 30;
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () => {
    timeLeft = 30;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    } else {
        checkAnswer();
    }
});