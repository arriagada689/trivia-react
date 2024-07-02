import React, { useEffect, useState } from 'react'
import { IoMdStar } from "react-icons/io";
import formatAsPercentage from '../utils/formatAsPercentage';

const Leaderboard = () => {
    const [userData, setUserData] = useState(null)
    const [metric, setMetric] = useState('1')

    useEffect(() => {
        const getData = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/users/leaderboard?metric=${metric}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok){
                const data = await response.json()
                setUserData(data)
                // console.log(data)
            }
        }
        getData()
    }, [metric])

    return (
        <div className='flex flex-col justify-center items-center'>
            {userData &&
                <div className='md:w-4/5 mx-1 md:mx-0 bg-leaderboard mt-4 border-2 border-gray-400 rounded-lg dark:bg-primary'>

                    <div className='text-center text-3xl font-semibold py-3 border-b-2 border-gray-400'>Leaderboard</div>

                    <div className="flex justify-center items-center space-x-3 p-2 border-b-2 border-gray-400 flex-wrap gap-y-2">
                        <div>Sorting metric:</div>
                        <button className={`${metric === '1' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light p-1 rounded-lg text-white`} onClick={() => setMetric('1')}>Total Games</button>
                        <button className={`${metric === '2' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light p-1 rounded-lg text-white`} onClick={() => setMetric('2')}>Total Correct</button>
                        <button className={`${metric === '3' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light p-1 rounded-lg text-white`} onClick={() => setMetric('3')}>Total Wrong</button>
                        <button className={`${metric === '4' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light p-1 rounded-lg text-white`} onClick={() => setMetric('4')}>Overall Average</button>
                        <button className={`${metric === '5' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light p-1 rounded-lg text-white`} onClick={() => setMetric('5')}>Current Perfect Score Streak</button>
                        <button className={`${metric === '6' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light p-1 rounded-lg text-white`} onClick={() => setMetric('6')}>Longest Perfect Score Streak</button>
                    </div>

                    {/*Grid for large screens */}
                    <div className='hidden lg:grid leaderboard-grid'>

                        <div className='grid-row font-medium'>
                            <div className='border-b-2 border-gray-400 p-2'>Rank</div>
                            <div className='border-b-2 border-gray-400 p-2'>Username</div>
                            <div className='border-b-2 border-gray-400 p-2'>Total Games</div>
                            <div className='border-b-2 border-gray-400 p-2'>Longest Score Streak</div>
                            <div className='border-b-2 border-gray-400 p-2'>Current Score Streak</div>
                            <div className='border-b-2 border-gray-400 p-2'>Overall Average</div>
                            <div className='border-b-2 border-gray-400 p-2'>Total Correct</div>
                            <div className='border-b-2 border-gray-400 p-2'>Total Wrong</div>
                        </div>

                        {userData.map((user, index) => {
                            return (
                                <div className={`flex grid-row ${localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username === user.username ? 'font-semibold' : ''}`} key={index}>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{index + 1}</div>
                                    <div className={`p-1 flex items-center justify-center ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>
                                        <span>{user.username}</span>
                                        {localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username === user.username ? <IoMdStar /> : null}
                                    </div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.total_games}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.longest_score_streak}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.current_score_streak}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{formatAsPercentage(user.overall_average)}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.total_answers_correct}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.total_answers_incorrect}</div>
                                </div>
                            )
                        })}
                    </div>
                    
                    {/*Grid for smaller screens */}
                    <div className='hidden md:grid sub-grid lg:hidden'>
                        
                        <div className='grid-row font-medium'>
                            <div className='border-b-2 border-gray-400 p-2'>Rank</div>
                            <div className='border-b-2 border-gray-400 p-2'>Username</div>
                            <div className='border-b-2 border-gray-400 p-2'>Total Games</div>
                            <div className='border-b-2 border-gray-400 p-2'>Longest Score Streak</div>
                            <div className='border-b-2 border-gray-400 p-2'>Current Score Streak</div>
                            <div className='border-b-2 border-gray-400 p-2'>Overall Average</div>
                        </div>

                        {userData.map((user, index) => {
                            return (
                                <div className={`flex grid-row ${localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username === user.username ? 'font-semibold' : ''}`} key={index}>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{index + 1}</div>
                                    <div className={`p-1 flex items-center justify-center ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>
                                        <span>{user.username}</span>
                                        {localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username === user.username ? <IoMdStar /> : null}
                                    </div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.total_games}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.longest_score_streak}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.current_score_streak}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{formatAsPercentage(user.overall_average)}</div>
                                </div>
                            )
                        })}
                    </div>

                    {/*Grid for mobile */}
                    <div className='grid mobile-grid sm:hidden'>

                        <div className='grid-row font-medium'>
                            <div className='border-b-2 border-gray-400 p-2'>Rank</div>
                            <div className='border-b-2 border-gray-400 p-2'>Username</div>
                            <div className='border-b-2 border-gray-400 p-2'>Total Games</div>
                            <div className='border-b-2 border-gray-400 p-2'>Current Score Streak</div>
                            <div className='border-b-2 border-gray-400 p-2'>Overall Average</div>
                        </div>

                        {userData.map((user, index) => {
                            return (
                                <div className={`flex grid-row ${localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username === user.username ? 'font-semibold' : ''}`} key={index}>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{index + 1}</div>
                                    <div className={`p-1 flex items-center justify-center ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>
                                        <span>{user.username.length > 13 ? `${user.username.slice(0, 11)}...` : user.username}</span>
                                        {localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username === user.username ? <IoMdStar /> : null}
                                    </div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.total_games}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{user.current_score_streak}</div>
                                    <div className={`p-1 ${index + 1 !== userData.length ? 'border-b border-gray-400' : ''}`}>{formatAsPercentage(user.overall_average)}</div>
                                </div>
                            )
                        })}

                    </div>
                    
                </div>
            }
        </div>
    )
}

export default Leaderboard