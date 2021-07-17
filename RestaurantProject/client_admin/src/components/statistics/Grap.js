import React from 'react';
import {Bar} from 'react-chartjs-2';


function Grap(props) {


/* const labels = Utils.months({count: 7}); */
const data = {
  labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
  datasets: [{
    label: 'Ganancias S/',
    data:  [22, 14, 15, 22, 28, 45, 50 ],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};


    return (
        <div className="grap">
            <h1>Distribucion de Ganacias</h1>
            <Bar data={data}/>  
        </div>
    );
}

export default Grap;