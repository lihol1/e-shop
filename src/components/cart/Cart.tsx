import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { changeCartStatus, clearCart } from "../../store/cartSlice";
import List from "../List";
import { Product } from "../../common/types";
import CartItem from "./CartItem";
import { setFormIsOpen } from "../../store/generalSlice";

export default function Cart() {
    const { orderedProducts, cartIsOpen } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();   

    function clear() {
        dispatch(clearCart());
    }

    function openOrder() {
        dispatch(changeCartStatus(false));
        dispatch(setFormIsOpen(true));
    }

    return (
        cartIsOpen && (
            <div className="my-modal__wrapper">
                {orderedProducts.length > 0 ? (
                    <>
                        <h2 className="my-modal__title">Корзина</h2>
                        <List items={orderedProducts} renderItem={(prod: Product) => <CartItem prod={prod} />} className="my-modal" />

                        <div className="my-modal__btns">                            
                            <button className="my-modal__button my-modal__button--white" onClick={clear}>
                                Очистить корзину
                            </button>
                            <button className="my-modal__button my-modal__button--blue" onClick={openOrder}>
                                Оформить заказ
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Корзина пуста</p>
                )}
            </div>
        )
    );
}
