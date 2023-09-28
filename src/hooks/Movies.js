import mocksResult from '../mocks/results.json'

export function useMovies() {
  const movies = mocksResult.Search
  const moviesContract = movies.map((movie) => {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }
  })
  return { movies: moviesContract }
}
