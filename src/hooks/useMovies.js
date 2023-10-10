import { useState } from 'react'
import { searchMovies } from '../services/movies'
import { useRef } from 'react'
import { useMemo } from 'react'
export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusQuery = useRef(query)

  const getMovies = useMemo(() => {
    return async (query) => {
      if (query === previusQuery.current) return
      try {
        setLoading(true)
        setError(null)
        previusQuery.current = query
        const movies = await searchMovies({ query })
        setMovies(movies)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  // const getSortedMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies

  const sortedMovies = useMemo(() => {
    console.log('useMemo')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
