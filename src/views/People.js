import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axiosConfig from "../axiosConfig";
import {  keyWithLangAndPage, imageLink } from '../constants/global'
function People() {
    const [popularPeople, setPopularPeople] = useState([]); 
    useEffect(() => {
        getPopularPeople();
    }, []);
    async function getPopularPeople(){
        
        await axiosConfig.get(`person/popular?api_key=${keyWithLangAndPage}`)
        .then(res => {
            setPopularPeople(res.data.results)
            console.log(res.data)
        })
    }
    return (
        <div>
            <Typography component="div">
            <Box sx={{ mt: 2, fontWeight: 'bold', fontSize: 'h5.fontSize'}}>Popular</Box>
            </Typography>
            <Divider sx={{width: 100}}/>
            <Grid container spacing={2} sx={{ mt: 2}}>
            {popularPeople.slice(0, 18).map(item => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                    <Card sx={{ width: 150, margin: 'auto', cursor: 'pointer' }}>
                        {item.profile_path ? 
                        <CardMedia component="img" height="225" image={imageLink+item.profile_path} ></CardMedia>
                        : 
                        <div style={{height: "225px"}}></div>
                        }
                    </Card>
                    <Typography component="div">
                        <Box sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>{item.name}</Box>
                        {/* <Box sx={{ textAlign: 'center', fontWeight: 500 }}>{item.release_date}</Box> */}
                    </Typography>
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default People
