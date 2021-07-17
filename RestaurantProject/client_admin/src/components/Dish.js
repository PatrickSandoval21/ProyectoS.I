import '../styles/Modal.css';
import '../App.css';
import {useState} from 'react'
import Modal from './Modal';
import axios from 'axios';

function Dish ({dishes, categories}){

    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [Idish, setDish] = useState([])

    function useModal (initialValue = false) {
        const [isOpen, setIsOpen] = useState(initialValue);
        const openModal = (dishParam) => {
          setIsOpen(true); 
          setDish(dishParam)
        };
        const closeModal = () => setIsOpen(false);
        return [isOpen, openModal, closeModal];
      };

    function desactivate(id){
        let element = document.getElementById(id)
        if (element.className === "desactivate") {

        axios.post('http://localhost:3001/desactivate_dish',{
            id: id,
            state_desactivate : 1
        }).then((result)=>console.log(result))
            element.className = ""
        } else {
        axios.post('http://localhost:3001/desactivate_dish',{
            id: id,
            state_desactivate : 0
        }).then((result)=>console.log(result))

            element.className = "desactivate"
        }  
    }

    function deleteDish(id){
        axios.post('http://localhost:3001/delete/dish',{
            id: id
        }).then((result) => alert("Se borro el registro con exito!"))
    }

    return(
    <tbody className="tbody_dish">
        {
            dishes.map((dish) => {
                let active = dish.active === 1 ? "Activo" : "No activo";
                let color = dish.active === 1 ? "green" : "red";
                let color_property = {color: color, fontWeight: "bold"}
            return(
                <tr key={dish.dish_id} tabIndex="0" id={dish.dish_id}>
                    <td>{dish.dish_id}</td>
                    <td>{dish.dish_name}</td>
                    <td>{dish.description}</td>
                    <td>{dish.price}</td>
                    <td>{dish.category_name}</td>
                    <td style={color_property}>{active}</td>
                    <td onClick={()=>{
                        openModal({
                            id: dish.dish_id, 
                            name:dish.dish_name, 
                            description:dish.description,
                            price : dish.price,
                            category: dish.category_name
                        })}}><button>MODIFICAR</button></td>
                    <td onClick={()=>desactivate(dish.dish_id)}><button>DESACTIVAR</button></td>
                    <td onClick={()=>deleteDish(dish.dish_id)}><button>ELIMINAR</button></td>
                        
                </tr>               
            )
        })
        }
        <Modal dish={Idish} isOpen={isOpenModal} closeModal={closeModal} categories={categories}/>
    </tbody>
    )
 
}
export default Dish;