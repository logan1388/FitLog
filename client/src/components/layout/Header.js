import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <span className='NavTitle h2'><Link to='/'>FITLOG</Link></span>
            </nav>
        </Fragment>  
    )
}

export default Header;