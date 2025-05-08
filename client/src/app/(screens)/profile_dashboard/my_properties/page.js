'use client'
import { Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import altimg from '../../../../../public/images/buy/gallery.png';
import Sidebar from "../../../components/sell_sidebar";
import { Delete, Edit, FmdGoodOutlined } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import '../../../../../public/sass/pages/sell_myproperties.scss';
import { useEffect, useState } from "react";
import { getApi, postApi } from '../../../../helpers/General'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function MyProperty() {
    const router = useRouter();
    const [info, setInfo] = useState({
        buy: [],
        page: 1,
        totalPages: 1,
        totalCount: 1
    })

    const getBuy = async () => {
        let resp = await getApi('property/list', {
            page: info.page
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

    const handlePageChange = (event, value) => {
        setInfo((prevData) => ({
            ...prevData,
            page: value
        }));
    };

    const handleEdit = async (slug) => {
        router.push(`/profile_dashboard/sell?slug=${slug}`)
    }

    const handleDelete = async (id) => {
        let resp = await getApi(`property/remove/${id}`);
        if (resp.status) {
            toast.success(resp.message)
            getBuy();
        }
        else {
            if (typeof resp.message == 'object') {
                toast.error(resp.message)
            }
            else {
                toast.error(resp.message)
            }
        }

    }

    useEffect(() => {
        getBuy();
    }, [info.page,])

    let imagePath = process.env.url

    return (
        <div className="myproperty_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="myproperty_parent">
                            <div className="sidebar">
                                <Sidebar />
                            </div>
                            <div className="myproperty">
                                <div className="results">
                                    <div className="text">
                                        <Typography variant="h4">{info.buy.length} </Typography>
                                        <Typography variant="h6">in Result</Typography>
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
                                                            loading="lazy"
                                                            width={500}
                                                            height={700}

                                                        />
                                                    </div>
                                                </Link>
                                                <div className="details">
                                                    <div className="title">
                                                        <Link href={`/buy/${place.slug}`} passHref>
                                                            <Typography>{place.type}</Typography>
                                                        </Link>
                                                        <div className="icons">
                                                            <Edit onClick={() => handleEdit(place.slug)} />
                                                            <Delete onClick={() => handleDelete(place._id)} />
                                                        </div>
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
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div className="pagination">
                <Stack spacing={2}>
                    {/* <Typography>Page: {page}</Typography> */}
                    <Pagination count={info.totalPages} page={info.page} onChange={handlePageChange} />
                </Stack>
            </div>

        </div>
    )
}