import axios from 'axios';
import React from 'react';
import {Pie} from 'react-chartjs-2';


function CircleSta(props) {
    let ids = []

    axios.get('http://localhost:3001/getDishMostBuyed')
    .then((result) => {
     result.data.forEach(element => {
        ids.push(element.id_dish)
     });
     ids.sort()
    })

    const data = {
        labels: ['Americana','Peperoni','Helado Peziduri Tricolor', 'Hamburguesa Queso Tocino', 'La Chili Hut'],
        datasets: [{
          label: 'My First Dataset',
          data: [10, 7, 5, 5, 4],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };


    return (
        <div className="circlesta">
            <h1>Platos más Vendidos</h1>
            <Pie data={data}/>  
        </div>
    );
}

export default CircleSta;