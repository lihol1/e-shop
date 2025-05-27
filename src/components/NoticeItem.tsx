import { Product } from "../types";

type NoticeItemProps = {
    prod: Product;
};

export default function NoticeItem({ prod }: NoticeItemProps) {
    return (
        <>
            <div className="notice__left">
                <div className="notice__image">
                    <img src={prod.src} alt={prod.name} />
                </div>
                <div className="notice__name">{prod.name}</div>
            </div>
            <div className="notice__text">
                <p> На складе нет необходимого количества данного товара. Попробуйте сделать заказ позже.</p>
            </div>
        </>
    );
}
