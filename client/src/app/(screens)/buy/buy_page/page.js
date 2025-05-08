'use client'
import { Box, Button, Checkbox, Container, Typography, Grid, TextField, FormControl, Select, MenuItem, FormLabel, Stack, Pagination } from "@mui/material";
import '../../../../../public/sass/pages/buy.scss';
import { useEffect, useRef, useState } from "react";
import { Favorite, FavoriteBorder, Close, FmdGoodOutlined } from "@mui/icons-material";
import { FormControlLabel, FormGroup, IconButton, Input, Slider } from "@mui/material";
import { } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { getApi, postApi, validatorMake } from '../../../../helpers/General';
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

function valuetext(value) {
    return `${value}`;
}
export default function Buy() {
    const searchParams = useSearchParams();

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const avail = ['For Sale', 'For Rent', 'None']
    const [category, setCategory] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isFirstRender = useRef(true);

    const [info, setInfo] = useState({
        buy: [],
        page: 1,
        totalPages: 1,
        totalCount: 1
    })
    const getInitialFilterData = () => {
        if (typeof window != "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            return {
                loc: searchParams.get('loc') || null,
                availability: searchParams.get('availability') || null,
                placeType: searchParams.get('placeType') ? searchParams.get('placeType').split(',') : [],
                value: [
                    parseInt(searchParams.get('minValue') || 100),
                    parseInt(searchParams.get('maxValue') || 10000)
                ],
                minSize: parseInt(searchParams.get('minSize')) || null,
                maxSize: parseInt(searchParams.get('maxSize')) || null,
            };
        }
        return {
            loc: '',
            availability: '',
            placeType: [],
            value: [100, 10000],
            minSize: '',
            maxSize: ''
        }
    };
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

    const [filterData, setFilterData] = useState(getInitialFilterData);

    const firstFetch = () => {
        filterData.loc = searchParams.get('loc') || null;
        filterData.placeType = searchParams.get('placeType') ? searchParams.get('placeType').split(',') : [],
        filterData.availability = searchParams.get('availability') || null;
    }

    const updateURL = () => {
        if (typeof window != "undefined") {
            const searchParams = new URLSearchParams();
            if (filterData.loc) searchParams.set('loc', filterData.loc);
            if (filterData.availability) searchParams.set('availability', filterData.availability);
            if (filterData.placeType.length) searchParams.set('placeType', filterData.placeType.join(','));
            if (filterData.value) {
                searchParams.set('minValue', filterData.value[0]);
                searchParams.set('maxValue', filterData.value[1]);
            }
            if (filterData.minSize) searchParams.set('minSize', filterData.minSize);
            if (filterData.maxSize) searchParams.set('maxSize', filterData.maxSize);
            if (liked) searchParams.set('liked', liked);

            const queryString = `?${searchParams.toString()}`;
            window.history.replaceState(null, '', queryString);
        };

    };
    const handleLocChange = (e) => {
        setFilterData((prevData) => ({
            ...prevData,
            loc: e.target.value
        }))
    };
    const handleAvailabilityChange = (e) => {
        if (e.target.value == 'None') {
            setFilterData((prevData) => ({
                ...prevData,
                availability: ''
            }))
        }
        else {

            setFilterData((prevData) => ({
                ...prevData,
                availability: e.target.value
            }))
        }
    };
    const handlePlaceTypeChange = (e, label) => {
        const checked = e.target.checked;
        setFilterData(prevData => ({
            ...prevData,
            placeType: checked
                ? [...prevData.placeType, label]
                : prevData.placeType.filter(type => type !== label)
        }));
    };
    const handleChange = (e) => {
        setFilterData((prevData) => ({
            ...prevData,
            value: e.target.value
        }))
    };
    const handleMinChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) >= 0) {
            setFilterData((prevData) => ({
                ...prevData,
                minSize: Number(value)
            }));
        }
    }
    const handleMaxChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) >= 0) {
            setFilterData((prevData) => ({
                ...prevData,
                maxSize: Number(value)
            }));
        }
    }
    const handlePageChange = (event, value) => {
        setInfo((prevData) => ({
            ...prevData,
            page: value
        }));
    };
    const getBuy = async () => {
        let resp = await getApi('property', {
            location: filterData.loc,
            priceRange: filterData.value,
            placeType: filterData.placeType,
            availability: filterData.availability,
            minSize: filterData.minSize,
            maxSize: filterData.maxSize,
            page: info.page,
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
    const getCategory = async () => {
        let resp = await getApi('category');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setCategory(data.data)
            }
        }
    }
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
    };

    const handleLikes = async (e, placeId) => {
        if (e.target.checked) {
            setLiked((prevLiked) => [...prevLiked, placeId]);
        }
        else {
            setLiked((prevLiked) => prevLiked.filter(id => id !== placeId));
        }
    };

    const marks = [
        {
            value: 100,
            label: `$${valuetext(filterData.value[0])}`
        },
        {
            value: 10000,
            label: `$${valuetext(filterData.value[1])}`
        }
    ]

    const getUserData = async () => {
        let resp = await getApi('user/view');
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
        console.log('data', data);
        let resp = await postApi('user/likes', data)
        if (resp.status) {
            toast.success(resp.message);
        }

        else {
            if (!isFirstRender.current) {
                toast.error(resp.message)
            }
        }

    }

    useEffect(() => {
        getCategory();
        getUserData();
        firstFetch();
    }, []);

    useEffect(() => {
        updateURL();
    }, [filterData, liked]);

    useEffect(() => {
        putLike()
    }, [liked])

    useEffect(() => {
        getBuy();
    }, [filterData, info.page]);


    let imagePath = process.env.url

    return (
        <div className="buy_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="outer_container">
                            <div className={`${drawerOpen === true ? 'open' : 'close'} left`}>
                                <div className="title">
                                    <>Filter</>
                                    <IconButton onClick={handleDrawerClose} >
                                        <Close />
                                    </IconButton>
                                </div>
                                <div className="location">
                                    <h3 className="heading">Location</h3>
                                    <TextField
                                        id="location"
                                        name="location"
                                        type="text"
                                        size="small"
                                        placeholder="Enter Location"
                                        fullWidth
                                        value={filterData.loc || ''}
                                        onChange={handleLocChange}
                                    />
                                </div>
                                <div className="place_type">
                                    <h3 className="heading">Availability</h3>
                                    <FormControl fullWidth>
                                        <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filterData.availability || ''}
                                            defaultValue={''}
                                            onChange={handleAvailabilityChange}
                                        >
                                            {avail.map((item, index) => (
                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="place_type">
                                    <h3 className="heading">Type of Place</h3>
                                    <Grid container>
                                        {category.map((label, index) => (
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} key={index}>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox
                                                        onChange={(e) => handlePlaceTypeChange(e, label._id)}
                                                        disableRipple
                                                        checked={filterData.placeType.includes(label._id)}
                                                        sx={{
                                                            transition: 'transform 0.1s ease-in-out',
                                                            '&.Mui-checked': {
                                                                color: 'rgba(24, 69, 182, 1)'
                                                            },
                                                        }} />}
                                                        label={label.title}
                                                        sx={{
                                                            '.Mui-checked + .MuiFormControlLabel-label': {
                                                                color: 'rgba(24, 69, 182, 1)',
                                                                transform: 'scale(1.06)',
                                                                transition: 'transform 0.1s ease-in-out',
                                                            },
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                                <div className="price_range">
                                    <h3 className="heading">Price range</h3>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Slider
                                            getAriaLabel={() => 'Price range'}
                                            value={filterData.value}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            min={100}
                                            max={10000}
                                            disableSwap
                                            marks={marks}
                                            sx={{
                                                // color: green[900],
                                                color: 'rgba(24, 69, 182, 1)',
                                                maxWidth: 200,
                                            }}
                                            getAriaValueText={valuetext}
                                        />
                                    </Box>
                                </div>
                                <div className="size">
                                    <h3 className="heading">Size(Enter Number)</h3>
                                    <div className="areas">
                                        <div className="min">
                                            <p className="placeholder">Min</p>
                                            <Input
                                                id="min"
                                                name="min"
                                                type="text"
                                                placeholder="sq ft"
                                                disableUnderline
                                                value={filterData.minSize || ''}
                                                onChange={handleMinChange}
                                                sx={{
                                                    paddingLeft: '40px'
                                                }}
                                            />
                                        </div>
                                        <div className="max">
                                            <p className="placeholder">Max</p>
                                            <Input
                                                id="max"
                                                name="max"
                                                type="text"
                                                placeholder="sq ft"
                                                disableUnderline
                                                value={filterData.maxSize || ''}
                                                onChange={handleMaxChange}
                                                sx={{
                                                    paddingLeft: '40px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="results">
                                    <div className="text">
                                        <Typography variant="h4">{info.totalCount} Results </Typography>
                                    </div>
                                    <div className="filter">
                                        <Button onClick={handleDrawerOpen} className="title" disableRipple>Filter</Button>
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
                                                            alt={"Pictures"}
                                                            priority={false}
                                                            loading="lazy"
                                                            width={400}
                                                            height={400}
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="details">
                                                    <div className="title">
                                                        <Link href={`/buy/${place.slug}`} passHref>
                                                            <Typography>{place.type.charAt(0).toUpperCase() + place.type.slice(1)}</Typography>
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
                                                        {place.city.charAt(0).toUpperCase() + place.city.slice(1)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                                <div className="pagination">
                                    <Stack spacing={2}>
                                        {/* <Typography>Page: {page}</Typography> */}
                                        <Pagination count={info.totalPages} page={info.page} onChange={handlePageChange} />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}