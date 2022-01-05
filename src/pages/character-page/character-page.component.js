import { createStructuredSelector } from 'reselect';
import Gochi from '../../components/gochi/gochi.component';
import Item from '../../components/item/item.component';
import Poop from '../../components/poop/poop.component';
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
            <div className='character-screen'
                style={{
                    background: "url('images/character-bg.jpg')"
                }}>
                <div className='card' >
                    <div className='image-box'>
                        <Item />
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
                        <span>Name: {gochiName}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Type: {type}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Experience: <ProgressBar currentValue={xp} maxValue={xpSystem[level]}/> </span>
                    </div>
                    <div className='stat-box'>
                        <span>Level: {level}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Boredom: {boredom}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Sleepiness: {sleepiness}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Hunger: {hunger}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Thirst: {thirst}</span>
                    </div>
                    <div className='stat-box'>
                        <span>Nature Calls: {natureCalls}</span>
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