import { useEffect, useState } from "react";
import PokemonTypeDropdown from "../components/DropDown";
import "./Pokedex.css";
import useFetch from "../hooks/useFetch";
import PokeCard from "./PokeCard";
import { useNavigate } from "react-router-dom";

const Pokedex = ({ name }) => {
  const [pokemons, getPokemons] = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
    getPokemons(url) 
  }, []);

  console.log(pokemons);

  const handleHome = () => {
    navigate("/");
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
              , aqui podrás encontrar a tu pokémon favorito.
            </h2>
          </div>
        </footer>
      </div>
      <div className="card-container">
        <div className="input-container">
          <input type="text" placeholder="Buscar un pokémon" />
          <button>Buscar</button>
        </div>
        <PokemonTypeDropdown />
      </div>
      <div className="info-container">
        {
          pokemons?.results.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))
        }
      </div>
    </div>
  );
};

export default Pokedex;
