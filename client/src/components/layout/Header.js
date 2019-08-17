import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div id='HamburgerIcon'>
                    <span className='line'></span>
                    <span className='line'></span>
                    <span className='line'></span>
                </div>
                <span className='NavTitle h2'><Link to='/'>FITLOG</Link></span>
                <div id='NavLinks'>
                    <span><Link to='/Dashboard'>Workouts</Link></span>
                </div>
            </nav>
        </Fragment>  
    )
}

export default Header;