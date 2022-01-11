import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNeed, selectNeedVisible } from '../../redux/gochi/gochi.selector';
import './need.styles.scss';

const Need = ({ needVisible, need }) => {
    return (
        <div className='need-box'>
            <img className={`${needVisible ? "active " : ""}need`} alt="need" src={`stremenard/images/think.png`} />
            <span className={`${needVisible ? "active " : ""}need`}>{need}</span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    needVisible: selectNeedVisible,
    need: selectNeed
})

export default connect(mapStateToProps)(Need);