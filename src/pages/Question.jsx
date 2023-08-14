import React from "react"
function Question(props) {
    return (
        <div className="question-container flex">
            <p className="question fs-h3 letter-spacing-2">{props.question}</p>
            <div className="answers-container flex">
                {
                    props.answers.map((answerItem, answerIndex) => {
                        const styles =
                        {
                            backgroundColor: !props.isGameOver && answerItem.answer === props.selectedAnswer ? "#D6DBF5" :
                                props.isGameOver && answerItem.answer === props.correctAnswer.answer ? "#94D7A2" :
                                    props.isGameOver && answerItem.answer !== props.correctAnswer.answer && answerItem.answer === props.selectedAnswer ? "#F8BCBC" :
                                        props.isGameOver && answerItem.answer !== props.correctAnswer.answer
                                            && answerItem.answer !== props.selectedAnswer ? "#F5F7FB" :
                                            "",
                            border: props.isGameOver && answerItem.answer === props.correctAnswer.answer ||
                                props.isGameOver && answerItem.answer !== props.correctAnswer.answer && answerItem.answer === props.selectedAnswer ? "none" : "",


                            opacity: props.isGameOver && answerItem.answer !== props.correctAnswer.answer
                                && answerItem.answer !== props.selectedAnswer ||
                                props.isGameOver && answerItem.answer !== props.correctAnswer.answer && answerItem.answer === props.selectedAnswer ? "0.5" : ""

                        }

                        return (
                            <div className="answer-btn" key={answerIndex}>
                                <input
                                    type="radio"
                                    id={answerItem.id}
                                    value={answerItem.answer}
                                    name={props.questionId}
                                    onChange={(e) => props.handleChange(e)}
                                />
                                <label htmlFor={answerItem.id} style={styles}>{answerItem.answer}</label>

                            </div>
                        )
                    })

                }
            </div>

            <div className="dividing-line"></div>

        </div>
    )

}
export default Question