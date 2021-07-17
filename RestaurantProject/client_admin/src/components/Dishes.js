import Axios from 'axios';
import Dish from './Dish'
import '../App.css';
import {useState, useEffect} from 'react';
function Dishes (){

    const[allDishes, setAllDishes] = useState([])
    const[categories, setCategories] = useState([])

    function ADM_getAllDishes() {
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/admDishes`)
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

    useEffect (()=>{
        ADM_getAllDishes().then((result) => {
            setAllDishes(result)
        })

        ADM_getCategories().then((result)=>{
            setCategories(result)
        })
    },[allDishes])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>COMIDA(ID)</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCION</th>
                        <th>PRECIO (S/)</th>
                        <th>CATEGORIA</th>
                        <th>ESTADO</th>
                        <th>MODIFICAR</th>
                        <th>DESACTIVAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                
                <Dish dishes={allDishes} categories={categories}/>

                
            </table>
        </div>
    )
}
export default Dishes;