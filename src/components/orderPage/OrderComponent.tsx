import { memo } from "react";
import { Order } from "../../common/types";
import OrderItem from "./OrderItem";

type OrderComponentProps = {
    order: Order;
};

const OrderComponent = memo(({ order }: OrderComponentProps) => {
    return (
        <li className="orders__list-item">
            <ul className="orders__items">
                {order.products.map((product) => (
                    <OrderItem key={product.id} product={product} order={order} />
                ))}
            </ul>
        </li>
    );
});

export default OrderComponent;
