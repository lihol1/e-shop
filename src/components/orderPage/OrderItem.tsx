import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order, Product } from "../../common/types";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";
import formatter from "../../common/formatter";

type OrderItemProps = {
    product: Product;
    order: Order;
};

export default function OrderItem({ product, order }: OrderItemProps) {
    return (
        <li key={product.id} className="orders__item">
            <div className="orders__left">
                <div className="orders__image">
                    <img src={product.src} alt={product.name} />
                </div>
                <div className="orders__name">{product.name[0].toUpperCase() + product.name.slice(1)}</div>

                <div className="orders__price">
                    {formatter.format(product.price)} <FontAwesomeIcon icon={faRubleSign} className="orders__currency" />{" "}
                </div>
            </div>

            <div className="orders__description">
                <p>Заказ №: {order.id}</p>
                <p>Наименование товара: {product.name}</p>
                <p>ФИО: {order.author}</p>
                <p>Кол-во: {product.quantity}</p>
                <p>Сумма заказа: {order.orderTotal}</p>
            </div>
        </li>
    );
}
