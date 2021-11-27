import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'    
});

instance.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjE0ZjdlNDI4MWRhYmM4MzA4ZWY1MGY4NDQwYTZjYiIsInN1YiI6IjYxOWYwMTdiMzVkYjQ1MDA2MmU5N2I2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NpU7PbDX4CjTIaWjMIROECaUHnevdIqCGQ4yRLlM_jE';

export default instance;