import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { Category, Iprops } from "../types";
import SubmenuItem from "./SubmenuItem";
import List from "./List";

interface ISubMenu {
    submenuIsOpen: boolean;
    currentProps: Iprops;
    redirect: (id: number) => void;
}

export default function Submenu({ submenuIsOpen, currentProps, redirect }: ISubMenu) {
    const { categoryList } = useAppSelector((state) => state.products);
    const [list, setList] = useState<Category[]>([]);

    useEffect(() => {
        if (categoryList.length > 0) {
            setList(categoryList.filter((cat) => currentProps.listId.includes(cat.id)));
        }
    }, [currentProps]);

    return (
        <div>
            {submenuIsOpen && (
                <div className="catalog__subcatalog subcatalog">
                    <h3 className="subcatalog__subtitle">{currentProps.title}</h3>
                    {list.length > 0 && <List items={list} renderItem={(cat: Category) => <SubmenuItem category={cat} redirect={redirect} />} className="subcatalog" />}
                </div>
            )}
        </div>
    );
}
