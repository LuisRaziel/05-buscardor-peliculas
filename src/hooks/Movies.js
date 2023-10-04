import mocksResult from '../mocks/results.json'
import mocksWithoutResult from '../mocks/results.json'
import { useState } from 'react'

export function useMovies({query}) {
  const [responseMovies, setResponseMovies] = useState([])

  const movies = responseMovies.Search

  const moviesContract = movies?.map((movie) => {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }
  })

  const getMovies = () => {
    if(query){
      // setResponseMovies(mocksResult)      
      fetch(`https://www.omdbapi.com/?apikey=899c5643&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setResponseMovies(data)
      })
    }
    else{
      setResponseMovies(mocksWithoutResult)
    }
   }
  return { movies: moviesContract, getMovies}
}
