'use client'
import '../../../../../public/sass/pages/auth.scss';
import { Container, Grid, Typography, Button } from "@mui/material";
import Image from 'next/image';
import Logo from '../../../../../public/images/logo.png';
import OtpInput from 'react-otp-input';
import background from '../../../../../public/images/auth/background_image.png'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getApi, validatorMake, postApi, foreach } from '../../../../helpers/General'
import { toast } from 'react-toastify';
import { removeAuthUserData } from '@/providers/redux/reducers/authSlice';
// import { setAuthUserData } from '@/providers/redux/reducers/authSlice';

export default function OtpVerify() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({ otp: "", token: "" });
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/auth/login';
    const [resendCount, setResendCount] = useState(0);
    const MAX_RESEND_ATTEMPTS = 5;
    // ---------------------
    //useStore Method to get data

    // const store = useStore();
    // const state = store.getState();
    // const userData = state.auth.data;

    const handleOTPChange = (otp) => {
        setOtp(otp);
        setErrors((prevData) => ({
            ...prevData,
            otp: null
        }));
    };

    const handleErrors = (errors) => {
        setErrors(errors);
    };

    // useSelector method to get data 

    const selectUserData = useSelector(state => state.auth.data);
    const token = selectUserData;
    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = {
            otp,
            token
        };

        let validationRules = await validatorMake(formData, {
            "token": "required",
            "otp": "required",
        });

        if (!validationRules.fails()) {
            let resp = await postApi('user/verifyOtp', formData);
            if (resp.status) {
                toast.success(resp.message);
                setOtp("");
                if(redirectTo == '/auth/login'){
                    dispatch(removeAuthUserData());
                    router.push(redirectTo)
                }
                else{
                    router.push(redirectTo);
                }
            } else {
                toast.error(resp.message);
                handleErrors(resp.errors);
                console.log(errors)
            }
        } else {
            handleErrors(validationRules.errors.errors);
            console.log(errors);
        }
    };

    const handleResendOtp = async (e) => {
        e.preventDefault();
        if (resendCount < MAX_RESEND_ATTEMPTS) {
            let formData = {
                token
            }
            let validationRules = await validatorMake(formData, {
                'token': "required"
            })
            if (!validationRules.fails()) {
                let resp = await postApi('user/resendOtp', formData);
                if (resp.status) {
                    toast.success(resp.message);
                    setResendCount(resendCount + 1);
                    setOtp("");
                }
                else {
                    toast.error(resp.message);
                    handleErrors(resp.errors);
                    console.log(errors)
                }
            } else {
                handleErrors(validationRules.errors.errors);
                console.log(errors);
            }
        }
        else{
            toast.error("Maximum OTP resend attempts reached. Please check your registered email.")
        }
    };

    return (
        <div className='auth_section otp_section'>
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
                                        <Typography variant='h4'>One-Time Password</Typography>
                                        <Typography variant='h6'>Please enter the One-Time Password (OTP) to verify your email.</Typography>
                                    </div>
                                    <form method='POST' onSubmit={handleSubmit}>
                                        <div className='form_fields otp_input'>
                                            <OtpInput
                                                value={otp}
                                                onChange={handleOTPChange}
                                                numInputs={6}
                                                renderInput={(props) => <input {...props} />}
                                            />
                                        </div>
                                        <div className='btn_area'>
                                            <Button variant='contained' type='submit'>Submit</Button>
                                        </div>
                                        <div className="resend_otp_section">
                                            <Typography variant="h6">Didn't get an OTP?
                                                <span onClick={handleResendOtp} >Resend OTP</span>
                                            </Typography>
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