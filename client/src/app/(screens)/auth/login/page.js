'use client'
import { Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import '../../../../../public/sass/pages/auth.scss'
import Image from 'next/image'
import Logo from '../../../../../public/images/logo.png'
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import Link from 'next/link'
import background from '../../../../../public/images/auth/background_image.png'
import { useDispatch } from 'react-redux'
import { removeAuthUserData, setAuthUserData } from '@/providers/redux/reducers/authSlice'
import { getApi, validatorMake, postApi, foreach } from '../../../../helpers/General'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'



export default function Login() {
    const router = useRouter();
    const [showPassword, setshowPassword] = useState(false);
    const Clickpassword = () => { setshowPassword((show) => !show) }
    const defaultValue = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(defaultValue);
    const [errors, setErrors] = useState(defaultValue);

    let handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
    };
    const handleError = (error) => {
        foreach(error, (index, item) => {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    [index]: item[0]
                }
            })
        })
    }
    let dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationRules = await validatorMake(formData, {
            "email": "required",
            "password": "required"
        })
        if (!validationRules.fails()) {
            let resp = await postApi('user/login', formData);
            console.log(resp)
            let login_token = resp.data.login_token;
            if (resp.status) {
                setFormData(defaultValue);
                if (resp.data.email_verified != null) {
                    toast.success(resp.message);
                    dispatch(setAuthUserData({login_token:login_token}));
                    router.push('/home')
                }
                else if (resp.data.email_verified == null) {
                    toast.success(resp.message);
                    router.push("/auth/otp-verification");
                }
            }
            else {
                if (typeof resp.message == 'object') {
                    handleError(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
        }
        else {
            handleError(validationRules.errors.errors)
            console.log(validationRules.errors.errors)
        }
    }

    return (
        <div className='auth_section'>
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className='auth_area'>
                            <div className='left'>
                                <div className='logo'>
                                    <Image
                                        src={Logo}
                                        alt='image'
                                        priority
                                    />
                                </div>
                                <div className='form_area'>
                                    <div className='header'>
                                        <Typography variant='h4'>Login</Typography>
                                        <Typography variant='h6'>If you don’t have a registered account. You can <Link href='/auth/signup'>Register here !</Link> </Typography>
                                    </div>
                                    <form method='POST' onSubmit={handleSubmit}>
                                        <div className='form_fields'>
                                            <TextField
                                                id='email'
                                                type='email'
                                                name='email'
                                                label='Email'
                                                value={formData.email || ''}
                                                placeholder='Enter email address'
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailOutlined /> {/* Email icon */}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                            />
                                        </div>
                                        <div className='form_fields'>
                                            <TextField
                                                id='password'
                                                type={showPassword ? 'text' : 'password'}
                                                name='password'
                                                label='Password'
                                                value={formData.password || ''}
                                                onChange={handleChange}
                                                placeholder='Enter Password'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position='start'>
                                                            <LockOutlined />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                onClick={Clickpassword}
                                                                edge='end'
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                variant='standard'
                                            />
                                        </div>
                                        <div className='extras'>
                                            <div className='remember'>
                                                <input type='checkbox' id='remember_me' name='remember_me' value='remember_me' />
                                                <label htmlFor="remember_me">Remember me</label>
                                            </div>
                                            <div className='forgot_pass'>
                                                <Link href='/auth/forgotpassword'>Forgot Password?</Link>
                                            </div>
                                        </div>
                                        <div className='btn_area'>
                                            <Button variant='contained' type='submit'>Login</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='right'>
                                <Image
                                    src={background}
                                    alt='image'
                                    priority
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}