'use client'
import React from 'react'
import { ReactTyped } from 'react-typed';

const Label = ({children = 'Label', className = '', extraClassName = '', ...props }) => {
    return (
        <label
            className={
                className 
                ? className 
                : 'text-main font-semibold m-1 p-1 pb-0 mb-0' + 
                ' ' + extraClassName || ''
            }
            {...props}
        >
            <ReactTyped
                strings={[
                    children,
                ]}
                typeSpeed={10}
                showCursor={false}
            />
        </label>
    );
};


export default Label;