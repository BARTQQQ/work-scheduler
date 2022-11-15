import React from 'react';
import { ReactComponent as UserRegister } from './icons/user-register.svg'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surrname: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, surrname, email, password, password2 } = formData

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
            <header><UserRegister className="icon register"/><h1>New account</h1></header>
            <section className="user-register">
                <form onSubmit={onSubmit}>
                    <label htmlFor="name" id='name'>
                        <p>Name</p>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                    </label>
                    <label htmlFor="surrname" id='surrname'>
                        <p>Surrname</p>
                        <input 
                            type="text"
                            id="surrname"
                            name="surrname"
                            value={surrname}
                            onChange={onChange}
                        />
                    </label>
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
                    <label htmlFor="password2">
                        <p>Confirm password</p>
                        <input 
                            type="text"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                        />
                    </label>
                    <button type="submit">Register</button>
                </form>
                <p className=''>Have an accout? <Link to="/">login</Link></p>
            </section>
        </div>
    )
}

export default Register
