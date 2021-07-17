import { useEffect, useState } from 'react';
import icons_categories from '../images/icons_categories/icons_categories';
import Dish from './Dishes'
import '../styles/Menu.css';

function MenuSection() {

    const [pizzas, hamburguesas, bebidas, helados, all] = icons_categories; 

    //Checked State of the Items
    let stateCategories = {
        pizza : true,
        hamburguer: true,
        drinks: true,
        iceCream: true
    };

    //UseState Initation
    const [categoriesSelected, setCategoriesSelected] = useState(stateCategories);
    const [AllCatState, setAllCatState] = useState(true)

  //Handle Functions
    function handleChange() {

        const pizzaItem = document.getElementById("pizzas");
        const hamburguerItem = document.getElementById("hamburguesas");
        const drinksItem = document.getElementById("bebidas");
        const iceCreamItem = document.getElementById("helados");

        let valuePizza = pizzaItem.checked;
        let valueHamburger = hamburguerItem.checked;
        let valueDrinks = drinksItem.checked;
        let valueIceCream = iceCreamItem.checked;

        setCategoriesSelected({
            pizza: valuePizza,
            hamburguer: valueHamburger,
            drinks: valueDrinks,
            iceCream: valueIceCream
        })
    }
      
    function twoFunction(){

        setAllCatState(!AllCatState)
        if (AllCatState === false) {
            setCategoriesSelected({
                pizza: true,
                hamburguer: true,
                drinks: true,
                iceCream: true
            })

        } else {
            setCategoriesSelected({
                pizza: false,
                hamburguer: false,
                drinks: false,
                iceCream: false
            })
        }    
    }

    useEffect(()=>{
        const allItem = document.getElementById("all");
        let stateAll = AllCatState === true ? true : false;
        allItem.checked = stateAll;
    },[AllCatState])

    return (
        <div>
            <form className="categories">
                <label className="category_label">
                    <img className="icon_cat" src={all} alt="all"/> Todas las Comidas 
                    <input id="all" type="checkbox" value='all' onClick={twoFunction}/> 
                </label> 
                <label className="category_label">
                    <img className="icon_cat" src={pizzas} alt="pizzas"/> Pizzas 
                    <input id="pizzas" type="checkbox" value='1' onClick={handleChange} disabled={AllCatState} checked={categoriesSelected.pizza}/>
                </label>
                <label className="category_label">
                    <img className="icon_cat" src={hamburguesas} alt="hamburguesas"/>Hamburguesas
                    <input id="hamburguesas" type="checkbox" value='2' onClick={handleChange} disabled={AllCatState} checked={categoriesSelected.hamburguer}/> 
                </label>
                <label className="category_label">
                    <img className="icon_cat" src={bebidas} alt="bebidas"/> Bebidas
                    <input id="bebidas" type="checkbox" value='3' onClick={handleChange} disabled={AllCatState} checked={categoriesSelected.drinks}/>
                </label>
                <label className="category_label">
                    <img className="icon_cat" src={helados} alt="helados"/> Helados
                    <input id="helados" type="checkbox" value='4' onClick={handleChange} disabled={AllCatState} checked={categoriesSelected.iceCream}/> 
                </label>
            </form>
            <Dish categoriesSelected={categoriesSelected}/>
        </div>
    )
}
export default MenuSection;
