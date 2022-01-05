import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCurrentAnimation } from '../../redux/gochi/gochi.selector';
import './gochi.styles.scss';

const Gochi = ({currentUser, currentAnimation}) => {
    const {type} = currentUser

    return ( 
        <img
        className='gochi' 
        src={`images/characters/${type}/${currentAnimation}.gif`} />
     );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentAnimation: selectCurrentAnimation
})
 
export default connect(mapStateToProps)(Gochi);