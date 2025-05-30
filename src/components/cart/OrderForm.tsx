import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Order, Product } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addOrder, formOrder } from "../../store/orderSlice";
import { clearCart, setNoticeIsOpen, getTotal } from "../../store/cartSlice";
import { setCount } from "../../store/orderSlice";
import { setFormIsOpen, setModalIsOpen } from "../../store/generalSlice";
import MissingProdNotice from "./MissingProdNotice";
import { getPopularCategories } from "../../store/categorySlice";

export default function OrderForm() {
    const { store, count } = useAppSelector((state) => state.order);
    const { cart, total, noticeIsOpen } = useAppSelector((state) => state.cart);

    const [missed, setMissed] = useState<Product[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const missedArr: Product[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setCount(count + 1));
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        // console.log("Form data:", data);

        const order: Order = {
            id: count,
            author: formData.get("surnname") + " " + formData.get("name"),
            orderTotal: total,
            products: cart,
        };

        order.products.forEach((prod) => {
            store.forEach((product) => {
                if (prod.id === product.id) {
                    if (prod.quantity && product.quantity) {
                        if (product.quantity >= prod.quantity) {
                            return true;
                        } else {
                            missedArr.push(prod);
                            return false;
                        }
                    }
                }
            });
        });
        setMissed([...missedArr]);

        if (missedArr.length === 0) {
            dispatch(formOrder(order));
            dispatch(addOrder());
            dispatch(getPopularCategories(order.products));
            dispatch(setFormIsOpen(false));
            dispatch(setModalIsOpen(false));
            dispatch(clearCart());
            navigate("/orders");
        } else {
            dispatch(setNoticeIsOpen(true));
        }
    };

    useEffect(() => {
        dispatch(getTotal());
    }, [cart]);

    return (
        <>
            {noticeIsOpen ? (
                <MissingProdNotice missed={missed} />
            ) : (
                <div className="my-modal__order order">
                    <h2 className="order__title">Оформление заказа</h2>
                    <form ref={formRef} className="order__form" onSubmit={handleSubmit}>
                        <fieldset className="order__fieldset">
                            <legend className="order__legend">Получатель</legend>
                            <div className="order__list">
                                <div className="order__item">
                                    <label htmlFor="name" className="order__label">
                                        Имя&#42;
                                    </label>
                                    <input type="text" id="name" name="name" placeholder="Имя" />
                                </div>

                                <div className="order__item">
                                    <label htmlFor="surnname" className="order__label">
                                        Фамилия&#42;
                                    </label>
                                    <input type="text" id="surnname" name="surnname" placeholder="Фамилия" />
                                </div>

                                <div className="order__item">
                                    <label htmlFor="telephone" className="order__label">
                                        Телефон&#42;
                                    </label>
                                    <input type="text" id="telephone" name="telephone" placeholder="Телефон" />
                                </div>

                                <div className="order__item">
                                    <label htmlFor="phone" className="order__label">
                                        Телефон, если не дозвонимся
                                    </label>
                                    <input type="text" id="phone" name="phone" placeholder="Телефон" />
                                </div>

                                <div className="order__item">
                                    <label htmlFor="city" className="order__label">
                                        Город&#42;
                                    </label>
                                    <input type="text" id="city" name="city" placeholder="Город" />
                                </div>

                                <div className="order__item">
                                    <label htmlFor="street" className="order__label">
                                        Улица&#42;
                                    </label>
                                    <input type="text" id="street" name="street" placeholder="Улица" />
                                </div>
                            </div>
                        </fieldset>
                        <div className="order__btn-block">
                            <Button as="input" type="submit" value="Оформить заказ" variant="outline-primary" className="order__button" />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
