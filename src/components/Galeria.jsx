import "../assets/css/galeria.css";
import Heart from "./Heart";

//7 para cargar el listado de imagenes necesitamos ir a buscar donde estan la simagenes en el context
import { useContext } from "react";
import Context from "../context/Context";

const Galeria = ()=> {
  const { fotos, favoritos, handleFavoritos} = useContext(Context)
  
  return (
    <div className="galeria grid-columns-5 p-3">
      {
        fotos.map((foto) => {
          return (
            <div
              key={foto.id}
              className="foto"
              onClick={()=> handleFavoritos(foto)}
              style={{ backgroundImage: `url(${foto.image})` }}>
                <Heart filled={ favoritos.includes(foto) ? true : false}></Heart>
              <p>{ foto.name }</p>
        
              

            </div>
          )
        })
      }
      
     
    </div>
  );
}

export default Galeria