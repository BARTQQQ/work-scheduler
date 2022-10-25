import React from 'react';

const Register = () => {

    return (
        <div className="user">
            <div className="user-register">
                <form action="" method="POST">
                    <h1>Register</h1>
                    <label htmlFor="user-name">
                        <p>Name</p>
                        <input id="user-name" type="text"/>
                    </label>
                    <label htmlFor="user-surrname">
                        <p>Surrname</p>
                        <input id="user-surrname" type="text"/>
                    </label>
                    <label htmlFor="user-email">
                        <p>Email</p>
                        <input id="user-email" type="email"/>
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input id="password" type="password"/>
                    </label>
                    <label htmlFor="password-second">
                        <p>Repeat password</p>
                        <input id="password-second" type="password"/>
                    </label>
                    <input type="submit" value="Register" />
                </form>
            </div>
        </div>
    )
}

export default Register
