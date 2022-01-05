import { connect } from 'react-redux';
import './poop.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectPoopVisible } from '../../redux/gochi/gochi.selector';

const Poop = ({poopVisible}) => {
    return (
        <div className='poop-box'>
            <img className={`${poopVisible ? "active " : ""}poop`} alt="need" src={`stremenard/images/poop.png`} />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    poopVisible: selectPoopVisible
})

export default connect(mapStateToProps)(Poop);