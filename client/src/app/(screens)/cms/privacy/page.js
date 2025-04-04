'use client'
import { Container, Grid, Typography } from '@mui/material'
import '../../../../../public/sass/pages/cms.scss'
import { useEffect, useState } from 'react';
import {getApi , renderHtml} from '../../../../helpers/General';

export default function Privacy() {
    const [pages,setPage] = useState([]);

    const getData = async()=>{
        let resp =await getApi('cms/view/66fa5c571592952e979ac1e2');

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
                        <div className='inner_parent' dangerouslySetInnerHTML={renderHtml(pages.description)}>
                            {/* <h4>Last Modified</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur.
                                Phasellus adipiscing tortor mi odio.
                                Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus. Fermentum in non tortor praesent
                                tortor fermentum habitant ultricies lectus. Risus
                                adipiscing malesuada dictum tortor. Purus eu lorem cras
                                pellentesque.
                            </p>

                            <h4>About this policy</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur.
                                Phasellus adipiscing tortor mi odio.
                                Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus. Fermentum in non tortor praesent
                                tortor fermentum habitant ultricies lectus. Risus
                                adipiscing malesuada dictum tortor. Purus eu lorem cras
                                pellentesque.
                            </p>

                            <h4>To whom Does this apply</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur.
                                Phasellus adipiscing tortor mi odio.
                                Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus. Fermentum in non tortor praesent
                                tortor fermentum habitant ultricies lectus. Risus
                                adipiscing malesuada dictum tortor. Purus eu lorem cras
                                pellentesque.
                            </p>

                            <h4>Personal Data we collect about you</h4>
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


                            <h4>How we use the personal data collected about you</h4>
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

                            <h4>Data Retention</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing tortor mi odio.
                                Velit amet ut integer viverra at. Pharetra vestibulum euismod felis eget nec
                                feugiat vulputate. Tristique turpis eleifend quam vitae nisi ullamcorper purus
                                sed purus. Fermentum in non tortor praesent tortor fermentum habitant ultricies
                                lectus. Risus adipiscing malesuada dictum tortor. Purus eu lorem cras pellentesque.
                            </p>

                            <h4>How we share and disclose information</h4>
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

                            <h4>Security</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            
                            </p>

                            <h4>Changes to the policy</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            
                            </p>

                            <h4>Data Protection Authority</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            
                            </p>

                            <h4>How to contact us</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Phasellus adipiscing
                                tortor mi odio. Velit amet ut integer viverra at. Pharetra
                                vestibulum euismod felis eget nec feugiat vulputate.
                                Tristique turpis eleifend quam vitae nisi ullamcorper
                                purus sed purus.
                            
                            </p> */}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}