import React, { Component } from 'react';
import { register } from '../../store/actions';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            validationMsg: ''
        };
        
    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    }
    usernameChange = (e) => {
        this.setState({username: e.target.value});
    }
    emailChange = (e) => {
        this.setState({email: e.target.value});
    }
    passwordChange = (e) => {
        this.setState({password: e.target.value});
    }
    confirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.target.value});
    }

    validation = () => {
        if(this.state.password !== this.state.confirmPassword){
            this.setState({validationMsg: "Passwords doesn't match"});
            return false;
        }
        else
            return true;
    }

    register = (e) => {
        e.preventDefault();
        if(this.validation())
            this.props.dispatch(register(this.state.name, this.state.username, this.state.email, this.state.password, this.props.history));
    }
    render(){
        return (
            <div className='landing-container'>
                <div className={"card " + (this.state.validationMsg ? "RegisterCardWithValidationText" : "RegisterCardContainer")}>
                    <span>{this.state.validationMsg}</span>
                    <div className="card-header">
                        <h3>Sign Up</h3>
                    </div>
                    <div id="RegisterFieldsContainer" className="card-body">
                        <form onSubmit={this.register}>
                            <div className="input-group form-group">
                                <input required type="text" className="form-control" value={this.state.name} onChange={this.nameChange} placeholder="Full Name" />
                            </div>
                            <div className="input-group form-group">
                                <input required type="text" className="form-control" value={this.state.username} onChange={this.usernameChange} placeholder="User Name" />
                            </div>
                            <div className="input-group form-group">
                                <input required type="text" className="form-control" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                            </div>
                            <div className="input-group form-group">
                                <input required type="password" className="form-control" value={this.state.password} onChange={this.passwordChange} placeholder="Password" />
                            </div>
                            <div className="input-group form-group">
                                <input required type="password" className="form-control" value={this.state.confirmPassword} onChange={this.confirmPasswordChange} placeholder="Confirm Password" />
                            </div>
                            <div id="RegisterBtnContainer" className="form-group">
                                <input required id='RegisterBtn' type="submit" value="Register" className="btn float-right register_btn" />
                            </div>
                        </form>
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

export default connect(mapStateToProps)(Register);