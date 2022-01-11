import { Link } from 'react-router-dom';
import './interaction-menu.styles.scss';
import { FaWineBottle, FaPizzaSlice } from "react-icons/fa";
import { GiBroom, GiAlarmClock, GiTennisBall } from "react-icons/gi";
import { updateGochi, auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { ImExit } from "react-icons/im";
import { setCurrentAnimation, setCurrentItem, setNeed, toggleAsleep, toggleItemVisible, toggleNeedVisible, togglePoopVisible } from '../../redux/gochi/gochi.actions';
import { useEffect, useState } from 'react';
import { selectAsleep, selectPoopVisible } from '../../redux/gochi/gochi.selector';
import { signOutStart } from '../../redux/user/user.actions';

const InteractionMenu = ({ currentUser, asleep, poopVisible,
    setCurrentAnimation, setNeed, toggleItemVisible, toggleAsleep,
    togglePoopVisible, toggleNeedVisible, setCurrentItem, signOutStart }) => {

    const { boredom, hunger, thirst, level, natureCalls, sleepiness, xp } = currentUser
    const [disabled, setDisabled] = useState(false)

    // increase stats by minute
    useEffect(() => {
        let seconds = 0
        let myInterval = setInterval(() => {
            console.log(disabled)
            if (seconds < 60) {
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                increaseStats()
                clearInterval(myInterval)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    // rnd sleep and nature's call
    useEffect(() => {
        let rnd
        let myInterval
        if (!asleep) {
            myInterval = setInterval(() => {
                rnd = Math.floor(Math.random() * 100);
                if (100 >= rnd && rnd >= 97) {
                    sleep()
                }
                else if (96 >= rnd && rnd >= 86) {
                    naturesCall()
                }
            }, 5000)
        }

        return () => {
            clearInterval(myInterval);
        };
    }, [asleep]);


    // needs visible
     useEffect(() => {
         if (boredom === 100) {
             setNeed("I'm soooo boooored!")
             toggleNeedVisible()
             setTimeout(() => {
                 toggleNeedVisible()
             }, 3000);
         }
         if (hunger === 100) {
             setNeed("I'm starving!")
             toggleNeedVisible()
             setTimeout(() => {
                 toggleNeedVisible()
             }, 3000);
         }
         if (thirst === 100) {
             setNeed("I'm thirsty!")
             toggleNeedVisible()
             setTimeout(() => {
                 toggleNeedVisible()
             }, 3000);
         }
 
     }, [boredom, hunger, thirst])

    const switchAnimation = (anim) => {
        setCurrentAnimation(anim)
        toggleItemVisible()
        setDisabled(true)
        setTimeout(() => {
            setCurrentAnimation('walk')
            toggleItemVisible()
            setCurrentItem('')
            setDisabled(false)
        }, 2000);
    }
    const feedGochi = e => {
        const newHunger = hunger - 10
        const newValue = { hunger: newHunger }

        if (!disabled) {
            if (poopVisible) {
                setNeed("Clean me first!")
                toggleNeedVisible()
                setTimeout(() => {
                    toggleNeedVisible()
                }, 3000);
            } else if (newHunger >= 0) {
                setCurrentItem('pizza.png')
                updateGochi(currentUser.id, newValue, xp, level, 20)
                switchAnimation('happy')
            }
        }

    }
    const giveGochiWater = e => {
        const newThirst = thirst - 10
        const newValue = { thirst: newThirst }

        if (!disabled) {
            if (poopVisible) {
                setNeed("Clean me first!")
                toggleNeedVisible()
                setTimeout(() => {
                    toggleNeedVisible()
                }, 3000);
            } else if (newThirst >= 0 && natureCalls <= 100) {
                setCurrentItem('water.png')
                updateGochi(currentUser.id, newValue, xp, level, 20)
                switchAnimation('happy')
            }
        }
    }
    const playWithGochi = e => {
        const newBoredom = boredom - 10
        const newValue = { boredom: newBoredom }

        if (!disabled) {
            if (poopVisible) {
                setNeed("Clean me first!")
                toggleNeedVisible()
                setTimeout(() => {
                    toggleNeedVisible()
                }, 3000);
            } else if (newBoredom >= 0) {
                updateGochi(currentUser.id, newValue, xp, level, 50)
                setCurrentItem('ball.png')
                switchAnimation('jump')
            }
        }
    }
    const cleanGochi = e => {
        if (!disabled) {
            if (poopVisible) {
                setCurrentItem('broom.png')
                updateGochi(currentUser.id, null, xp, level, 10)
                switchAnimation('bigJump')
                togglePoopVisible()
            }
        }
    }
    const wakeGochi = e => {
            if (asleep) {
                toggleAsleep()
                switchAnimation('wakeUp')
                setCurrentItem('clock.png')
                setDisabled(false)
            }
    }
    const sleep = () => {
        setCurrentItem('sleep.png')
        setCurrentAnimation('sleep')
        toggleAsleep()
        setDisabled(true)
    }
    const naturesCall = () => {
        switchAnimation('naturesCall')
        setCurrentItem('toilet.png')
        if(!poopVisible) togglePoopVisible()
    }

    const increaseStats = () => {
        const stats = { boredom: boredom + 10, hunger: hunger + 5, thirst: thirst + 2 }
        const newValue = {}

        Object.entries(stats).map(([k, v]) => {
            if (v <= 100)
                newValue[k] = v
        })

        if (newValue !== {}) {
            updateGochi(currentUser.id, newValue, xp, level, 0)
        }
    }

    return (
        <div className="navigation" >
            <ul>
                <li className='list'>
                    <Link to="#" onClick={feedGochi} >
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
                    <Link to="#" onClick={signOutStart}>
                        <span className='icon'><ImExit /></span>
                        <span className='title'>Exit</span>
                    </Link>
                </li>
            </ul>

        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    asleep: selectAsleep,
    poopVisible: selectPoopVisible
})

const mapDispatchToProps = dispatch => ({
    setCurrentAnimation: (anim) => dispatch(setCurrentAnimation(anim)),
    signOutStart: () => dispatch(signOutStart()),
    toggleItemVisible: () => dispatch(toggleItemVisible()),
    togglePoopVisible: () => dispatch(togglePoopVisible()),
    setCurrentItem: (item) => dispatch(setCurrentItem(item)),
    toggleAsleep: () => dispatch(toggleAsleep()),
    toggleNeedVisible: () => dispatch(toggleNeedVisible()),
    setNeed: (need) => dispatch(setNeed(need))
})

export default connect(mapStateToProps, mapDispatchToProps)(InteractionMenu);