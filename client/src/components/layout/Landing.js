import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, registerReset, clearRegisterErrorMsg, clearLoginErrorMsg } from '../../store/actions';
import { connect } from 'react-redux';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.demo = this.demo.bind(this); 
        this.state = {
            email: '',
            password: ''
        }
        this.signInContent = null;
    }
    
    demo = () => {
        this.props.history.push('/Dashboard');
    }

    emailChange = (e) => {
        this.setState({email: e.target.value});
    }
    passwordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        if(!(this.state.email && this.state.password)){
            return;
        }
        let u = localStorage.getItem('user');
        if(u){
            this.props.history.push('/Dashboard');
        }
        else{
            this.props.dispatch(login(this.state.email, this.state.password, this.props.history));
        }
    }

    registerReset = () => {
        this.props.dispatch(registerReset());
    }

    componentDidMount = () => {
        this.props.dispatch(clearRegisterErrorMsg());
        this.props.dispatch(clearLoginErrorMsg());
    }

    render(){
        if(!this.props.register){
            this.signInContent = (
                <div className="SignInContainer">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <span id="loginValidationText">{this.props.loginError}</span>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input required type="text" className="form-control" value={this.state.email} onChange={this.emailChange} placeholder="email" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input required type="password" className="form-control" value={this.state.password} onChange={this.passwordChange} placeholder="password" />
                                </div>     
                                <div id="LoginBtnContainer" className="form-group">
                                    <input id='LoginBtn' type="submit" value="Login" onClick={this.login} className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer SignUpLink">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<Link id='SignUp' to='/Register'>Sign Up</Link>
                            </div>                     
                        </div>               
                    </div>          
                </div>  
            )
        }
        if(this.props.register){
            this.signInContent = (
                <div id="RegisterConfirmationContainer">
                    <div id="RegisterConfirmation" className="card">
                        <div className="card-header">
                            <span id="RegisterConfirmText">You are all set to log your fitness!</span>
                        </div>
                        <div id="RegisterBtnContainer" className="form-group">
                            <input required id='RegisterBtn' type="submit" value="Sign In" onClick={this.registerReset} className="btn float-right register_btn" />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className='landing-container'>
                    {this.signInContent}       
                </div>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        register: state.register,
        loginError: state.loginError
    }
};

export default connect(mapStateToProps)(Landing);