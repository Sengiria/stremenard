import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './pages/authentication/sign-in.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React, {Component} from 'react';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import CharacterPage from './pages/character-page/character-page.component';

class App extends Component {
  constructor(props){
    super(props)
  }
  unsubscribeFromAuth = null
  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
     if( userAuth ) {
       const userRef = await createUserProfileDocument(userAuth)
 
       this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
         setCurrentUser({
             id: snapShot.id,
             ...snapShot.data()
         })
       })
     } else {
       setCurrentUser( userAuth )
     }
    })
  }
 
  componentWillUnmount(){
   this.unsubscribeFromAuth();
   this.unsubscribeFromSnapshot();
  }

  render() { 
    const { currentUser } = this.props
    return ( 
      <div className="App">
      <Routes>
        <Route path="/stremenard/signin" element={currentUser ? <Navigate replace to="/stremenard" /> : <SignIn /> } />
        <Route path="/stremenard" element={currentUser ? <CharacterPage/> : <Navigate replace to="/stremenard/signin" />} />
      </Routes>
    </div>
     );
  }
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect( mapStateToProps, mapDispatchToProps )( App );


