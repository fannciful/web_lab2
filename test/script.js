const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

let quizData = [];

// Завантажуємо дані тесту з JSON-файлу
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data.questions;
    buildQuiz();
  });

function buildQuiz() {
  quizData.forEach((questionData, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${index + 1}. ${questionData.question}</p>`;
    questionData.answers.forEach((answer, ansIndex) => {
      const answerElement = document.createElement('div');
      answerElement.classList.add('answer');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'question' + index;
      input.value = answer.answer;
      answerElement.appendChild(input);
      const label = document.createElement('label');
      label.innerHTML = answer.answer;
      answerElement.appendChild(label);
      questionElement.appendChild(answerElement);
    });
    quizContainer.appendChild(questionElement);
  });
}

function showResults() {
  const questionContainers = quizContainer.querySelectorAll('.question');
  let correctAnswers = 0;

  questionContainers.forEach((questionContainer, index) => {
    const selectedAnswer = questionContainer.querySelector('input[name=question' + index + ']:checked');
    if (selectedAnswer && selectedAnswer.value === quizData[index].answers.find(ans => ans.isCorrect).answer) {
      correctAnswers++;
      selectedAnswer.parentNode.style.color = 'green';
    } else if (selectedAnswer) {
      selectedAnswer.parentNode.style.color = 'red';
      const correctIndex = quizData[index].answers.findIndex(ans => ans.isCorrect);
      questionContainer.querySelectorAll('input')[correctIndex].nextSibling.style.color = 'green';
    }

    questionContainer.querySelectorAll('input').forEach(input => {
      input.disabled = true;
    });
  });

  resultContainer.innerHTML = `Ви дали ${correctAnswers} правильних відповідей з ${quizData.length}`;
}

submitButton.addEventListener('click', showResults);
