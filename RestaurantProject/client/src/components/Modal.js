import "../styles/Modal.css";
import Axios from 'axios';
import { useEffect, useState} from "react";
import { Redirect } from 'react-router';

function Modal ({ /* children, */ price,dish,image, isOpen, closeModal }){
  const handleModalContainerClick = (e) => e.stopPropagation();

  const [numberItems, setNumberItems] = useState(1)
  const [session, setSession] = useState([])
  const [status,SetstatusSession] = useState(false)
  const [mssg, setMssg] = useState("")

  function increment(){  setNumberItems(numberItems+1) }
  function decrement(){
   let value = numberItems === 0 ? 0 : numberItems-1
    setNumberItems(value)  
  }
  function needLoginMssg(){
    setMssg("Debe Iniciar Sesion")
  }
  function addPurchase(id_dish, id_customer, quantity, price){


      Axios.post("http://localhost:3001/orders",{
          id_customer: id_customer
      }).then((result) =>{
        if(result.data[0] === undefined){
          Axios.get('http://localhost:3001/stocks').then((result) =>{
            result.data.forEach(element => {
              if (element.dish_id === id_dish) {
                if (element.quantity < quantity) {
                  setMssg("La cantidad ingresada excede nuestro stock")
                }else{
                  Axios.post('http://localhost:3001/purchase',{
                    id_dish : id_dish,
                    id_customer: id_customer,
                    quantity: quantity,
                    price: price
                  })
                  .then((result)=>{
                    alert("Agregado a la lista.")
                  })
                }
              }
            });
          })
        }else{
          setMssg("Usted ya posee una orden de entrega")
        }
      })
  

   
    
    

    
  }

  useEffect(()=>{
    setMssg("")
    Axios.get("http://localhost:3001/login").then((response) => { 
      if (response.data.loggedIn) {
        setSession(response.data)
        SetstatusSession(true)
      }
      else{
        SetstatusSession(false)
      }
    });
  },[])

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}> X </button>
        {/* {children} Extrae los elementos escritos fuera del elemento*/} 
        <div className="firstBox">
            <h3 className="modal_title">{dish.dish_name}</h3>
            <img className="modal_image" src={image} alt="image_dish"/>
        </div>
        <div className="secondBox">
            <p>{dish.description}</p>
            <strike>S/{dish.price}0</strike>
            <p>S/{(price * numberItems).toFixed(2)}</p>
            <div className="quantity">
             <button onClick={decrement}>-</button><p>{numberItems}</p><button onClick={increment}>+</button>
            </div>
            <button onClick={()=>{
              status ? addPurchase(dish.dish_id,session.data.customer_id, numberItems, numberItems*price) : needLoginMssg();   
              }}>Agregar</button>
              <p>{mssg}</p>
        </div>
      </div>
    </article>
  );
};

export default Modal;