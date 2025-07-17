import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/homepage.css'

export default function HomePage() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/myNotes');
        }
    }, [user, token]);

    // Prevent rendering if already navigating
    if (user) return null;

    return (
        <>
        <div id="hero-container">
            <div id="hero">
                <h1 id="hero-title">Welcome To <span>MyNotes</span></h1>
                <p id="hero-desc">
                    Your own Notes Diary where you can store your little notes, habits,
                    routines, secrets and maybe some passwords... in a very secure way without a worry.
                </p>
                <div id="btns">
                    <button id="login" onClick={() => navigate('/login')}>
                        LOGIN
                    </button>
                    <button id="register" onClick={()=> navigate('/register')}>
                        REGISTER
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}
