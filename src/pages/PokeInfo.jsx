import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./PokeInfo.css";

export const PokeInfo = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, getData] = useFetch();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    getData(url);
    setIsLoading(false)
  }, []);

  console.log(data);

  const handleBack = () => {
    navigate("/pokedex");
  };

  return (
    <div className="king-container">
      <div className="footer-container">
        <footer>
          <div className="red-color">
              <img src="/98042af437fdff212d3259040db2e2db.png" alt="" />
          </div>
          <div className="black-color">
            <div className="circle">
              <div className="circle-white">
                <div className="circle-black"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <a onClick={handleBack} className="button-back">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#d41c2e" d="M34 3H12.475V1.128c0-1.046-.74-1.435-1.645-.865L.69 6.652c-.905.57-.922 1.527-.038 2.127l10.215 6.931c.884.602 1.607.235 1.607-.811V13H34a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M.024 26.184c0-.727.5-1.137 1.197-1.137H4.13c1.576 0 2.849 1.061 2.849 2.667c0 1.061-.439 1.772-1.409 2.227v.03c1.288.183 2.303 1.258 2.303 2.576c0 2.137-1.424 3.288-3.516 3.288h-3.12c-.697 0-1.212-.439-1.212-1.151v-8.5zm2.273 3.135h1.182c.742 0 1.227-.439 1.227-1.196c0-.713-.561-1.076-1.227-1.076H2.297zm0 4.516h1.788c.818 0 1.424-.47 1.424-1.318c0-.712-.545-1.197-1.606-1.197H2.297zm9.217-7.713c.258-.696.85-1.257 1.621-1.257c.805 0 1.365.53 1.621 1.257l2.971 8.243c.092.242.121.454.121.561c0 .591-.484 1-1.045 1c-.637 0-.955-.333-1.107-.788l-.453-1.424H11.03l-.455 1.409c-.15.47-.469.803-1.09.803c-.607 0-1.122-.454-1.122-1.061c0-.242.076-.424.106-.5zm.168 5.501h2.879l-1.41-4.395h-.029zm11.378-6.758c1.106 0 3.258.363 3.258 1.696c0 .546-.379 1.016-.94 1.016c-.621 0-1.046-.53-2.318-.53c-1.879 0-2.849 1.591-2.849 3.439c0 1.803.985 3.349 2.849 3.349c1.272 0 1.788-.637 2.409-.637c.682 0 1 .682 1 1.03c0 1.455-2.288 1.788-3.409 1.788c-3.076 0-5.212-2.439-5.212-5.576c0-3.151 2.121-5.575 5.212-5.575m4.471 1.212c0-.621.455-1.121 1.137-1.121c.651 0 1.137.424 1.137 1.121v3.273l3.727-3.97c.167-.182.455-.424.879-.424c.576 0 1.121.439 1.121 1.091c0 .393-.242.712-.742 1.212l-2.863 2.818l3.5 3.651c.363.364.637.697.637 1.152c0 .712-.562 1.045-1.183 1.045c-.44 0-.727-.258-1.151-.712l-3.924-4.243v3.864c0 .591-.455 1.091-1.137 1.091c-.651 0-1.137-.424-1.137-1.091z"></path></svg>
      </a>
      <div className="master-container">
        <div className={`card-one-container backg-${data?.types[0].type.name}`}>
          <div>{
            isLoading ? (<div className="pokeball-loader"></div>) :
            (<img className={`shadow-${data?.types[0].type.name}`} src={data?.sprites.other.showdown.front_default} alt="" />)
            }
          </div>
          <div className="data-main-info">
            <p>#{data?.id}</p>
            <h2>{data?.name}</h2>
          </div>
          <div className="data-details">
            <div>
              <h3>Peso</h3>
              <span>{data?.weight / 10}Kg</span>
            </div>
            <div>
              <h3>Altura</h3>
              <span>{data?.height / 10}m</span>
            </div>
          </div>
          <div className="data-type-detail">
            <div>
              <h3>Tipo</h3>
              <div className="data-inside-detail">
                {data?.types.map((type) => (
                  <p key={type.type.url}>{type.type.name}</p>
                ))}
              </div>
            </div>
            <div>
              <h3>Habilidades</h3>
              <div className="data-inside-detail">
                {data?.abilities.map((ability) => (
                  <p key={ability.ability.url}>{ability.ability.name}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="stats-container-detail">
            <h2>Estadisticas</h2>
          </div>
        </div>
        <div className={`card-two-container backg-${data?.types[0].type.name}`}>
          <h2>Movimientos</h2>
        </div>
      </div>
    </div>
  );
};
