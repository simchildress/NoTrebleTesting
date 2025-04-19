import "../cs/Quiz.css"

function QuizCard({quiz}) {
    
    function onCardClick(e) {
        e.preventDefault()
        alert("clicked")
    }

    return <div className="quiz-card">
        <div className="quiz-poster">
            <div className="quiz-info">
                <h3>{quiz.title}</h3>
                <p>{quiz.question}</p>
                <p>{quiz.answer}</p>
            </div>
            <button className="quiz-btn btn-primary " onClick={onCardClick}>
                    Show Answer
            </button>
        </div>
    </div>
}

export default QuizCard