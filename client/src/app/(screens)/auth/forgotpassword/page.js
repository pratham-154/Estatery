'use client'
import '../../../../../public/sass/pages/auth.scss';
import { Container, Grid, InputAdornment, TextField, Typography, Button } from "@mui/material";
import Image from 'next/image';
import Logo from '../../../../../public/images/logo.png';
import { EmailOutlined } from '@mui/icons-material';
import background from '../../../../../public/images/auth/background_image.png'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validatorMake, postApi } from '../../../../helpers/General'
import { useDispatch } from 'react-redux';
import { setAuthUserData } from '@/providers/redux/reducers/authSlice';
import { toast } from 'react-toastify';

export default function Forgotpass() {
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [ errors,setErrors] = useState('')
    const dispatch = useDispatch();
    
    const handleChange = (e)=>{
        setEmail(e.target.value);
        setErrors('')
    }
    const handleErrors = (errors)=>{
        setErrors(errors);
        console.log(errors);
    } 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let formData={
            email
        }

        let validationRules =  await validatorMake(formData,{
            "email":"required|email"
        })

        if(!validationRules.fails()){
            let resp = await postApi('user/forgetPass',formData);
            if(resp.status){
                toast.success(resp.message);
                dispatch(setAuthUserData(resp.data.token));
                router.push('/auth/otp-verification?redirectTo=/auth/reset');
            }
            else{
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
        }
        else{
            handleErrors(validationRules.errors.errors)
            // console.log(validationRules.errors.errors)
        }
    }

    return (
            <div className='auth_section forgot_section'>
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
                                            <Typography variant='h4'>Forgot Password</Typography>
                                            <Typography variant='h6'>Please enter the email address you use when creating your account, We’ll send you the instructions to reset your password </Typography>
                                        </div>
                                        <form method="POST" onSubmit={handleSubmit}>
                                            <div className='form_fields'>
                                                <TextField
                                                    id='email'
                                                    type='email'
                                                    name='email'
                                                    label='Email'
                                                    value={email}
                                                    error = {errors}
                                                    helperText = {errors ? 'Error': ''}
                                                    onChange={handleChange}
                                                    placeholder='Enter email address'
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
                                            <div className='btn_area'>
                                                <Button variant='contained' type='submit'>Submit</Button>
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