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
        this.setState({ sideNav: !this.state.sideNav })
        console.log(this.state.sideNav);
    }
    render() {
        let user = localStorage.getItem('user');
        return (
            <Fragment>
                <nav className="navbar navbar-dark bg-dark p-0">
                    <div id='nav-icon4' onClick={this.toggleNav} className={this.state.sideNav ? 'open ': '' + 'd-block d-sm-none'}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {this.props.user.id || user ?
                        <Fragment>
                            <div className='NavTitle h2'><Link to='/Dashboard'>FITLOG</Link></div>
                            <div className='d-none d-sm-block'>
                                <span className='NavOptions m-3'><Link to='/Progress'>Progress</Link></span>
                                <span className='NavOptions m-3'><Link to='/Activity'>Activity</Link></span>
                            </div>
                            <div id='NavLinks'>
                                <span onClick={this.logOut}><Link to='/'><i className="fa fa-user fa-2x"></i></Link></span>
                            </div>
                            {this.state.sideNav &&
                                <div id="mySidenav" className="sidenav d-block d-sm-none">
                                    <Link to='/Progress'>Progress</Link>
                                    <Link to='/Activity' onClick={this.toggleNav}>Activity</Link>
                                </div>}
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