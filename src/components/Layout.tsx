import { Outlet } from "react-router";
import Header from "./Header";
import { useAppSelector } from "../hooks/hooks";
import Modal from "./Modal";

export default function Layout() {
    const { modalIsOpen } = useAppSelector((state) => state.general);

    return (
        <div className="page">
            <Header />

            <main className="page__main">
                <Outlet />
                {modalIsOpen && <Modal />}
            </main>
        </div>
    );
}
