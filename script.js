function submitQuiz() {
    // Define the correct answers
    const correctAnswers = {
        q1: 'ai',
        q2: 'ai',
        q3: 'ai',
        q4: 'ai',
        q5: 'ai'
    };

    let score = 0;
    const totalQuestions = 5;
    const incorrectQuestions = [];

    // Iterate over the answers
    for (let i = 1; i <= totalQuestions; i++) {
        const userAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        
        if (userAnswer && userAnswer.value === correctAnswers[`q${i}`]) {
            score++;
        } else {
            // Store the question number if the answer is incorrect
            incorrectQuestions.push(i);
        }
    }

    // Redirect to the results page with query parameters
    const queryParams = `?score=${score}&incorrectQuestions=${incorrectQuestions.join(',')}`;
    window.location.href = `result.html${queryParams}`;
}