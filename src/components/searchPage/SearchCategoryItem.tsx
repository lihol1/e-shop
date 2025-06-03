import { Product } from "../../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";

type SearchCategoryItemProps = {
    prod: Product;
};

export default function SearchCategoryItem({ prod }: SearchCategoryItemProps) {
    return (
        <>
            <div className="search__image">
                <img src={prod.src} alt={prod.name} />
            </div>
            <div className="search__name">{prod.name}</div>
            <div className="search__price">
                {prod.price.toLocaleString()}
                <FontAwesomeIcon icon={faRubleSign} className="search__currency" />
            </div>
        </>
    );
}
