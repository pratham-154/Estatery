'use client'
import { Checkbox, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import '../../../../public/sass/pages/liked.scss';
import Link from "next/link";
import Image from "next/image";
import { Favorite, FavoriteBorder, FmdGoodOutlined } from "@mui/icons-material";
import altimg from '../../../../public/images/buy/gallery.png';
import { useEffect, useRef, useState } from "react";
import { getApi, postApi, validatorMake } from '../../../helpers/General';
import { toast } from "react-toastify";

export default function Liked() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    const isFirstRender = useRef(true);

    const [info, setInfo] = useState({
        buy: [],
        page: 1,
        totalPages: 1,
        totalCount: 1
    })
    const initailLike = () => {
        if (typeof window != "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            return {
                liked: searchParams.get('liked') ? searchParams.get('liked').split(',') : [],
            }
        }
        return {
            liked: []
        }
    };

    const [liked, setLiked] = useState(initailLike);
    const updateURL = () => {
        if (typeof window != "undefined") {
            const searchParams = new URLSearchParams();
            if(liked) searchParams.set('liked',liked)

            const queryString = `?${searchParams.toString()}`;
            window.history.replaceState(null, '', queryString);
        };

    };

    const handlePageChange = (event, value) => {
        setInfo((prevData) => ({
            ...prevData,
            page: value
        }));
    };

    const getBuy = async () => {
        let resp = await getApi('property/likedProperty',{
            page:info.page
        });
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setInfo((prevData) => ({
                    ...prevData,
                    buy: data.data,
                    totalPages: data.totalPages,
                    totalCount: data.totalCount
                }))
            }
        }
    }

    const handleLikes = (e, placeId) => {
        if (e.target.checked) {
            setLiked((prevLiked) => [...prevLiked, placeId]);
        } 
        else {
            setLiked((prevLiked) => prevLiked.filter(id => id !== placeId));
        }
    };

    const getUserData = async () => {
        let resp = await getApi('user/view');
        console.log('resp', resp);
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setLiked(data.data.liked);
            }
        }
    }

    const putLike = async () => {
        let data = {
            liked: liked
        }
        let resp = await postApi('user/likes', data)
        if (resp.status) {
                toast.success(resp.message);
        }
        else {
            if(!isFirstRender.current){
                toast.error(resp.message)
            }
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        updateURL();
    }, [liked]);
    
    useEffect(() => {
        putLike();
    }, [liked]);
    
    useEffect(() => {
        getBuy();
    }, [info.page]);

    let imagePath = process.env.url
    return (
        <div className="liked_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="liked_parent">
                            <div className="results">
                                <div className="text">
                                    <Typography variant="h4">{info.buy.length} Results </Typography>
                                </div>
                            </div>
                            <Grid container rowSpacing={3} columnSpacing={2}>
                                {info.buy.map((place, index) => (
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                                        <div className="card">
                                            <Link href={`/buy/${place.slug}`} passHref>
                                                <div className="image_div">
                                                    <Image
                                                        src={`${imagePath}${place.image[0]}`}
                                                        alt={altimg}
                                                        priority={false}
                                                        width={500}
                                                        height={600}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </Link>
                                            <div className="details">
                                                <div className="title">
                                                    <Link href={`/buy/${place.slug}`} passHref>
                                                        <Typography>{place.type}</Typography>
                                                    </Link>
                                                    <Checkbox
                                                        {...label}
                                                        icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite sx={{
                                                            color: "#d50000",
                                                        }} />}
                                                        checked={liked.includes(place.slug)}
                                                        onChange={(e) => handleLikes(e, place.slug)}
                                                    />
                                                </div>
                                                <div className="city">
                                                    <FmdGoodOutlined />
                                                    {place.city}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                        <div className="pagination">
                            <Stack spacing={2}>
                                {/* <Typography>Page: {page}</Typography> */}
                                <Pagination count={info.totalPages} page={info.page} onChange={handlePageChange} />
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}