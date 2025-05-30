import { Order } from "../../types";
import OrderItem from "./OrderItem";

type OrderComponentProps = {
    order: Order;
};

export default function OrderComponent({ order }: OrderComponentProps) {
    return (
        <ul className="orders__items">
            {order.products.map((prod) => {
                return (
                    <li key={prod.id} className="orders__item">
                        <OrderItem prod={prod} order={order} />
                    </li>
                );
            })}
        </ul>
    );
}
