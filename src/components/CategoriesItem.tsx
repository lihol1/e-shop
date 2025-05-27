import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "../types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

type CategoriesItemProps = {
    cat: Category;
};

export default function CategoriesItem({ cat }: CategoriesItemProps) {
    return (
        <Link to={`category/${cat.id}`} className="categories__link">
            <div className="categories__image">
                <img src={cat.src} alt={cat.name} />
            </div>
            <div className="categories__name-holder">
                <h3 className="categories__name">{cat.name[0].toUpperCase() + cat.name.slice(1)}</h3>
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </Link>
    );
}
