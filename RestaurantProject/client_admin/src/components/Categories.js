import Axios from 'axios';
import '../styles/Categories.css'
import {useState, useEffect} from 'react';
function Categories(){

    const [categories, setCategories] = useState([]);

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

    useEffect(()=>{
        ADM_getCategories()
        .then((result)=>{
            setCategories(result)
        })
    },[])

        return(
            <div className="categories">
                <table>
                    <thead>
                        <tr>
                            <th>CATEGORIA(ID)</th>
                            <th>NOMBRE DE CATEGORIA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        categories.map((category)=>{
                            return(
                            <tr key={category.category_id}>
                                <td>{category.category_id}</td>
                                <td>{category.category_name}</td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    

}
export default Categories;