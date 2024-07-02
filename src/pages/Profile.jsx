import React, { useEffect, useState } from 'react'
import formatDate from '../utils/formatDate'
import formatAsPercentage from '../utils/formatAsPercentage'
import { Link } from 'react-router-dom'
import { IoClose } from "react-icons/io5";

const Profile = () => {
    const [statistics, setStatistics] = useState(null)
    const [achievements, setAchievements] = useState(null)
    const [gameHistory, setGameHistory] = useState(null)
    const [limit, setLimit] = useState(5)

    useEffect(() => {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        const getProfileData = async () => {
            const response = await fetch(`${apiBaseUrl}/users/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            if(response.ok){
                const data = await response.json()
                // console.log(data)
                setStatistics(data.stats)
                setAchievements(data.achievements)
                setGameHistory(data.game_history)
            }
        }
        getProfileData()
    }, [])

    return (
        <div className='flex flex-col justify-center items-center space-y-8 pb-4'>
            {/*Header */}
            {statistics && 
                <div className='flex flex-col justify-center items-center text-center space-y-4 mt-3'>
                    <div className='text-3xl font-semibold'><span className='text-secondary '>{statistics.username}</span>, User Profile</div>
                    <div className='flex items-center space-x-4'>
                        <Link className='bg-green-500 hover:bg-green-400 p-3 rounded-lg text-white font-semibold' to={'/update_profile'}>Update Profile</Link>
                        <Link className='bg-red-500 hover:bg-red-400 p-3 rounded-lg text-white font-semibold' to={'/confirm_delete'}>Delete Profile</Link>
                    </div>
                </div>
            }
            
            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full justify-center px-3'>

                {/*Stats Section */}
                {statistics && 
                    <div className='border-2 border-secondary rounded-lg h-fit p-2 w-full md:w-1/4'>
                        <div className='text-2xl underline text-center'>Statistics</div>
                        <div>Total Games: <span className='text-secondary'>{statistics.total_games}</span></div>
                        <div>Overall Average: <span className='text-secondary'>{formatAsPercentage(statistics.overall_average)}</span></div>
                        <div>Total Answers Correct: <span className='text-secondary'>{statistics.total_answers_correct}</span></div>
                        <div>Total Answers Wrong: <span className='text-secondary'>{statistics.total_answers_incorrect}</span></div>
                        <div>Most Played Category: <span className='text-secondary'>{statistics.played_categories}</span></div>
                        <div>Current Perfect Score Streak: <span className='text-secondary'>{statistics.current_score_streak}</span></div>
                        <div>Longest Perfect Score Streak: <span className='text-secondary'>{statistics.longest_score_streak}</span></div>
                    </div>
                }

                {/*Achievements Section */}
                {achievements && 
                    <div className='border-2 border-secondary rounded-lg h-fit p-2 w-full md:w-1/4'>
                        <div className='text-2xl underline text-center'>Achievements</div>
                        <div className='flex flex-col space-y-1'>
                            {achievements.length > 0 && achievements.map((achievement, index) => {
                                return (
                                    <div key={index} className='border-t border-secondary'>
                                        <div className='font-bold'>{achievement.name}</div>
                                        <div>{achievement.description}</div>
                                        <div className='text-right'>{formatDate(achievement.created_at)}</div>
                                    </div>
                                )
                            })}
                            {achievements.length === 0 && <div className='text-center my-3 text-lg'>No achievements to display yet.</div>}
                        </div>
                    </div>
                }

                {/*Game History Section */}
                {gameHistory && 
                    <div className='border-2 border-secondary rounded-lg h-fit p-2 md:w-1/4'>
                        <div className='text-2xl underline text-center'>Game History</div>
                        <div className="flex flex-col space-y-1">
                            {limit === 5 && gameHistory.length > 0 && gameHistory.map((game, index) => {
                                if(index < 5){
                                    return (
                                        <Link to={`/results/${game.id}`} key={index} className='border-t border-secondary flex items-center space-x-3'>
                                            <div className='flex flex-col items-center'>
                                                <div className='text-sm'>Score:</div> 
                                                <div className='text-xl font-bold'>{game.correct_count}/{game.question_arr.length}</div>
                                            </div>
                                            <div className=''>
                                                <div>Category: <span className='text-secondary'>{game.category}</span></div>
                                                <div>Time Taken: <span className='text-secondary'>{game.time_taken}</span></div>
                                                <div>Gamemode: <span className='text-secondary'>{game.gamemode}</span></div>
                                                <div>{formatDate(game.created_at)}</div>
                                            </div>
                                        </Link>
                                    )
                                } 
                            })}
                            {limit === 5 && gameHistory.length > 5 && 
                                <div className='flex items-center justify-center'>
                                    <button className='text-blue-700 underline hover:text-blue-400' onClick={() => setLimit(1000)}>Show All</button>
                                </div>
                            }
                            {limit === 1000 && gameHistory.length > 0 && gameHistory.map((game, index) => {
                                return (
                                    <Link to={`/results/${game.id}`} key={index} className='border-t border-secondary flex items-center space-x-3'>
                                        <div className='flex flex-col items-center'>
                                            <div className='text-sm'>Score:</div> 
                                            <div className='text-xl font-bold'>{game.correct_count}/{game.question_arr.length}</div>
                                        </div>
                                        <div className=''>
                                            <div>Category: <span className='text-secondary'>{game.category}</span></div>
                                            <div>Time Taken: <span className='text-secondary'>{game.time_taken}</span></div>
                                            <div>Gamemode: <span className='text-secondary'>{game.gamemode}</span></div>
                                            <div>{formatDate(game.created_at)}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                            {limit === 1000 && gameHistory.length > 0 &&
                                <div className='flex items-center justify-center'>
                                    <button className='text-red-600 hover:text-red-400' onClick={() => setLimit(5)}><IoClose size={28}/></button>
                                </div>
                            }
                            {gameHistory.length === 0 && <div className='text-center my-3 text-lg'>No games played yet.</div>}
                        </div>
                    </div>
                }
             </div>
        </div>
    )
}

export default Profile