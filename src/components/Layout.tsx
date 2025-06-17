import { Outlet } from "react-router";
import Header from "./Header";
import { useAppSelector } from "../hooks/hooks";
import Modal from "./Modal";
import Cart from "./cart/Cart";
import OrderForm from "./cart/OrderForm";
import UserComponent from "./user/UserComponent";
import LoginNotification from "./user/LoginNotification";

export default function Layout() {
    const { modalIsOpen } = useAppSelector((state) => state.general);

    return (
        <div className="page">
            <Header />

            <main className="page__main">
                <Outlet />
                {modalIsOpen && (
                    <Modal>
                        <Cart />
                        <OrderForm />
                        <UserComponent/>
                        <LoginNotification />                           
                    </Modal>
                )}
            </main>
        </div>
    );
}
