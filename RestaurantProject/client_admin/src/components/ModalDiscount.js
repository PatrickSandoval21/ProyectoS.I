import "../styles/Modal.css";
import { useEffect, useState} from "react";
import axios from "axios";
function Modal ({disParams, isOpen, closeModal}){

  const handleModalContainerClick = (e) => e.stopPropagation();

  const [state, setState] = useState("")
  const [name_discount, setNameDiscount] = useState("")
  const [description, setDescription] = useState("")
  const [percent, setPercent] = useState("")

   useEffect(()=>{
    setNameDiscount(disParams.name_discount)
    setDescription(disParams.description)
    setPercent(disParams.percent)
    setState("")
   },[disParams])

   function UpdateDatos(){
        axios.post('http://localhost:3001/discounts', {
            name_discount : name_discount,
            description : description,
            percent: percent ,
            id: disParams.id_discount
          }).then((result) => setState(result.data))
   }

  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        <div className="secondBox">
            <h2>{state}</h2>
            <h4>{disParams.name_dish}</h4>
            <label>Nombre del Descuento</label>
            <input type="text" value={name_discount} onChange={(event)=>setNameDiscount(event.target.value)}/>
            <label>Descripcion del Descuento:</label>
            <textarea rows="7" cols="80" type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
            <label>Porcentaje del Descuento</label>
            <input type="text" value={percent} onChange={(event)=>setPercent(event.target.value)}/>   
            <button onClick={UpdateDatos}>Modificar</button>    
        </div>
      </div>
    </div>
  );
};

export default Modal;