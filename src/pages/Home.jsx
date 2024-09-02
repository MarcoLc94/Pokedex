import { useRef, useState } from "react";
import "../pages/home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ setIsLogged, setName }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameInput = useRef();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (nameInput.current.value.trim() && nameInput.current.value.length >= 3) {
      setName(nameInput.current.value.trim());
      setIsLogged(true);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/pokedex");
      }, 2000);
    } else {
      if (nameInput.current.value.length <= 3) {
        setError(400);
      } else {
        setError(true);
      }
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src="/98042af437fdff212d3259040db2e2db.png"
          alt="pokedex"
          onClick={handleHome}
        />
      </div>
      <div className="text-container">
        <h1>¡Hola Entrenador!</h1>
        <p>Para poder comenzar, dame tu nombre</p>
        <img src="/Running-Pikachu-GIF.webp" alt="Pikachu" />
      </div>
      <form className="form-container">
        <div className="input-container">
          <img  src="/images-removebg-preview.png" alt="" />
          <input type="text" placeholder="Tu nombre..." ref={nameInput} />
          <button onClick={handleLogin}>Comenzar</button>
        </div>
        {isLoading && <div className="pokeball-loader"></div>}
        {error === 400 ? (
          <p className="shake-animation">
            ⚠ Tu nombre debe contener por lo menos 3 caracteres.
          </p>
        ) : (
          <p className="shake-animation">⚠ Por favor indica tu nombre.</p>
        )}
      </form>
      
      <div className="footer-container">
        <footer>
          <div className="red-color"></div>
          <div className="black-color">
            <div className="circle">
              <div className="circle-white">
                <div className="circle-black"></div>
              </div>
            </div>
          </div>
          <div className="white-color"></div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
