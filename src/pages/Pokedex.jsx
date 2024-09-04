import { useEffect, useRef, useState } from "react";
import PokemonTypeDropdown from "../components/DropDown";
import "./Pokedex.css";
import useFetch from "../hooks/useFetch";
import PokeCard from "./PokeCard";
import { useNavigate } from "react-router-dom";

const Pokedex = ({ name }) => {
  const [pokemons, getPokemons, getPokemonByName, error] = useFetch();
  const [searchName, setSearchName] = useState("");
  const inputName = useRef();

  const navigate = useNavigate();
 
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
    if (!searchName) {
      getPokemons(url);
    }
  }, [searchName]);

  useEffect(() => {
    if (searchName) {
      const url = `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`;
      getPokemonByName(url, searchName);
      console.log(url, searchName)
    }
  }, [searchName]);

  const handleSearch = () => {
    setSearchName(inputName.current.value);
  };

  const handleHome = () => {
    navigate("/");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="footer-container">
        <footer>
          <div className="red-color">
            <img
              src="/98042af437fdff212d3259040db2e2db.png"
              alt=""
              onClick={handleHome}
            />
          </div>
          <div className="black-color">
            <div className="circle">
              <div className="circle-white">
                <div className="circle-black"></div>
              </div>
            </div>
          </div>
          <div className="white-color">
            <h2>
              <span className="text-red">
                Bienvenido {name ? name : "Anonymous"}
              </span>
              , aquí podrás encontrar a tu Pokémon favorito.
            </h2>
          </div>
        </footer>
      </div>
      <div className="card-container">
        <div className="input-container">
          <input ref={inputName} type="text" placeholder="Buscar un Pokémon" />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        <PokemonTypeDropdown />
      </div>
      <div className="info-container">
        {searchName && !error ? (
          <PokeCard pokemons={pokemons} searchName={searchName}/>
        ) : (
          pokemons?.results.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  );
};

export default Pokedex;
