/* eslint-disable react/prop-types */
export function ListOfMovies({ movies }) {
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

export function NoResults() {
  return <p className='movies-error'>No se encontraron resultados</p>
}
