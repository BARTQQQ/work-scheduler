import React from 'react';
import {ReactComponent as UserLogin} from './icons/user-login.svg'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className="user">
            <header><UserLogin className="icon login"/><h1>Login</h1></header>
            <section className="user-login">
                <form action="" method="POST">
                <label htmlFor="email">
                        <p>Email</p>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p className=''>Need an accout? <Link to="/register">sign up</Link></p>
            </section>
        </div>
    )
}

export default Login
