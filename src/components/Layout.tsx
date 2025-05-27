import { Outlet } from "react-router";
import Header from "./Header";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { addOrder, getCategories, getProducts, getPopularCategories } from "../store/productSlice";
import Modal from "./Modal";

export default function Layout() {
    const { order } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [count, setCount] = useState<number>(1);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (order.products.length > 0) {
            dispatch(addOrder());
            dispatch(getPopularCategories());
        }
    }, [order]);

    return (
        <>
            <div className="page">
                <Header modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} setCartIsOpen={setCartIsOpen} />

                <main className="page__main">
                    <Outlet />
                    {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} count={count} setCount={setCount} />}
                </main>
            </div>
        </>
    );
}
