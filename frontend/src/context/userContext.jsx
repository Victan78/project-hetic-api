// UserContext.js
import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2'
const UserContext = createContext();
import { auth } from "../../firebase.config";
import { signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider,FacebookAuthProvider } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            Swal.fire({
                icon: 'success',
                title: 'connecté avec succès',
                showConfirmButton: false,
                timer: 1500
            })
            console.log('Successfully signed in with Google:', user);
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'erreur de connexion avec google',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const signInWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;
            console.log('Successfully signed in with GitHub:', user);
            Swal.fire({
                icon: 'success',
                title: 'connecté avec succès',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error('Error signing in with GitHub:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'erreur de connexion avec github',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const signInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            console.log('Successfully signed in with Facebook:', user);
            Swal.fire({
                icon: 'success',
                title: 'connecté avec succès',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error('Error signing in with Facebook:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'erreur de connexion avec Facebook',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const login = async (email, password) => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'erreur de connexion',
                        showConfirmButton: false,
                        timer: 1500
                    })}else{
                    setUser(data);
                    Swal.fire({
                        icon: 'success',
                        title: 'connecté avec succès',
                        showConfirmButton: false,
                        timer: 1500
                    })}
            })
            .catch(error => console.error('Error:', error));

    }
    const signUp = async (email,username, password) => {
        fetch('http://localhost:5000/logup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'erreur de connexion',
                        showConfirmButton: false,
                        timer: 1500
                    })}else{
                    setUser(data);
                    Swal.fire({
                        icon: 'success',
                        title: 'connecté avec succès',
                        showConfirmButton: false,
                        timer: 1500
                    })}
            })
            .catch(error => console.error('Error:', error));
    }

    const signOut = async () => {
        try {
            setUser(null);
            await signOut(auth);

            console.log('Successfully signed out');
            Swal.fire({
                icon: 'success',
                title: 'déconnecté avec succès',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    }



 



 
  return (
    <UserContext.Provider value={{ user,setUser,signInWithGitHub,signInWithGoogle,signOut,signInWithFacebook,signUp,login }}>
      {children}
    </UserContext.Provider>
  );
};
