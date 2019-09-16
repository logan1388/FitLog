import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';

class Header extends Component {
    constructor(props){
        super(props)
    }
    logOut = () => {
        this.props.dispatch(logout());
    }
    render(){
        return (
            <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div id='HamburgerIcon'>
                    <span className='line'></span>
                    <span className='line'></span>
                    <span className='line'></span>
                </div>
                <span className='NavTitle h2'><Link to='/Dashboard'>FITLOG</Link></span>
                {this.props.isAuthenticated ? <div id='NavLinks'>
                    <span onClick={this.logOut}><Link to='/'><i className="fa fa-user fa-2x"></i></Link></span>
                </div> : null}
            </nav>
        </Fragment>  
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(Header);