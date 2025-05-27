import { Link } from "react-router";
import { useAppSelector } from "../hooks/hooks";
import "../styles/orders.scss";
import OrderComponent from "./OrderComponent";

export default function OrderPage() {
    const { orders } = useAppSelector((state) => state.products);
    return (
        <div className="page__orders orders">
            <h3>Заказы</h3>
            <div className="orders__link">
                <Link to="/">на главную страницу</Link>
            </div>

            <ul className="orders__list">
                {orders.map((order) => {
                    return (
                        <li key={order.id} className="orders__list-item">
                            <OrderComponent order={order} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
