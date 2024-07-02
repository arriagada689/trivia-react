import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import formatTime from '../utils/formatTime.js';
import formatAsPercentage from '../utils/formatAsPercentage.js';

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
                    // console.log(data)
                    setUserGameData(data)
                }
            }
            getGameData()
        } else if(localStorage.getItem('userInfo') && !id){
            navigate('/not-found')
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center space-y-8 '>
            {id ? 
                <div className='flex flex-col justify-center items-center md:w-3/5 mt-3 p-2 md:p-0'>
                    {userGameData && 
                        <>
                            <div className='flex items-baseline space-x-3 flex-wrap'>
                                <div className='text-xl md:text-3xl font-semibold'>Results:</div>
                                <div className=' text-lg md:text-2xl text-secondary'>{userGameData.correct_count}/{userGameData.question_arr.length}</div>
                                <div className='text-lg md:text-2xl'>Time: <span className='text-secondary'>{userGameData.time_taken}</span></div>
                                <div className='text-lg md:text-2xl'>Game Mode: <span className='text-secondary'>{userGameData.gamemode}</span></div>
                            </div>

                            <div className='text-3xl font-semibold text-green-500 my-3'>{formatAsPercentage(userGameData.correct_count/userGameData.question_arr.length)}</div>

                            <div className='space-y-3 w-full'>
                                {userGameData.question_arr.map((question, index) => {
                                    return (
                                        <div key={index} className='w-full border border-secondary rounded-lg p-2 text-center space-y-2'>
                                            <div className='underline text-lg'>Question <span className='text-secondary'>{index + 1}</span></div>
                                            <div className='text-2xl'>{question}</div>
                                            {userGameData.correct_answer_arr[index] === userGameData.user_input_arr[index] ? (
                                                <div className='bg-green-500 rounded-lg text-xl text-white font-semibold py-1'>Correct: {userGameData.correct_answer_arr[index]}</div>
                                            ) : (
                                                userGameData.user_input_arr[index] === 'Ran out of time!' ? (
                                                    <div className='bg-red-500 rounded-lg text-xl text-white font-semibold py-1'>No answer: Ran out of time!</div>                                            
                                                ) : (
                                                    <div className='space-y-2'>
                                                        <div className='bg-red-500 rounded-lg text-xl text-white font-semibold py-1'>Your answer: {userGameData.user_input_arr[index]}</div>
                                                        <div className='bg-green-500 rounded-lg text-xl text-white font-semibold py-1'>Correct answer: {userGameData.correct_answer_arr[index]}</div>
                                                    </div>
                                                )
                                                
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='flex space-x-4 my-8'>
                                <Link to='/' className='bg-secondary hover:bg-secondary-light p-3 rounded-lg text-white font-semibold'>Play Again</Link>
                                <Link to='/profile' className='p-3 border-2 border-gray-500 rounded-lg font-semibold'>Profile</Link>
                            </div>
                        </>
                    }
                </div>
                :
                <div className='flex flex-col justify-center items-center md:w-3/5 mt-3 p-2 md:p-0'>
                    {gameData && 
                        <>
                            <div className='flex items-baseline space-x-3 flex-wrap'>
                                <div className='text-xl md:text-3xl font-semibold'>Results:</div>
                                <div className=' text-lg md:text-2xl text-secondary'>{gameData.correct_count}/{gameData.question_arr.length}</div>
                                <div className='text-lg md:text-2xl'>Time: {gameData.time_taken === 0 ? '00:01' : formatTime(gameData.time_taken)}</div>
                                <div className='text-lg md:text-2xl'>Game Mode: <span className='text-secondary'>{gameData.gamemode}</span></div>
                            </div>

                            <div className='text-3xl font-semibold text-green-500 my-3'>{formatAsPercentage(gameData.correct_count/gameData.question_arr.length)}</div>

                            <div className='space-y-3 w-full'>
                                {gameData.question_arr.map((question, index) => {
                                    return (
                                        <div key={index} className='w-full border border-secondary rounded-lg p-2 text-center space-y-2'>
                                            <div className='underline text-lg'>Question <span className='text-secondary'>{index + 1}</span></div>
                                            <div className='text-2xl'>{question}</div>
                                            {gameData.correct_answer_arr[index] === gameData.user_input_arr[index] ? (
                                                <div className='bg-green-500 rounded-lg text-xl text-white font-semibold py-1'>Correct: {gameData.correct_answer_arr[index]}</div>
                                            ) : (
                                                gameData.user_input_arr[index] === 'Ran out of time!' ? (
                                                    <div className='bg-red-500 rounded-lg text-xl text-white font-semibold py-1'>No answer: Ran out of time!</div> 
                                                ) : (
                                                    <div className='space-y-2'>
                                                        <div className='bg-red-500 rounded-lg text-xl text-white font-semibold py-1'>Your answer: {gameData.user_input_arr[index]}</div>
                                                        <div className='bg-green-500 rounded-lg text-xl text-white font-semibold py-1'>Correct answer: {gameData.correct_answer_arr[index]}</div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='flex space-x-4 my-8'>
                                <Link to='/' className='bg-secondary hover:bg-secondary-light p-3 rounded-lg text-white font-semibold'>Play Again</Link>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default ResultsPage