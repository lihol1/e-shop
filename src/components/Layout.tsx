import { Outlet } from "react-router";
import Header from "./Header";

import { useAppDispatch } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../store/productSlice";
import Modal from "./Modal";

export default function Layout() {    
    const dispatch = useAppDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [ordersIsOpen, setOrdersIsOpen] = useState(false); 

    useEffect(() => {
        dispatch(getProducts());        
        dispatch(getCategories());   
    }, []);

    return (
        <>
            <div className="page">
                <Header modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />

                <main className="page__main">
                    <Outlet />
                    {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen}/>}
                </main>

                <footer>Footer</footer>
            </div>
        </>
    );
}
