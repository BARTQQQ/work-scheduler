import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdAlternateEmail, MdLock } from 'react-icons/md';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice'
import ReactLoading from 'react-loading';




const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
    
        if (isSuccess || user) {
            navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    return (
        <div className="user">
            <header className="user-header"><FaUser className="icon login"/><h1>Login</h1></header>
            {isLoading ? <ReactLoading className='loading' type="bubbles" color="#212529" /> : 
            <section className="user-login">
                <form onSubmit={onSubmit}>
                    <div className="input">
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                        />
                        <label htmlFor="email" data-type="login">
                                <p><MdAlternateEmail/></p>
                        </label>
                    </div>
                    <div className="input">
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                        />
                        <label htmlFor="password" data-type="login">
                                <p><MdLock/></p>
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className=''>Need an accout? <Link to="/register" data-type="register">sign up</Link></p>
            </section>}
        </div>
    )
}

export default Login
