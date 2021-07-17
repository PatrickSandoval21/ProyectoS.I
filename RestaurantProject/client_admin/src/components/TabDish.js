import ModalAddDish from './ModalAddDish'
import {useState} from 'react'

function TabDish(){
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
            <ModalAddDish isOpen={isOpenModal} closeModal={closeModal} />
        </div>
    )

}
export default TabDish;