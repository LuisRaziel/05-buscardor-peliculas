/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li key={movie.imdbID} className='movie'>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

function NoResults() {
  return <p className='movies-error'>No se encontraron resultados</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0
  return <>{hasMovies ? <ListOfMovies movies={movies} /> : <NoResults />}</>
}
