// import { useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/Movies'
// import { ListOfMovies, NoResults } from './components/Movies'

function App() {
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

  const { movies } = useMovies()
  // const inputRef = useRef()

  // para usar con el evento onClick en boton 
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   const valor = inputRef.current.value
  //   console.log(valor)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const valor = inputRef.current.value
    // otra forma de recuperar este valor es con el evento onSubmit nativo de los formularios
    // para no depender de React y para no tener que agregar demasiadas referencias
    const fields = new window.FormData(e.target)
    const valor = fields.get('searcher')
    // cuando se tienen más de un input, por ejemplo, es mejor hacer un objeto
    const inputs = Object.fromEntries(fields)
    console.log({ valor, inputs})
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* <input type='text' placeholder='Star Wars, Toy Story, Avengers ...' ref={inputRef}/> */}
          <input type='text' placeholder='Star Wars, Toy Story, Avengers ...' name='searcher'/>
          {/* una buena practica es que al tener un form se use el evento onSubmit en lugar de onClick */}
          {/* <button type='submit' onClick={handleClick}>Buscar</button> */}
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
