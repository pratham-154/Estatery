'use client'
import { Avatar, Button, Container, Grid } from "@mui/material";
import '../../../public/sass/pages/sell_sidebar.scss';
import { LocationCity, LockOutlined, Logout, Person2Outlined, Sell, Textsms } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { postApi, getApi } from '../../helpers/General'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export default function Sidebar() {

    const listItems = [
        { href: '/profile_dashboard/account/profile', icon: <Person2Outlined />, text: 'My Account' },
        { href: '/profile_dashboard/change_password', icon: <LockOutlined />, text: 'Change Password' },
        { href: '/profile_dashboard/my_properties', icon: <LocationCity />, text: 'My Properties' },
        { href: '/profile_dashboard/sell', icon: <Sell />, text: 'Sell' },
        { href: '/profile_dashboard/response', icon: <Textsms />, text: 'Responses' },
    ];

    const router = useRouter();
    const [data, setData] = useState({});
    const pathname = usePathname()

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

    const getData = async () => {
        let resp = await getApi('user/view');
        if (resp) {
            let { data } = resp;
            if (data && data.data) {
                setData(data.data);
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])

    let imagePath = process.env.url

    return (
        <div className="sidebar_parent">
            <div className="profile">
                <div className="image">
                    <Image
                        src= {`${imagePath}${data.image}`}
                        alt="Hi"
                        width={500}
                        height={500}
                        loading="lazy"
                    />
                </div>
                <div className="data">
                    <h4>{data.first_name} {data.last_name}</h4>
                    <p>{data.email}</p>
                </div>
            </div>
            <ul className="list">
                {listItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.href} className={`list_item ${pathname === item.href ? 'active' : ''}`}  >
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

    )
}