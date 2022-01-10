import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup, createUserProfileDocument } from '../../firebase/firebase.utils';
import { toggleHasAccount, signInStart } from '../../redux/user/user.actions';
import { selectError, selectHasAccount } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './sign-in.styles.scss'
import { useNavigate } from 'react-router-dom';

const SignIn = ({ toggleHasAccount, hasAccount, signInStart, error }) => {
    let navigate = useNavigate()
    const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', passwordAgain: '' })
    const [gochi, setGochi] = useState({gochiName: '', type: ''})

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
        setGochi({ ...gochi, gochiName: value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const { displayName, email, password, passwordAgain } = userCredentials

        if (hasAccount) {
            signInStart(email, password);
                //setUserCredentials({ email: '', password: '' })

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
                    navigate('/stremenard')
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
                    <h3>{error}</h3>
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
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    hasAccount: selectHasAccount,
    error: selectError
});

const mapDispatchToProps = dispatch => ({
    toggleHasAccount: () => dispatch(toggleHasAccount()),
    signInStart: (email, password) => dispatch(signInStart({email, password}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

