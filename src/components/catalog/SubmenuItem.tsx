import { Category } from "../../common/types";
import { memo } from 'react';

type SubmenuItemProps = {
    category: Category;
    redirect: (id: number) => void;
};

export default memo(function SubmenuItem({ category, redirect }: SubmenuItemProps) {
    return (
        <button onClick={() => redirect(category.id)} type="button" className="catalog__btn">
            {category.name[0].toUpperCase() + category.name.slice(1)}
        </button>
    );
})
