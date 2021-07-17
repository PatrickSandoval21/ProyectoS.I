import Legend from './statistics/Legend'
import RadioPolar from './statistics/RadioPolar'
import CircleSta from './statistics/CircleSta'
import Grap from './statistics/Grap'
import "../styles/Home.css";
import Axios from 'axios';
import { useState } from 'react';

function Home (){

    const [gan, setGanan] = useState(0)
  Axios.get('http://localhost:3001/ganancias')
  .then((result)=>{
    setGanan(result.data[0].ganacias)
  })

  const [ped, setped] = useState(0)
  Axios.get('http://localhost:3001/pedidos')
  .then((result)=>{
    setped(result.data[0].pedidos)
  })


    return(
        <div className="Home">
            <div className="ingreso">
                <h1>Ingreso Bruto</h1>
                <h2 >S/{gan}</h2>
            </div>
            <div className="pedidos">
                <h1>Pedidos por Entregar</h1>
                <h2 >{ped}</h2>
            </div>
            <Legend />
            <Grap/>
            <RadioPolar/>
            <CircleSta/>
         
        </div>
    )
    
}
export default Home;