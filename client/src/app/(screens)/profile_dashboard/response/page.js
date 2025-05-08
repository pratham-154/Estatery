'use client'
import { Container, Grid, Pagination, Stack } from "@mui/material";
import Image from "next/image";
import '../../../../../public/sass/pages/sell_response.scss';
import { Call, Delete, EmailOutlined } from "@mui/icons-material";
import Sidebar from "../../../components/sell_sidebar";
import { getApi,postApi } from '../../../../helpers/General'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Response() {

    const [info, setInfo] = useState({
        buy: [],
        page: 1,
        totalPages: 1,
        totalCount: 1
    })

    const getResponse = async () => {
        let resp = await getApi('response', {
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
    const handleDelete = async(id)=>{
        let resp = await getApi( `response/remove/${id}`);
        if (resp.status) {
            toast.success(resp.message)
            getResponse();
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
        getResponse();
    }, [info.page]);
    console.log(info);

    let imagePath = process.env.url
    return (
        <div className="response_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="response_parent">
                            <div className="sidebar">
                                <Sidebar />
                            </div>
                            <div className="all_response">
                                <Grid container columnSpacing={3} rowSpacing={3}>
                                    {info.buy.map((item, index) => (
                                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
                                            <div className="response_item">
                                                <div className="head">
                                                    <Grid container columnSpacing={1} alignItems={'center'}>
                                                        <Grid item xl={4.5} lg={4.5} md={4.5} sm={4.5} xs={4.5} >
                                                            <div className="image">
                                                                <Image
                                                                    src={`${imagePath}${item.property_id.image[0]}`}
                                                                    alt="image"
                                                                    width={500}
                                                                    height={500}
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xl={7.5} lg={7.5} md={7.5} sm={7.5} xs={7.5} >
                                                            <div className="left">
                                                                <h3>{`${item.first_name} ${item.last_name}`} </h3>
                                                                <div className="contact">
                                                                    <p><Call /><a href={`tel:${item.contact_number}`}>{item.contact_number}</a></p>
                                                                    <p><EmailOutlined />{item.email}</p>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div className="bottom">
                                                    <div className="address">
                                                        {item.property_id.address}
                                                        <Delete cursor='pointer' onClick={()=>{
                                                            handleDelete(item._id)
                                                        }}/>
                                                    </div>
                                                    <h5>{item.property_id.type}</h5>
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