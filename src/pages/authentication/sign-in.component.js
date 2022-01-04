import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPass, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss'

const SignIn = () => {

    const [user, setUser] = useState({ displayName: '', email: '', password: '', passwordAgain: '' })
    const [hasAccount, setHasAccount] = useState(false)

    const handleChange = e => {
        const { value, name } = e.target
        setUser(prevState => ({ ...prevState, [name]: value }))
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const { displayName, email, password, passwordAgain } = user

        if(hasAccount){
            try {
                await signInWithEmailAndPass(email, password)
                setUser({ email: '', password: '' })
            } catch (error) {
                console.log(error)
            }
        } else {

        }
        

    }

    return (
        <section>
            <div className="image-box">
                <img src="images/login.jpg" alt="login" />
            </div>
            <div className="content-box">
                <div className="form-box">

                    <h2>{hasAccount ? "Login" : "Register"}</h2>
                    <form onSubmit={handleSubmit}>
                        {
                            !hasAccount &&
                            (

                                <div className="input-box">
                                    <span>Display Name</span>
                                    <input
                                        type="username"
                                        name="displayName"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )
                        }
                        <div className="input-box">
                            <span>E-mail</span>
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {
                            !hasAccount &&
                            (

                                <div className="input-box">
                                    <span>Password Again</span>
                                    <input
                                        type="password"
                                        name="passwordAgain"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )
                        }
                        {
                            hasAccount &&
                            (
                                <div className="remember">
                                    <input type="checkbox" name="" /> <label>Remember me</label>
                                </div>
                            )
                        }
                        <div className="input-box">
                            <input
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        {
                            hasAccount &&
                            (
                                <div className="input-box">
                                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                                </div>
                            )
                        }

                    </form>
                    {
                            hasAccount &&
                            (
                                <>
                                <h3>Login with Social media</h3>
                                <ul className='sci'>
                                    <li><img onClick={signInWithGoogle} src="images/google.png" alt="google" /></li>
                                    <li><img src="images/facebook.png" alt="facebook" /></li>
                                </ul>
                                </>
                            )
                        }
                </div>

            </div>

        </section>
    );
}

export default SignIn;