import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCurrentAnimation } from '../../redux/gochi/gochi.selector';
import './gochi.styles.scss';

const Gochi = ({currentUser, currentAnimation}) => {
    const {type} = currentUser

    return ( 
        <div className='gochi-box'>
        <img
        className='gochi' 
        src={`stremenard/images/characters/${type}/${currentAnimation}.gif`} />
        </div>
     );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentAnimation: selectCurrentAnimation
})
 
export default connect(mapStateToProps)(Gochi);