import React from 'react';

const Login = () => {

    return (
        <div className="user">
            <div className="user-login">
                <form action="" method="POST">
                    <h1>Login</h1>
                    <label htmlFor="user-name">
                        <p>Username</p>
                        <input id="user-name" type="text"/>
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input id="password" type="password"/>
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <p className=''>Need an accout? <a href="">sign up</a></p>
            </div>
        </div>
    )
}

export default Login
