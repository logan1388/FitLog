import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../store/actions';
import { connect } from 'react-redux';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.demo = this.demo.bind(this); 
        this.state = {
            email: '',
            password: ''
        }
    }
    
    demo = () => {
        console.log("Demo!");
        this.props.history.push('/Dashboard');
    }

    emailChange = (e) => {
        this.setState({email: e.target.value});
    }
    passwordChange = (e) => {
        this.setState({password: e.target.value});
    }

    login = () => {
        //console.log(formData);
        let u = localStorage.getItem('user');
        if(u){
            this.props.history.push('/Dashboard');
        }
        else{
            this.props.dispatch(login(this.state.email, this.state.password, this.props.history));
        }
    }

    render(){
        return (
            <div>
                <div className='landing-container'>
                    <div className="SignInContainer">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" value={this.state.email} onChange={this.emailChange} placeholder="email" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" value={this.state.password} onChange={this.passwordChange} placeholder="password" />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
                              </div>
                                <div className="form-group">
                                    <input id='LoginBtn' type="submit" value="Login" onClick={this.login} className="btn float-right login_btn" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<Link id='SignUp' to='/Register'>Sign Up</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link id='ForgotPwd' to='/Register'>Forgot your password?</Link>
                            </div>
                        </div>
                        <div className="form-group">
                            <input id='DemoBtn' type="submit" value="Demo" className="btn" onClick={this.demo}/>
                        </div>
                    </div>          
                    </div>             
                </div>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isAuthenticated: state.isAuthenticated
    }
};

export default connect(mapStateToProps)(Landing);