const questions = [
  { question: "Capital of France?", answers: [{ text: "Paris", correct: true }, { text: "Berlin", correct: false }, { text: "Rome", correct: false }, { text: "Madrid", correct: false }] },
  { question: "Red Planet?", answers: [{ text: "Mars", correct: true }, { text: "Venus", correct: false }, { text: "Jupiter", correct: false }, { text: "Saturn", correct: false }] },
  { question: "2 + 2?", answers: [{ text: "4", correct: true }, { text: "3", correct: false }, { text: "5", correct: false }, { text: "6", correct: false }] },
  { question: "Largest ocean?", answers: [{ text: "Pacific", correct: true }, { text: "Atlantic", correct: false }, { text: "Indian", correct: false }, { text: "Arctic", correct: false }] },
  { question: "HTML stands for?", answers: [{ text: "Hyper Text Markup Language", correct: true }, { text: "Home Tool Markup Language", correct: false }, { text: "Hyperlinks Text Language", correct: false }, { text: "None", correct: false }] },
  { question: "Fastest land animal?", answers: [{ text: "Cheetah", correct: true }, { text: "Lion", correct: false }, { text: "Tiger", correct: false }, { text: "Leopard", correct: false }] },
  { question: "Water chemical formula?", answers: [{ text: "H2O", correct: true }, { text: "CO2", correct: false }, { text: "O2", correct: false }, { text: "NaCl", correct: false }] },
  { question: "How many continents?", answers: [{ text: "7", correct: true }, { text: "6", correct: false }, { text: "5", correct: false }, { text: "8", correct: false }] },
  { question: "Smallest prime number?", answers: [{ text: "2", correct: true }, { text: "1", correct: false }, { text: "3", correct: false }, { text: "5", correct: false }] },
  { question: "Python is a...?", answers: [{ text: "Programming language", correct: true }, { text: "Snake only", correct: false }, { text: "Text editor", correct: false }, { text: "Hardware", correct: false }] },
  { question: "Who wrote Hamlet?", answers: [{ text: "Shakespeare", correct: true }, { text: "Dickens", correct: false }, { text: "Austen", correct: false }, { text: "Twain", correct: false }] },
  { question: "Sun is a...?", answers: [{ text: "Star", correct: true }, { text: "Planet", correct: false }, { text: "Asteroid", correct: false }, { text: "Comet", correct: false }] },
  { question: "Which is not a JS data type?", answers: [{ text: "Float", correct: true }, { text: "String", correct: false }, { text: "Boolean", correct: false }, { text: "Number", correct: false }] },
  { question: "CSS is used for?", answers: [{ text: "Styling", correct: true }, { text: "Programming", correct: false }, { text: "Structure", correct: false }, { text: "Database", correct: false }] },
  { question: "What is 10 / 2?", answers: [{ text: "5", correct: true }, { text: "2", correct: false }, { text: "10", correct: false }, { text: "0", correct: false }] },
  { question: "Earth’s satellite?", answers: [{ text: "Moon", correct: true }, { text: "Mars", correct: false }, { text: "Sun", correct: false }, { text: "Venus", correct: false }] },
  { question: "Javascript can...", answers: [{ text: "Make webpages interactive", correct: true }, { text: "Boil water", correct: false }, { text: "Paint walls", correct: false }, { text: "Cook food", correct: false }] },
  { question: "Which is a loop?", answers: [{ text: "for", correct: true }, { text: "while", correct: true }, { text: "loop", correct: false }, { text: "if", correct: false }] },
  { question: "Math.pow(2,3) is?", answers: [{ text: "8", correct: true }, { text: "6", correct: false }, { text: "9", correct: false }, { text: "4", correct: false }] },
  { question: "Who developed JS?", answers: [{ text: "Brendan Eich", correct: true }, { text: "Bill Gates", correct: false }, { text: "Tim Berners-Lee", correct: false }, { text: "Elon Musk", correct: false }] },
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

nextButton.addEventListener("click", () => {
  if (!answered) return;
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    showFinalResult();
  }
});

function startQuiz() {
  shuffledQuestions = questions
    .sort(() => Math.random() - 0.5)
    .slice(0, 10); // Only take 10 random questions
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  nextButton.style.display = "none";
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  answered = false;
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  if (answered) return;
  answered = true;
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;
  Array.from(answerButtons.children).forEach((btn) => (btn.disabled = true));
  nextButton.style.display = "inline-block";
}

function showFinalResult() {
  resetState();
  questionElement.innerText = `✅ Quiz Completed!\n🎯 You scored ${score} out of ${shuffledQuestions.length}`;
  nextButton.innerText = "Restart Quiz";
  nextButton.onclick = startQuiz;
  nextButton.style.display = "inline-block";
}

startQuiz();
