import { useState , useEffect} from 'react';
import dishes_images from '../images/dishes/dishesImages';
import '../styles/Dish.css';
import Modal from './Modal';

function Dish({information}) {

  
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [dishS, setdish] = useState({})
  const [discountsdb, setDiscounts] = useState([])
  const [image, setImage] = useState(0)
  const [final_price, setFinal_price] = useState([])
  const [final_Iprice, setIFinal_price] = useState([])

  function getDiscountsDB(){
    fetch('http://localhost:3001/discounts')
    .then(respond => respond.json())
    .then(discounts => {setDiscounts(discounts)})
  }

  function useModal (initialValue = false) {
    const [isOpen, setIsOpen] = useState(initialValue);
    const openModal = (dish, image,price) => {
      setIsOpen(true); 
      setdish(dish)
      setImage(image)
      setIFinal_price(price)
    };
    const closeModal = () => setIsOpen(false);
    return [isOpen, openModal, closeModal];
  };

  function getDiscount(discounts,dish_id){
    let discount_percent = 0
    discounts.forEach(individualDiscounts =>{
      if (individualDiscounts.id_dish === dish_id)
        discount_percent = individualDiscounts.discount_percent
    })
    return discount_percent
  }
  function calculatePrices(information,discounts) {
    let final_prices= [];
    information.forEach(individualDish => {
      let discount_percent = getDiscount(discounts,individualDish.dish_id)
      let final_price = individualDish.price-(individualDish.price * discount_percent)
      let final_price_redond = final_price.toFixed(2);
      final_prices.push(final_price_redond)
    })
    setFinal_price(final_prices)
  }

  useEffect(()=>{
    getDiscountsDB()
    calculatePrices(information,discountsdb)
},[information])
    
/*  */
  
  return (
    <div className = "dishes_box">
      {information.map((dish,index) => {
        if(dish.active === 1){
          return(
            <div className="dish_container_modal" key={dish.dish_id} >
              <div className="dish">
                <img className="dish_image" src={dishes_images[dish.dish_id-1]} alt="dishImage"/>
                <div className="dish_info">
                  <h3 className="dish_title">{dish.dish_name}</h3>
                  <p>S/{final_price[index]}</p>
                  <button className="btn_dish" onClick={()=> {openModal(dish,dishes_images[dish.dish_id-1],final_price[index])}}>Agregar</button>
                </div>
              </div>
               <Modal price={final_Iprice} dish={dishS} image={image} isOpen={isOpenModal} closeModal={closeModal}/> 
            </div>
          )
        }else{
          return (console.log("plato desactivado"))
        }

    })}
    </div>
    
  );

} 
export default Dish;  