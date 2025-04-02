'use client'
import '../../../../../public/sass/pages/auth.scss';
import { Container, Grid, IconButton, InputAdornment, TextField, Typography, Button } from "@mui/material";
import Image from 'next/image';
import Logo from '../../../../../public/images/logo.png';
import { EmailOutlined, LockOutlined, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import background from '../../../../../public/images/auth/background_image.png'
import { useEffect, useState } from "react";
import { getApi, validatorMake, postApi, foreach } from '../../../../helpers/General'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuthUserData } from '@/providers/redux/reducers/authSlice';
import { toast } from 'react-toastify';

export default function SignIn() {
    const router = useRouter();
    const [showPassword, setshowPassword] = useState(false);
    const Clickpassword = () => { setshowPassword((show) => !show) }
    const dispatch = useDispatch()
    const defaultvalue = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    const [formData, setFormData] = useState(defaultvalue);
    let [errors, setErrors] = useState(defaultvalue);

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value

        }));

        setErrors((prevData) => ({
            ...prevData,
            [name]: null,
        }))
    }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationRules = await validatorMake(formData, {
            'first_name': 'required',
            'last_name': 'required',
            'email': 'required|email',
            'password': 'required|confirmed',
            'password_confirmation': 'required'
        })
        if (!validationRules.fails()) {
            let resp = await postApi('user/signUp', {data: formData})
            if (resp.status) {
                toast.success(resp.message)  
                setFormData(defaultvalue);
                dispatch(setAuthUserData(resp.data.token));
                router.push('/auth/otp-verification?redirectTo=/auth/login')
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
        <div className="auth_section Signin">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="auth_area">
                            <div className="left">
                                <div className='logo'>
                                    <Image
                                        src={Logo}
                                        alt='image'
                                        priority
                                    />
                                </div>
                                <div className='form_area'>
                                    <div className='header'>
                                        <Typography variant='h4'>Sign-Up</Typography>
                                        <Typography variant='h6'>If you already have an account register. You can <Link href={"/auth/login"}>Login here !</Link> </Typography>
                                    </div>
                                    <form method='POST' onSubmit={handleSubmit}>
                                        <Grid container columnSpacing={2}>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <div className='form_fields'>
                                                    <TextField
                                                        id='first_name'
                                                        type='text'
                                                        name='first_name'
                                                        label='First Name'
                                                        value={formData.first_name || ''}
                                                        placeholder='Enter first name'
                                                        onChange={handleChange}
                                                        error={!!errors.first_name}
                                                        helperText={errors.first_name || ''}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Person />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        variant="standard"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                <div className='form_fields'>
                                                    <TextField
                                                        id='last_name'
                                                        type='text'
                                                        name='last_name'
                                                        label='Last Name'
                                                        value={formData.last_name || ''}
                                                        placeholder='Enter last name'
                                                        onChange={handleChange}
                                                        error={!!errors.last_name}
                                                        helperText={errors.last_name || ''}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Person />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        variant="standard"
                                                    />
                                                </div>
                                            </Grid>

                                        </Grid>
                                        <div className='form_fields'>
                                            <TextField
                                                id='email'
                                                type='email'
                                                name='email'
                                                label='Email'
                                                value={formData.email || ''}
                                                placeholder='Enter email address'
                                                onChange={handleChange}
                                                error={!!errors.email}
                                                helperText={errors.email || ''}
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
                                                placeholder='Enter Password'
                                                onChange={handleChange}
                                                error={!!errors.password}
                                                helperText={errors.password || ''}
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

                                        <div className='form_fields'>
                                            <TextField
                                                id='password_confirmation'
                                                type={showPassword ? 'text' : 'password'}
                                                name='password_confirmation'
                                                label='Confirm Password'
                                                value={formData.password_confirmation || ''}
                                                placeholder='Confirm Password'
                                                onChange={handleChange}
                                                error={!!errors.password_confirmation}
                                                helperText={errors.password_confirmation || ''}
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
                                        <div className='btn_area'>
                                            <Button variant='contained' type='submit'>Register</Button>
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