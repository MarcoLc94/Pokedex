import "./DropDown.css";
import Select from "react-select";

// Define los tipos de Pokémon como opciones
const pokemonTypes = [
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fuego" },
  { value: "water", label: "Agua" },
  { value: "grass", label: "Planta" },
  { value: "electric", label: "Eléctrico" },
  { value: "ice", label: "Hielo" },
  { value: "fighting", label: "Lucha" },
  { value: "poison", label: "Veneno" },
  { value: "ground", label: "Tierra" },
  { value: "flying", label: "Volador" },
  { value: "psychic", label: "Psíquico" },
  { value: "bug", label: "Bicho" },
  { value: "rock", label: "Roca" },
  { value: "ghost", label: "Fantasma" },
  { value: "dragon", label: "Dragón" },
  { value: "dark", label: "Siniestro" },
  { value: "steel", label: "Acero" },
  { value: "fairy", label: "Hada" },
];

const PokemonTypeDropdown = ({ onChange }) => {
  return (
    <div
      className="dropdown"
      style={{ marginLeft: "10px", fontFamily: "Arial, sans-serif" }}
    >
      <span>Filtrar:</span>
      <Select
        id="pokemon-types"
        options={pokemonTypes}
        onChange={onChange} // Llama a la función onChange cuando se selecciona una opción
        styles={{
          control: (provided) => ({
            ...provided,
            width: "150px",
            padding: "3px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "none",
            backgroundColor: "rgb(194, 0, 0)",
            color: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "rgb(194, 0, 0)" : "white",
            color: state.isSelected ? "white" : "black",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
        }}
      />
    </div>
  );
};

export default PokemonTypeDropdown;
