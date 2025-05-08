'use client';
import { Container, Grid, MenuItem, Select, TextField, FormControl, FormLabel, Button, Typography, IconButton } from "@mui/material";
import Sidebar from "../../../components/sell_sidebar";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../../../../../public/sass//pages/sell_add.scss';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Close } from "@mui/icons-material";
import { getApi, postApi, validatorMake, foreach } from '../../../../helpers/General'
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function Addproperty() {

    const searchParams = useSearchParams();
    const slug = searchParams.get('slug') || null;
    const [category, setCategory] = useState([]);
    const [click, setClick] = useState(null);
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [imageNames, setImageNames] = useState([]);

    const getInitialFormData = () => {
        if (typeof window != "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            return {
                type: searchParams.get('type') || '',
                role: searchParams.get('role') || '',
                availability: searchParams.get('availability') || '',
                bedrooms: searchParams.get('bedrooms') || '',
                bathrooms: searchParams.get('bathrooms') || '',
                floors: searchParams.get('floors') || '',
                description: searchParams.get('description') || '',
                city: searchParams.get('city') || '',
                address: searchParams.get('address') || '',
                price: searchParams.get('price') || '',
                area: searchParams.get('area') || '',
                contact_name: searchParams.get('contact_name') || '',
                contact_number: searchParams.get('contact_number') || '',
                email: searchParams.get('email') || '',
                image: searchParams.get('image') ? searchParams.get('image').split(',') : [],
                cat_id: searchParams.get('cat_id') || '',

            };
        }
        return {
            type: '',
            role: '',
            availability: '',
            bedrooms: '',
            bathrooms: '',
            floors: '',
            description: '',
            city: '',
            address: '',
            price: '',
            area: '',
            contact_name: '',
            contact_number: '',
            email: '',
            image: [],
            cat_id: '',
        }
    };

    const defaultvalue = {
        type: '',
        role: '',
        availability: '',
        bedrooms: '',
        bathrooms: '',
        floors: '',
        description: '',
        city: '',
        address: '',
        price: '',
        area: '',
        contact_name: '',
        contact_number: '',
        email: '',
        image: [],
        cat_id: '',
    }

    const [formData, setFormData] = useState(getInitialFormData);
    const [errors, setErrors] = useState(defaultvalue);

    const updateURL = () => {
        if (typeof window != "undefined") {
            const searchParams = new URLSearchParams();
            if (formData.type) searchParams.set('type', formData.type);
            if (formData.availability) searchParams.set('availability', formData.availability);
            if (formData.image.length) searchParams.set('image', formData.image.join(','));
            if (formData.address) searchParams.set('address', formData.address);
            if (formData.area) searchParams.set('area', formData.area);
            if (formData.bathrooms) searchParams.set('bathrooms', formData.bathrooms);
            if (formData.bedrooms) searchParams.set('bedrooms', formData.bedrooms);
            if (formData.cat_id) searchParams.set('cat_id', formData.cat_id);
            if (formData.city) searchParams.set('city', formData.city);
            if (formData.contact_name) searchParams.set('contact_name', formData.contact_name);
            if (formData.contact_number) searchParams.set('contact_number', formData.contact_number);
            if (formData.description) searchParams.set('description', formData.description);
            if (formData.email) searchParams.set('email', formData.email);
            if (formData.floors) searchParams.set('floors', formData.floors);
            if (formData.price) searchParams.set('price', formData.price);
            if (formData.role) searchParams.set('role', formData.role);

            let slugQuery = slug ? `slug=${slug}` : '';
            const queryString = `?${slugQuery}&${searchParams.toString()}`;
            window.history.replaceState(null, '', queryString);
        };
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        updateURL();
    }, [formData]);

    useEffect(() => {
        getData();
    }, [])


    if (slug) {
        useEffect(() => {
            getForm(slug);
        }, [])
    }

    const getForm = async (slug) => {
        let resp = await getApi(`property/view/${slug}`)
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setFormData(data.data);
                let url = data.data.image;
                let type = data.data.type;
                let sample = [];
                url.forEach((item) => {
                    let array = item.split('/');
                    let s = array[(array.length) - 1];
                    array[(array.length) - 1] = '';
                    sample.push(s)
                })
                setImageNames(sample);
                let index = category.findIndex(category => category.title === type);
                if (index == -1) {
                    setClick(4)
                }
                else{
                    setClick(index);
                }
            }
        }
    }

    const getData = async () => {
        let resp = await getApi('category');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setCategory(data.data);
            }
        }
    }

    let handleClick = (index) => {
        setClick(click === index ? null : index)
        if (index == 4) {
            setFormData((prevData) => ({
                ...prevData,
                cat_id: category[index]._id,
                type: ''
            }))
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                cat_id: category[index]._id,
                type: category[index].title
            }))
        }
    }

    const handleImageChange = async (event) => {
        const files = Array.from(event.target.files);
        const base64Files = await Promise.all(files.map(file => getBase64(file)));
        for (let i = 0; i < files.length; i++) {
            let response = await postApi('image/upload', {
                image: base64Files[i],
                folder_name: 'properties_image'
            });

            if (response && response.fileName) {
                console.log(response);
                setImageNames(prevNames => ({
                    ...prevNames,
                    [response.fileName]: files[i].name
                }));
                setFormData((prevData) => ({
                    ...prevData,
                    image: [...prevData.image, response.imageUrl]
                }))
            }
        }
    }

    const handleRemoveImage = async (name) => {
        let _name = `C:/NodeJS/realEstate_server/uploads/properties_image/${name}`;
        let url = `uploads/properties_image/${name}`;
        let response = await postApi('image/delete', { image: _name });
        if (response.status) {
            setImageNames(prevNames => {
                const updatedNames = { ...prevNames };
                delete updatedNames[name];
                return updatedNames;
            });
            setFormData((prevData) => ({
                ...prevData,
                image: prevData.image.filter(images => images !== url)
            }))
            console.log('image_deleted');
        }
        else {
            console.log("error in deleting image");
        }
    };

    let handleInputChange = (e) => {
        let { name, value } = e.target
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
            "type": 'required',
            "role": 'required',
            "availability": 'required',
            "bedrooms": 'required',
            "bathrooms": 'required',
            "floors": 'required',
            "description": 'required',
            "city": 'required',
            "address": 'required',
            "price": 'required',
            "area": 'required',
            "contact_name": 'required',
            "contact_number": 'required|min:10|max:14',
            "email": 'required|email',
            "image": 'required',
            "cat_id": 'required'
        })
        if (!validationRules.fails()) {
            if (slug == null) {
                let resp = await postApi('property/add', formData);
                if (resp.status) {
                    toast.success(resp.message)
                    setFormData(defaultvalue)
                    setImageNames([]);
                    setClick(null)
                }
                else {
                    if (typeof resp.message == 'object') {
                        handleErrors(resp.message.errors)
                    }
                    else {
                        toast.error(resp.message)
                    }
                }
            }

            else {
                let resp = await postApi(`property/edit`, formData);
                if (resp.status) {
                    toast.success(resp.message)
                    setFormData(defaultvalue)
                    setImageNames([]);
                    setClick(null)
                }
                else {
                    if (typeof resp.message == 'object') {
                        handleErrors(resp.message.errors)
                    }
                    else {
                        toast.error(resp.message)
                    }
                }
            }
        }
        else {
            handleErrors(validationRules.errors.errors)
            toast.error("Validation Error . Please Check Fields")
        }
    }

    const getBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })

    return (
        <div className="add_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="add_parent">
                            <div className="sidebar">
                                <Sidebar />
                            </div>
                            <div className="add_form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form_area">
                                        <div className="top">
                                            <h4>Select Property Types</h4>
                                            <ul className="property_list">
                                                {category.map((item, index) => (
                                                    <li className={`list_item ${click === index ? 'active' : ''}`} onClick={() => handleClick(index)} key={index}>
                                                        <div className="property_item">
                                                            <div className="property_image">
                                                                <Image
                                                                    src={(click == index ? item.icon[1] : item.icon[0])}
                                                                    alt="1."
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </div>
                                                            <h5>{item.title}</h5>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="inputs_field">
                                            <Grid container spacing={2}>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                                    {click == 4 ?
                                                        <>
                                                            <FormLabel>if other please specify</FormLabel>
                                                            <TextField
                                                                size="small"
                                                                id="type"
                                                                name="type"
                                                                value={formData.type}
                                                                onChange={handleInputChange}
                                                                placeholder="Eg. PentHouse,Studio,FarmHouse etc."
                                                                type="text"
                                                                fullWidth
                                                            />
                                                        </>
                                                        : ''
                                                    }
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                                    <FormControl fullWidth >
                                                        <FormLabel>Role</FormLabel>
                                                        <Select
                                                            labelId="role-label"
                                                            id="role"
                                                            size="small"
                                                            name="role"
                                                            value={formData.role}
                                                            onChange={handleInputChange}
                                                            error={!!errors.role}
                                                        >
                                                            <MenuItem value={'Owner'}>Owner</MenuItem>
                                                            <MenuItem value={'Agent'}>Agent</MenuItem>
                                                            <MenuItem value={'seller'}>Seller</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                                                    <FormControl fullWidth >
                                                        <FormLabel>Avaialbility</FormLabel>
                                                        <Select
                                                            labelId="role-label"
                                                            id="role"
                                                            size="small"
                                                            name="availability"
                                                            value={formData.availability || ''}
                                                            onChange={handleInputChange}
                                                            error={!!errors.availability}
                                                        >
                                                            <MenuItem value={'For Rent'}>For Rent</MenuItem>
                                                            <MenuItem value={'For Sale'}>For Sale</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} >
                                                    <FormControl fullWidth>
                                                        <FormLabel>No. of Bedrooms</FormLabel>

                                                        <Select
                                                            size="small"
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="bedrooms"
                                                            value={formData.bedrooms}
                                                            onChange={handleInputChange}
                                                            error={!!errors.bedrooms}
                                                        >
                                                            {number.map((item, index) => (
                                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} >
                                                    <FormControl fullWidth>
                                                        <FormLabel>No. of Bathroom</FormLabel>
                                                        <Select
                                                            size="small"
                                                            labelId="bath-label"
                                                            id="bath"
                                                            name="bathrooms"
                                                            value={formData.bathrooms}
                                                            onChange={handleInputChange}
                                                            error={!!errors.bathrooms}
                                                        >
                                                            {number.map((item, index) => (
                                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
                                                    <FormControl fullWidth>
                                                        <FormLabel>No. of Floor</FormLabel>
                                                        <Select
                                                            size="small"
                                                            labelId="floor-label"
                                                            id="floor"
                                                            name="floors"
                                                            value={formData.floors}
                                                            onChange={handleInputChange}
                                                            error={!!errors.floors}
                                                        >
                                                            {number.map((item, index) => (
                                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                                    <FormLabel>Description</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="other"
                                                        name="description"
                                                        placeholder="Write description and amenties"
                                                        type="text"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        error={!!errors.description}
                                                        helperText={errors.description ? errors.description : ''}
                                                        fullWidth
                                                        multiline
                                                        minRows={5}
                                                    />
                                                </Grid>
                                                {/* <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                                                    <FormLabel>Rent & Deposit</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="rent"
                                                        name="rent"
                                                        placeholder="Enter here"
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Grid> */}
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                                                    <FormLabel>City</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter City"
                                                        error={!!errors.city}
                                                        helperText={errors.city ? errors.city : ''}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                                                    <FormLabel>Price</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="price"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter here"
                                                        error={!!errors.price}
                                                        helperText={errors.price ? errors.price : ''}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <FormLabel>Property Address</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="property"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        placeholder="Adress here"
                                                        type="text"
                                                        error={!!errors.address}
                                                        helperText={errors.address ? errors.address : ''}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <FormLabel>Area</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="area"
                                                        name="area"
                                                        value={formData.area}
                                                        onChange={handleInputChange}
                                                        placeholder="In sq ft"
                                                        error={!!errors.area}
                                                        helperText={errors.area ? errors.area : ''}
                                                        type="text"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <Button
                                                        component="label"
                                                        role={undefined}
                                                        variant="contained"
                                                        tabIndex={-1}
                                                        startIcon={<CloudUploadIcon />}
                                                    >
                                                        Upload images
                                                        <VisuallyHiddenInput
                                                            type="file"
                                                            onChange={handleImageChange}
                                                            multiple
                                                        />
                                                    </Button>
                                                    {Object.keys(imageNames).length > 0 && (
                                                        <Typography variant="body2" sx={{ display: 'flex', marginTop: 1 }}>
                                                            {Object.entries(imageNames).map(([key, name]) => (
                                                                <span key={key} style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                                                                    {name}
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => handleRemoveImage(key)}
                                                                        sx={{ marginLeft: 1 }}
                                                                    >
                                                                        <Close />
                                                                    </IconButton>
                                                                </span>
                                                            ))}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <h4>Personal information</h4>
                                            <Grid container spacing={2}>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                                                    <FormLabel>Name</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="name"
                                                        name="contact_name"
                                                        value={formData.contact_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter here"
                                                        type="text"
                                                        error={!!errors.contact_name}
                                                        helperText={errors.contact_name ? errors.contact_name : ''}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                                                    <FormLabel>Contact Number</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="Contact_number"
                                                        name="contact_number"
                                                        value={formData.contact_number}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter here"
                                                        type="text"
                                                        error={!!errors.contact_number}
                                                        helperText={errors.contact_number ? errors.contact_number : ''}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                    <FormLabel>Email</FormLabel>
                                                    <TextField
                                                        size="small"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        error={!!errors.email}
                                                        helperText={errors.email ? errors.email : ''}
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="button">
                                            <Link href='/home'>
                                                <Button>Cancel</Button>
                                            </Link>
                                            <Button type="submit">Sell</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}