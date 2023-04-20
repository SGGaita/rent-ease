import React, { useContext, useState } from 'react'
import './login.scss'
import { logo, background } from '../../constants/images'
import { facebook, google } from '../../constants/icons'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth,db } from '../../firebaseConfig'
import { AuthContext } from '../../context/AuthContext';
import { getDoc, doc } from "firebase/firestore";



export const LoginPage = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {dispatch} = useContext(AuthContext)


    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const usercred = userCredential.user;

          console.log("Attempted login",usercred)
      
          // fetch user details from Firebase
          const userDoc = await getDoc(doc(db, "Users", usercred.uid));
          const user = userDoc.data();
          console.log("user data", user)
      
          // update user state with fetched details
          dispatch({ type: "LOGIN", payload: {...usercred, user} });
      
          navigate("dashboard");
        } catch (error) {
            console.log("Error", error)
          dispatch({ type: "LOGIN_ERROR", payload: error.message });
          setError(true);
        }
      };
      


    return (
        <div className="login-page">
            <div className="left-column" style={{ backgroundImage: `url(${background})` }}>
                <div className="content">

                    <h1>New Here?</h1>
                    <p>Sign up and discover a great amount of new opportunities.</p>
                    <button className="sign-up-button" to="../signup">Sign Up</button>
                </div>
            </div>


            <div className="right-column login-form">
                <img src={logo} />
                <h1>Login in to Your Account</h1>
                <div className="social-buttons">
                    <img src={facebook} />
                    <img src={google} />

                </div>
                <p>or</p>
                <br />
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email...." onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password...." onChange={e => setPassword(e.target.value)} />
                    <button className="button">Login</button>
                    <div>
                        <a href="#">Forgot your password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
