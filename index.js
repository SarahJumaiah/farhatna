function submitQuiz() {
    
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const feedbackElement = document.getElementById('quizFeedback');
 
    
    if (selectedAnswer) {
        if (selectedAnswer.value === '2') {
            
            window.location.href = 'sign.html';
        } else {
            
            feedbackElement.textContent = 'إجابة خاطئة! حاول مرة أخرى.';
            feedbackElement.style.color = 'red'; 
        }
    } else {
        
        feedbackElement.textContent = 'من فضلك اختر إجابة.';
        feedbackElement.style.color = 'red';
    }
}
