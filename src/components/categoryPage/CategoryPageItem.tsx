import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ru } from "../../aliases";
import { Product } from "../../types";
import { faCartShopping, faRubleSign } from "@fortawesome/free-solid-svg-icons";
import { addItemToCart } from "../../store/cartSlice";
import { setIsShown } from "../../store/generalSlice";
import { useAppDispatch } from "../../hooks/hooks";

type CategoryPageItemProps = {
    prod: Product;
};

export default function CategoryPageItem({ prod }: CategoryPageItemProps) {
    const dispatch = useAppDispatch();

    function addToCart(item: Product) {
        dispatch(addItemToCart(item));
        showToast();
    }
    function showToast() {
        dispatch(setIsShown(true));
        setTimeout(() => {
            dispatch(setIsShown(false));
        }, 1500);
    }

    return (
        <>
            <div className="category__item-holder">
                <div className="category__image">
                    <img src={prod.src} alt={prod.name} />
                </div>
                <div className="category__description">
                    <h3 className="category__name">{prod.name[0].toUpperCase() + prod.name.slice(1)}</h3>
                    <div className="category__features">
                        {Object.entries(prod.features).map((arr, ind) => {
                            return (
                                <p className="category__feature" key={ind}>
                                    {ru[arr[0]][0].toUpperCase() + ru[arr[0]].slice(1)} {arr[1]}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className="category__button-block">
                    <div className="category__price">
                        {prod.price.toLocaleString()} <FontAwesomeIcon icon={faRubleSign} className="category__currency" />
                    </div>
                    <button type="button" className="category__btn" onClick={() => addToCart(prod)}>
                        <FontAwesomeIcon icon={faCartShopping} className="category__cart" />В корзину
                    </button>
                </div>
            </div>
        </>
    );
}
