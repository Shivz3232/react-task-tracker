import PropTypes from 'prop-types'

function Button({ color, text, onClick }) {
    return (
        <div>
            <button onClick={onClick} className='btn' style={{ backgroundColor: color }}>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: "steelblue",
    text: "Click Me"
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
