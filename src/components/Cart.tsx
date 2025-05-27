import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction } from "react";
import { clearCart } from "../store/productSlice";
import List from "./List";
import { Product } from "../types";
import CartItem from "./CartItem";

interface ICart {
    setCartIsOpen: Dispatch<SetStateAction<boolean>>;
    setFormIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Cart({ setCartIsOpen, setFormIsOpen }: ICart) {
    const { cart } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    function clear() {
        dispatch(clearCart());
    }
    function openOrder() {
        setCartIsOpen(false);
        setFormIsOpen(true);
    }

    return (
        <>
            <div className="my-modal__wrapper">
                {cart.length > 0 && <h2 className="my-modal__title">Корзина</h2>}
                {cart.length > 0 ? (
                    <>
                        <List items={cart} renderItem={(prod: Product) => <CartItem prod={prod} />} className="my-modal" />

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
        </>
    );
}
