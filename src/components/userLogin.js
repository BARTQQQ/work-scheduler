import React from 'react';
import {ReactComponent as UserLogin} from './icons/user-login.svg'
import {
    Link
} from "react-router-dom";


const Login = () => {

    return (
        <div className="user">
            <header><UserLogin className="icon login"/><h1>Login</h1></header>
            <section className="user-login">
                <form action="" method="POST">
                    <label htmlFor="user-name">
                        <p>Email</p>
                        <input id="user-name" type="email"/>
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input id="password" type="password"/>
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <p className=''>Need an accout? <Link to="/register">sign up</Link></p>
            </section>
        </div>
    )
}

export default Login
