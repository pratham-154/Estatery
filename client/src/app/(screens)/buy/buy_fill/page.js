'use client'
import { Button, Container, FormControl, FormLabel, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import '../../../../../public/sass/pages/buy_fill.scss'
import { useState } from 'react';
import Link from 'next/link';
import { getApi, postApi, validatorMake, foreach } from '../../../../helpers/General';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Fill() {
    
    const searchParams = useSearchParams();
    let slug = searchParams.get('slug') || '';
    const router = useRouter();

    const defaultValue = {
        first_name: '',
        last_name: '',
        email: '',
        contact_number: '',
        city: '',
        state: ''
    }

    const [formData, setFormData] = useState(defaultValue);
    const [errors, setErrors] = useState(defaultValue);

    let handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))

        setErrors((prevData) => ({
            ...prevData,
            [name]: null
        }))
    }

    let handleErrors = (errors) => {
        foreach(errors, (item, index) => {
            setErrors((prevData) => ({
                ...prevData,
                [index]: item[0]
            }))
        })
    }

    const fields = [
        {
            id: 'first_name',
            label: 'First Name',
            value: formData.first_name
        },
        {
            id: 'last_name',
            label: 'Last Name',
            value: formData.last_name
        },
        {
            id: 'email',
            label: 'Email',
            value: formData.email
        },
        {
            id: 'contact_number',
            label: 'Contact number',
            value: formData.contact_number
        },
        {
            id: 'city',
            label: 'City',
            value: formData.city
        },
        {
            id: 'state',
            label: 'State',
            value: formData.state
        },

    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            contact_number: formData.contact_number,
            city: formData.city,
            state: formData.state,
        }

        let validationRules = await validatorMake(formData, {
            "first_name": 'required',
            "last_name": 'required',
            "email": 'required|email',
            "contact_number": 'required|min:10|max:13',
            "city": 'required',
            "state": 'required',
        })

        if (!validationRules.fails()) {
            let resp = await postApi(`response/add/${slug}`, data)
            if (resp.status) {
                toast.success(resp.message)
                setFormData(defaultValue);
                router.push('/buy/buy_submitted');
            }
            else {
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message)
                }
                else {
                    toast.error(resp.message)
                }
            }
        }
        else {
            handleErrors(validationRules.errors.errors);
            toast.warning('Validation Error .Please Check Fields')
        }
    }

    return (
        <div className='fill_container'>
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className='fill_parent'>
                            <h3>Fill Details</h3>
                            <form onSubmit={handleSubmit}>
                                <Grid container columnSpacing={2} rowSpacing={2}>
                                    {fields.map((items, index) => (
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
                                            <div className="input_field">
                                                <FormLabel sx={{ color: 'black', fontWeight: '500' }}>{items.label}</FormLabel>
                                                <TextField
                                                    id={items.id}
                                                    type="text"
                                                    name={items.id}
                                                    size='small'
                                                    value={items.value || ''}
                                                    onChange={handleInputChange}
                                                    placeholder={`Enter Your ${items.label}`}
                                                />
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                                <div className='btn'>
                                    <Button variant='outlined' type='submit'>Submit</Button>
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}