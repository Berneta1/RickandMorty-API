import "./styles.css";
// 1.1 importamos Context
import Context from "./context/Context.js";
//el context se compone de un estado de useState para usarlo de forma global, por lo tanto los importamos...
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

export default function App() {


//3 creamos un array vacio (un listado de todas las fotos) y otro array vacio (de las fotos favoritas)
const [fotos, setFotos] = useState([])
const [favoritos, setFavoritos] = useState([])

//8 Creamos una funcion para trasladar favoritos
const handleFavoritos = (foto) => {
  const enFavoritos = favoritos.includes(foto)

  if (enFavoritos) {
    const favoritosActualizado = favoritos.filter((favorito)=> favorito != foto)
    setFavoritos(favoritosActualizado)
  } else {
    const favoritosActualizado = [...favoritos]
    favoritosActualizado.push(foto)
    setFavoritos(favoritosActualizado)
  }
}


//4 creamos un estado global para mandarlo a travez del context (8 agregamos handleFavoritos)
const globalState = { fotos, favoritos, handleFavoritos}

// 2 traemos la api...Utilizamos useEffect para pasar un array de dependecias vacio, para que la peticion de la api ocurra la primera vez
useEffect(() => {
  fetch ("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((json) => {
      //recivimos la data aqui
      console.log(json.results)
       // 6 y la guardamos aqui --->Galeria
      setFotos(json.results)
    })
    .catch ((e) => console.log(e))
  },[])

  return (
    <div className="App">
       {/*5 despues de tener los estados definidos (quienes seran globales), hacemos un provider.*/}
      <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}
