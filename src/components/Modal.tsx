import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Cart from './Cart';
import "../styles/modal.scss"
import Orders from './Orders';
import CloseButton from 'react-bootstrap/CloseButton';

type ModalProps={
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setCartIsOpen: Dispatch<SetStateAction<boolean>>;
  cartIsOpen: boolean
}

export default function Modal({setModalIsOpen, setCartIsOpen, cartIsOpen } : ModalProps) {  
     const refModal = useRef(null);

    useEffect(() => {
            function checkIfClickedOutside (e: MouseEvent) {        
                if (refModal.current && refModal.current == e.target) {
                    setModalIsOpen(false)               
                }
            }
            document.addEventListener("click", checkIfClickedOutside)
            return () => {
            document.removeEventListener("click", checkIfClickedOutside)
            }
        }, [])

    function clickHandler (){ 
      setCartIsOpen(false)
      setModalIsOpen(false)
    }

  return (
    
    <>    
      <div ref={refModal} className="page__modal my-modal">
        <div className="my-modal__window">
          <div className="my-modal__close">
            <CloseButton onClick={clickHandler}/></div>
          {cartIsOpen && 
          <Cart />
          }
          {/* {ordersIsOpen && <Orders />} */}
        </div>
      </div>
  </>
   
  )
}


