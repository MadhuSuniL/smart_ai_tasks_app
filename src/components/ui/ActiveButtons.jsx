import React from 'react'

const ActiveButtons = ({
    options,
    active,
    setActive
}) => {
    return (
        <div className='p-1 border-2 rounded-md w-full'>
            <div className='flex items-center w-full'>
                {
                    options.map((option, index) => (
                        <div key={index} className={`p-1 mx-[2px] rounded-md flex-1 font-semibold text-center cursor-pointer ${active === option ? 'bg-white ' : 'bg-black text-gray-300'}`} onClick={() => setActive(option)}>
                            {option}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ActiveButtons