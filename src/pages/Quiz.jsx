import React, { useState, useEffect } from 'react'
import { nanoid } from "nanoid";
import he from 'he';
import { useParams, Link } from 'react-router-dom'
import Question from './Question';

function Quiz() {
  const params = useParams()
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  function getQuiz() {
    setLoading(true); // Set loading to true while fetching data
    fetch(`https://opentdb.com/api.php?amount=5&category=${params.id}`)
      .then(res => {
        if (!res.ok) 
        {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then(data => {
        setQuiz(data.results.map(quizItem => {
          const correctAnswerObj =
          {
            id: nanoid(),
            answer: he.decode(quizItem.correct_answer)

          }
          const incorrectAnswerObj = quizItem.incorrect_answers.map(incorrectAnswerItem => ({
            id: nanoid(),
            answer: he.decode(incorrectAnswerItem)
          }))
          const answersArr = [correctAnswerObj, ...incorrectAnswerObj]
          const shuffledAnswersArr = shuffleArray(answersArr)
          return {
            id: nanoid(),
            question: he.decode(quizItem.question),
            answers: shuffledAnswersArr,
            correctAnswer: correctAnswerObj,
            selectedAnswer: "",
            isSelectedAnswerCorrect: false
          }
        }))
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error =>{
        setError(error)
        setLoading(false)
      })
    
  }
  useEffect(() => { getQuiz() }, [])

  function handleChange(e) {
    const { name, value, id } = e.target
    setQuiz(prevQuiz => {
      return prevQuiz.map(prevQuizItem => {
        return prevQuizItem.id === name ?
          { ...prevQuizItem, selectedAnswer: value } :
          prevQuizItem
      })
    })

  }
  function checkAnswer() 
  {
    setQuiz(prevQuiz => {
      return prevQuiz.map(prevQuizItem => {
        return prevQuizItem.selectedAnswer === prevQuizItem.correctAnswer.answer ?
          { ...prevQuizItem, isSelectedAnswerCorrect: true } : prevQuizItem
      })
    })
    setIsGameOver(true)
  }
  function playAgain() {
    setQuiz([])
    getQuiz()
    setIsGameOver(false)
  }
  useEffect(() => {
    const correctAnswers = quiz.filter(quizItem => quizItem.isSelectedAnswerCorrect);
    setScore(correctAnswers.length);
  }, [quiz]);


  const quizElements = quiz.map(quizItem => (
    <Question
      key={quizItem.id}
      question={quizItem.question}
      questionId={quizItem.id}
      answers={quizItem.answers}
      isSelectedAnswerCorrect={quizItem.isSelectedAnswerCorrect}
      handleChange={handleChange}
      isGameOver={isGameOver}
      selectedAnswer={quizItem.selectedAnswer}
      correctAnswer={quizItem.correctAnswer}
    />
  ))
  if (loading) 
  {
    return <div className='loader-container flex'><div className="lds-dual-ring"></div></div>
  }
  if (error) 
  {
    return <h1>There was an error: {error.message}</h1>
  }
  return (
    <div className="quiz-container flex container">
      <Link
        to=".."
        relative="path"
        className="back-button main-text-clr"
      >&larr; <span>Back to Categories</span></Link>
        <>
          {quizElements}
          <div className='quiz-result flex'>
            {isGameOver && <p>You scored {score}/5 correct answers</p>}
            <button className='quiz-btn link-btn' onClick={isGameOver ? playAgain : checkAnswer}>{isGameOver ? "Play Again" : "Check Answers"}</button>
          </div>
        </>
    </div>

  )
}
export default Quiz