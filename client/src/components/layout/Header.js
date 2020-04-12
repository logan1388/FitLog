import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: false
        }
    }
    logOut = () => {
        this.props.dispatch(logout());
    }
    toggleNav = () => {
        this.setState({sideNav: !this.state.sideNav})
        console.log(this.state.sideNav);
    }
    render() {
        let user = localStorage.getItem('user');
        return (
            <Fragment>
                <nav className="navbar navbar-dark bg-dark">
                    <div id='HamburgerIcon' onClick={this.toggleNav}>
                        <span className='line'></span>
                        <span className='line'></span>
                        <span className='line'></span>
                    </div>
                    {this.state.sideNav &&
                        <div id="mySidenav" className="sidenav">
                            <a href="javascript:void(0)" className="closebtn" onClick={this.toggleNav}>&times;</a>
                            <a href="#">Progress</a>
                            <a href="#">Activity</a>
                        </div>}
                    {this.props.user.id || user ?
                        <Fragment>
                            <span className='NavTitle h2 mb-0'><Link to='/Dashboard'>FITLOG</Link></span>
                            <div>
                                <span className='NavOptions m-3'><Link to='/Progress'>Progress</Link></span>
                                <span className='NavOptions m-3'><Link to='/Activity'>Activity</Link></span>
                            </div>
                            <div id='NavLinks'>
                                <span onClick={this.logOut}><Link to='/'><i className="fa fa-user fa-2x"></i></Link></span>
                            </div>
                        </Fragment> : <Fragment><span className='NavTitle-center h2'><Link to='/'>FITLOG</Link></span></Fragment>}
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