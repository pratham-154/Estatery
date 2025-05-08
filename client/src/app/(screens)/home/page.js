'use client'
import { Apartment, ArrowBack, ArrowForward, BathtubTwoTone, ChevronLeft, ChevronRight, FilterNone, Home, HotelOutlined, LocationOnRounded, Search, SearchRounded, Villa } from "@mui/icons-material";
import { Button, Container, FormControl, Grid, IconButton, Input, InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import '../../../../public/sass/pages/homepage.scss';
import { useEffect, useState } from "react";
import Image from "next/image";
import small from '../../../../public/images/home/small_pic.png'
import slide1 from '../../../../public/images/home/slide1.png';
import { getApi, validatorMake } from '../../../helpers/General'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Homepage() {
    const router = useRouter();
    const [buy, setBuy] = useState([]);
    const [category, setCategory] = useState([])
    const [property, setProperty] = useState([]);
    const [searchOption, setsearchoption] = useState('')
    const [location, setLocation] = useState('')

    const [banner, setBanner] = useState([]);
    const [feature, setFeature] = useState([]);
    const [item, setItem] = useState('');
    const [locationProperty, setLocationProperty] = useState([])
    const handleChange = (event,) => {
        setProperty(event.target.value);
    };

    const handleFieldChange = (e) => {
        setLocation(e.target.value);
    }
    const getBanner = async () => {
        let resp = await getApi('banner/view/67062ae137d871018fa0c178');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setBanner(data.data);
            }
        }
    }

    const getCategory = async () => {
        let resp = await getApi('category');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setCategory(data.data)
            }
        }
    }

    const getFeature = async () => {
        let resp = await getApi('feature');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setFeature(data.data);
            }
        }
    }
    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        let data = {
            property,
            location,
            searchOption
        }
        let validationRules = await validatorMake(data, {
            "searchOption": 'required',
            "property": 'required',
            "location": 'required'
        })
        if (!validationRules.fails()) {
            router.push(`/buy/buy_page?loc=${location}&placeType=${property[1]}&availability=${searchOption}`)
        }
    }

    const getTabProperty = async () => {
        let resp = await getApi('property/random', {
            size: 6,
            search: item
        });

        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.random) {
                setBuy(data.random);
            }
        }
    }
    const getLocationProperty = async () => {
        let resp = await getApi('property/locationProperty', {
            size: 2
        })
        if (resp && resp.status) {
            let { data } = resp;
            if (data) {
                setLocationProperty(data.data)
            }
        }
    }

    const handleLocationClick = (loc)=>{
        router.push( `/buy/buy_page?loc=${loc}` )
    }

    useEffect(() => {
        getBanner();
        getFeature();
        getCategory();
        getLocationProperty()
    }, []);

    useEffect(() => {
        getTabProperty();
    }, [item]);

    let imagePath = process.env.url
   
    return (
        <div className="home_container">
            <div className="search_container">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="inner_parent">
                                <div className="title">
                                    <Home />
                                    <Typography variant="h5">{banner.title}</Typography>
                                </div>
                                <Typography variant="h4">{banner.sub_title}</Typography>
                                <Typography variant="h6">{banner.description}</Typography>
                                <form onSubmit={handleSearchSubmit}>
                                    <ul className="search_type">
                                        <li onClick={() => { setsearchoption(searchOption == 'For Sale' ? null : 'For Sale') }} className={`typebtn ${searchOption == 'For Sale' ? 'active' : ''}`} >Buy</li>
                                        <li onClick={() => { setsearchoption(searchOption == 'For Rent' ? null : 'For Rent') }} className={`typebtn ${searchOption == 'For Rent' ? 'active' : ''}`}  >Rent</li>
                                    </ul>
                                    <div className="search_bar">
                                        <div className="left">
                                            <FormControl fullWidth>
                                                <Select
                                                    size="small"
                                                    labelId="property-label"
                                                    id="property"
                                                    value={property[0] || ''} // ensure property[1] is defined and correct
                                                    onChange={handleChange}
                                                    displayEmpty
                                                    renderValue={(selected) => {
                                                        if (!selected || selected.length === 0) {
                                                            return <span style={{ color: '#888' }}>Property type</span>;
                                                        }
                                                        return (
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                {selected}
                                                            </div>
                                                        );
                                                    }}
                                                >
                                                    {category.map((item, index) => (
                                                        <MenuItem value={[item.title, item._id]} key={index}>
                                                            {item.title}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>

                                        <div className="right">
                                            <div className="input_field">
                                                <Input
                                                    id="search_item"
                                                    name="search_item"
                                                    type="text"
                                                    fullWidth
                                                    value={location}
                                                    onChange={handleFieldChange}
                                                    placeholder="Search by location or Property ID..."
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <Search />
                                                        </InputAdornment>
                                                    }
                                                    disableUnderline
                                                />
                                            </div>
                                            <Button className="search_button" type="submit">
                                                <Typography>Search</Typography>
                                            </Button>
                                            <IconButton>
                                                <SearchRounded />
                                            </IconButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="house">
                                <Image
                                    src={banner.icon}
                                    alt="hello"
                                    width={800}
                                    height={800}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="features">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="feature_parent">
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                        <Grid container>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={6}>
                                                <Typography variant="h4">{banner.feature_title}</Typography>
                                                <Typography variant="h6">{banner.feature_quote}</Typography>
                                                <Button className="browse" href="/buy/buy_page">
                                                    <Typography>
                                                        {banner.feature_button}
                                                    </Typography>
                                                </Button>

                                            </Grid>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={6}>
                                                <div className="images">
                                                    <Image
                                                        src={banner.feature_image}
                                                        alt="our features"
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                        <Grid container spacing={4} marginTop={0.4} >
                                            {feature.map((item, index) => (
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} key={index}>
                                                    <div className="icons">
                                                        <Image
                                                            src={item.image}
                                                            alt="1."
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                                    <Typography variant="h5">{item.title}</Typography>
                                                    <Typography variant="h6">
                                                        {item.description}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="featured_properties">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="properties_parent">
                                <Typography variant="h5">Featured Properties</Typography>
                                <Typography variant="h6">
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit.
                                </Typography>
                                <div className="properties_tab">
                                    <ul className="list">
                                        <li className={`list_item ${item == '' ? 'active' : ''}`} onClick={() => setItem('')} >All Properties</li>
                                        <li className={`list_item ${item == 'Villa' ? 'active' : ''}`} onClick={() => setItem('Villa')} >Villa</li>
                                        <li className={`list_item ${item == 'Apartment' ? 'active' : ''}`} onClick={() => setItem('Apartment')} >Apartment</li>
                                        <li className={`list_item ${item == 'Office' ? 'active' : ''}`} onClick={() => setItem('Office')} >Office</li>
                                    </ul>
                                    <div className="property_grid">
                                        <Grid container spacing={2.5} >
                                            {buy.map((card, index) => (
                                                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                                                    <div className="card">
                                                        <div className="featured_image">
                                                            <Link href={`/buy/${card.slug}`} passHref>
                                                                <Image src={`${imagePath}${card.image[0]}`} alt={card.type} width={800} height={800} loading="lazy" />
                                                            </Link>
                                                        </div>
                                                        <ul className="chip_list">
                                                            <li className="chip">{card.availability}</li>
                                                        </ul>
                                                        <div className="details">
                                                            <Link href={`/buy/${card.slug}`} passHref>
                                                                <h5 className="title">{card.type}</h5>
                                                            </Link>
                                                            <div className="address">
                                                                <LocationOnRounded />
                                                                <p>{card.address}</p>
                                                            </div>
                                                            <div className='bottom'>

                                                                <ul className="list_feature">
                                                                    <li><HotelOutlined /> {card.bedrooms}</li>
                                                                    <li><BathtubTwoTone /> {card.bathrooms}</li>
                                                                    <li><FilterNone /> {card.area} sq ft</li>
                                                                </ul>
                                                                <h5 className="price">
                                                                    {card.availability.includes("For Rent") ? (<>{card.price}<span style={{ fontWeight: '100' }}>/month</span></>) : `${card.price}`}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                    {/* {item == 1 ? <div className="property_grid">
                                        <Grid container spacing={2.5} >
                                            {cardsData.map((card, index) => (
                                                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                                                    <Link href={"#"}>
                                                        <div className="card">
                                                            <div className="featured_image">
                                                                <Image src={card.imageSrc} alt={card.title} />
                                                            </div>
                                                            <ul className="chip_list">
                                                                {card.chips.map((chip, chipIndex) => (
                                                                    <li key={chipIndex} className={chip === "featured" ? "chip featured" : "chip"}>{chip}</li>
                                                                ))}
                                                            </ul>
                                                            <div className="details">
                                                                <h5 className="title">{card.title}</h5>
                                                                <div className="address">
                                                                    <LocationOnRounded />
                                                                    <p>{card.address}</p>
                                                                </div>
                                                                <div className='bottom'>

                                                                    <ul className="list_feature">
                                                                        <li><HotelOutlined /> {card.features.bedrooms}</li>
                                                                        <li><BathtubTwoTone /> {card.features.bathrooms}</li>
                                                                        <li><FilterNone /> {card.features.area} sq ft</li>
                                                                    </ul>

                                                                    <h5 className="price">
                                                                        {card.chips.includes("for rent") ? (<>{card.price}<span style={{ fontWeight: '100' }}>/month</span></>) : `${card.price}`}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div> : ""}
                                    {item == 2 ? <div className="property_grid">
                                        <Grid container spacing={2.5} >
                                            {cardsData.map((card, index) => (
                                                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                                                    <Link href={"#"}>
                                                        <div className="card">
                                                            <div className="featured_image">
                                                                <Image src={card.imageSrc} alt={card.title} />
                                                            </div>
                                                            <ul className="chip_list">
                                                                {card.chips.map((chip, chipIndex) => (
                                                                    <li key={chipIndex} className={chip === "featured" ? "chip featured" : "chip"}>{chip}</li>
                                                                ))}
                                                            </ul>
                                                            <div className="details">
                                                                <h5 className="title">{card.title}</h5>
                                                                <div className="address">
                                                                    <LocationOnRounded />
                                                                    <p>{card.address}</p>
                                                                </div>
                                                                <div className='bottom'>

                                                                    <ul className="list_feature">
                                                                        <li><HotelOutlined /> {card.features.bedrooms}</li>
                                                                        <li><BathtubTwoTone /> {card.features.bathrooms}</li>
                                                                        <li><FilterNone /> {card.features.area} sq ft</li>
                                                                    </ul>

                                                                    <h5 className="price">
                                                                        {card.chips.includes("for rent") ? (<>{card.price}<span style={{ fontWeight: '100' }}>/month</span></>) : `${card.price}`}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div> : ""}
                                    {item == 3 ? <div className="property_grid">
                                        <Grid container spacing={2.5} >
                                            {cardsData.map((card, index) => (
                                                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                                                    <Link href={"#"}>
                                                        <div className="card">
                                                            <div className="featured_image">
                                                                <Image src={card.imageSrc} alt={card.title} />
                                                            </div>
                                                            <ul className="chip_list">
                                                                {card.chips.map((chip, chipIndex) => (
                                                                    <li key={chipIndex} className={chip === "featured" ? "chip featured" : "chip"}>{chip}</li>
                                                                ))}
                                                            </ul>
                                                            <div className="details">
                                                                <h5 className="title">{card.title}</h5>
                                                                <div className="address">
                                                                    <LocationOnRounded />
                                                                    <p>{card.address}</p>
                                                                </div>
                                                                <div className='bottom'>

                                                                    <ul className="list_feature">
                                                                        <li><HotelOutlined /> {card.features.bedrooms}</li>
                                                                        <li><BathtubTwoTone /> {card.features.bathrooms}</li>
                                                                        <li><FilterNone /> {card.features.area} sq ft</li>
                                                                    </ul>

                                                                    <h5 className="price">
                                                                        {card.chips.includes("for rent") ? (<>{card.price}<span style={{ fontWeight: '100' }}>/month</span></>) : `${card.price}`}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div> : ""} */}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="slider_div">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="inner_parent">
                                <>
                                    <Swiper
                                        slidesPerView={5}
                                        spaceBetween={0}
                                        loop={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={{
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev',
                                        }}
                                        breakpoints={{

                                            992: {
                                                slidesPerView: 5
                                            },
                                            600: {
                                                slidesPerView: 3
                                            },
                                            0: {
                                                slidesPerView: 1
                                            }

                                        }}
                                        centeredSlides={true} // Center the active slide
                                        modules={[Pagination, Navigation]}
                                        className="mySwiper"

                                    >
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slide_image">
                                                <Image
                                                    src={slide1}
                                                    alt="image"
                                                    title="..."

                                                />
                                            </div>
                                        </SwiperSlide>
                                        <div className="swiper-button-next">
                                            <ArrowForward />
                                        </div>
                                        <div className="swiper-button-prev">
                                            <ArrowBack />
                                        </div>
                                    </Swiper>
                                </>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="find_properties">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="find">
                                <Typography variant="h5">Find Properties in this cities</Typography>
                                <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                                <Grid container spacing={2}>
                                    {locationProperty.map((item, index) => (
                                        <Grid item xl={3} lg={3} md={3} sm={6} xs={6} key={index}>
                                            <div className="small_picture">
                                                <div className="small_images" onClick={()=>handleLocationClick(item._id)}>
                                                    <Image
                                                        src={small}
                                                        alt="image"
                                                    />
                                                </div>
                                                <div className="info">
                                                    <p className="property">{item.count} Properties</p>
                                                    <p className="city">{item._id}</p>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}