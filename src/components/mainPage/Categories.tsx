import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "../../styles/categories.scss";
import List from "../List";
import CategoriesItem from "./CategoriesItem";
import { Category } from "../../common/types";
import { useEffect } from "react";
import { getTenPopularCategories } from "../../store/categorySlice";

export default function Categories() {
    const { popularCategories, renderList } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTenPopularCategories());
    }, [popularCategories]);

    return (
        <div className="page__categories categories">
            <h2 className="categories__title">Популярные категории</h2>

            <List items={renderList} renderItem={(category: Category) => <CategoriesItem category={category} />} className="categories" />
        </div>
    );
}
