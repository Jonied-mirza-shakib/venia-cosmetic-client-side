import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading'
import './SignUp.css'
import auth from '../firebase.init';

const SignUp = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    if (googleLoading||loading) {
        return <Loading></Loading>
    }

    if (googleUser||user) {
        navigate('/')
    }
let errorMessage;
    if(googleError||error){
        errorMessage=<p className='fs-4 text-red-600 font-bold'>{googleError?.message}</p>
    }

    const onSubmit = (data) => {
        console.log(data)
        createUserWithEmailAndPassword(data?.email,data?.password)
    };
    return (
        <div style={{ width: '80%', margin: 'auto', marginTop: '40px' }}>
        <h1 className='text-5xl text-center uppercase' style={{ fontFamily: 'Roboto Mono, monospaced', fontWeight: 'bold', color: 'darkcyan' }}>SIGN UP</h1>
        <div className="divider w-1/4 m-auto mb-10"></div>
        <div className='flex justify-center items-center'>
            <div class="card w-5/12 bg-base-100 shadow-xl">
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{marginBottom:'10px'}}>
                            <label for="first name">FIRST NAME</label>
                            <br/>
                            <input type="text" className='w-full' style={{border:'1px solid black',padding:'10px'}} {...register("firstName", { required: "First Name is required" })} />
                            <p>{errors.firstName?.message}</p>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <label for="last name">LAST NAME</label>
                            <br/>
                            <input type="text" className='w-full' style={{border:'1px solid black',padding:'10px'}} {...register("lastName", { required: "Last name is required" })} />
                            <p>{errors.lastName?.message}</p>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <label for="email">EMAIL</label>
                            <br/>
                            <input
                            type="email" placeholder="Your Email" style={{border:'1px solid black',padding:'10px'}} className='w-full'
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
                        <div style={{marginBottom:'10px'}}>
                            <label for="password">PASSWORD</label>
                            <br/>
                            <input type="password" className='w-full' style={{border:'1px solid black',padding:'10px'}} {...register("password", { required: "password is required" })} />
                            <p>{errors.password?.message}</p>
                        </div>
                        <input style={{fontSize:'20px'}} className='w-full text-center cursor-pointer font-bold bg-accent text-white' type="submit" value='SIGN UP'/>
                    </form>
                    <button onClick={()=>signInWithGoogle()} type="button" className='btn' style={{fontSize:'20px',marginBottom:'10px'}}>
                    <span className='mr-3'>Continue with</span><FcGoogle></FcGoogle>
                    </button>
                    {errorMessage}
                    <Link to='/login'><a href="#" className='underline text-zinc-900 font-bold'>Already Have An Account.Please Login</a></Link>
                </div>
            </div>
        </div>

    </div>
    );
};

export default SignUp;