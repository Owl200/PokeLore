import React, {useState, useEffect} from 'react';
import mp3 from './audio/Littleroot.mp3'
import off from './img/music-off.png';
import on from './img/music-on.png';

export default function MusicButton() {
    const [song] = useState(new Audio(mp3))
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {isPlaying ? song.play() : song.pause()}, [isPlaying])
    
    const toggleMusic = e => {
        e.target.src === off ? e.target.src = on : e.target.src = off;
        setIsPlaying(prev => !prev);
        song.loop = true;
    }
    

    return (
        <>
            <img id='music' onClick={toggleMusic} className='music-img' src={off} alt='music on'/>
        </>
    )
}