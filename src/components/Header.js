import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation();
    
    return (
        <div className='header'>
            <h1>{ title }</h1>
            {location.pathname === '/' && <Button onClick={onAdd} color={showAdd ? "red": "green"} text={showAdd ? "Close": "Add"}/>}
        </div>
    );
};

Header.defaultProps = {
    title: "Task Tracker"
};

Header.propTypes = {
    title: PropTypes.string
}

export default Header;