// catalog weekly api
import axios from 'axios';

const apiKey="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4"


export const fetchWeeklyFilms =async (api=apiKey,page=1) => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api}`
        }
      };

    try{
        const res =await axios.request(options);
        const filteredData = res.data.results.map( filter=> ({
            title: filter.title || filter.name,
            rating: filter.vote_average,
            genreId: filter.genre_ids,
            year: filter.release_date || filter.first_air_date
        }));
        return filteredData;
    }
    catch(err){
        return false;
    }
}

//filtered by name and year or both
export const fetchSearchFilms = async (input, year=null, api=apiKey, page=1) =>{

    const filteredUrl = year !== null ? `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=${page}&primary_release_year=${year}` :
    `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=${page}`
    const options = {
    method: 'GET',
    url: filteredUrl,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api}`
    }
    };

    try{
        const res = await axios.request(options)
        const filteredFilms = res.data.results.map(filter => ({
            title: filter.title || filter.name,
            rating: filter.vote_average,
            genreId: filter.genre_ids,
            year: filter.release_date || filter.first_air_date
        }));
        return filteredFilms;
    }
    catch(err){
        return err.data;
    }
        
}

