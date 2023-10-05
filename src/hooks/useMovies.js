import { useState } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies({ query }) {
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    const movies = await searchMovies({ query })
    setMovies(movies)
  }
  return { movies, getMovies }
}
