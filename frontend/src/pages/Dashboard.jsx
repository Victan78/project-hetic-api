import React from "react";
import { Link} from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import '../assets/dash.css';
import { auth } from "../../firebase.config";
import Swal from "sweetalert2";



const Dashboard = () => {
    const { user,setUser } = useUserContext();
    const navigate = useNavigate();


    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

  
    const signOutt = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log('Successfully signed out');
            Swal.fire({
                icon: 'success',
                title: 'Déconnecté avec succès',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    }
    return (
        user ? (
            <div className="dashboard">
                <h1>CV GENERATOR</h1>
                <p>
                    Bienvenue {user.displayName}
                    
                </p>
                <span>
                        Pour créer une facture ou un CV, cliquez sur les liens ci-dessous
                </span>
                <Link to="/facture">Facture</Link>
           
                <Link to="/cv">CV</Link>
             
                <button onClick={signOutt}>Déconnexion</button>
            </div>
        ) : (
           <></>
            
        )
        
    )
    }

export default Dashboard;

