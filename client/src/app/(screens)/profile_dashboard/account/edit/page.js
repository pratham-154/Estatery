'use client'
import { Button, Container, FormControl, FormLabel, Grid, MenuItem, Select, TextField } from "@mui/material";
import Image from "next/image";
import profile from '../../../../../../public/images/sell/profile.png';
import { useEffect, useState } from "react";
import '../../../../../../public/sass/pages/edit.scss';
import Sidebar from "@/app/components/sell_sidebar";
import { getApi, postApi, validatorMake, foreach } from "../../../../../helpers/General";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function Edit() {
    const router = useRouter();
    const defaultValue = {
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        email: '',
        address: '',
        phone_number: ''
    }
    
    const [data, setData] = useState(defaultValue);
    const [errors, setErrors] = useState(defaultValue);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        setErrors((prevData) => ({
            ...prevData,
            [name]: null
        }))
    }

    let handleErrors = (errors) => {
        foreach(errors, (index, item) => {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    [index]: item[0]
                }
            })
        })
    }

    const getData = async()=>{
        let resp = await getApi('user/view');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setData(data.data);
            }
        }
    }

    useEffect(()=>{
        getData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData= {
            first_name: data.first_name,
            last_name: data.last_name,
            city: data.city,
            state: data.state,
            email: data.email,
            address: data.address,
            phone_number: data.phone_number
        }
        let validationRules = await validatorMake(formData, {
            "first_name": 'required',
            "last_name": 'required',
            "city": 'required',
            "state": 'required',
            "email": 'required',
            "address": 'required',
            "phone_number": 'required'
        })

        if(!validationRules.fails()){
            let resp = await postApi('user/edit',formData);
            if(resp.status){
                toast.success(resp.message);
                setData(defaultValue);
                router.push('/profile_dashboard/account/profile')
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
            handleErrors(validationRules.errors.errors);
        }
    }

    return (
        <div className="edit_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="edit_parent">
                            <div className="sidebar">
                                <Sidebar />
                            </div>
                            <div className="edit_right">
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <FormLabel>First Name</FormLabel>
                                            <TextField
                                                size="small"
                                                id="first_name"
                                                name="first_name"
                                                placeholder="Enter First Name"
                                                type="text"
                                                fullWidth
                                                error={!!errors.first_name}
                                                helperText={errors.first_name || ''}
                                                value={data.first_name || ''}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <FormLabel>Last Name</FormLabel>
                                            <TextField
                                                size="small"
                                                id="last_name"
                                                name="last_name"
                                                placeholder='Enter Your Last Name'
                                                type="text"
                                                error={!!errors.last_name}
                                                helperText={errors.last_name || ''}
                                                value={data.last_name || ''}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <FormLabel>City</FormLabel>
                                            <TextField
                                                size="small"
                                                id="city"
                                                name="city"
                                                placeholder="Enter City"
                                                type="text"
                                                error={!!errors.city}
                                                helperText={errors.city || ''}
                                                value={data.city || ''}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                            <FormLabel>State</FormLabel>
                                            <TextField
                                                size="small"
                                                id="State"
                                                name="state"
                                                placeholder="Enter State"
                                                type="text"
                                                error={!!errors.state}
                                                helperText={errors.state || ''}
                                                value={data.state || ''}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                            <FormLabel>Email</FormLabel>
                                            <TextField
                                                size="small"
                                                id="email"
                                                name="email"
                                                placeholder="Enter Email"
                                                type="text"
                                                error={!!errors.email}
                                                helperText={errors.email || ''}
                                                value={data.email || ''}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                            <FormLabel>Address</FormLabel>
                                            <TextField
                                                size="small"
                                                id="address"
                                                name="address"
                                                placeholder="Address here"
                                                type="text"
                                                error={!!errors.address}
                                                helperText={errors.address || ''}
                                                value={data.address || ''}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                            <FormLabel>Contact Number</FormLabel>
                                            <TextField
                                                size="small"
                                                id="phone_number"
                                                name="phone_number"
                                                placeholder="Enter Phone Number"
                                                type="text"
                                                error={!!errors.phone_number}
                                                helperText={errors.phone_number || ''}
                                                value={data.phone_number || ''}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <div className="buttons">
                                        <Button href='/profile_dashboard/account/profile'>Cancel</Button>
                                        <Button type="submit">Save</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}