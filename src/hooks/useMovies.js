import { useState } from 'react'
import { searchMovies } from '../services/movies'
import { useRef } from 'react'
export function useMovies({ query }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusQuery = useRef(query)

  const getMovies = async () => {
    if (query === previusQuery.current) return
    try {
      setLoading(true)
      setError(null)
      previusQuery.current = query
      const movies = await searchMovies({ query })
      setMovies(movies)
    } catch (error) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }
  return { movies, getMovies, loading, error }
}
