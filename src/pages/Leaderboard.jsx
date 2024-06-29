import React, { useEffect, useState } from 'react'

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
        <div>
            {userData &&
                <>
                    <div className="flex space-x-3">
                        <button className={`${metric === '1' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light`} onClick={() => setMetric('1')}>Total Games</button>
                        <button className={`${metric === '2' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light`} onClick={() => setMetric('2')}>Total Correct</button>
                        <button className={`${metric === '3' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light`} onClick={() => setMetric('3')}>Total Wrong</button>
                        <button className={`${metric === '4' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light`} onClick={() => setMetric('4')}>Overall Average</button>
                        <button className={`${metric === '5' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light`} onClick={() => setMetric('5')}>Current Perfect Score Streak</button>
                        <button className={`${metric === '6' ? 'bg-secondary-dark' : 'bg-secondary'} hover:bg-secondary-light`} onClick={() => setMetric('6')}>Longest Perfect Score Streak</button>
                    </div>

                    <div className='flex flex-col'>
                        {userData.map((user, index) => {
                            return (
                                <div className={`flex space-x-2 ${JSON.parse(localStorage.getItem('userInfo')).username === user.username ? 'bg-yellow-400' : ''}`} key={index}>
                                    <div>{index + 1}</div>
                                    <div>{user.username}</div>
                                    <div>{user.total_games}</div>
                                    <div>{user.longest_score_streak}</div>
                                    <div>{user.current_score_streak}</div>
                                    <div>{user.total_answers_correct}</div>
                                    <div>{user.total_answers_incorrect}</div>
                                    <div>{user.overall_average}</div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}

export default Leaderboard