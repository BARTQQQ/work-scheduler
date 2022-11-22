import React from 'react';
import { FaUserPlus, FaUser} from 'react-icons/fa';
import { MdAlternateEmail, MdLock } from 'react-icons/md';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice'
import ReactLoading from 'react-loading';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surrname: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, surrname, email, password, password2 } = formData

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

        if(password !== password2){
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                surrname,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    return (
        <div className="user">
            <header className='user-header'><FaUserPlus className="icon register"/><h1>New account</h1></header>
            {isLoading ? <ReactLoading className='loading' type="bubbles" color="#212529" /> : 
            <section className="user-register">
                <form onSubmit={onSubmit}>
                <div className="input name">
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Name"
                        />
                        <label htmlFor="name" data-type="register">
                                <p><FaUser/></p>
                        </label>
                    </div>
                    <div className="input surrname">
                        <input 
                            type="text"
                            id="surrname"
                            name="surrname"
                            value={surrname}
                            onChange={onChange}
                            placeholder="Surrname"
                        />
                        <label htmlFor="surrname" data-type="register">
                                <p><FaUser/></p>
                        </label>
                    </div>
                    <div className="input">
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                        />
                        <label htmlFor="email" data-type="register">
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
                        <label htmlFor="password" data-type="register">
                                <p><MdLock/></p>
                        </label>
                    </div>
                    <div className="input">
                        <input 
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            placeholder="Confirm password"
                        />
                        <label htmlFor="password2" data-type="register">
                                <p><MdLock/></p>
                        </label>
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p className=''>Have an accout? <Link to="/login" data-type="login">login</Link></p>
            </section>}
           
        </div>
    )
}

export default Register
