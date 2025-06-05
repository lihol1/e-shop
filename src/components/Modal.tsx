import { useCallback, useEffect, useRef } from "react";
import Cart from "./cart/Cart";
import "../styles/modal.scss";
import CloseButton from "react-bootstrap/CloseButton";
import OrderForm from "./cart/OrderForm";
import { useAppSelector } from "../hooks/hooks";
import { changeCartStatus } from "../store/cartSlice";
import { setNoticeIsOpen } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { setModalIsOpen, setFormIsOpen } from "../store/generalSlice";

export default function Modal() {
    const { cartIsOpen } = useAppSelector((state) => state.cart);
    const { formIsOpen } = useAppSelector((state) => state.general);
    const refModal = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        function checkIfClickedOutside(e: MouseEvent) {
            if (refModal.current && refModal.current === e.target) {
                dispatch(setModalIsOpen(false));
            }
        }
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);

    const clickHandler = useCallback(() => {
        dispatch(changeCartStatus(false));
        dispatch(setModalIsOpen(false));
        dispatch(setNoticeIsOpen(false));
        dispatch(setFormIsOpen(false));
    }, [dispatch, changeCartStatus, setModalIsOpen, setNoticeIsOpen, setFormIsOpen]);

    return (
        <div ref={refModal} className="page__modal my-modal">
            <div className="my-modal__window">
                <div className="my-modal__close">
                    <CloseButton onClick={clickHandler} />
                </div>
                {cartIsOpen && <Cart />}
                {formIsOpen && <OrderForm />}
            </div>
        </div>
    );
}
