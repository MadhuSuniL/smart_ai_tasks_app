import React from 'react';
import { useState } from 'react';
import { ReactTyped } from 'react-typed';
import { apiCall } from '../../utils/Axios';
import { setData } from '../../utils/localStorage';
import { ImSpinner9 } from "react-icons/im";
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { toast } from "react-toastify";

const Signin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    toast.success("Test toast!", {
        position: "top-right",
        theme: "colored",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = 'auth/login'
        let body = formData;
        let method = 'post';
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            toast.success("Login successfully!");
            setData('user', JSON.stringify(data.user))
            setData("access", data.token)
            window.location.href = '/'
        }
        const onError = (error) => {
            toast.error(error.detail);
        }
        apiCall(url, body, method, loadingState, onSuccess, onError)
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side with Welcome Content */}
            <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-8">
                <h1 className="text-4xl font-bold text-main mb-4">Welcome to bujji</h1>
                <ReactTyped
                    strings={[
                        'Explore the mysteries of the cosmos with AI-powered insights.',
                        'Dive into deep cosmological discussions on black holes, dark energy, and more.',
                        'Sign in to unlock AI-generated notes and intelligent space-time explorations!'
                    ]}

                    typeSpeed={50}
                    backSpeed={30}
                    loop
                    className="text-xl text-main"
                />
                <p className="mt-6 ">
                    Step into a world of endless discussions with state-of-the-art AI. We're excited to have you!
                </p>
            </div>

            {/* Right Side with Sign-in Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                <Card extraClassName='w-full max-w-md p-6'>
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-center text-main mb-6">Sign In</h2>

                        {/* Sign-in Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-main">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent px-4 py-2 mt-2 border border-orange-500 rounded-md text-sm focus:outline-none focus:ring-orange-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-main">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent px-4 py-2 mt-2 border border-orange-500 rounded-md text-sm focus:outline-none focus:ring-orange-500"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mb-4">
                                <Button
                                    type="submit"
                                    extraClassName="w-full"
                                >
                                    {isLoading ? (
                                        <ImSpinner9 className="animate-spin text-gray-300 mx-auto" />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Already have an account */}
                        <div className="text-center">
                            <p className="text-sm ">
                                Don't have an account?
                                <a href="/signup" className="text-main font-bold hover:underline ml-1">Sign Up</a>
                            </p>
                        </div>
                    </div>

                </Card>
            </div>
        </div>
    );
};

export default Signin;
