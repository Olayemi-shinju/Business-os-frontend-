import { Input } from '../components/Input';
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import "../App.css"
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div className='flex justify-center bg-slate-100 items-center h-screen'>
            <div>
                <div className='flex text-center flex-col gap-2'>
                    <h1 className='text-md font-semibold '>Log in to your account</h1>
                    <p className='text-xs font-medium text-gray-400'>Enter your email and password to login</p>
                </div>
                <form action="" className='mt-6'>
                    <div>
                        <label htmlFor="email" className='text-xs text-gray-600 font-semibold'>Email address</label>
                        <Input icon={MdOutlineMail} id="email" name="email" placeholder='info@gmail.com'/>
                    </div>
                      <div>
                        <label htmlFor="password" className='text-xs text-gray-600 font-semibold'>Password</label>
                        <Input icon={TbLockPassword} id="password" name="password" placeholder="password"/>
                    </div>
                    <div className='mt-4 text-center'>
                        <button className='text-center bg-black cursor-pointer w-full p-2 border rounded-xl text-white'>
                            Log In
                        </button>
                    </div>

                    <div className='text-xs mt-4 text-gray-400 text-center'>
                        <p>Dont have an account?<Link to={'/register'}>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login