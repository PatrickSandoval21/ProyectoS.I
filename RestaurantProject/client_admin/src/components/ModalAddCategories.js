import "../styles/Modal.css";
import { useState} from "react";
import Axios from "axios";

function ModalAddDiscount ({isOpen, closeModal}){

  const handleModalContainerClick = (e) => e.stopPropagation();

  const [state, setState] = useState("")
  const [name, setName] = useState("")

   function addCategory(){
        Axios.post('http://localhost:3001/addCategory', {
            name : name,
          }).then((result) => setState(result.data))
          .catch((error)=>{setState("No se puedo crear la Categoria")})
   }

  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        <div className="secondBox">
            <h2>{state}</h2>
            <label>Ingrese Nombre de la Categoria:</label>
            <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
            <div id="categories">
             </div>
            <button onClick={addCategory}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddDiscount;