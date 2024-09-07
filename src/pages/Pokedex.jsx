import { useEffect, useRef, useState } from "react";
import PokemonTypeDropdown from "../components/DropDown";
import "./Pokedex.css";
import useFetch from "../hooks/useFetch";
import PokeCard from "./PokeCard";
import { useNavigate } from "react-router-dom";
import pokemonTypeIds from "../utils/transformType";

const Pokedex = ({ name }) => {
  const [pokemons, getPokemons, getPokemonByName, error] = useFetch();
  const [searchName, setSearchName] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [pokeByName1, setPokeByName1] = useState("");
  const [isError, setIsError] = useState(null);
  const inputName = useRef();
  const dropdownData = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
    if (!searchName) {
      getPokemons(url);
    }
  }, []);

  useEffect(() => {
    if (searchType) {
      const url = `https://pokeapi.co/api/v2/type/${searchType}`;
      getPokemons(url);
      console.log(pokemons);
    }
  }, [searchType]);

  useEffect(() => {
    if (searchName) {
      console.log(pokeByName1);
      const url = `https://pokeapi.co/api/v2/pokemon/${searchName}`;
      getPokemonByName(url, searchName)
        .then((response) => {
          console.log(response);
          setIsError(false);
          setPokeByName1(response);
        })
        .catch((error) => {
          console.error(error)
          setIsError(error)
          setPokeByName1(searchName)
          console.log(pokeByName1)
        });
    }
  }, [searchName]);

  useEffect(() => {
    if (pokeByName1) {
      console.log("Valor actualizado de pokeByName1:", pokeByName1);
    }
  }, [pokeByName1]);

  const handleSearch = (event) => {
    event.preventDefault();
    const poke = inputName.current.value.toLowerCase();
    console.log(poke);
    setSearchName(poke);
  };

  const handleHome = () => {
    navigate("/pokedex");
    setSearchName(null);
  };

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      const typeId = pokemonTypeIds[selectedOption.value];
      setSearchType(typeId);
      console.log(typeId); // Aquí se imprime el ID del tipo
    }
  };

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
        <PokemonTypeDropdown ref={dropdownData} onChange={handleSelect} />
      </div>
      <div className="info-container">
        {isError ? (
          <div className="error-div">
            <p>⚠ No existe el pokemon</p>
            <span className="shake-animation">{searchName}</span>
            <p> Por favor intenta otra vez.</p>
          </div>
        ) : searchType && pokemons?.pokemon ? (
          pokemons.pokemon.map(({ pokemon }) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : searchName && pokeByName1  ? (
          <PokeCard pokeByName1={pokeByName1} searchName={searchName} />
        ) : pokemons?.results && !isError ? (
          pokemons.results.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <div className="error-div">
            <p className="shake-animation">⚠ No se encontro <span>{searchName}</span>, Intenta nuevamente.</p>
            <img src="./pikachusad.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
