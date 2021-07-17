import React from 'react';
import {Line} from 'react-chartjs-2';

function Legend(props) {
    const data={
        labels:["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        datasets:[
            {
            label:"Numero de Ventas Semanal",
            fill: false,
            backgroundColor: 'rgba(73,155,234,1)',
            borderColor:'rgba(73,155,234,1)',
            pointBorderColor:'rgba(73,155,234,1)',
            pointBorderWidth:1,
            pointHoverRadius:5,
            pointHoverBackgroundColor:'rgba(73,155,234,1)',
            pointHoverBorderColor:'rgba(73,155,234,1)',
            pointRadius: 1,
            pointHitRadius: 10,
            data: [22, 14, 15, 22, 28, 45, 50 ]
            }
        ]
    }

    return (
        <div className="legend">
            <h1>Incremento de Ventas</h1>
            <Line data={data}/>
        </div>
    );
}

export default Legend;