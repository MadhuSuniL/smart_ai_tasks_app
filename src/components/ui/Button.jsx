import React from 'react';
import { useNavigate } from "react-router-dom";

const Button = ({
    children = 'Button',
    className = '',
    extraClassName = '',
    href,
    ...props
}) => {
    const nav = useNavigate();

    const handleRouterClick = () => {
        if (href) {
            nav(href);
        }
    };

    return (
        <button
            className={`
                ${className || "relative inline-flex items-center justify-center"}
                bg-main text-gray-300 rounded-lg
                px-6 py-2 font-semibold text-sm 
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:shadow-[#463b69]
                active:scale-95
                ${extraClassName}
            `}
            onClick={handleRouterClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
