import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPass, signInWithGoogle, signup, createUserProfileDocument } from '../../firebase/firebase.utils';
import { toggleHasAccount } from '../../redux/user/user.actions';
import { selectHasAccount } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './sign-in.styles.scss'

const SignIn = ({ toggleHasAccount, hasAccount }) => {

    const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', passwordAgain: '' })
    const [gochi, setGochi] = useState({name: '', type: ''})

    const handleChange = e => {
        const { value, name } = e.target
        setUserCredentials(prevState => ({ ...prevState, [name]: value }))
    }
    const pickGochi = e => {
        const { alt } = e.target
        setGochi({...gochi, type: alt })
    }
    const nameGochi = e => {
        const { value } = e.target
        setGochi({ ...gochi, name: value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const { displayName, email, password, passwordAgain } = userCredentials

        if (hasAccount) {
            try {
                await signInWithEmailAndPass(email, password)
                setUserCredentials({ email: '', password: '' })
            } catch (error) {
                console.log(error)
            }
        } else {
            if (password !== passwordAgain) {
                alert("passwords don't match!")
                return
            } else {
                try {
                    const { user } = await signup(email, password)

                    await createUserProfileDocument(user, gochi, { displayName })

                    this.setUserCredentials({
                        displayName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <section className='sign-in'>
            <div className="sign-in-image-box">
                <img src="images/login.jpg" alt="login" />
            </div>
            <div className="sign-in-content-box">
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
                                <>
                                <div className="input-box">
                                    <span>Password Again</span>
                                    <input
                                        type="password"
                                        name="passwordAgain"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span>Your gochi's name</span>
                                    <input
                                        type="username"
                                        name="gochi"
                                        onChange={nameGochi}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span>Pick one</span>
                                    <img onClick={pickGochi} className='starter-character' src="images/characters/raccoon/raccoon.png" alt="raccoon" />
                                    <img onClick={pickGochi} className='starter-character' src="images/characters/cat/cat.png" alt="cat" />
                                    <img onClick={pickGochi} className='starter-character' src="images/characters/sheep/sheep.png" alt="sheep" />
         
                                </div>
                                </>
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

                        <div className="input-box">
                            {
                                hasAccount ?
                                    <p>Don't have an account?<Link onClick={toggleHasAccount} to="#">Sign up</Link></p>
                                    :
                                    <p>I already have an account <Link onClick={toggleHasAccount} to="#">Sign in</Link></p>
                            }
                        </div>

                    </form>
                    {
                        hasAccount &&
                        (
                            <>
                                <h3>Login with Social media</h3>
                                <ul className='sci'>
                                    <li><img src="images/google.png" alt="google" /></li>
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

const mapStateToProps = createStructuredSelector({
    hasAccount: selectHasAccount
});

const mapDispatchToProps = dispatch => ({
    toggleHasAccount: () => dispatch(toggleHasAccount())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

