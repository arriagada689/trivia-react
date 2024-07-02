import React from 'react'

const AchievementTable = () => {
    return (
        <div className='m-4 md:m-0 md:w-3/5 space-y-2'>
            <div className='text-center text-2xl font-medium'>Trivia Achievements</div>
            <div>Track your achievements and become a trivia master! To keep track of your achievements, please login or create an account.</div>
            <table className='w-full border border-gray-400 '>
                <thead className='bg-gray-300 dark:bg-lighterPrimary border-b border-b-gray-400'>
                    <tr>
                        <th>Achievement</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody className=' md:text-center'>
                    <tr>
                        <td className='p-1'>Trivia Master</td>
                        <td>Achieve a perfect score</td>
                    </tr>
                    <tr>
                        <td className='p-1'>Trivia Wizard</td>
                        <td>Achieve a 3-game perfect score streak</td>
                    </tr>
                    <tr>
                        <td className='p-1'>Trivia Specialist</td>
                        <td>Achieve a 5-game perfect score streak</td>
                    </tr>
                    <tr>
                        <td className='p-1'>Trivia Genius</td>
                        <td>Achieve a 10-game perfect score streak</td>
                    </tr>
                    <tr>
                        <td className='p-1'>Trivia King</td>
                        <td>Achieve a 20-game perfect score streak</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AchievementTable