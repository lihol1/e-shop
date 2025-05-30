import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order, Product } from "../../types";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";

type OrderItemProps = {
    prod: Product;
    order: Order;
};

export default function OrderItem({ prod, order }: OrderItemProps) {
    let formatter = new Intl.NumberFormat("ru");

    return (
        <>
            <div className="orders__left">
                <div className="orders__image">
                    <img src={prod.src} alt={prod.name} />
                </div>
                <div className="orders__name">{prod.name[0].toUpperCase() + prod.name.slice(1)}</div>

                <div className="orders__price">
                    {formatter.format(prod.price)} <FontAwesomeIcon icon={faRubleSign} className="orders__currency" />{" "}
                </div>
            </div>

            <div className="orders__description">
                <p>Заказ №: {order.id}</p>
                <p>Наименование товара: {prod.name}</p>
                <p>ФИО: {order.author}</p>
                <p>Кол-во: {prod.quantity}</p>
                <p>Сумма заказа: {order.orderTotal}</p>
            </div>
        </>
    );
}
