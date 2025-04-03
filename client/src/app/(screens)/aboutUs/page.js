'use client'
import { Button, Container, Grid } from '@mui/material';
import '../../../../public/sass/pages/aboutUs.scss';
import Image from 'next/image';
import rhombus from '../../../../public/images/about/component.png'
import vision from '../../../../public/images/about/vision.png'
import { Star } from '@mui/icons-material';
import svg from '../../../../public/images/about/svg.png'
import { useEffect, useState } from 'react';
import { getApi, renderHtml } from '../../../helpers/General'
export default function About() {
    const stars = Array(5).fill(0);

    const [pages, setPage] = useState([]);
    const [comments, setComments] = useState([]);
    const [partner, setPartner] = useState([]);

    const getData = async () => {
        let resp = await getApi('about/view/67001e3f7096424911120c8b');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setPage(data.data);
            }
        }
    }


    const getComment = async () => {
        let resp = await getApi('faq');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setComments(data.data);
            }
        }
    }

    const getPartner = async () => {
        let resp = await getApi('partner');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setPartner(data.data);
            }
        }
    }
    useEffect(() => {
        getData();
        getComment();
        getPartner();
    }, []);
    return (
        <div className='about_container'>
            <div className='overview'>
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='inner_parent'>
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={5} xs={12} >
                                        <div className='image'>
                                            <Image
                                                src={pages.image}
                                                alt={'Overview'}
                                                width={1000}
                                                height={1000}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={7} xs={12}>
                                        <div className='detail'>
                                            <div className='header'>
                                                <Image
                                                    src={rhombus}
                                                    alt='*'

                                                />
                                                <h5 className='about'>About us</h5>
                                            </div>
                                            <h4 className='heading'>{pages.title}</h4>
                                            <h6 className='description'>
                                                {pages.description}
                                            </h6>
                                            <Button href='#C1'>Our Partners</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className='vision-ethics'>
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='inner_parent'>
                                <Grid container rowSpacing={2}>
                                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                                        <div className='vision'>
                                            <div className='superset'>
                                                <div className='image'>
                                                    <Image
                                                        src={vision}
                                                        alt='__'

                                                    />
                                                </div>
                                                <h4 className='head'>Vision</h4>
                                            </div>
                                            <h6 className='description' dangerouslySetInnerHTML={renderHtml(pages.vision)}>
                                            </h6>
                                        </div>
                                    </Grid>
                                    <Grid item xl={2} lg={2} md={2} sm={0} xs={0} >
                                        <div style={{
                                            height: '100%',
                                            width: '2px',
                                            backgroundColor: 'white', // Change the color as needed
                                            margin: '0 auto' // Adjust spacing around the line
                                        }} />
                                    </Grid>
                                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12} >
                                        <div className='ethics'>
                                            <div className='superset'>
                                                <div className='image'>
                                                    <Image
                                                        src={vision}
                                                        alt='__'

                                                    />
                                                </div>
                                                <h4 className='head'>Ethics</h4>
                                            </div>
                                            <h6 className='description' dangerouslySetInnerHTML={renderHtml(pages.vision)}>
                                            </h6>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className='partner'>
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className='inner_parent'>
                                <div className='reviews'>
                                    <div className='head'>
                                        <div className='statement'>What our customers are
                                            saying us?</div>
                                        <div className='likes'>
                                            <ul>
                                                <li className='heading'><h5>10m+</h5></li>
                                                <li className='info'>Happy people</li>
                                            </ul>
                                            <ul>
                                                <li className='heading'><h5>4.88</h5></li>
                                                <li className='info'>overall rating</li>
                                                <li>{stars.map((_, index) => (
                                                    <Star key={index} style={{ color: 'yellow', marginRight: '4px' }} />
                                                ))}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='comments'>
                                        <Grid container columnSpacing={3} rowSpacing={4}>
                                            {comments.map((comments, index) => (
                                                <Grid key={index} item xl={4} lg={4} md={4} sm={6} xs={12}>
                                                    <div className='main_body'>
                                                        <div className='heads'>
                                                            <div className='profile'>
                                                                <div className='avatar'>
                                                                    <Image
                                                                        src={comments.avatar}
                                                                        alt={comments.title.charAt(0)}
                                                                        width={100}
                                                                        height={100}
                                                                    />
                                                                </div>
                                                                <div className='name'>
                                                                    <p>{comments.title}</p>
                                                                    <p className='role'>{comments.role}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='pera'>
                                                            {comments.description}
                                                        </div>
                                                        <div className='quote'>
                                                            <Image
                                                                src={svg}
                                                                alt='quote'
                                                            />
                                                        </div>
                                                    </div>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </div>
                                <div className='support'>
                                    <div id='C1' className='headings'>
                                        Support
                                    </div>
                                    <Grid container rowSpacing={3}>
                                        {partner.map((item, index) => (

                                            <Grid item xl={2} lg={2} md={2} sm={3} xs={4} key={index}>
                                                <div className='sponser'>
                                                    <Image
                                                        src={item.icon}
                                                        alt='Partner'
                                                        width={400}
                                                        height={400}
                                                    />
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}