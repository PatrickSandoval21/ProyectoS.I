import Axios from 'axios';
import React, { useState ,useEffect} from 'react';
import {Radar} from 'react-chartjs-2';

function Legend(props) {

    const [categoriesName, setCategoriesN] = useState([]);
    const [categoriesFrec, setCategoriesF] = useState([]);

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

    function setCounts(arr){
        let frec = []
        let names = []
        arr.forEach((category)=>{
            names.push(category.category_name)
            Axios.post('http://localhost:3001/countDish',{
                id: category.category_id
            }).then((result) =>{
                frec.push(result.data[0].freq)
            })
        })

        setCategoriesF(frec)
        setCategoriesN(names)
    }

    useEffect(()=>{
        ADM_getCategories()
        .then((result)=>{
            setCounts(result)
        })
    },[])


    const data = {
        labels: categoriesName,
        datasets: [{
          label: 'Platos por Categoria',
          /* data: [11,9,4,7], */
          data: [11,9,4,7],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      };
      
    return (
        <div className="radar">
            <h1>Distribucion de los Platos</h1>
            <Radar data={data}/>
        </div>
    );
}

export default Legend;