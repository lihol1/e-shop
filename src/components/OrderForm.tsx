import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Order, Product } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { formOrder, clearCart } from "../store/productSlice";
import Notice from "./MissingProdNotice";

interface IOrderFormProps {
    setFormIsOpen: Dispatch<SetStateAction<boolean>>;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    total: number;
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
    noticeIsOpen: boolean;
    setNoticeIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function OrderForm({ setFormIsOpen, setModalIsOpen, total, count, setCount, noticeIsOpen, setNoticeIsOpen }: IOrderFormProps) {
    const { cart, store } = useAppSelector((state) => state.products);
    const [missed, setMissed] = useState<Product[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const missedArr: Product[] = [];

    useEffect(() => {
        console.log(missed);
    }, [missed]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCount(count + 1);
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log("Form data:", data);

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
                            console.log(true);
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
            setFormIsOpen(false);
            setModalIsOpen(false);
            dispatch(clearCart());
            navigate("/orders");
        } else {
            setNoticeIsOpen(true);
        }
    };

    return (
        <>
            {noticeIsOpen ? (
                <Notice missed={missed} setNoticeIsOpen={setNoticeIsOpen} />
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
