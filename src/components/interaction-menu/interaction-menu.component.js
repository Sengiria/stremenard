import { Link } from 'react-router-dom';
import './interaction-menu.styles.scss';
import { FaWineBottle, FaPizzaSlice } from "react-icons/fa";
import { GiBroom, GiAlarmClock, GiTennisBall } from "react-icons/gi";
import { signOut, updateGochi, auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { ImExit } from "react-icons/im";
import { setCurrentAnimation, setCurrentItem, toggleItemVisible } from '../../redux/gochi/gochi.actions';

const InteractionMenu = ({ currentUser, setCurrentAnimation, toggleItemVisible, setCurrentItem }) => {
    const { name, type, boredom, hunger, thirst, level, natureCalls, sleepiness, xp } = currentUser

    const switchAnimation = (anim) => {
        setCurrentAnimation(anim)
        toggleItemVisible()
        setTimeout(() => {
            setCurrentAnimation('walk')
            toggleItemVisible()
            setCurrentItem('')
        }, 2000);
    }
    const feedGochi = e => {
        e.preventDefault()
        const newValue = hunger + 20
        if (newValue >= 0) {
            setCurrentItem('pizza.png')
            updateGochi(currentUser.id, 'hunger', newValue, xp, level, 20)
            switchAnimation('happy')

        }
    }
    const giveGochiWater = () => {
        const newValue = thirst - 20
        if (newValue >= 0) {
            setCurrentItem('water.png')
            updateGochi(currentUser.id, 'thirst', newValue, xp, level, 20)
            switchAnimation('happy')

        }
    }
    const playWithGochi = () => {
        const newValue = boredom - 20
        if (newValue >= 0) {
            setCurrentItem('ball.png')
            updateGochi(currentUser.id, 'boredom', boredom, xp, level, 50)
            switchAnimation('jump')
        }
    }
    const cleanGochi = () => {
        const newValue = natureCalls - 20
        if (newValue >= 0) {
            setCurrentItem('broom.png')
            updateGochi(currentUser.id, 'natureCalls', newValue, xp, level, 10)
            switchAnimation('bigjump')
        }
    }
    const wakeGochi = () => {
        const newValue = sleepiness - 20
        if (newValue >= 0)
        setCurrentItem('clock.png')
        updateGochi(currentUser.id, 'sleepiness', newValue, xp, level, 0)
    }
    const sleep = () => {

    }

    const naturesCall = () => {

    }

    return (
        <div className="navigation" >
            <ul>
                <li onClick={feedGochi} className='list'>
                    <Link to="#"  >
                        <span className='icon'><FaPizzaSlice /></span>
                        <span className='title'>Food</span>
                    </Link>
                </li>
                <li className='list'>
                    <Link to="#" onClick={giveGochiWater}>
                        <span className='icon'><FaWineBottle /></span>
                        <span className='title'>Water</span>
                    </Link>
                </li>
                <li className='list'>
                    <Link to="#" onClick={wakeGochi}>
                        <span className='icon'><GiAlarmClock /></span>
                        <span className='title'>Alarm</span>
                    </Link>
                </li>
                <li className='list'>
                    <Link to="#" onClick={cleanGochi}>
                        <span className='icon'><GiBroom /></span>
                        <span className='title'>Clean</span>
                    </Link>
                </li>
                <li className='list'>
                    <Link to="#" onClick={playWithGochi}>
                        <span className='icon'><GiTennisBall /></span>
                        <span className='title'>Play</span>
                    </Link>
                </li>
                <li className='list'>
                    <Link to="#" onClick={()=>auth.signOut()}>
                        <span className='icon'><ImExit /></span>
                        <span className='title'>Exit</span>
                    </Link>
                </li>
            </ul>

        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentAnimation: (anim) => dispatch(setCurrentAnimation(anim)),
    toggleItemVisible: () => dispatch(toggleItemVisible()),
    setCurrentItem: (item) => dispatch(setCurrentItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(InteractionMenu);