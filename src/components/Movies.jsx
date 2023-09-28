/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        // hacer esto no es tan buena practica ya que se esta atandola UI al funcionamiento de la API
        // <li key={movie.imdbID} className='movie'>
        //   <h3>{movie.Title}</h3>
        //   <p>{movie.Year}</p>
        //   <img src={movie.Poster} alt={movie.Title} />
        // </li>
        <li key={movie.id} className='movie'>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.Title} />
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
