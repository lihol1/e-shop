import { useAppSelector } from "../hooks/hooks";
import "../styles/categories.scss";
import List from "./List";
import CategoriesItem from "./CategoriesItem";
import { Category } from "../types";

export default function Categories() {
    const { categoryList, popularCategories } = useAppSelector((state) => state.products);

    function getCategoryList() {
        if (popularCategories.length === 0) {
            return categoryList.slice(0, 10);
        } else {
            if (popularCategories.length > 0 && popularCategories.length < 10) {
                // дополняем до 10 штук
                const difference = 10 - popularCategories.length;
                const idsArr = popularCategories.map((cat) => cat.id);
                let i = 1;
                const adds = categoryList.filter((cat) => {
                    if (cat) {
                        if (i <= difference) {
                            if (!idsArr.includes(cat.id)) {
                                i++;
                                return cat;
                            }
                        }
                    }
                });
                return [...popularCategories, ...adds];
            } else if (popularCategories.length >= 10) {
                return popularCategories.slice(0, 10);
            }
        }
    }

    return (
        <div className="page__categories categories">
            <h2 className="categories__title">Популярные категории</h2>

            <List items={getCategoryList() ?? []} renderItem={(cat: Category) => <CategoriesItem cat={cat} />} className="categories" />
        </div>
    );
}
