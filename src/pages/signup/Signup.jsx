import React, {useState} from 'react'
import './signup.scss'
import { logo, background } from '../../constants/images'
import { facebook, google } from '../../constants/icons'
import { signUpWithEmailAndPassword } from '../../utils'




export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [acctype, setAccType] = useState('Owner');


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Email", email)
        try {
          const user = await signUpWithEmailAndPassword(email, password, phoneNumber,acctype);
          console.log('User created:', user);
          // Redirect to the dashboard
          // Replace '/dashboard' with the URL of your dashboard
          //window.location.href = '/';
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="login-page">
            <div className="left-column" style={{ backgroundImage: `url(${background})` }}>
                <div className="content">

                    <h1>Already have an account?</h1>
                    <p>Login in here and access property management features.</p>
                    <button className="sign-up-button">Login</button>
                </div>
            </div>


            <div className="right-column login-form">
                <img src={logo} />
                <h1>Sign up for an account</h1>
                <div className="social-buttons">
                    <img src={facebook} />
                    <img src={google} />

                </div>
                <p>or</p>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input  type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <input type="tel" placeholder="Phone number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    
                    <button className="button" type="submit" >Sign up</button>
                </form>
            </div>
        </div>
    )
}
