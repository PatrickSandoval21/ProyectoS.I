import "../styles/Modal.css";
import { useState, useEffect} from "react";
import Axios from "axios";

function ModalAddStock ({ stocks,isOpen, closeModal}){

  const handleModalContainerClick = (e) => e.stopPropagation();

  const [state, setState] = useState("")
  const [nameDish, setNameDish] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [quantityAditional, setQuantityAditional] = useState(0)

   function agreeStock(){

        let final_stock = quantity + Number(quantityAditional)
        Axios.post('http://localhost:3001/addStock', {
            id : stocks.id,
            quantity : final_stock,
          }).then((result) => setState(result.data))
   }

   useEffect (()=>{
    setQuantity(stocks.quantity)
    setNameDish(stocks.name)
    },[stocks])

  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        <div className="secondBox">
            <h2>{state}</h2>
            <h4>{nameDish}</h4>
            <p>Cantidad Actual</p>
            <div>{quantity}</div>
            <label>Ingrese la cantidad Adicional a Añadir</label>
            <input type="number" min="0" onChange={(event)=>{setQuantityAditional(event.target.value)}}></input>
            
            <button onClick={agreeStock}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddStock;