import './progress-bar.styles.scss';

const ProgressBar = ({ currentValue, maxValue }) => {
    const percentage = currentValue / (maxValue / 100)
    return (
        <div className="progress-bar">
            <div className="filler" style={{ width: `${percentage}%` }}>
            </div>
            <span>{currentValue}</span>
        </div>
    );
}

export default ProgressBar;