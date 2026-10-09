import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Input } from '../components/Input';
import "../App.css";
import { api } from '../utils/api';
const ROLE = import.meta.env.VITE_ROLE
const Register = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoader(true);
        try {
            await api.post('register', {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: ROLE
            });
            toast.success("Account created successfully!");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='flex justify-center bg-gray-50 items-center h-screen w-screen p-4 text-gray-800'>
            <div className='w-full max-w-sm bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col'>
                <div className='flex text-center flex-col gap-1.5'>
                    <h1 className='text-xl font-bold tracking-tight text-gray-900'>Create an account</h1>
                    <p className='text-xs font-medium text-slate-400'>Enter your credentials to get started</p>
                </div>
                
                <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4' noValidate>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="firstName" className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>First Name</label>
                        <Input 
                            icon={IoIosPerson} 
                            id="firstName" 
                            name="firstName" 
                            placeholder='John Smith' 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={loader}
                        />
                    </div>

                     <div className="flex flex-col gap-1">
                        <label htmlFor="lastName" className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Last Name</label>
                        <Input 
                            icon={IoIosPerson} 
                            id="lastName" 
                            name="lastName" 
                            placeholder='John Smith' 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={loader}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Email address</label>
                        <Input 
                            icon={MdOutlineMail} 
                            id="email" 
                            name="email" 
                            type="email"
                            placeholder='alex@store.com' 
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={loader}
                        />
                    </div>

                    <div className="flex flex-col gap-1 relative">
                        <label htmlFor="password" className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>Password</label>
                        <div className="relative w-full flex items-center">
                            <Input 
                                icon={TbLockPassword} 
                                id="password" 
                                name="password" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loader}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-slate-400 hover:text-gray-600 transition-colors cursor-pointer z-10 p-1"
                            >
                                {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                            </button>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <button 
                            type="submit"
                            disabled={loader}
                            className='w-full py-2.5 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm min-h-[38px] flex items-center justify-center'
                        >
                            {loader ? "Creating Account..." : "Register"}
                        </button>
                    </div>

                    <div className='text-xs mt-2 text-slate-400 text-center'>
                        <p>Already have an account? <Link to='/login' className="text-purple-600 font-semibold hover:underline ml-1">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
