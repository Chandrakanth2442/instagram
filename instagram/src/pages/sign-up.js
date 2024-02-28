import {Link, useNavigate} from 'react-router-dom'
import FirebaseContext from '../context/firebase';
import { useState, useContext, useEffect } from 'react';
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from '../services/firebase';

export default function SignUp(){

    const navigate=useNavigate();
    const {firebase}=useContext(FirebaseContext)
    const [username, setUsername]=useState();
    const [fullName, setFullName]=useState();
    const [emailAddress, setEmailAddress]=useState();
    const [password, setPassword]=useState();
    const [error, setError]=useState();

    const isInvalid=password==='' || emailAddress==='' || username===''||fullName==='';
    const handleSignUp=async (event)=>{
        event.preventDefault();
        //debugger;
        const usernameExists=await doesUsernameExist(username);
        console.log('User Name exists:'+usernameExists.username)
        console.log('User Name exists:'+usernameExists)
        if(!usernameExists){
            try{
                const createdUserResult=await firebase
                                        .auth()
                                        .createUserWithEmailAndPassword(emailAddress, password)
                    // authentication
                        //-> emailAddress and password and username(displayName)
                    await createdUserResult.user.updateProfile({
                        displayName: username
                    })  ;
                    await firebase.firestore().collection('users').add({
                        userId: createdUserResult.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [],
                        dateCreated: Date.now()
                    }) ;   
                    navigate(ROUTES.DASHBOARD)    
                    }
                    //
            catch(error){
                    setFullName('');
                    setEmailAddress('');
                    setPassword('');
                    setUsername('');
                    setError(error.message);
            }
        }
        else{
            setError('That username is already taken, please try another.')
        }
    };

    useEffect(()=>{
        document.title='Sign Up-Instagram';
    });

    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='"flex w-3/5'>
                <img src='images/iphone-with-profile.jpg' alt='iPhone with Profile' className='max-w-full'></img>
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                <h1 className='flex justify-center w-full'>
                <img src='/logo.png' alt='instagram' className='mt-2 w-6/12 mb-4'></img>
                </h1>
                {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
                <form onSubmit={handleSignUp} method='POST'>
                    <input 
                    aria-label="Enter your Mobile Number or email address"
                    type='text'
                    placeholder='Mobile Number or Email address'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target })=> setEmailAddress(target.value)}
                    value={emailAddress}
                    />
                    
                    <input 
                    aria-label="Enter your Full Name"
                    type='text'
                    placeholder='Full Name'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target })=> setFullName(target.value)}
                    value={fullName}
                    />
                    
                    <input 
                    aria-label="Enter your username"
                    type='text'
                    placeholder='username'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target })=> setUsername(target.value)}
                    value={username}
                    />
                    <input 
                    aria-label="Enter your password"
                    type='password'
                    placeholder='Password'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({ target })=> setPassword(target.value)}
                    value={password}
                    />
                    <button  
                        disabled={isInvalid}
                        type='submit'
                        className={`bg-blue-medium text-blue w-full rounded h-8 font-bold 
                        ${isInvalid && 'opacity-50' }`}>
                             SignUp 
                             </button>
                </form>
            </div>
            <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
                <p className='text-sm'>
                    Already have an account?{` `}
                    <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
                        Log in
                    </Link>
                </p>
            </div>
            </div>
        </div>
    )
}