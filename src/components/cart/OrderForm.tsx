import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { formField, Order, Product } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addOrder, formOrder } from "../../store/orderSlice";
import { clearCart, setNoticeIsOpen, getTotal } from "../../store/cartSlice";
import { setCount } from "../../store/orderSlice";
import { setFormIsOpen, setModalIsOpen } from "../../store/generalSlice";
import MissingProdNotice from "./MissingProdNotice";
import { getPopularCategories } from "../../store/categorySlice";
import FormElement from "./FormElement";
import List from "../List";

const formFields: formField[] = [
    { name: "name", placeholder: "Имя", text: "Имя" },
    { name: "surnname", placeholder: "Фамилия", text: "Фамилия" },
    { name: "telephone", placeholder: "Телефон", text: "Телефон" },
    { name: "phone", placeholder: "Телефон", text: "Телефон, если не дозвонимся" },
    { name: "city", placeholder: "Город", text: "Город" },
    { name: "street", placeholder: "Улица", text: "Улица" },
];

export default function OrderForm() {
    const { store, count } = useAppSelector((state) => state.order);
    const { orderedProducts, total, noticeIsOpen } = useAppSelector((state) => state.cart);

    const [missedProducts, setMissedProducts] = useState<Product[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        const missedProductsArr: Product[] = [];
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
            products: orderedProducts,
        };

        order.products.forEach((prod) => {
            store.forEach((product) => {
                if (prod.id === product.id) {
                    if (prod.quantity && product.quantity) {
                        if (product.quantity >= prod.quantity) {
                            return true;
                        } else {
                            missedProductsArr.push(prod);
                            return false;
                        }
                    }
                }
            });
        });
        setMissedProducts([...missedProductsArr]);

        if (missedProductsArr.length === 0) {
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
    }, [dispatch, orderedProducts]);

    return (
        <>
            {noticeIsOpen ? (
                <MissingProdNotice missed={missedProducts} />
            ) : (
                <div className="my-modal__order order">
                    <h2 className="order__title">Оформление заказа</h2>
                    <form ref={formRef} className="order__form form-order" onSubmit={handleSubmit}>
                        <fieldset className="form-order__fieldset">
                            <legend className="form-order__legend">Получатель</legend>
                            <List items={formFields} renderItem={(field) => <FormElement name={field.name} placeholder={field.placeholder} text={field.text} />} className="form-order" />
                        </fieldset>
                        <div className="form-order__btn-block">
                            <Button as="input" type="submit" value="Оформить заказ" variant="outline-primary" className="order__button" />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
