const API_KEY = '899c5643'
export const searchMovies = async ({ query }) => {
  if (query === '') return
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    )
    const json = await response.json()
    const movies = json.Search

    return movies?.map((movie) => {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }
    })

  } catch (error) {
    throw new Error("Error searching movies")
  }
}
