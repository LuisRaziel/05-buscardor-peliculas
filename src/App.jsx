// import { useRef } from 'react'
import { useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect } from 'react'
import { useRef } from 'react'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
// import { ListOfMovies, NoResults } from './components/Movies'

function useSearch() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  // en este caso el useRef se esta usando como bandera para saber si el input no se ha usado,
  // ya que no pierde su valor con cada renderizado
  const notUsed = useRef(true)

  useEffect(() => {
    if (notUsed.current) {
      notUsed.current = query === ''
      return
    }
    if (query.trim() === '') {
      setError('Proporciona un nombre de pelicula')
      return
    }
    if (query.trim().length < 3) {
      setError('Proporciona al menos 3 caracteres')
      return
    }
    setError(null)
  }, [query])

  return { query, setQuery, error }
}

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

  const [sort, setSort] = useState(false)
  const { query, setQuery, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ query, sort })
  // const inputRef = useRef()
  // se crea un estado para asigarle el valor del input y usar form de forma controlada

  // para usar con el evento onClick en boton
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   const valor = inputRef.current.value
  //   console.log(valor)
  // }

  const debounceSetGetMovies = useCallback(
    (search) => {
      debounce(() => {
        console.log(search)
        getMovies(search)
      }, 500)
    },
    [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    // const valor = inputRef.current.value
    // otra forma de recuperar este valor es con el evento onSubmit nativo de los formularios
    // para no depender de React y para no tener que agregar demasiadas referencias
    // const fields = new window.FormData(e.target)
    // const valor = fields.get('searcher')
    // cuando se tienen más de un input, por ejemplo, es mejor hacer un objeto
    // const inputs = Object.fromEntries(fields)
    console.log({ query })
    getMovies({ query })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    console.log(newSearch)
    setQuery(newSearch)
    debounceSetGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* <input type='text' placeholder='Star Wars, Toy Story, Avengers ...' ref={inputRef}/> */}
          {/* <input type='text' placeholder='Star Wars, Toy Story, Avengers ...' name='searcher'/> */}
          {/* una buena practica es que al tener un form se use el evento onSubmit en lugar de onClick */}
          {/* <button type='submit' onClick={handleClick}>Buscar</button> */}
          <input type='checkbox' checked={sort} onChange={handleSort} />
          <input
            type='text'
            placeholder='Avengers, Harry Potter, Toy Story ...'
            name={'query'}
            onChange={handleChange}
            value={query}
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'initial',
            }}
          />
          <button type='submit'>Buscar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
