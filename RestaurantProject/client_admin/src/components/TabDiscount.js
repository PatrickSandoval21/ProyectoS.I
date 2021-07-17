import ModalAddDiscount from './ModalAddDiscount'
import {useState} from 'react'

function TabDiscount(){
    const [isOpenModal, openModal, closeModal] = useModal(false)
    
    function useModal (initialValue = false) {
        const [isOpen, setIsOpen] = useState(initialValue);
        const openModal = () => {
          setIsOpen(true); 
        };
        const closeModal = () => setIsOpen(false);
        return [isOpen, openModal, closeModal];
      };

    return(
        <div>
            <button onClick={openModal}>AGREGAR NUEVO</button>
            <ModalAddDiscount isOpen={isOpenModal} closeModal={closeModal} />
        </div>
    )

}
export default TabDiscount;