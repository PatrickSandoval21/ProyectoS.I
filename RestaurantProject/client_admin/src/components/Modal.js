import "../styles/Modal.css";
import { useEffect, useState} from "react";
import axios from "axios";
function Modal ({dish, isOpen, closeModal, categories }){

  const handleModalContainerClick = (e) => e.stopPropagation();

  const [state, setState] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

   useEffect(()=>{
    setName(dish.name)
    setDescription(dish.description)
    setPrice(dish.price)
    setState("")
   },[dish])

   function UpdateDatos(){

        let id_dish = dish.id
        let categoryDom = document.querySelector('input[name="category"]:checked')
        let IdCategoryToUpdate;

        if (categoryDom === null) {
            let SelectedCategory = categories.find((category)=>category.category_name === dish.category)
            IdCategoryToUpdate = SelectedCategory.category_id
        } else {
            IdCategoryToUpdate =  document.querySelector('input[name="category"]:checked').value
        }   
        axios.post('http://localhost:3001/dish', {
            id : id_dish,
            dish_name : name,
            description : description,
            price:price ,
            category_id: IdCategoryToUpdate
          }).then((result) => setState(result.data))
   }

  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        <div className="secondBox">
            <h2>{state}</h2>
            <sup>ID del PRODUCTO {dish.id}</sup>
            <label>Nombre del Producto:</label>
            <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
            <label>Descripcion del Producto:</label>
            <textarea rows="7" cols="80" type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
            <label>Precio del Producto (S/):</label>
            <input type="text" value={price} onChange={(event)=>setPrice(event.target.value)}/>
            <label>Cambiar de {dish.category} a: *opcional*</label>
            <div id="categories">
            {
                categories
                .filter(category =>  category.category_name !== dish.category)
                .map((category)=> {
                    return(
                        <label key={category.category_id} >
                            <input type="checkbox" value={category.category_id} name="category" /> 
                            {category.category_name}
                        </label> 
                    )  
                })
            }
             </div>
            <button onClick={UpdateDatos}>Modificar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;