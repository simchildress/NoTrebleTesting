import QuizCard from "../component/QuizCard"
import "../cs/Quiz.css"

function Quizviewer(){
const quizzes = [
    {
        id: 1,
        title: "Enter major header here",
        question: "Enter Question here",
        answer: "Enter Answer Here"
    },
    
    {
        id:2,
        title:"Rhythm",
        question:"whats ...",
        answer:"the correct answer"
    },
    {
        id:3,
        title:"Scales",
        question:"great question here.",
        answer:"the correct answer"
    },
];


    return(
        <div className="quiz-viewer">
            {quizzes.map(quiz =>(
                <QuizCard quiz={quiz} key={quiz.id}/>
            ))}
        </div>
    )
}
export default Quizviewer