import "../styles/Modal.css";
import { useState} from "react";
import Axios from "axios";

function ModalAddDiscount ({isOpen, closeModal}){

  const handleModalContainerClick = (e) => e.stopPropagation();

  const [state, setState] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [percent, setPercent] = useState("")
  const [id, setId] = useState([])

   function addDish(){

        Axios.post('http://localhost:3001/addDiscount', {
            id : id,
            name : name,
            description : description,
            percent: percent ,
          }).then((result) => setState(result.data))
          .catch((error)=>{setState("El ID asignado no existe.")})
   }

  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        <div className="secondBox">
            <h2>{state}</h2>
            <label>Ingrese Nombre del Descuento:</label>
            <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
            <label>Ingrese Descripcion del Descuento:</label>
            <textarea rows="7" cols="80" type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
            <label>Ingrese porcentaje del Descuento</label>
            <input type="text" value={percent} onChange={(event)=>setPercent(event.target.value)}/>
            <label>Ingrese ID del plato a Asignar</label>
            <input type="text" value={id} onChange={(event)=>setId(event.target.value)}/>
            <div id="categories">
             </div>
            <button onClick={addDish}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddDiscount;