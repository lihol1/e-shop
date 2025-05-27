import { Category } from "../types";

interface ISubmenuItemProps {
    category: Category;
    redirect: (id: number) => void;
}

export default function SubmenuItem({ category, redirect }: ISubmenuItemProps) {
    return (
        <button onClick={() => redirect(category.id)} type="button" className="catalog__btn">
            {category.name[0].toUpperCase() + category.name.slice(1)}
        </button>
    );
}
