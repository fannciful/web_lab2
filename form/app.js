const surveys1 = JSON.parse(localStorage.getItem('surveys1')) || [];

// Отримання посилань на кнопку "Показати результати" і контейнер для результатів
const showResultsButton = document.getElementById('showResults');
const surveyResults = document.getElementById('surveyResults');

// Додавання обробника подій для кнопки "Показати результати"
showResultsButton.addEventListener('click', () => {
    displayResults();
});

// Функція для відображення результатів опитування
function displayResults() {
    surveyResults.innerHTML = '';//очищення контейнера результатів

    // Об'єкт для зберігання кількості відповідей за кожним критерієм
    const criteria = {
    yogaTraining: 0,
    cardyoType: 0,
    mediumPhysical: 0,
    averageAmount: 0,
    femaleHuman: 0,
    agePeople: 0
    };

    surveys1.forEach(survey => {
        const {question2, question3, question4, question6, question7, question8} = survey;
        if (question2 === 'Yoga'){
            criteria.yogaTraining++;
        }
        if (question3 === 'Cardio Zone'){
            criteria.cardyoType++;
        }
        if (question4 === 'medium'){
            criteria.mediumPhysical++;
        }
        if (question6 >= '3' && question6 <= '4') {
            criteria.averageAmount++;
        }
        if (question7 === 'female'){
            criteria.femaleHuman++;
        }
        if (question8 >= '18' && question8 <= '20'){
            criteria.agePeople++;
        }
    });

    for (const criterion in criteria){
        const listItem = document.createElement('li');
        listItem.textContent = `${criterion}: ${criteria[criterion]}`;
        surveyResults.appendChild(listItem);
    }

    const satisfiedCleanlinessListItem = document.createElement('li');
    satisfiedCleanlinessListItem.textContent = `Задоволені чистотою залу: ${criteria.satisfiedCleanliness} людей`;
    surveyResults.appendChild(satisfiedCleanlinessListItem);

    const notSatisfiedCleanlinessListItem = document.createElement('li');
    notSatisfiedCleanlinessListItem.textContent = `Не задоволені чистотою залу: ${criteria.notSatisfiedCleanliness} людей`;
    surveyResults.appendChild(notSatisfiedCleanlinessListItem);
}

const form = document.getElementById('surveyForm1');
form.addEventListener('submit', function(event){
    event.preventDefault();
    const formData = new FormData(form);
    const survey = {};
    for (let [key, value] of formData.entries()) {
        survey[key] = value;
    }
    surveys1.push(survey);
    localStorage.setItem('surveys1', JSON.stringify(surveys1));
    form.reset();
});
