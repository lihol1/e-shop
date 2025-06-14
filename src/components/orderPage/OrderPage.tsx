import { Link } from "react-router";
import { useAppSelector } from "../../hooks/hooks";
import "../../styles/orders.scss";
import OrderComponent from "./OrderComponent";

export default function OrderPage() {
    const { orders } = useAppSelector((state) => state.order);

    return (
        <div className="page__orders orders">
            <h3>Заказы</h3>
            <div className="orders__link">
                <Link to="/">на главную страницу</Link>
            </div>

            <ul className="orders__list">
                {orders.map((order) => (
                    <OrderComponent key={order.id} order={order} />
                ))}
            </ul>
        </div>
    );
}
