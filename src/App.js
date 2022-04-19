import React, {useState, useEffect} from 'react';
import './App.css';
import pokeTypeIcons from './poketypeicons';
import backgroundColor from './backgroundColor';
import initial from './baseObject';
import PokeFlavor from './PokeFlavor';
import MusicButton from './MusicButton';

function App() {
  const [pokemon, setPokemon] = useState('pikachu');
  const [pokeData, setPokeData] = useState(initial);
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res => res.json())
    .then(data => setPokeData(data)).catch(err => alert(err))
  }, [pokemon]); 
  
  let textInput = React.createRef();

  const handleClick = () => {
    textInput.current.value &&
    setPokemon(textInput.current.value.toLowerCase().trim().replaceAll(/\W/g, '-'));
    textInput.current.value = '';
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setPokemon(e.target.value.toLowerCase().trim().replaceAll(/\W/g, '-'));
      e.target.value = '';
    }
  }

  const prevPoke = _ =>{
    setPokemon(pokeData.id -1)
  }

  const nextPoke = _ =>{
    setPokemon(pokeData.id + 1)
  }

  const togglePokemon = e => {
    e.target.src === pokeData.sprites.front_default ?
    e.target.src = pokeData.sprites.front_shiny :
    e.target.src = pokeData.sprites.front_default
  }

  const pokeType = pokeData.types.map(element => { 
    return (
      <img className="type-icon" src={pokeTypeIcons[element.type.name]} title={element.type.name} alt=""/>  
    )
  })



  return (
    <div className="App" style={{background: `linear-gradient(135deg, ${backgroundColor[pokeData.types[0].type.name]} 0%, ${pokeData.types[1] ? backgroundColor[pokeData.types[1].type.name] : 'black'} 100%`}}>
      <header className="App-header">
        <h1>PokeLore</h1>
        <MusicButton />
      </header>
      <div className='card'>
        <input className='search-input' onKeyPress={handleKeyPress} ref={textInput} type='text' placeholder='Search by name or index'/>
        <button className='search-button' onClick={handleClick} >Search</button>
        <div className='flex'>
          <div className='left'>
            <button className='nav-button' onClick={prevPoke}>&lt;&lt;</button>
          </div>
          <div className='center'>
            <h3>{pokeData.name[0].toUpperCase()}{pokeData.name.slice(1).replaceAll('-', ' ')} ({pokeData.id})</h3> 
            <img id='pokemon-img' onClick={togglePokemon} src={pokeData.sprites.front_default} alt={`${pokemon} sprite`}/>
            <p>Height: {pokeData.height / 10}m</p>
            <p>Weight: {pokeData.weight / 10}Kg</p>
            <p>Type:</p>
            <div className='type-collection'>
              {pokeType}
            </div>
          </div>
          <div className='right'>
            <button className='nav-button' onClick={nextPoke}>&gt;&gt;</button>
          </div>
        </div>
        <PokeFlavor id={pokeData.id} />
      </div>
    </div>
  );
}

export default App;
