import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import { PokeInfo } from "./pages/PokeInfo";
import { useState } from "react";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const [isTurnAround, setIsTurnAround] = useState(false)

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home setIsLogged={setIsLogged} setName={setName} name={name} />
          }
        />
        <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route path="/pokedex" element={<Pokedex name={name} />} />
          <Route path="/pokemon/:name" element={<PokeInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
