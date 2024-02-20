// LoginPage.js

import React from 'react';
import { initializeApp } from 'firebase/app';

import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const { signInWithGoogle, signInWithGitHub,signInWithFacebook } = useUserContext();
    const {user} = useUserContext()
    const navigate = useNavigate();
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);


  return (
    !user ?(
    <div>
      <h1>CV GENERATOR</h1>
        <button onClick={signInWithGoogle}>Coninuer avec Google</button>
        <button onClick={signInWithGitHub}>Continuer avec GitHub</button>
        <button onClick={signInWithFacebook}>Continuer avec Facebook</button>
    </div>) : (
      <></>
    )
  );
};

export default LoginPage;
