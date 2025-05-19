import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRubleSign, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { addItemToCart, removeItemFromCart } from '../store/productSlice';
import { Product } from '../types';

export default function Cart() {
   const { cart } = useAppSelector((state) => state.products);  
   const dispatch = useAppDispatch(); 

   let formatter = new Intl.NumberFormat("ru") 

function changeQuantity (item: Product, quantity: number) {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  function removeItem(id:number){
    dispatch(removeItemFromCart(id))
  }

  function divideStr(num: number){
   return formatter.format(num)
  }

  return (
    <>
    <div className='my-modal__wrapper'>
        {cart.length>0 && <h2 className='my-modal__title'>Корзина</h2>}
        {cart.length > 0 ?(
        <ul className='my-modal__list'>
            {cart.map((prod)=> {
                return <li key={prod.id} className='my-modal__item'>
                        <div className="my-modal__image">
                            <img src={prod.src} alt={prod.name} />
                        </div>
                        <div className="my-modal__description">{prod.name[0].toUpperCase() + prod.name.slice(1)}                        
                        </div>

                        <div className="my-modal__quantity">
                            <div className="my-modal__btn my-modal__btn--minus" onClick={() => changeQuantity(prod, Math.max(1, (prod.quantity?? 0) - 1))}
                            >-</div>
                            <span>{prod.quantity}</span>
                            <div className="my-modal__btn my-modal__btn--plus" onClick={() => changeQuantity(prod, Math.max(1, (prod.quantity?? 0) + 1))}>+</div>
                        </div>
                        
                        <div className="my-modal__price">                       
                            {divideStr((prod.price * (prod.quantity?? 1)))} <FontAwesomeIcon icon={faRubleSign} className="my-modal__currency" />
                        </div>                        

                        <div className='my-modal__btn-block'>
                            <button type="button" onClick={()=>removeItem(prod.id)}>
                            <FontAwesomeIcon icon={faTrashCan}  className="my-modal__trash"/>
                            </button>
                        </div>
                    </li>
                })}
        </ul>)
        : 
        <p>Корзина пуста</p>
        }
    </div>
  </>
  )
}


