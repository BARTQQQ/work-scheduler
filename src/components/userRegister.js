import React from 'react';
import {ReactComponent as UserRegister} from './icons/user-register.svg'
import {
    Link
} from "react-router-dom";

const Register = () => {

    return (
        <div className="user">
            <header><UserRegister className="icon register"/><h1>New account</h1></header>
            <section className="user-register">
                <form action="" method="POST">
                    <label htmlFor="user-name" id='name'>
                        <p>Name</p>
                        <input id="user-name" type="text"/>
                    </label>
                    <label htmlFor="user-surrname" id='surrname'>
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
                    <input type="submit" value="Register" />
                </form>
                <p className=''>Have an accout? <Link to="/">login</Link></p>
            </section>
        </div>
    )
}

export default Register
