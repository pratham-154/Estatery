'use client'
import { Container, Grid, IconButton, Pagination, Stack, Typography } from "@mui/material";
import '../../../../../public/sass/pages/blogs.scss';
import Image from "next/image";
import { ArrowOutward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getApi } from '../../../../helpers/General'
export default function Blog() {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const [head, setHead] = useState({});
    const [post , setPost] = useState([]);
    const getHead = async () => {
        let resp = await getApi('blog_head');
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setHead(data.data[0]);
                setPost(data.data.slice(1,7));
            }
        }
    }

    useEffect(() => {
        getHead();
    }, []);

    return (
        <div className="blog_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="inner_parent">
                            <div className="highlighted">
                                <Grid container columnSpacing={3}>
                                    <Grid item xl={6} lg={6} md={6} sm={5} xs={12} >
                                        <Link href='/blogs/blog_detail'>
                                            <div className="images">
                                                <Image
                                                    src={head.image}
                                                    alt="blog1"
                                                    width={700}
                                                    height={700}
                                                />
                                            </div>
                                        </Link>

                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={7} xs={12} >
                                        <p className="date">
                                            {head.nameAndDate}
                                        </p>
                                        <h4 className="heading">
                                            <Link href='/blogs/blog_detail'>
                                                {head.title}
                                            </Link>
                                            <IconButton
                                                href="/blogs/blog_detail"
                                                disableRipple
                                                className="arrow"
                                            >
                                                <ArrowOutward />
                                            </IconButton>
                                        </h4>
                                        <p className="description">
                                            {head.description}
                                        </p>

                                    </Grid>
                                </Grid>
                            </div>
                            <div className="all_blogs">
                                <p className="head">
                                    All Blog Posts
                                </p>
                                <Grid container columnSpacing={3} rowSpacing={3}>
                                    {post.map((card, index) => (
                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12} key={index}>
                                            <div className="card">
                                                <Link href='/blogs/blog_detail'>
                                                    <div className="images">
                                                        <Image
                                                            src={card.image}
                                                            alt={"Blog"}
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                                </Link>
                                                <p className="date">
                                                    {card.nameAndDate}
                                                </p>
                                                <h4 className="heading">
                                                    <Link href='/blogs/blog_detail'>
                                                        {card.title}
                                                    </Link>
                                                    <IconButton
                                                        href="/blogs/blog_detail"
                                                        disableRipple
                                                        className="arrow"
                                                    >
                                                        <ArrowOutward />
                                                    </IconButton>
                                                </h4>
                                                <p className="description">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>

                                <div className="pagination">
                                    <Stack spacing={2}>
                                        {/* <Typography>Page: {page}</Typography> */}
                                        <Pagination count={10} page={page} onChange={handleChange} />
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