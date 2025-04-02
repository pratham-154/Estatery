'use client'
import '../../../../../public/sass/pages/auth.scss';
import { Container, Grid, InputAdornment, TextField, Typography, Button, IconButton } from "@mui/material";
import Image from 'next/image';
import Logo from '../../../../../public/images/logo.png';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import background from '../../../../../public/images/auth/background_image.png'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getApi, validatorMake, postApi, foreach } from '../../../../helpers/General'
import { toast } from 'react-toastify';
import { removeAuthUserData } from '@/providers/redux/reducers/authSlice';


export default function Reset() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showPassword, setshowPassword] = useState(false);
    const defaultValue = {
        password : '',
        password_confirmation:''
    }
    const selectorData = useSelector(state => state.auth.data)
    let token = selectorData;
    const [form , setForm] = useState(defaultValue);
    const [ errors , setErrors ] = useState(defaultValue);

    const handleChange = (e)=>{
        let {name,value} = e.target;
        setForm((prevData)=>({
            ...prevData,
            [name]:value
        }))
        setErrors((prevData)=>({
            ...prevData,
            [name]:null
        }))
    }

    let handleErrors = (errors) => {
        foreach(errors, (index, item) => {
          setErrors((prevData) => {
            return {
              ...prevData,
              [index]: item[0],
            };
          });
        });
      };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let formData = {
            token : token,
            password : form.password,
            password_confirmation : form.password_confirmation
        }
        let validationRules = await validatorMake(formData,{
            "token":"required",
            "password":"required|confirmed",
            "password_confirmation":"required"
        })
        if(!validationRules.fails()){
            let resp = await postApi('user/resetPass',formData)
            if (resp.status){
                toast.success(resp.message);
                dispatch(removeAuthUserData());
                router.push('/auth/login')
            }
            else{
                if(typeof resp.message == 'object'){
                    handleErrors(resp.message.errors)   
                }
                else{
                    toast.error(resp.message)
                }
            }
        }
        else {
            handleErrors(validationRules.errors.errors)
            console.log(validationRules.errors.errors)
        }

    }
    const Clickpassword = () => { setshowPassword((show) => !show) }

    return (
            <div className='auth_section reset_section'>
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
                                            <Typography variant='h4'>Reset Password</Typography>
                                            <Typography variant='h6'>Please enter the email address you use when creating your account, We’ll send you the instructions to reset your password </Typography>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className='form_fields'>
                                                <TextField
                                                    id='password'
                                                    type={showPassword ? 'text' : 'password'}
                                                    name='password'
                                                    label='New Password'
                                                    value={form.password || ''}
                                                    onChange={handleChange}
                                                    placeholder='New Password'
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
                                                    label=' Confirm Password'
                                                    value={form.password_confirmation || ''}
                                                    onChange={handleChange}
                                                    placeholder='Confirm Password'
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
                                                <Button variant='contained' type='submit'>  Reset Password</Button>
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