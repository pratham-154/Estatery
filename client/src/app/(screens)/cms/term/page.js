'use client'
import { Container, Grid, Typography } from '@mui/material';
import '../../../../../public/sass/pages/cms.scss';
import { useEffect, useState } from 'react';
import { getApi,renderHtml } from '../../../../helpers/General'

export default function Term() {
    const [pages, setPage] = useState([]);

    const getData = async () => {
        let resp = await getApi('cms/view/66fa5c211592952e979ac1de')
        console.log("resp", resp);

        if (resp && resp.status) {

            let { data } = resp;
            console.log("data",data)
            if (data && data.data) {
                setPage(data.data);
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])
    
    return (
        <div className='term_container'>
            <div className='term_head'>
                <Typography>{pages.title}</Typography>
            </div>
            <Container>
                <Grid container>
                    <Grid item>
                        <div className='inner_parent' dangerouslySetInnerHTML={renderHtml(pages.description)}>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}