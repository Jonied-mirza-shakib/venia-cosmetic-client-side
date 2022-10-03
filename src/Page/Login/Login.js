import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../../Loading/Loading';
import auth from '../../firebase.init'
import useToken from '../../hooks/useToken';


const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, sendPasswordResetEmailError] = useSendPasswordResetEmail(
        auth
    );
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    let location = useLocation();
    const [token] = useToken(googleUser || user)
    let from = location.state?.from?.pathname || "/";
    useEffect(()=>{
        if (token) {
            navigate(from, { replace: true });
        }
    },[from,navigate,token])
    if (googleLoading || loading || sending) {
        return <Loading></Loading>
    }

    let errorMessage;
    if (googleError || error || sendPasswordResetEmailError) {
        errorMessage = <p className='fs-4 text-red-600 font-bold'>{googleError?.message}</p>
    }


    const onSubmit = async (data) => {
        signInWithEmailAndPassword(data?.email, data?.password)
        setEmail(data?.email)
    };
    return (
        <div style={{ width: '80%', margin: 'auto', marginTop: '40px' }}>
            <h1 className='text-5xl text-center uppercase' style={{ fontFamily: 'Roboto Mono, monospaced', fontWeight: 'bold', color: 'darkcyan' }}>LOGIN</h1>
            <div className="divider w-1/4 m-auto mb-10"></div>
            <div className='flex justify-center items-center'>
                <div className="card w-5/12 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{ marginBottom: '10px' }}>
                                <label for="email">EMAIL</label>
                                <br />
                                <input
                                    type="email" placeholder="Your Email" className='w-full' style={{ border: '1px solid black', padding: '10px' }}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })} />
                                <p>{errors.email?.message}</p>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label for="password">PASSWORD</label>
                                <br />
                                <input type="password" placeholder="Your Password" className='w-full' style={{ border: '1px solid black', padding: '10px' }} {...register("password", { required: "password is required" })} />
                                <p>{errors.password?.message}</p>
                            </div>
                            <input style={{ fontSize: '20px' }} className='w-full text-center cursor-pointer font-bold bg-accent text-white' type="submit" value='LOGIN' />
                        </form>
                        <button onClick={() => signInWithGoogle()} type="button" className='btn' style={{ fontSize: '20px', marginBottom: '10px' }}>
                            <span className='mr-3'>Continue with</span><FcGoogle></FcGoogle>
                        </button>
                        {errorMessage}
                        <Link to='/signUp'><a href="#" className='underline text-zinc-900 font-bold'>Are You New User? Please Sign Up.</a></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;