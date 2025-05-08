'use client'
import { Button, Container, Grid, Typography } from '@mui/material';
import '../../../../../public/sass/pages/detail.scss';
import { BathtubTwoTone, Call, EmailOutlined, FilterNone, FmdGoodTwoTone, HotelOutlined, LocationOnRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { getApi } from '../../../../helpers/General'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Detail() {
    const { slug } = useParams();
    const [detail, setDetail] = useState([]);
    const [timeAgo, setTimeAgo] = useState('');
    const [random, setRandom] = useState([]);
    const [More, setMore] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const getRandom = async () => {
        let resp = await getApi('property/random');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.random) {
                setRandom(data.random);
            }
        }
    }

    const getData = async (slug) => {
        let resp = await getApi(`property/view/${slug}`)
        if (resp && resp.status) {
            let { data } = resp;
            if (data.data && data) {
                setDetail(data.data)
            }
        }
    }

    useEffect(() => {
        if (slug) {
            getData(slug);
        }
        getRandom();
    }, [slug]);

    //timeStamp
    useEffect(() => {
        if (detail && detail.created_at) {
            const createdAt = new Date(detail.created_at);
            const currentTime = new Date();
            const timeDifference = Math.floor((currentTime - createdAt) / 1000); // Time difference in seconds

            // Helper function to format time
            const getTimeAgo = (seconds) => {
                const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

                const timeIntervals = [
                    { label: 'year', seconds: 31536000 }, // 60 * 60 * 24 * 365
                    { label: 'month', seconds: 2592000 }, // 60 * 60 * 24 * 30
                    { label: 'week', seconds: 604800 },   // 60 * 60 * 24 * 7
                    { label: 'day', seconds: 86400 },     // 60 * 60 * 24
                    { label: 'hour', seconds: 3600 },     // 60 * 60
                    { label: 'minute', seconds: 60 },     // 60
                    { label: 'second', seconds: 1 },
                ];

                for (const interval of timeIntervals) {
                    const result = Math.floor(seconds / interval.seconds);
                    if (result >= 1) {
                        return rtf.format(-result, interval.label);
                    }
                }
                return 'Just now';
            };

            setTimeAgo(getTimeAgo(timeDifference));
        }
    }, [detail]);

    const Read = () => {
        setMore(!More)
    };
    const description = `${detail.description}`;

    let imagePath = process.env.url
    return (
        <div className='buy_detail'>
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className='detail_parent'>
                            <Grid container columnSpacing={4} rowSpacing={1.5}>
                                <Grid item xl={7} lg={7} md={7} sm={6} xs={12}  >
                                    <>
                                        <Swiper
                                            style={{
                                                '--swiper-navigation-color': '#fff',
                                                '--swiper-pagination-color': '#fff',
                                            }}
                                            spaceBetween={10}
                                            navigation={true}
                                            thumbs={{ swiper: thumbsSwiper }}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper2"
                                        >
                                            {
                                            detail.image?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <img src={ `${imagePath}${item}` } />
                                                </SwiperSlide>
                                            ))}

                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            spaceBetween={10}
                                            slidesPerView={2}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper"
                                        >
                                            {detail.image?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <img src={`${imagePath}${item}`} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </>
                                </Grid>
                                <Grid item xl={5} lg={5} md={5} sm={6} xs={12} >
                                    <div className='title'>
                                        <div className='heading'>
                                            <Typography >{detail.type}</Typography>
                                            <Typography>{detail.availability == 'For Sale' ?  `$${detail.price}`: `$${detail.price}/month` }</Typography>
                                        </div>
                                        <div className='address'>
                                            <FmdGoodTwoTone />
                                            <h4>{detail.address}</h4>
                                        </div>
                                        <p>Listed {timeAgo}</p>
                                    </div>
                                    <div className='description'>
                                        <h4>Description</h4>
                                        <p>
                                            {More ? description : description.substring(0,200)}
                                        </p>
                                        <Button variant='standard' onClick={Read}>
                                            {More ? 'Read Less' : 'Read More'}
                                        </Button>
                                    </div>
                                    <div className='utils'>
                                        <ul className='utils_list'>
                                            <li className='utils_item' >
                                                <div className='utils_head'>
                                                    <FilterNone />
                                                    Area
                                                </div>
                                                <div className='value'>
                                                    {detail.area} sq ft
                                                </div>
                                            </li>
                                            <li className='utils_item'>
                                                <div className='utils_head'>
                                                    <HotelOutlined />
                                                    Bedroom
                                                </div>
                                                <div className='value'>
                                                    {detail.bedrooms}
                                                </div>
                                            </li>
                                            <li className='utils_item' >
                                                <div className='utils_head'>
                                                    <BathtubTwoTone />
                                                    Bathroom
                                                </div>
                                                <div className='value'>
                                                    {detail.bathrooms}
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className='agent_details'>
                                        <h4>Agent Details</h4>
                                        <div className='details'>
                                            <p>Name:</p>
                                            <h6>{detail.contact_name}</h6>
                                        </div>
                                        <div className='details'>
                                            <p>Address:</p>
                                            <h6>{detail.address}</h6>
                                        </div>
                                        <div className='details'>
                                            <p><Call />Call:</p>
                                            <a href='tel:(603) 555-0123'>
                                                <h6>{detail.contact_number}</h6>
                                            </a>
                                        </div>
                                        <div className='details'>
                                            <p><EmailOutlined />Email:</p>
                                            <a href='mailto:debbie.baker@example.com'>
                                                <h6>{detail.email}</h6>
                                            </a>
                                        </div>
                                    </div>
                                    <div className='btn_area'>
                                        <Button variant='contained'>
                                            <Link href={`/buy/buy_fill?slug=${detail.slug}`} >
                                                Get In Touch
                                            </Link>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='explore'>
                                <h4>Explore other properties</h4>
                                <Grid container columnSpacing={2.5} rowSpacing={2.5}>
                                    {random.map((card, index) => (
                                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                                            <Link href={`/buy/${card.slug}`} passHref >
                                                <div className="card">
                                                    <div className="featured_image">
                                                        <Image src={ `${imagePath}${card.image[0]}` } alt={'picture'} width={700} height={700} />
                                                    </div>
                                                    <ul className="chip_list">
                                                        {/* {card.chips.map((chip, chipIndex) => (
                                                            <li key={chipIndex} className={chip === "featured" ? "chip featured" : "chip"}>{chip}</li>
                                                        ))} */}
                                                        <li className='chip'>
                                                            {card.availability}
                                                        </li>
                                                    </ul>
                                                    <div className="details">
                                                        <h5 className="title">{card.type}</h5>
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
                                                                {card.availability == 'For Sale' ? `$${card.price}`  :`$${card.price}/month` }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
} 