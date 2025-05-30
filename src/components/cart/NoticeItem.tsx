import { Product } from "../../types";

type NoticeItemProps = {
    product: Product;
};

export default function NoticeItem({ product }: NoticeItemProps) {
    return (
        <>
            <div className="notice__left">
                <div className="notice__image">
                    <img src={product.src} alt={product.name} />
                </div>
                <div className="notice__name">{product.name}</div>
            </div>
            <div className="notice__text">
                <p> На складе нет необходимого количества данного товара. Попробуйте сделать заказ позже.</p>
            </div>
        </>
    );
}
