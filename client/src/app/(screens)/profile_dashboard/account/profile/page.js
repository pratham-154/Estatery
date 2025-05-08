'use client'
import Sidebar from "@/app/components/sell_sidebar";
import { Button, Container, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import profile from '../../../../../../public/images/sell/profile.png';
import '../../../../../../public/sass/pages/profile.scss';
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import { getApi, postApi, validatorMake, foreach } from "../../../../../helpers/General";
import { toast } from "react-toastify";


export default function Profile() {
    const router = useRouter();
    const [profileData, setProfileData] = useState({});
    // const [image, setImage] = useState(false);

    const VisuallyHiddenInput = styled('input')({
        clip: 'circle(50%)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
        borderRadius: '50%'
    });

    const getProfileData = async () => {
        let resp = await getApi("user/view");
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setProfileData(data.data);
            }
        }
        else {
            router.push("/auth/login")
        }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64File = await getBase64(file);

        let response = await postApi('image/upload', {
            image: base64File,
            folder_name: 'profile_image'
        });

        if (response.status) {
            let post = await postApi('user/editImage', { image: response.imageUrl })
            if (post.status) {
                // setImage(!image);
                setProfileData({...profileData, image: post.data.image})
                toast.success(post.message);
            }
            else{
                toast.error(post.message)
            }
        }
        else{
            toast.error(response.message)
        }
    }

    const getBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })

    useEffect(() => {
        getProfileData();
    }, [])

    const userData = [
        { label: "First Name", value: profileData.first_name },
        { label: "Last Name", value: profileData.last_name },
        { label: "Email", value: profileData.email },
        { label: "Password", value: '**********' },
        { label: "Contact Number", value: profileData.phone_number },
        { label: "Address", value: profileData.address },
        { label: "City", value: profileData.city },
        { label: "State", value: profileData.state },
    ];
    let imagePath = `${process.env.url}${profileData.image}`

    return (
        <div className="profile_container">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <div className="profile_parent">
                            <div className="sidebar">
                                <Sidebar />
                            </div>
                            <div className="profile_right">
                                <form>
                                    <div className='head'>
                                        <div className="profile_photo">
                                            {
                                                profileData && profileData.image &&
                                                <Image
                                                src={imagePath}
                                                alt="Hi"
                                                width={400}
                                                height={400}
                                                loading="lazy"
                                                />
                                            }
                                            {/* <IconButton onClick={handleImageChange} type="file">
                                                <Edit/>
                                            </IconButton> */}
                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                            >
                                                <Edit />
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                            </Button>
                                        </div>
                                        <div className="heading">Profile</div>
                                    </div>
                                    <div className="inputs__">
                                        {userData.map((item, index) => (
                                            <div className="data" key={index}>
                                                <h3>{item.label}</h3>
                                                <p>{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="button">
                                        <Button href='/profile_dashboard/account/edit'>
                                            Edit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}