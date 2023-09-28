import './App.css'
import { Movies } from './components/Movies'
import mocksResult from './mocks/results.json'
// import { ListOfMovies, NoResults } from './components/Movies'

function App() {
  const movies = mocksResult.Search

  // Se podría hacer también de esta forma pero lo mejor sería que fueran componentes
  // ya que su funcion principal es renderizar algo
  // const renderMovies = () =>{
  //   return(
  //     <ul className='movies'>
  //       {movies.map((movie) => (
  //         <li key={movie.imdbID} className='movie'>
  //           <h3>{movie.Title}</h3>
  //           <p>{movie.Year}</p>
  //           <img src={movie.Poster} alt={movie.Title} />
  //         </li>
  //       ))}
  //     </ul>
  //   )
  // }

  // const renderNoResult = () =>{
  //   return (
  //     <p className='movies-error'>No se encontraron resultados</p>
  //   )}

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form'>
          <input type='text' placeholder='Star Wars, Toy Story, Avengers ...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {
          /*
        Esto aunque no es incorrecto, no es la mejor forma de hacerlo ya que es poco legible
        {hasMovies ? (
          <ul className='movies'>
            {movies.map((movie) => (
              <li key={movie.imdbID} className='movie'>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={movie.Title} />
              </li>
            ))}
          </ul>
        ) : (
          <p className='movies-error'>No se encontraron resultados</p>
        )} */
          // hasMovies ? renderMovies() : renderNoResult()

          // tambien podemos dejar que esta logica se realice dentro del componente Movies.jsx 
          // para aqui solo renderizar el componente resultante
          // hasMovies ? <ListOfMovies movies={movies} /> : <NoResults />
        }
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
