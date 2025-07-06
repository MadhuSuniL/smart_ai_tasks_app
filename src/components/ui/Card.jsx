import React from 'react';

const Card = ({
    children,
    className = '',
    extraClassName = '',
    fill = false,
    ...props
}) => {
    return (
        <div
            className={
                (className
                    ? className
                    : ` gray-bg rounded-xl ${!fill && 'bg-opacity-5'} p-4 transition duration-300 ease-in-out transform hover:scale-[1.02] hover:border-main hover:shadow-lg`
                ) +
                " " +
                (extraClassName || "")
            }
            {...props}
        >
            {children}
        </div >
    );
};

export default Card;
