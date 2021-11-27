import React , {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { key, keyWithLangAndPage, imageLink } from '../constants/global'
function Home() {
    const navigate = useNavigate();
    const [trendingData, setTrendingItems] = useState([]);
    const [popularData, setPopularItems] = useState([]);   
    const [tvData, setTvItems] = useState([]); 
    useEffect(() => {
        getTrendingData();
        getPopular();
        getTvData();
    }, []);

    async function getTrendingData(){
        
        await axiosConfig.get(`trending/movie/day?api_key=${key}`)
        .then(res => {
            setTrendingItems(res.data.results)
        })
    }

    async function getPopular(){
        
        await axiosConfig.get(`movie/popular?api_key=${keyWithLangAndPage}`)
        .then(res => {
            setPopularItems(res.data.results)
        })
    }

    async function getTvData(){
        
        await axiosConfig.get(`tv/popular?api_key=${key}`)
        .then(res => {
            setTvItems(res.data.results)
        })
    }


        return (
        <div>
            {/* Trending */}
            <Typography component="div">
            <Box sx={{ mt: 2, fontWeight: 'bold', fontSize: 'h5.fontSize'}}>Trending</Box>
            </Typography>
            <Divider sx={{width: 100}}/>
            <Grid container spacing={2} sx={{ mt: 2}}>
                {trendingData.slice(0, 18).map(item => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                    <Card sx={{ width: 150, margin: 'auto', cursor: 'pointer' }}>
                        <CardMedia component="img" height="225" image={imageLink+item.poster_path}  onClick={() => navigate("/movie/"+item.id)}></CardMedia>
                        <Fab size="small" style={{position: 'absolute', marginTop: -45, marginLeft: 10}} color="primary">
                            {item.vote_average}
                        </Fab>
                    </Card>
                    <Typography component="div">
                        <Box sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>{item.title}</Box>
                        <Box sx={{ textAlign: 'center', fontWeight: 500 }}>{item.release_date}</Box>
                    </Typography>
                </Grid>
                ))}
            </Grid>

            {/* Popular */}
            <Typography component="div">
            <Box sx={{ mt: 2, fontWeight: 'bold', fontSize: 'h5.fontSize'}}>Popular</Box>
            </Typography>
            <Divider sx={{width: 90}}/>
            <Grid container spacing={2} sx={{ mt: 2}}>
                {popularData.slice(0, 18).map(item => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                    <Card sx={{ width: 150, margin: 'auto' }}>
                        <CardMedia component="img" height="225" image={imageLink+item.poster_path}></CardMedia>
                        <Fab size="small" style={{position: 'absolute', marginTop: -45, marginLeft: 10}} color="primary">
                            {item.vote_average}
                        </Fab>
                    </Card>
                    <Typography component="div">
                        <Box sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>{item.title}</Box>
                        <Box sx={{ textAlign: 'center', fontWeight: 500 }}>{item.release_date}</Box>
                    </Typography>
                </Grid>
                ))}
            </Grid>
            
            {/* TV */}
            <Typography component="div">
            <Box sx={{ mt: 2, fontWeight: 'bold', fontSize: 'h5.fontSize'}}>TV</Box>
            </Typography>
            <Divider sx={{width: 40}}/>
            <Grid container spacing={2} sx={{ mt: 2}}>
                {tvData.slice(0, 18).map(item => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                    <Card sx={{ width: 150, margin: 'auto' }}>
                        <CardMedia component="img" height="225" image={imageLink+item.poster_path}></CardMedia>
                        <Fab size="small" style={{position: 'absolute', marginTop: -45, marginLeft: 10}} color="primary">
                            {item.vote_average}
                        </Fab>
                    </Card>
                    <Typography component="div">
                        <Box sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>{item.name}</Box>
                        <Box sx={{ textAlign: 'center', fontWeight: 500 }}>{item.first_air_date}</Box>
                    </Typography>
                </Grid>
                ))}
            </Grid>
        </div>
        )
}

export default Home