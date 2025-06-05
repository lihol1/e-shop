import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "../../common/types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { memo } from "react";

type CategoriesItemProps = {
    category: Category;
};

const CategoriesItem = memo(({ category }: CategoriesItemProps) => {
    return (
        <Link to={`category/${category.id}`} className="categories__link">
            <div className="categories__image">
                <img src={category.src} alt={category.name} />
            </div>
            <div className="categories__name-holder">
                <h3 className="categories__name">{category.name[0].toUpperCase() + category.name.slice(1)}</h3>
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </Link>
    );
})

export default CategoriesItem;
