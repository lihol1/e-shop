import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getCategories } from "../store/productSlice";
import '../styles/categories.scss'

export default function Categories() {
    const { categoryList } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <ul className="category__list">
            {categoryList.map((cat, index) => {
                if(index<=9){
                return (
                    <li key={cat.id} className="category__item">
                        <article>
                            <img src={cat.src} alt={cat.name} />
                            <h3>{cat.name}</h3>
                        </article>
                    </li>
                );
            }
            })}
        </ul>
    );
}
