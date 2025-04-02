"use client"
import { Container, Typography, Grid, item, Input, TextField, InputAdornment, Button } from "@mui/material";
import "../../../public/sass/pages/footer.scss";
import { Email } from "@mui/icons-material";
import footerLogo from "../../../public/images/footerLogo.png"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    
    const path = usePathname();
    const hideAt = ['/auth/login','/auth/reset','/auth/signup','/auth/forgotpassword','/auth/otp-verification'];
    const hide = hideAt.includes(path)  ;
    if (hide){
        return null;
    }

    return (
        <div className="footer_container">
            <div className="above_container">
                <Container>
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="above_section">
                                <Grid container >
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12} order={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} >
                                        <div className="about">
                                            <Typography >About</Typography>
                                            <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                            <ul className="about_list">
                                                <li>E-mail: <a href="mailto:example@gmail.com" >example@gmail.com</a></li>
                                                <li>Phone: <a href="tel:880 123 456 789">880 123 456 789</a></li>
                                            </ul>
                                        </div>
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={12} order={{ xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}>
                                        <Grid container>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} order={{ xl: 1, lg: 1, md: 1, sm: 1, xs: 2 }}>
                                                <div className="links">
                                                    <Typography>Quick Links</Typography>
                                                    <ul className="links_list">
                                                        <li className="list_item"><Link href="/home">Home</Link></li>
                                                        <li className="list_item"><Link href="/buy">Buy</Link></li>
                                                        <li className="list_item"><Link href="/contact">Contact</Link></li>
                                                        <li className="list_item"><Link href="/aboutUs">About</Link></li>
                                                    </ul>
                                                </div>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} order={{ xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                                                <div className="category">
                                                    <Typography>Category</Typography>
                                                    <ul className="category_list">
                                                        <li className="item"><Link href="#">Lifestyle</Link></li>
                                                        <li className="item"><Link href="#">Technology</Link></li>
                                                        <li className="item"><Link href="#">Travel</Link></li>
                                                        <li className="item"><Link href="#">Business</Link></li>
                                                        <li className="item"><Link href="#">Economy</Link></li>
                                                        <li className="item"><Link href="#">Sports</Link></li>
                                                    </ul>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} order={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}>
                                        <div className="news_letter">
                                            <form>
                                                <div className="heading">
                                                    <Typography>Weekly News-Letter</Typography>
                                                    <p className="text">Get blog articles and offers via email</p>
                                                </div>
                                                <div className="input">
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        placeholder=" Your Email "
                                                        name="email"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Email />
                                                                </InputAdornment>
                                                            ),
                                                            disableUnderline: true,
                                                        }}
                                                        variant="standard"
                                                    />
                                                </div>
                                                <Button className="subscribe">Subscribe</Button>
                                            </form>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="lower_container">
                <Container>
                    <Grid container >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="lower_section">
                                <Grid container>
                                    <Grid item xl={2} lg={2} md={2} sm={3} xs={12}>
                                        <div className="logo">
                                            <Image
                                                src={footerLogo}
                                                alt="Estatery"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xl={5} lg={5} md={5} sm={9} xs={12}>
                                        <Typography>@ 2024 All Rights Reserved  | Powered By Globiz Technology.</Typography>
                                    </Grid>
                                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                                        <div className="terms">
                                            <ul className="list_main">
                                                <li><Link href="/cms/term" className="text">Terms of Use</Link></li>
                                                <li><Link href="/cms/privacy" className="text">Privacy Policy</Link></li>
                                                <li><Link href="/cms/cookie" className="text">Cookies Policy</Link></li>
                                            </ul>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}