import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import axiosConfig from "../axiosConfig";
import YouTube from 'react-youtube';
import { keyWithLang, imageLink } from '../constants/global'
import Skeleton from '@mui/material/Skeleton';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Movie() {
    const { id } = useParams();
    const [movieData, setMovieItems] = useState([]); 
    const [trailer, setTrailerItems] = useState([]); 
    const [recommend, setRecommendItems] = useState([]); 
    const [showResults, setShowResults] = React.useState(false)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getMovieData();
    }, []);// eslint-disable-line 

    async function getMovieData(){
        const res = await axiosConfig.get(`movie/${id}?api_key=${keyWithLang}`)
        setMovieItems(res.data)
        await getTrailer();
        await getRecommend();
    }

    async function getTrailer(){
        await axiosConfig.get(`movie/${id}/videos?api_key=${keyWithLang}`)
        .then(res => {
            setTrailerItems(res.data.results)            
        })
    }

    async function getRecommend(){
        await axiosConfig(`movie/${id}/recommendations?api_key=${keyWithLang}`)
        .then(res => {
            setRecommendItems(res.data.results)
            setShowResults(true)
        })
    }

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " h " + rminutes + " m";
    }

    return (
        <div>
            {showResults ?
            <div>
            <Grid container spacing={2} sx={{ mt: 2}}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card sx={{ width: 150, margin: 'auto',}}>
                        <CardMedia component="img" height="225" image={imageLink+movieData.poster_path}  ></CardMedia>
                    </Card>
                    <Typography component="div">
                        <Box sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>{movieData.title}</Box>
                        <Box sx={{ textAlign: 'center', fontWeight: 500 }}>{movieData.release_date}</Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card >
                        <CardMedia component="img" image={imageLink+movieData.backdrop_path}  ></CardMedia>
                    </Card>
                    <Stack direction="row" spacing={1} sx={{mt: 2}}>
                        {movieData.genres.map(item => (
                        <Chip label={item.name} variant="outlined" key={item.id}/>
                        ))}
                    </Stack>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ mt: 2}}>
                        <Tab label="Info"  {...a11yProps(0)}/>
                        <Tab label="Trailer" {...a11yProps(1)}/>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Typography component="div">
                            <Stack direction="row" spacing={1} sx={{mt: 2}}>
                            <Fab color="primary" >
                                {movieData.vote_average} <span style={{fontSize: 11}}>%</span>
                            </Fab>
                            <div style={{marginTop: 13}}>{timeConvert(movieData.runtime)}</div>
                            </Stack>
                            <Box sx={{  mt: 2, fontWeight: 'bold' }}>Overview</Box>
                            <Box sx={{  fontWeight: 500 }}>{movieData.overview}</Box>
                            <Box sx={{  mt: 2, fontWeight: 'bold' }}>Status</Box>
                            <Box sx={{  fontWeight: 500 }}>{movieData.status}</Box>
                            <Box sx={{  mt: 2, fontWeight: 'bold' }}>Release Date</Box>
                            <Box sx={{  fontWeight: 500 }}>{movieData.release_date}</Box>
                            <Box sx={{  mt: 2, fontWeight: 'bold' }}>Orgianl name</Box>
                            <Box sx={{  fontWeight: 500 }}>{movieData.original_title}</Box>
                            <Box sx={{  mt: 2, fontWeight: 'bold' }}>Original language</Box>
                            <Box sx={{  fontWeight: 500 }}>{movieData.original_language}</Box>
                            <Box sx={{  mt: 2, fontWeight: 'bold' }}>Revenue</Box>
                            <Box sx={{  fontWeight: 500 }}>{movieData.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Box>
                            <Box sx={{ mb: 3}}></Box>
                        </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {trailer.filter(v => v.type === "Trailer" ).map(item => (
                            <div style={{marginTop: 20}} key={item.id}>
                            <YouTube
                                videoId={item.key}
                            />
                            </div>
                        ))}
                    </TabPanel>
                </Grid>
            </Grid>

            <Typography component="div">
            <Box sx={{ mt: 2, fontSize: 'h5.fontSize'}}>Recommendations</Box>
            </Typography>
            <Divider sx={{width: 200}}/>

            <Grid container spacing={2} sx={{ mt: 2, mb: 2}}>
                {recommend.slice(0, 6).map(item => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                    <Card sx={{ width: 150, margin: 'auto',}}>
                            <CardMedia component="img" height="225" image={imageLink+item.poster_path}  ></CardMedia>
                            <Fab size="small" style={{position: 'absolute', marginTop: -45, marginLeft: 10}} color="primary">
                                {item.vote_average.toFixed(1)}
                            </Fab>
                        </Card>
                        <Typography component="div">
                            <Box sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>{item.title}</Box>
                            <Box sx={{ textAlign: 'center', fontWeight: 500 }}>{item.release_date}</Box>
                        </Typography>
                </Grid>
                ))}
            </Grid>
            </div>
            : 
            <div>
                <Grid container spacing={2} sx={{ mt: 2}}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Skeleton variant="rectangular" width={150} height={225} />
                        <Skeleton variant="text" width={150}/>
                        <Skeleton variant="text" width={80}/>
                    </Grid>
                    <Grid>
                        <Skeleton variant="rectangular" width={570} height={320} />
                        <Stack direction="row" spacing={1} sx={{mt: 1}}>
                            <Skeleton variant="text" width={50}/>
                            <Skeleton variant="text" width={50}/>
                            <Skeleton variant="text" width={50}/>
                        </Stack>
                        <Skeleton variant="text" width={50} sx={{mt: 1}}/>
                        <Skeleton variant="rectangular" width={570} height={150} />
                        <Skeleton variant="text" width={50} sx={{mt: 1}}/>
                        <Skeleton variant="rectangular" width={570} height={20} />
                        <Skeleton variant="text" width={50} sx={{mt: 1}}/>
                        <Skeleton variant="rectangular" width={570} height={20} />
                        <Skeleton variant="text" width={50} sx={{mt: 1}}/>
                        <Skeleton variant="rectangular" width={570} height={20} />
                        <Skeleton variant="text" width={50} sx={{mt: 1}}/>
                        <Skeleton variant="rectangular" width={570} height={20} />
                    </Grid>
                </Grid>
            </div>
            }
        </div>
    )
}

export default Movie
