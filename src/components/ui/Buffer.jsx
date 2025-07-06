import React from 'react';
import { ImSpinner9 } from "react-icons/im";

const Buffer = ({ children, isLoading, message }) => {
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 flex justify-end items-end bg-black bg-opacity-40 z-50">
                    <div className="m-4 flex items-center bg-opacity-80 px-4 py-2 rounded-lg shadow-lg">
                        <ImSpinner9 className="animate-spin text-lg" />
                        <span className="ml-2 animate-pulse text-sm">{message || 'Loading...'}</span>
                    </div>
                </div>
            )}
            <div className={isLoading ? "pointer-events-none" : ""}>
                {children}
            </div>
        </>
    );
};

export default Buffer;
