import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import Button from "react-bootstrap/Button";
import { changeCartStatus, clearCart } from "../../store/cartSlice";
import List from "../List";
import { Product } from "../../common/types";
import CartItem from "./CartItem";
import { setFormIsOpen } from "../../store/generalSlice";

export default function Cart() {
    const { orderedProducts } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    function clear() {
        dispatch(clearCart());
    }

    function openOrder() {
        dispatch(changeCartStatus(false));
        dispatch(setFormIsOpen(true));
    }

    return (
        <div className="my-modal__wrapper">
            {orderedProducts.length > 0 ? (
                <>
                    <h2 className="my-modal__title">Корзина</h2>
                    <List items={orderedProducts} renderItem={(prod: Product) => <CartItem prod={prod} />} className="my-modal" />

                    <div className="my-modal__btns">
                        <Button variant="outline-primary" className="my-modal__button" onClick={clear}>
                            Очистить корзину
                        </Button>
                        <Button variant="outline-primary" className="my-modal__button" onClick={openOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
            ) : (
                <p>Корзина пуста</p>
            )}
        </div>
    );
}
