import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './pages/authentication/sign-in.component';
import React, {Component} from 'react';
import { checkUserSession } from './redux/user/user.actions';
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
    const { checkUserSession } = this.props;
    checkUserSession();
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
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect( mapStateToProps, mapDispatchToProps )( App );


