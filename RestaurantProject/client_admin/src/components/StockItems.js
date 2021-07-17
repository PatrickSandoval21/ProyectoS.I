import '../styles/Modal.css';
import {useState} from 'react'
import ModalAddStock from './ModalAddStock'

function StockItems ({stocks}){

    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [stocksToSend, setStocks] = useState([])

    function useModal (initialValue = false) {
        const [isOpen, setIsOpen] = useState(initialValue);
        const openModal = (stockParams) => {
          setIsOpen(true); 
          setStocks(stockParams)
        };
        const closeModal = () => setIsOpen(false);
        return [isOpen, openModal, closeModal];
      };

    return(
    <tbody className="tbody_dish">
        {
            stocks.map((stock) => {
                let colorImportant ;

                if(stock.quantity <= 10){ colorImportant = 'rgba(255, 0, 0, 0.35)' } else
                if(stock.quantity >= 11 && stock.quantity <= 20){ colorImportant = 'rgba(255, 243, 0, 0.31)'}
                else{colorImportant = 'rgba(6, 144, 156, 0.23)'}
                
                 
            return(
                <tr key={stock.dish_inventory_id} tabIndex="0" style={{background: colorImportant}}>
                    <td>{stock.dish_inventory_id}</td>
                    <td>{stock.dish_name}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.time_created}</td>
                    <td>{stock.time_modified}</td>
                    <td onClick={()=>{
                        openModal({
                            id:stock.dish_inventory_id,
                            quantity: stock.quantity, 
                            name:stock.dish_name, 
                        })}}><button>AGREGAR</button></td>                  
                </tr>               
            )
        })
        }
        <ModalAddStock stocks={stocksToSend} isOpen={isOpenModal} closeModal={closeModal} />
    </tbody>
    )
 
}
export default StockItems;