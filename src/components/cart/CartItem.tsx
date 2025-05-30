import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../../types";
import { faRubleSign, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../hooks/hooks";
import { addItemToCart, removeItemFromCart } from "../../store/cartSlice";

type CartItemProps = {
    prod: Product;
};

const CartItem = ({prod}:CartItemProps) => {
    let formatter = new Intl.NumberFormat("ru");
    const dispatch = useAppDispatch();
    
    function changeQuantity(item: Product, quantity: number) {
        dispatch(addItemToCart({ ...item, quantity }));
    }

    function removeItem(id: number) {
        dispatch(removeItemFromCart(id));
    }

    function divideStr(num: number) {
        return formatter.format(num);
    }
    return (
        <>
            <div className="my-modal__image">
                <img src={prod.src} alt={prod.name} />
            </div>
            <div className="my-modal__description">{prod.name[0].toUpperCase() + prod.name.slice(1)}</div>

            <div className="my-modal__quantity">
                <div className="my-modal__btn my-modal__btn--minus" onClick={() => changeQuantity(prod, Math.max(1, (prod.quantity ?? 0) - 1))}>
                    -
                </div>
                <span>{prod.quantity}</span>
                <div className="my-modal__btn my-modal__btn--plus" onClick={() => changeQuantity(prod, Math.max(1, (prod.quantity ?? 0) + 1))}>
                    +
                </div>
            </div>

            <div className="my-modal__price">
                {divideStr(prod.price * (prod.quantity ?? 1))} <FontAwesomeIcon icon={faRubleSign} className="my-modal__currency" />
            </div>

            <div className="my-modal__btn-block">
                <button type="button" onClick={() => removeItem(prod.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className="my-modal__trash" />
                </button>
            </div>
        </>
    );
};

export default CartItem;