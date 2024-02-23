// LoginPage.js

import React from 'react';
import { initializeApp } from 'firebase/app';
import googleicon from '../assets/google.svg';
import githubicon from '../assets/github.svg';
import facebookicon from '../assets/facebook.svg';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import Swal from 'sweetalert2';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'


import { fab } from '@fortawesome/free-brands-svg-icons'




const LoginPage = () => {
    const { signInWithGoogle, signInWithGitHub,signInWithFacebook,signUp,login,setUser } = useUserContext();
    
    const {user} = useUserContext()
    const navigate = useNavigate();
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    
 
 
    const [Inscription, setInscription] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');


  return (
    !user ?(
    <div>
      {Inscription ? (
        <div>
         <div>
         <h1>Inscription</h1>
          <input
            type="text"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          <button onClick={() => signUp(
            email,
            password,
            username
          ) }>S'inscrire'</button>
          </div> 
          <button onClick={() => setInscription(false)}>ou Se connecter</button>
        </div>
      ) : (
        <div>
          <div>
          <h1>Connexion</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
           <button onClick={() => login(username,password)}>Se connecter</button>
          

          </div>
          <button onClick={() => setInscription(true)}>ou S'inscrire</button>
         
        </div>
      )
        }
       
        <button onClick={signInWithGoogle}>
        
        <img src={googleicon} alt="google" />
        
        </button>
        <button onClick={signInWithGitHub}>
        <img src={githubicon} alt="github" />
        </button>
        <button onClick={signInWithFacebook}>
        <img src={facebookicon} alt="facebook" />
        </button>
    </div>) : (
      <></>
    )
  );
};

export default LoginPage;
