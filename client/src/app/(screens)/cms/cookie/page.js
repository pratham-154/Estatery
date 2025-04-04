'use client'
import { Container, Grid, Typography } from '@mui/material';
import '../../../../../public/sass/pages/cms.scss';
import { useEffect, useState } from 'react';
import {getApi , renderHtml} from '../../../../helpers/General';

export default function Cookie_policy() {
    const [pages,setPage] = useState([]);

    const getData = async()=>{
        let resp =await getApi('cms/view/66fe5912f00419f121f76c10');

        if (resp && resp.status){
            let { data } = resp ;
            if(data && data.data){
                setPage(data.data);
            }
        }
    }
    useEffect(()=>{
        getData();
    },[]);
    return (
        <div className='term_container'>
            <div className='term_head'>
                <Typography>{pages.title}</Typography>
            </div>
            <Container>
                <Grid container>
                    <Grid item>
                        <div className="inner_parent" dangerouslySetInnerHTML={renderHtml(pages.description)}>
                            {/* <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            </p>

                            <h4>What are cookies?</h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus. Fermentum in non tortor praesent tortor
                                fermentum habitant ultricies lectus. Risus adipiscing
                                malesuada dictum tortor. Purus eu lorem cras pellentesque.</p>

                            <h4>Which cookies do we use?</h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus. Fermentum in non tortor praesent tortor
                                fermentum habitant ultricies lectus. Risus adipiscing
                                malesuada dictum tortor. Purus eu lorem cras pellentesque.</p>

                            <h4>Necessary cookies</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            </p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                            </ul>

                            <h4>Analytical cookies</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            </p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                                <li>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                    tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                    vestibulum euismod felis eget nec feugiat vulputate.
                                    Tristique turpis eleifend quam vitae nisi ullamcorper
                                    purus sed purus.
                                </li>

                            </ul>

                            <h4>Advertisement cookies</h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.</p>

                            <h4>Functionality cookies</h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.</p>

                            <h6>Click here to manage your cookie preferences</h6> */}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}