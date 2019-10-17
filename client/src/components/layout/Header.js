import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';

class Header extends Component {

    logOut = () => {
        this.props.dispatch(logout());
    }
    render(){
        let user = localStorage.getItem('user');
        return (
            <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div id='HamburgerIcon'>
                    <span className='line'></span>
                    <span className='line'></span>
                    <span className='line'></span>
                </div>
                {this.props.user.id || user ? 
                <Fragment><span className='NavTitle h2'><Link to='/Dashboard'>FITLOG</Link></span>
                <div id='NavLinks'>
                    <span onClick={this.logOut}><Link to='/'><i className="fa fa-user fa-2x"></i></Link></span>
                </div> </Fragment> : <Fragment><span className='NavTitle-center h2'><Link to='/'>FITLOG</Link></span></Fragment>}
            </nav>
        </Fragment>  
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);