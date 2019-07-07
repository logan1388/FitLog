import React from 'react';
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='landing-container'>
            <h2 className='title'><Link to='/'>FITLOG</Link></h2>
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <input type="text" className="form-control" placeholder="Full Name" />
                        </div>
                        <div className="input-group form-group">
                            <input type="text" className="form-control" placeholder="User Name" />
                        </div>
                        <div className="input-group form-group">
                            <input type="text" className="form-control" placeholder="Email" />
                        </div>
                        <div className="input-group form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input id='RegisterBtn' type="submit" value="Register" className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;