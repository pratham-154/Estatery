"use client"
import Image from "next/image";
import "../../../public/sass/pages/navbar.scss";
import Logo from "../../../public/images/logo.png"
import { Button, Container, Icon, Grid, item, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Close, LocationCity, LockOutlined, Logout, Menu, Person2Outlined, Sell, Textsms } from "@mui/icons-material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import pic from '../../../../my-app/public/images/sell/profile.png';
import { getApi, postApi } from '../../helpers/General';
import { toast } from "react-toastify";

export default function Navbar() {
    const router = useRouter();
    const path = usePathname();
    const pathname = usePathname();
    const hideAt = ['/auth/login', '/auth/reset', '/auth/signup', '/auth/forgotpassword', '/auth/otp-verification'];
    const hide = hideAt.includes(path);

    const [isLogin, setLogin] = useState(false);
    const [resp, setResp] = useState(false);
    const [show, setShow] = useState(false);
    const [click, setClick] = useState(null);

    const checkLogin = async () => {
        let resp = await getApi('user/checkLogin');
        if (!resp.status) {
            toast.info("User not Logged In");
            setLogin(false);
            router.push('/auth/login');
        }
        else {
            setLogin(true);
        }
    }

    useEffect(() => {
        setResp(false);
        setShow(false);
    }, [path]);

    useEffect(() => {
        checkLogin();
    },[])
    if (hide) {
        return null;
    };

    const handleLogout = async () => {
        let resp = await postApi('user/logout');
        if (resp.status) {
            toast.success(resp.message)
            router.push('/auth/login');
        }
        else {
            toast.error(resp.message)
        }
    }

    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Buy', link: '/buy/buy_page' },
        { name: 'About us', link: '/aboutUs' },
        { name: 'Blogs', link: '/blogs/blog_page' },
        { name: 'Contact us', link: '/contact' },
        { name: 'Liked Properties', link: '/liked' }
    ];
    const listItems = [
        { href: '/profile_dashboard/account/profile', icon: <Person2Outlined />, text: 'My Account' },
        { href: '/profile_dashboard/change_password', icon: <LockOutlined />, text: 'Change Password' },
        { href: '/profile_dashboard/my_properties', icon: <LocationCity />, text: 'My Properties' },
        { href: '/profile_dashboard/sell', icon: <Sell />, text: 'Sell' },
        { href: '/profile_dashboard/response', icon: <Textsms />, text: 'Responses' },
    ];

    return (
        <div className="header_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="inner_parent">
                            <div className="left_container">
                                <div className="appLogo">
                                    <Image
                                        src={Logo}
                                        alt="Logo"

                                    />
                                </div>
                            </div>
                            <div className='middle_container'>
                                <ul className="nav_list">
                                    {navItems.map((item, index) => (
                                        <li className={`list_item ${pathname === item.link ? 'active' : ''}`} key={index}>
                                            <Link href={item.link}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="right_container">
                                <div className="right">
                                    {isLogin ?
                                        <Button className='login' href='/profile_dashboard/account/profile'>
                                            <Typography>Profile</Typography>
                                        </Button>
                                        :
                                        <Button className="login" href='/auth/login'>
                                            <Typography>Login</Typography>
                                        </Button>
                                    }
                                </div>
                                <div className="right_resp">
                                    {isLogin ?
                                        <Button className='login' onClick={() => setResp(!resp)}>
                                            <Typography>Profile</Typography>
                                        </Button>
                                        :
                                        <Button className="login" href="/auth/login">
                                            <Typography>Login</Typography>
                                        </Button>
                                    }
                                </div>
                                <div className={`sidebar_nav ${resp == true ? 'active' : ''}`} >
                                    <div className="nav_profile">
                                        <div className="nav_image">
                                            <Image
                                                src={pic}
                                                alt="Hi"
                                            />
                                        </div>
                                        <div className="nav_data">
                                            <h4>John Cooper</h4>
                                            <p>demo@example.com</p>
                                        </div>
                                    </div>
                                    <ul className="nav_list">
                                        {listItems.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.href} className={`list_item ${path === item.href ? 'active' : ''}`}  >
                                                    {item.icon}
                                                    {item.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="logout">
                                        <Button onClick={handleLogout}> <Logout />Logout</Button>
                                    </div>
                                </div>
                                <div className="menu">
                                    <Icon onClick={() => setShow(true)}>
                                        <Menu />
                                    </Icon>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            {show ?
                <div className='responsive_header' >
                    <Container>
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className="innerparent">
                                    <div className="header">
                                        <div className="Logo">
                                            <Image
                                                src={Logo}
                                                alt="Logo"

                                            />
                                        </div>
                                        <IconButton onClick={() => { setShow(false) }}>
                                            <Close sx={{ color: 'white' }} />
                                        </IconButton>
                                    </div>
                                    <div className="navlist">
                                        <ul>
                                            {navItems.map((item, index) => (
                                                <li className="lisItem" key={index}>
                                                    <Link href={item.link}>{item.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div> : null}
        </div>

    );
}