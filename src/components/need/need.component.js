import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNeedVisible } from '../../redux/gochi/gochi.selector';
import './need.styles.scss';

const Need = ({ needVisible, text }) => {
    return (
        <div className='need-box'>
            <img className={`${needVisible ? "active " : ""}need`} alt="need" src={`images/think.png`} />
            <span className={`${needVisible ? "active " : ""}need`}>{text}</span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    needVisible: selectNeedVisible
})

export default connect(mapStateToProps)(Need);