import React, {useState, useEffect} from 'react'
import './App.css'

export default function PokeFlavor(props) {
    const [flavorArr, setFlavorArr] = useState(0)
    const [flavorData, setFlavorData] = useState([
        {
          "flavor_text": "When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.",
          "language": {
            "name": "en",
            "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
            "name": "red",
            "url": "https://pokeapi.co/api/v2/version/1/"
          }
        }])

    useEffect( () => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`)
        .then(res => res.json())
        .then(data => setFlavorData(data.flavor_text_entries.filter(e => e.language.name === 'en')))
        setFlavorArr(0)
    }, [props.id])
    
    const prevFlavor = () => {
        flavorArr === 0 ?
        setFlavorArr(flavorData.length - 1) :
        setFlavorArr(prevFlavor => prevFlavor - 1)
    }
    
    const nextFlavor = () => {
        flavorArr === flavorData.length -1 ?
        setFlavorArr(0) :
        setFlavorArr(prevFlavor => prevFlavor + 1)
    }

  return (
    <div className='card card2'>
        <h2>Description</h2>
        <p>Version: {flavorData[flavorArr].version.name}</p>
        <p>{flavorData[flavorArr].flavor_text}</p>
        <button className='nav-button' onClick={prevFlavor}>&lt;&lt;</button>
        <button className='nav-button' onClick={nextFlavor}>&gt;&gt;</button>
    </div>
  )
}
