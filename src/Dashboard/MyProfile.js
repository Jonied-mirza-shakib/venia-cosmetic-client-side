import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    return (
        <div>
            <h1 className='text-3xl text-center text-blue-700 uppercase font-bold mt-5'>My Profile</h1>
           <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
           <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">NAME: {user?.displayName}</h2>
                    <p>EMAIL: {user?.email}</p>
                </div>
            </div>
           </div>
        </div>
    );
};

export default MyProfile;