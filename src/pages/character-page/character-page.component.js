import { createStructuredSelector } from 'reselect';
import Gochi from '../../components/gochi/gochi.component';
import Item from '../../components/item/item.component';
import Poop from '../../components/poop/poop.component';
import Need from '../../components/need/need.component';
import InteractionMenu from '../../components/interaction-menu/interaction-menu.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import './character-page.styles.scss';
import ProgressBar from '../../components/progress-bar/progress-bar.component';
import { xpSystem } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const CharacterPage = ({ currentUser }) => {
    const { gochiName, type, boredom, hunger, thirst, level, natureCalls, sleepiness, xp } = currentUser

    return (
        <section className='split'>
            <div className='character-screen'>
                <div className='card' >
                    <div className='image-box'>
                        <Item />
                        <Need />
                        <Gochi />
                        <Poop />
                        
                    </div>
                </div>
            </div>
            <div className='interaction-screen'>
                <div className='menu'>
                    <InteractionMenu />
                </div>
                <div className='stats'>
                    <div className='stat-box'>
                        <span>Name:</span>
                        <span>{gochiName}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Type:</span>
                        <span>{type}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Level:</span>
                        <span>{level}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Experience:</span>
                        <ProgressBar currentValue={xp} maxValue={xpSystem[level]}/>
                    </div>
                    <div className='stat-box'>
                        <span>Boredom: </span>
                        <ProgressBar currentValue={boredom} maxValue={100}/>
                    </div>
                    <div className='stat-box'>
                        <span>Sleepiness:</span>
                        <ProgressBar currentValue={sleepiness} maxValue={100}/>
                    </div>
                    <div className='stat-box'>
                        <span>Hunger:</span>
                        <ProgressBar currentValue={hunger} maxValue={100}/>
                    </div>
                    <div className='stat-box'>
                        <span>Thirst:</span>
                        <ProgressBar currentValue={thirst} maxValue={100}/>
                    </div>
                    <div className='stat-box'>
                        <span>Nature Calls:</span>
                        <ProgressBar currentValue={natureCalls} maxValue={100}/> 
                    </div>
                </div>

            </div>

        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(CharacterPage);