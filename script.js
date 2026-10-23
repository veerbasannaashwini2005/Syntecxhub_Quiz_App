
const questions = [
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "Python", "CSS", "Java"],
    correct: 2
  },
  {
    question: "Which language adds interactivity to websites?",
    answers: ["JavaScript", "SQL", "C", "HTML"],
    correct: 0
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Machine Language",
      "Hyper Transfer Main Link",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which company developed Java?",
    answers: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
    correct: 1
  },
  {
    question: "Which symbol is used for a single-line comment in JavaScript?",
    answers: ["<!-- -->", "**", "//", "##"],
    correct: 2
  },
  {
    question: "Which data structure follows FIFO?",
    answers: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    answers: ["var", "let", "const", "static"],
    correct: 2
  },
  {
    question: "Which language is commonly used for database queries?",
    answers: ["CSS", "SQL", "XML", "Dart"],
    correct: 1
  },
  {
    question: "What does CPU stand for?",
    answers: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Control Processing User"
    ],
    correct: 0
  },
  {
    question: "Which method adds an element to the end of a JavaScript array?",
    answers: ["pop()", "shift()", "push()", "slice()"],
    correct: 2
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Submit Quiz ✓"
      : "Next Question →";

  const q = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  scoreElement.textContent = `Score: ${score}`;
  questionElement.textContent = q.question;

  progress.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  answerButtons.replaceChildren();

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const correctIndex = questions[currentQuestion].correct;
  const buttons = answerButtons.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === correctIndex) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== correctIndex) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    feedback.textContent = "Correct! Well done.";
    feedback.style.color = "#21864b";
  } else {
    feedback.textContent =
      `Incorrect. Correct answer: ${
        questions[currentQuestion].answers[correctIndex]
      }`;
    feedback.style.color = "#c0392b";
  }

  scoreElement.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  progress.style.width = "100%";

  document.getElementById("final-score").textContent =
    `Your score: ${score} / ${questions.length}`;

  const percentage = (score / questions.length) * 100;

  document.getElementById("result-message").textContent =
    percentage >= 80
      ? "Excellent! You know your stuff!"
      : percentage >= 50
      ? "Good effort! Keep practicing."
      : "Keep learning. You can do better next time!";
}

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  answered = false;

  resultScreen.hidden = true;
  quizScreen.hidden = false;

  showQuestion();
});

showQuestion();
