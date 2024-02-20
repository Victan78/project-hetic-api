// UserContext.js
import React, { createContext, useContext, useState } from 'react';

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
            console.log('Successfully signed in with Google:', user);
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }
    }

    const signInWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;
            console.log('Successfully signed in with GitHub:', user);
        } catch (error) {
            console.error('Error signing in with GitHub:', error.message);
        }
    }

    const signInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            console.log('Successfully signed in with Facebook:', user);
        } catch (error) {
            console.error('Error signing in with Facebook:', error.message);
        }
    }

 



 
  return (
    <UserContext.Provider value={{ user,signInWithGitHub,signInWithGoogle,signOut,signInWithFacebook }}>
      {children}
    </UserContext.Provider>
  );
};
