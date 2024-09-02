import { useRef } from "react";
import { useState } from "react";
import "./PokeHome.css";
import { useNavigate } from "react-router-dom";

export const PokeHome = () => {
  const [isSound, setIsSound] = useState(false);
  const navigate = useNavigate()

  const audioRef = useRef(new Audio("/Intro.mp3"));
  const startSound = new Audio("./buttonSound.mp3")
  const openingSound = new Audio("./opening.mp3") 

  const handleStart = () => {
    audioRef.current.pause()
    startSound.play()
    openingSound.play()
    navigate("/home")
  }

  const handleSound = () => {
      if (isSound) {
          audioRef.current.pause(); // Pausar si isSound es true
          audioRef.current.currentTime = 0; // Reiniciar el audio si se desea
      } else {
          audioRef.current.play(); // Reproducir si isSound es false
      }
      setIsSound(!isSound); // Alternar el estado de isSound
  };

  return (
    <div className="Main-Poke">
      <a onClick={handleSound}>
        {isSound ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M426.7 256c0-71-43.4-131.8-105-157.5l-16.4 39.4C351.5 157.2 384 202.8 384 256c0 53.3-32.5 98.8-78.8 118.1l16.4 39.4C383.3 387.8 426.7 327 426.7 256m-85.4 0c0-35.5-21.7-65.9-52.5-78.7l-16.4 39.4c15.4 6.4 26.2 21.6 26.2 39.4c0 17.7-10.8 32.9-26.2 39.4l16.4 39.4c30.8-13 52.5-43.4 52.5-78.9m13.2-236.3L338 59.1C415.1 91.2 469.3 167.2 469.3 256c0 88.7-54.2 164.8-131.3 196.9l16.4 39.4C447 453.7 512 362.5 512 256S447 58.3 354.5 19.7M0 149.3v213.3h85.3L234.7 512V0L85.3 149.3z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 15 15"
          >
            <path
              fill="white"
              d="M9 1.5a.5.5 0 0 0-.757-.429L3.362 3.998H1.5c-.829 0-1.5.67-1.5 1.5V9.5c0 .829.67 1.5 1.5 1.5h1.862l4.88 2.929A.5.5 0 0 0 9 13.5zm4.208 5.996L14.62 8.91l-.707.707L12.5 8.203l-1.414 1.413l-.707-.707l1.414-1.413l-1.414-1.413l.707-.707L12.5 6.789l1.415-1.413l.706.707z"
            ></path>
          </svg>
        )}
      </a>
      <div className="PokeHome">
        <h1>POKEDEX</h1>
        <p>by Marco López</p>
        <div>
          <button onClick={handleStart} className="bouncing-image">Start</button>
        </div>
      </div>
      <div className="footer">
        <footer>Made with 💖 by Marco Dev</footer>
      </div>
    </div>
  );
};
