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

  // Iterate over the answers
  for (let i = 1; i <= totalQuestions; i++) {
      const userAnswer = document.querySelector(`input[name="q${i}"]:checked`);
      
      if (userAnswer && userAnswer.value === correctAnswers[`q${i}`]) {
          score++;
      }
  }

  // Display the result
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `You got ${score} out of ${totalQuestions} correct!`;
}