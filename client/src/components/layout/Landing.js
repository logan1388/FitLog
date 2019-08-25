import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.demo = this.demo.bind(this); 
    }
    demo = () => {
        console.log("Demo!");
        this.props.history.push('/Dashboard');
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
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="username" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password" />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
                              </div>
                                <div className="form-group">
                                    <input id='LoginBtn' type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
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

export default Landing;