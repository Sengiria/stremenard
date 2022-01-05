import { connect } from 'react-redux';
import './item.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCurrentItem, selectItemVisible } from '../../redux/gochi/gochi.selector';

const Item = ({itemVisible, currentItem}) => {
    return (
        <div className='item-box'>
            <img className={`${itemVisible ? "active " : ""}item`} alt="item" src={`images/${currentItem}`} />
        </div>

    );
}

const mapStateToProps = createStructuredSelector({
    itemVisible: selectItemVisible,
    currentItem: selectCurrentItem
})

export default connect(mapStateToProps)(Item);