import React, { useEffect, useState } from 'react'
import formatDate from '../utils/formatDate'
import formatAsPercentage from '../utils/formatAsPercentage'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [statistics, setStatistics] = useState(null)
    const [achievements, setAchievements] = useState(null)
    const [gameHistory, setGameHistory] = useState(null)

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
        <div>
            {/*Header */}
            {statistics && 
                <>
                    <div>{statistics.username}, User Profile</div>
                    <Link to={'/update_profile'}>Update Profile</Link>
                    <Link to={'/confirm_delete'}>Delete Profile</Link>
                </>
            }

            {/*Stats Section */}
            {statistics && 
                <div>
                    <div className='text-xl'>Statistics</div>
                    <div>Total Games: {statistics.total_games}</div>
                    <div>Overall Average: {formatAsPercentage(statistics.overall_average)}</div>
                    <div>Total Answers Correct: {statistics.total_answers_correct}</div>
                    <div>Total Answers Wrong: {statistics.total_answers_incorrect}</div>
                    <div>Most Played Category: {statistics.played_categories}</div>
                    <div>Current Perfect Score Streak: {statistics.current_score_streak}</div>
                    <div>Longest Perfect Score Streak: {statistics.longest_score_streak}</div>
                </div>
            }

             {/*Achievements Section */}
             {achievements && 
                <div>
                    <div className='text-xl'>Achievements</div>
                    <div className='flex flex-col'>
                        {achievements.map((achievement, index) => {
                            return (
                                <div key={index}>
                                    <div className='font-bold'>{achievement.name}</div>
                                    <div>{achievement.description}</div>
                                    <div>{formatDate(achievement.created_at)}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
             }

             {/*Game History Section */}
             {gameHistory && 
                <div>
                    <div className='text-xl'>Game History</div>
                    <div className="flex flex-col">
                        {gameHistory.map((game, index) => {
                            return (
                                <Link to={`/results/${game.id}`} key={index}>
                                    <div>Score: {game.correct_count}/{game.question_arr.length}</div>
                                    <div>Category: {game.category}</div>
                                    <div>Time Taken: {game.time_taken}</div>
                                    <div>{formatDate(game.created_at)}</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
             }
        </div>
    )
}

export default Profile