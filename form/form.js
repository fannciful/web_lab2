document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm1');
    const surveys1 = JSON.parse(localStorage.getItem('surveys1')) || [];

    function saveSurveyResults() {
        const formData = new FormData(form);
        const survey = {};
        for (let [key, value] of formData.entries()) {
            survey[key] = value;
        }
        surveys1.push(survey);
        localStorage.setItem('surveys1', JSON.stringify(surveys1));
        form.reset();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        saveSurveyResults();
    });
});