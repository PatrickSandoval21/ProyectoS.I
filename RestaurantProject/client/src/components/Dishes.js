import { useEffect, useState } from "react";
import Dish from './Dish'

function Dishes ({categoriesSelected}){

    const [dishesToShow, setDishesToShow] = useState([])

    function getDishes(category) {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/dishes/${category}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
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

      function getAllDishes() {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/dishes`)
            .then((response) => {
              if (response.ok) {
                return response.json();
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

    async function getDishesToUse(categoriesSelected){ 
        let pizza, hamburguer,drinks,iceCream = []
        let readyDishes = [];
        if (categoriesSelected.pizza === true) {
            pizza = await getDishes(1) 
            pizza.forEach(element => {
                readyDishes.push(element)
            });
        }
        if (categoriesSelected.hamburguer === true) {
            hamburguer = await getDishes(2)     
            hamburguer.forEach(element => {
                readyDishes.push(element)
            });     
        }
        if (categoriesSelected.drinks === true) {
            drinks = await getDishes(3) 
            drinks.forEach(element => {
                readyDishes.push(element)
            });
        }
        if (categoriesSelected.iceCream === true) {
            iceCream = await getDishes(4) 
            iceCream.forEach(element => {
                readyDishes.push(element)
            });
        }
        if (categoriesSelected.pizza === false && categoriesSelected.hamburguer === false &&
            categoriesSelected.drinks === false && categoriesSelected.iceCream === false){ 
            readyDishes = await getAllDishes() 
        }
        /* console.log(readyDishes)  *///funcionaaaa bien
        return readyDishes;
        
    }

     useEffect (()=>{
        getDishesToUse(categoriesSelected)
        .then(result => {setDishesToShow(result)})
    },[categoriesSelected])

    /* console.log(categoriesSelected) */

    return(
        <Dish information={dishesToShow}/>
    );
}
export default Dishes;