import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import formatTime from '../utils/formatTime';

const QuestionsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [questions, setQuestions] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [index, setIndex] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [incorrectCount, setIncorrectCount] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const category = Number(searchParams.get('category'))
        const difficulty = searchParams.get('difficulty')
        const amount = Number(searchParams.get('amount'))
        console.log(category, difficulty, amount)
        const getQuestions = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/trivia/questions?category=${category}&difficulty=${difficulty}&amount=${amount}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok){
                const data = await response.json()
                setQuestions(data)
                console.log(data)

                //set timer
                let timer = setInterval(() => {
                    setElapsedTime(prevTime => prevTime + 1)
                }, 1000);

            } else {
                const error = await response.json()
                console.error(error)
            }
        }
        getQuestions()
    }, [])

    {/*handles answer button click re-render */}
    useEffect(() => {

    }, [selectedAnswer])

    const handleAnswerClick = async (answer) => {
        if(selectedAnswer === ''){
            setSelectedAnswer(answer)
            //keep track of correct and incorrect answers
            if(answer === questions[index].correct_answer){
                setCorrectCount(prev => prev + 1)
            } else {
                setIncorrectCount(prev => prev + 1)
            }

            //increment index
            setTimeout(() => {
                setIndex(prev => prev + 1)
                setSelectedAnswer('')
            }, 1500)
        }
        if(index + 1 === questions.length && localStorage.getItem('userInfo')) {
            //handle last question click (hit the api and get game id, redirect to results for that game)
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const token = JSON.parse(localStorage.getItem('userInfo')).token
            const response = await fetch(`${apiBaseUrl}/users/post_game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    correct_count: correctCount,
                    incorrectCount: incorrectCount
                })
            })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                if(localStorage.getItem('userInfo')){
                    navigate('/')
                }
            }
        } else if(index + 1 === questions.length){

        }
    }

    const buttonBg = (userAnswer) => {
        
        if(selectedAnswer === questions[index].correct_answer && userAnswer === questions[index].correct_answer) {
            return 'bg-green-400'
        } else if(userAnswer === selectedAnswer && userAnswer !== questions[index].correct_answer){
            return 'bg-red-500'
        } else if(selectedAnswer.length > 0 && userAnswer === questions[index].correct_answer && selectedAnswer !== questions[index].correct_answer){
            return 'bg-green-400'
        } else {
            return null
        }
    }
    
    return (
        <div>
            {questions && 
                <div>
                    <div>{questions[index].category}</div>
                    <div>timer: {formatTime(elapsedTime)}</div>
                    <div>Question: {index + 1}</div>
                    <div>{questions[index].question}</div>
                    <div>Difficulty: {questions[index].difficulty}</div>
                    <div className='flex space-x-5'>
                        {questions[index].options.map((option, i) => {
                            return <button 
                                onClick={() => handleAnswerClick(option)} 
                                key={i} className={`${buttonBg(option)}`}>
                                {option}
                                </button>
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default QuestionsPage