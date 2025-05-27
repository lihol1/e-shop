import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import "../styles/modal.scss";
import CloseButton from "react-bootstrap/CloseButton";
import OrderForm from "./OrderForm";
import { useAppSelector } from "../hooks/hooks";

type ModalProps = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    setCartIsOpen: Dispatch<SetStateAction<boolean>>;
    cartIsOpen: boolean;
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
};

export default function Modal({ setModalIsOpen, setCartIsOpen, cartIsOpen, count, setCount }: ModalProps) {
    const { cart } = useAppSelector((state) => state.products);
    const refModal = useRef(null);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [total, setTotal] = useState<number>(0);
    const [noticeIsOpen, setNoticeIsOpen] = useState(false);

    useEffect(() => {
        function checkIfClickedOutside(e: MouseEvent) {
            if (refModal.current && refModal.current === e.target) {
                setModalIsOpen(false);
            }
        }
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);

    function clickHandler() {
        setCartIsOpen(false);
        setModalIsOpen(false);
        setNoticeIsOpen(false);
    }

    useEffect(() => {
        setTotal(getTotal());
    }, [cart]);

    function getTotal(): number {
        if (cart.length > 0) {
            return cart.reduce((sum, prod) => {
                return sum + prod.price * (prod.quantity ?? 1);
            }, 0);
        }
        return 0;
    }

    return (
        <>
            <div ref={refModal} className="page__modal my-modal">
                <div className="my-modal__window">
                    <div className="my-modal__close">
                        <CloseButton onClick={clickHandler} />
                    </div>
                    {cartIsOpen && <Cart setCartIsOpen={setCartIsOpen} setFormIsOpen={setFormIsOpen} />}
                    {formIsOpen && <OrderForm setFormIsOpen={setFormIsOpen} setModalIsOpen={setModalIsOpen} total={total} count={count} setCount={setCount} noticeIsOpen={noticeIsOpen} setNoticeIsOpen={setNoticeIsOpen} />}
                </div>
            </div>
        </>
    );
}
