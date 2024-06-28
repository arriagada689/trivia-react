import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import formatTime from '../utils/formatTime.js';

const ResultsPage = () => {
    const { id } = useParams();
    const { gameData } = useContext(AuthContext);
    const [userGameData, setUserGameData] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('userInfo') && !gameData){
            navigate('/not-found')
        }
    }, [gameData])

    useEffect(() => {
        if(localStorage.getItem('userInfo') && id){
            //get game data based on game id
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const token = JSON.parse(localStorage.getItem('userInfo')).token
            const getGameData = async () => {
                const response = await fetch(`${apiBaseUrl}/users/game_data/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                if(response.ok){
                    const data = await response.json()
                    setUserGameData(data)
                }
            }
            getGameData()
        } else if(localStorage.getItem('userInfo') && !id){
            navigate('/not-found')
        }
    }, [])

    return (
        <div>
            {id ? 
                <div className='flex flex-col'>
                    {userGameData && 
                        <>
                            <div className='text-xl'>Results:</div>
                            <div>{userGameData.correct_count}/{userGameData.question_arr.length}</div>
                            <div>Time: {userGameData.time_taken}</div>

                            {userGameData.question_arr.map((question, index) => {
                                return (
                                    <div key={index}>
                                        <div>Question {index + 1}</div>
                                        <div>{question}</div>
                                        {userGameData.correct_answer_arr[index] === userGameData.user_input_arr[index] ? (
                                            <div className='bg-green-500'>Correct: {userGameData.correct_answer_arr[index]}</div>
                                        ) : (
                                            <div>
                                                <div className='bg-red-500'>Your answer: {userGameData.user_input_arr[index]}</div>
                                                <div className='bg-green-500'>Correct answer: {userGameData.correct_answer_arr[index]}</div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                            <div className='flex space-x-4'>
                                <Link to='/'>Play Again</Link>
                                <Link to='/profile'>Profile</Link>
                            </div>
                        </>
                    }
                </div>
                :
                <div className='flex flex-col'>
                    {gameData && 
                        <>
                            <div className='text-xl'>Results:</div>
                            <div>{gameData.correct_count}/{gameData.question_arr.length}</div>
                            <div>Time: {gameData.time_taken === 0 ? '00:01' : formatTime(gameData.time_taken)}</div>

                            {gameData.question_arr.map((question, index) => {
                                return (
                                    <div key={index}>
                                        <div>Question {index + 1}</div>
                                        <div>{question}</div>
                                        {gameData.correct_answer_arr[index] === gameData.user_input_arr[index] ? (
                                            <div className='bg-green-500'>Correct: {gameData.correct_answer_arr[index]}</div>
                                        ) : (
                                            <div>
                                                <div className='bg-red-500'>Your answer: {gameData.user_input_arr[index]}</div>
                                                <div className='bg-green-500'>Correct answer: {gameData.correct_answer_arr[index]}</div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                            <div>
                                <Link to='/'>Play Again</Link>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default ResultsPage