import ModalAddCategories from './ModalAddCategories'
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
        <div className="cat_butt">
            <button  onClick={openModal}>AGREGAR NUEVO</button>
            <ModalAddCategories isOpen={isOpenModal} closeModal={closeModal} />
        </div>
    )

}
export default TabDiscount;