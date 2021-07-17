import "../styles/Modal.css";
import { useState, useEffect} from "react";
import Axios from "axios";

function Modal ({isOpen, closeModal}){

  const handleModalContainerClick = (e) => e.stopPropagation();

  const [state, setState] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categories, setCategories] = useState([])

  function ADM_getCategories() {
    return new Promise((resolve, reject) => {
        Axios.get(`http://localhost:3001/categories`)
        .then((response) => {
          if (response) {
            return response.data
          }
          reject(
            "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
              response.status
          );
        })
        .then((json) => resolve(json))
        .catch((err) => reject(err));
    });
}

   function addDish(){

        let categoryDom = document.querySelector('input[name="category"]:checked')
        let IdCategoryToUpdate;

        if (categoryDom === null) {
            setState("Debe Seleccionar una Categoria")
        } else {
            IdCategoryToUpdate =  document.querySelector('input[name="category"]:checked').value
        }  

        Axios.post('http://localhost:3001/addDishes', {
            id_category : IdCategoryToUpdate,
            dish_name : name,
            description : description,
            price:price ,
          }).then((result) => setState(result.data))
   }

   useEffect (()=>{
        ADM_getCategories().then((result)=>{
            setCategories(result)
        })
    },[state])

  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        <div className="secondBox">
            <h2>{state}</h2>
            <label>Ingrese Nombre del Plato:</label>
            <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
            <label>Ingrese Descripcion del Plato:</label>
            <textarea rows="7" cols="80" type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
            <label>Ingrese Precio del Plato (S/):</label>
            <input type="text" value={price} onChange={(event)=>setPrice(event.target.value)}/>
            <label>Seleccione Categoria del Plato</label>
            <div id="categories">
            {
                categories
                .map((category)=> {
                    return(
                        <label key={category.category_id} >
                            <input type="radio" value={category.category_id} name="category" /> 
                            {category.category_name}
                        </label> 
                    )  
                })
            }
             </div>
            <button onClick={addDish}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;