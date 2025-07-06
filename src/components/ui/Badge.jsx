import React from 'react'

const Badge = ({ children }) => {
    return (
        <div className='flex items-center justify-betweenm-1 p-2 px-10 rounded-full shadow-[#bfb7e5] shadow-sm font-semibold bg-white bg-opacity-5 text-main'>{children}</div>
    )
}

export default Badge