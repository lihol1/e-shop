import { Category } from "../../utils/types";

type SubmenuItemProps = {
    category: Category;
    redirect: (id: number) => void;
};

export default function SubmenuItem({ category, redirect }: SubmenuItemProps) {
    return (
        <button onClick={() => redirect(category.id)} type="button" className="catalog__btn">
            {category.name[0].toUpperCase() + category.name.slice(1)}
        </button>
    );
}
