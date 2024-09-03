import { useEffect, useState } from "react";
import "./PokeCard.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const PokeCard = ({ pokemon }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [pokeInfo, getPokeInfo] = useFetch();
  const [isTurnAround, setIsTurnAround] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const cry = new Audio(pokeInfo?.cries.legacy);

  useEffect(() => {
    getPokeInfo(pokemon.url);
    setIsLoading(false);
  }, []);

  console.log(pokeInfo);

  const handleShiny = (event) => {
    event.preventDefault();
    setIsShiny(!isShiny);
  };

  const handleSound = (event) => {
    event.preventDefault();
    cry.play();
  };

  const handleTurn = (event) => {
    event.preventDefault();
    setIsTurnAround(!isTurnAround);
  };

  const handleNavigate = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const style = {
    display: isLoading ? 'flex' : 'grid',
  };
  
  

  return (
    <div>
      <div className={`card-container-inside border-${pokeInfo?.types[0].type.name}`} >
        <div className={`img-background bg-${pokeInfo?.types[0].type.name}`}>
          {isLoading ? 
            (<div className="pokeball-loader"></div>) :
            (<img
              src={
                isTurnAround
                  ? isShiny
                    ? pokeInfo?.sprites.other.showdown.back_shiny
                    : pokeInfo?.sprites.other.showdown.back_default
                  : isShiny
                  ? pokeInfo?.sprites.other.showdown.front_shiny
                  : pokeInfo?.sprites.other.showdown.front_default
              }
              alt=""
              onClick={handleNavigate}
            />)
          }
        </div>
        <div className="card-info-inside">
          <h2 className={`text-color-${pokeInfo?.types[0].type.name}`}>{pokeInfo?.name}</h2>
          <p>Type</p>
          <div className="types-poke">
            {isLoading ? (<div className="loader"></div>) :
            (pokeInfo?.types.map((type) => (
              <p key={type.type.url}>{type.type.name}</p>
            )))}
          </div>
        </div>
        <hr />
        <div className="card-info-details" style={style}>
          {isLoading ? (<div className="loader"></div>) : 
          (pokeInfo?.stats.map((stat) => (
            <span key={stat.stat.url} className="stat-num">
              <span className="span-title">{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </span>
          )))}
        </div>
        <div className="button-card-cry">
          <button className={`button-base button-${pokeInfo?.types[0].type.name}`} onClick={handleShiny}>{isShiny ? "Default" : "Shiny"}</button>
          <button className={`button-base button-${pokeInfo?.types[0].type.name}`} onClick={handleSound}>Cry</button>
          <a onClick={handleTurn} className={`button-base`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 9.75A2.75 2.75 0 0 1 6.25 7h5.19L9.22 9.22a.75.75 0 1 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 1 0-1.06 1.06l2.22 2.22H6.25a4.25 4.25 0 0 0 0 8.5h1a.75.75 0 0 0 0-1.5h-1A2.75 2.75 0 0 1 3.5 9.75"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
