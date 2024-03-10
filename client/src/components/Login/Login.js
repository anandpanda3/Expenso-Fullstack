import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { authActions } from '../../store/slice/auth-slice';
import { useDispatch } from 'react-redux';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const data = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            // const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
            //     headers: {
            //         'Content-Type': 'application/json',

            //     }
            // })
            // if (response.data.idToken) {
            //     let token = response.data.idToken
            //     let email = response.data.email
            //     let data = {
            //         token: token,
            //         email: email
            //     }
            //     localStorage.setItem('token', token)
            //     alert('Login Successful!')

            // }

            // dispatch(getExpenseData())
            const response = await axios.post('http://localhost:4000/auth/login', data)

            alert('Login successful!')
            // let userEmail = response.data.data.userEmail
            // const userId=response.data.data.userId
            const userToken = response.data.data
            const userData = {
                token: userToken
            }
            dispatch(authActions.login(userData))
            localStorage.setItem('token', userToken)
            navigate('/')
        } catch (err) {
            console.log(err)
            alert(err.response.data)
        }
    }

    // const handleForgetPassword = async () => {
    //     try {
    //         // if (email != '') {
    //         //     const data = {
    //         //         requestType: 'PASSWORD_RESET',
    //         //         email: email
    //         //     }
    //         //     const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDKj1Lc9A0JYGLuOTbYEr8SD-7ChLkI1Ys', data, {
    //         //         headers: {
    //         //             'Content-Type': 'application/json',

    //         //         }
    //         //     })
    //         //     if (res.status == 200) {
    //         //         alert('Reset password link sent check your email.')
    //         //     }
    //         //     console.log(res)

    //         // }



    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    return (
        <div className='login'>

            <h3 className='auth__title'>Login</h3>
            <div className='form__container'>
                <form onSubmit={handleLogin} className='signUp__form'>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Email" type='email' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    </div>
                    <div className='formInput__container'>
                        <TextField className='form-input' id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Link to='/forgot-password'><p className='subLink' style={{ cursor: 'pointer' }}>Forgot password?</p></Link>

                    </div>

                    <div className='signUpButton__container'>
                        <button type='submit' className='signUp-button'>Login</button>
                    </div>

                </form>
                <div className='subLinkContainer'>

                    <p className='subLink'>Don't have an account? <Link className='subLink__title' to='/sign-up'>Signup</Link></p>
                </div>

            </div>

        </div>
    )
}

export default Login