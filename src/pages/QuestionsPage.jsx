import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import formatTime from '../utils/formatTime';
import { AuthContext } from '../contexts/AuthContext.jsx';
import getCategory from '../utils/getCategory.js';
import { FaStopwatch } from "react-icons/fa";

const QuestionsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [questions, setQuestions] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [index, setIndex] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [incorrectCount, setIncorrectCount] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0);
    const [questionArr, setQuestionArr] = useState([]);
    const [userInputArr, setUserInputArr] = useState([]);
    const [correctAnswerArr, setCorrectAnswerArr] = useState([]);

    const { handleGameData } = useContext(AuthContext);

    const navigate = useNavigate();

    {/*Get questions from api based off of user inputted query params */}
    useEffect(() => {
        const category = Number(searchParams.get('category'))
        const difficulty = searchParams.get('difficulty')
        const amount = Number(searchParams.get('amount'))

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
                // console.log(data)

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

    {/*hits api and redirects when all state variables are updated correctly */}
    useEffect(() => {
        if(questions && index + 1 === questions.length && localStorage.getItem('userInfo') && correctCount + incorrectCount === questions.length && questionArr.length === questions.length && userInputArr.length === questions.length && correctAnswerArr.length === questions.length){
            const handleLastClick = async () => {
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
                        incorrect_count: incorrectCount,
                        time_taken: elapsedTime,
                        question_arr: questionArr,
                        user_input_arr: userInputArr,
                        correct_answer_arr: correctAnswerArr,
                        category: Number(searchParams.get('category')) === 0 ? 'Any' : getCategory(Number(searchParams.get('category'))),
                        gamemode: 'Normal'
                    })
                })
                if(response.ok){
                    const data = await response.json()
                    // console.log(data)
                    
                    navigate(`/results/${data.id}`)
                }
            }
            handleLastClick()
        } else if(questions && index + 1 === questions.length && correctCount + incorrectCount === questions.length && questionArr.length === questions.length && userInputArr.length === questions.length && correctAnswerArr.length === questions.length){
            //store game data to context
            const obj = {}
            obj['correct_count'] = correctCount
            obj['incorrect_count'] = incorrectCount
            obj['time_taken'] = elapsedTime
            obj['question_arr'] = questionArr
            obj['user_input_arr'] = userInputArr
            obj['correct_answer_arr'] = correctAnswerArr

            handleGameData(obj)
            navigate('/results')
        }
    }, [index, correctCount, incorrectCount, questionArr, userInputArr, correctAnswerArr])

    const handleAnswerClick = async (answer) => {
        
        //build object to send to backend with current question, correct answer, user answer
        const updatedQuestionArr = [...questionArr, questions[index].question]
        setQuestionArr(updatedQuestionArr)
        const updatedUserInputArr = [...userInputArr, answer]
        setUserInputArr(updatedUserInputArr)
        const updatedCorrectAnswerArr = [...correctAnswerArr, questions[index].correct_answer]
        setCorrectAnswerArr(updatedCorrectAnswerArr)
        
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
            }, 1400)
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
            return 'bg-lighterPrimary'
        }
    }
    
    return (
        <div className='flex flex-col justify-center px-2 md:px-0'>
            {questions && 
                <div className='flex flex-col justify-center items-center space-y-4 mx-auto w-full md:w-2/3'>
                    <div className='mt-3 text-xl font-semibold'>Category: <span className='text-secondary'>{questions[index].category}</span></div>
                    <div className='flex items-center text-lg space-x-3'><FaStopwatch size={30}/> <span>{formatTime(elapsedTime)}</span></div>
                    <div className='text-xl'>Question: <span className='text-secondary'>{index + 1}</span></div>
                    <div className='text-2xl text-center w-full'>{questions[index].question}</div>
                    <div className='text-lg'>Difficulty: <span className={`${questions[index].difficulty === 'easy' && 'text-green-500'} ${questions[index].difficulty === 'medium' && 'text-orange-400'} ${questions[index].difficulty === 'hard' && 'text-red-500'} `}>{questions[index].difficulty}</span></div>
                    <div className='flex flex-col space-y-3 w-full'>
                        {questions[index].options.map((option, i) => {
                            return <button 
                                onClick={() => handleAnswerClick(option)} 
                                key={i} 
                                className={` text-white w-full py-1 text-center text-lg ${buttonBg(option)}`}>
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