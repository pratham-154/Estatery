'use client'

import { Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import '../../../../public/sass/pages/contactUs.scss';
import contact2 from '../../../../public/images/contact/contact2.png'
import contact3 from '../../../../public/images/contact/contact3.png'
import contact4 from '../../../../public/images/contact/contact3.png'
import contact5 from '../../../../public/images/contact/contact3.png'
import Image from "next/image";
import { FormLabel } from "react-bootstrap";
import { getApi, validatorMake , postApi , foreach } from '../../../helpers/General'
import { useEffect, useState } from "react";
// import Validator from "validatorjs";
import { toast } from "react-toastify";

export default function Contact() {
    let defaultValue = {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        message: ''
    }
    const [formData, setFormData] = useState(defaultValue);

    const [banner, setBanner] = useState([]);
    let [errors, setErrors] = useState(defaultValue);

    const getBanner = async () => {
        let resp = await getApi('banner/view/67062ae137d871018fa0c178');
        if (resp && resp.status) {
            let { data } = resp;
            setBanner(data.data);
        }
    };

    useEffect(() => {
        getBanner();
    }, []);

    let handleInputChange = (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationRules = await validatorMake(formData, {
            "first_name": "required",
            "last_name": "required",
            "email": "required|email",
            "phone_number": "required|min:10|max:10",
            "message": "required"
        })
        if (!validationRules.fails()) {
            let resp = await postApi('contact/add', formData)
            if (resp.status) {
                toast.success(resp.message)
                setFormData(defaultValue)
            }
            else {
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
            console.log(resp, "resp")
        }
        else {
            handleErrors(validationRules.errors.errors)
            console.log(validationRules.errors.errors)
        }
    };

    const inputFields = [
        { id: 'first_name', name: 'first_name', type: 'text', placeholder: 'Enter Your First Name', label: 'First Name' },
        { id: 'last_name', name: 'last_name', type: 'text', placeholder: 'Enter Your Last Name', label: 'Last Name' },
        { id: 'phone_number', name: 'phone_number', type: 'text', placeholder: 'Enter Your Phone Number', label: 'Phone Number' },
        { id: 'email', name: 'email', type: 'email', placeholder: 'Enter Your Email', label: 'Email' }
    ];

    return (
        <div className="contact_container">
            <div className="upper_container">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="inner_parent">
                                <Typography className="header">{banner.contact_title}</Typography>
                                <Typography className="get_in_touch" dangerouslySetInnerHTML={{ __html: banner.contact_quote }}></Typography>
                                <Typography className="description">{banner.contact_description}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="lower_container">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="header">
                                <Typography variant="h4">Have a question or need assistance?</Typography>
                                <Typography variant="h6">Reach out to us via email, phone, or the contact form below. We're eager to assist you.</Typography>
                            </div>
                            <div className="main_content">
                                <Grid container>
                                    <Grid item xl={5} lg={5.5} md={0} sm={0} xs={0}>
                                        <div className="images">
                                            <div className="house">
                                                <Image src={contact2} alt="image" />
                                            </div>
                                            <div className="rectangle1">
                                                <Image src={contact3} alt="image" />
                                            </div>
                                            <div className="rectangle2">
                                                <Image src={contact4} alt="image" />
                                            </div>
                                            <div className="elipse"></div>
                                        </div>
                                    </Grid>
                                    <Grid item xl={7} lg={6.5} md={12} sm={12} xs={12}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="details">
                                                <Grid container rowSpacing={3} columnSpacing={4}>
                                                    {inputFields.map((field, index) => (
                                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
                                                            <FormLabel>{field.label}</FormLabel>
                                                            <div className="input_field">
                                                                <TextField
                                                                    id={field.id}
                                                                    type={field.type}
                                                                    name={field.name}
                                                                    placeholder={field.placeholder}
                                                                    size="small"
                                                                    value={formData[field.name] || ''}
                                                                    onChange={handleInputChange}
                                                                    error={!!errors[field.name]} 
                                                                    helperText={errors[field.name] || ''}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    ))}
                                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <FormLabel>Message</FormLabel>
                                                        <div className="input_field message">
                                                            <TextField
                                                                id="message"
                                                                type="text"
                                                                name="message"
                                                                placeholder="Write Message"
                                                                multiline
                                                                rows={5}
                                                                value={formData.message || ''}
                                                                onChange={handleInputChange}
                                                                error={!!errors.message} // Show error if it exists
                                                                helperText={errors.message || ''}
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <div className="button_submit">
                                                    <Button type="submit">Submit</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
