import axios from 'axios';
import React, {useState } from 'react';
import {PolarArea} from 'react-chartjs-2';

function RadioPolar(props) {

    const [mb, setmb] = useState(0)
    const [b, sb] = useState(0)
    const [r, sr] = useState(0)
    const [m, sm] = useState(0)
    const [mm, smm] = useState(0)
    const [len, setlen] = useState(0)

    axios.get('http://localhost:3001/getSatisfaction')
    .then((result) =>{
        calculate(result.data)
    })

    function calculate(data){
        let mb = 0,b = 0,r = 0,m = 0,mm = 0;
        setlen(data.length)
        data.forEach(element => {
            switch (element.satisfaction) {
                case 5:
                    mb++
                    break;
                case 4:

                    b++
                break;
                case 3:
                    r++
                break;
                case 2:
                    m++
                break;
                case 1:
                    mm++
                break;
            
                default:
                    break;
            }
        });
        setmb((mb*100/len).toFixed(2))
        sb((b*100/len).toFixed(2))
        sr((r*100/len).toFixed(2))
        sm((m*100/len).toFixed(2))
        smm((mm*100/len).toFixed(2))
    }


    const data = {
        labels: [
          'Muy Satisfecho(%)',
          'Satisfecho(%)',
          'Neutral(%)',
          'Insatisfecho(%)',
          'Muy Insatisfecho(%)'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [mb, b, r, m, mm],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      };
    return (
        <div className="radiopolar">
            <h1>Satisfacción del Cliente</h1>
            <PolarArea data={data}/>
        </div>
    );
}

export default RadioPolar;