import { useEffect, useState } from "react";
import "./PokeCard.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const PokeCard = ({ pokemon, pokemons, searchName, pokeByName1 }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [pokeInfo, getPokeInfo, pokeByName, error] = useFetch();
  const [pokeName, setPokeName] = useState(null);
  const [isTurnAround, setIsTurnAround] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let cry;


  console.log(searchName);

  useEffect(() => {
    console.log("here")
    if (searchName === null || typeof searchName !== 'string') {
      console.log("pase el filtro")
      setIsLoading(true);
      console.log(pokemon.url);
      getPokeInfo(pokemon.url).then(() => {
        setIsLoading(false);
        console.log(pokeInfo);
        console.log("entro aqui");
        cry = new Audio(pokeInfo?.cries?.legacy);
      });
    }
  }, [pokemon]);

  useEffect(() => {
    if (typeof searchName === "string") {
      setIsLoading(true);
      console.log(searchName);
      const url = `https://pokeapi.co/api/v2/pokemon/${searchName}`;
      pokeByName(url, searchName).then((response) => {
        setIsLoading(false)
        console.log(response)
       setPokeName(response)
       console.log(pokeName)
      });
    }
  }, [searchName]);

  // Nuevo useEffect para cuando pokeName cambia
useEffect(() => {
  if (pokeName) {
    console.log("El valor de pokeName ha cambiado: ", pokeName);
    // Aquí puedes trabajar con el nuevo valor de pokeName
  }
}, [pokeName]);

  const handleShiny = (event) => {
    event.preventDefault();
    setIsShiny(!isShiny);
  };

  const handleSound = (event) => {
    event.preventDefault();
    console.log(cry);
    if (pokeInfo) {
      cry = new Audio(
        pokeInfo?.cries?.legacy
          ? pokeInfo?.cries?.legacy
          : pokeInfo?.cries?.latest
      );
    } else {
      cry = new Audio(
        pokemons?.cries?.legacy
          ? pokemons?.cries?.legacy
          : pokeInfo?.cries?.latest
      );
    }
    cry.play();
  };

  const handleTurn = (event) => {
    event.preventDefault();
    setIsTurnAround(!isTurnAround);
  };

  const handleNavigate = () => {
    navigate(`/pokemon/${pokemon ? pokemon.name : pokeData.name}`);
  };

  const pokeData = searchName ? pokeName : pokeInfo;

  console.log(pokeData);
  console.log(searchName);

  return (
    <div>
      <div
        className={`card-container-inside border-${pokeData?.types[0].type.name}`}
      >
        <div className={`img-background bg-${pokeData?.types[0]?.type?.name}`}>
          {isLoading ? (
            <div className="pokeball-loader"></div>
          ) : (
            <img
              src={
                pokeData?.sprites?.other?.showdown.front_default
                  ? isTurnAround
                    ? isShiny
                      ? pokeData?.sprites?.other?.showdown?.back_shiny
                      : pokeData?.sprites?.other?.showdown?.back_default
                    : isShiny
                    ? pokeData?.sprites?.other?.showdown?.front_shiny
                    : pokeData?.sprites?.other?.showdown?.front_default
                  : isShiny
                  ? pokeData?.sprites?.other["official-artwork"].front_shiny
                  : pokeData?.sprites?.other["official-artwork"].front_default
              }
              alt={pokeData?.name}
              onClick={handleNavigate}
            />
          )}
        </div>
        <div className="card-info-inside">
          <h2 className={`text-color-${pokeData?.types[0]?.type?.name}`}>
            {pokeData?.name}
          </h2>
          <p>Type</p>
          <div className="types-poke">
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              pokeData?.types.map((type) => (
                <p key={type.type.url}>{type.type.name}</p>
              ))
            )}
          </div>
        </div>
        <hr />
        <div className="card-info-details">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            pokeData?.stats.map((stat) => (
              <span key={stat.stat.url} className="stat-num">
                <span className="span-title">{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </span>
            ))
          )}
        </div>
        <div className="button-card-cry">
          <button
            className={`button-base button-${pokeData?.types[0]?.type?.name}`}
            onClick={handleShiny}
          >
            {isShiny ? "Default" : "Shiny"}
          </button>
          <button
            className={`button-base button-${pokeData?.types[0]?.type?.name}`}
            onClick={handleSound}
          >
            Cry
          </button>
          <a onClick={handleTurn} className="button-base">
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
