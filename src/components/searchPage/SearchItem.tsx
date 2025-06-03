import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../common/types";
import SearchCategoryItem from "./SearchCategoryItem";
import List from "../List";

type SearchItemProps = {
    categoryName: string;
    arr: Product[];
};

export default function SearchItem({ categoryName, arr }: SearchItemProps) {
    return (
        <li className="search__item-main">
            <div className="search__top">
                <h3 className="search__category-name">{categoryName[0].toUpperCase() + categoryName.slice(1)}</h3>
                <Link to={`/category/${arr[0].categoryId}`} className="search__link">
                    Посмотреть все товары <FontAwesomeIcon icon={faArrowRight} className="search__arrow" />
                </Link>
            </div>

            <List items={arr} renderItem={(prod: Product) => <SearchCategoryItem prod={prod} />} className="search" />
        </li>
    );
}
