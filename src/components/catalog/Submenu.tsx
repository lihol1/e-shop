import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Category } from "../../common/types";
import SubmenuItem from "./SubmenuItem";
import List from "../List";

type SubmenuProps = {
    redirect: (id: number) => void;
};

export default function Submenu({ redirect }: SubmenuProps) {
    const { categoryList } = useAppSelector((state) => state.categories);
    const { submenuIsOpen, currentProps } = useAppSelector((state) => state.general);
    const [list, setList] = useState<Category[]>([]);

    useEffect(() => {
        if (categoryList.length > 0) {
            setList(currentProps.list);
        }
    }, [currentProps]);

    return (
        <div>
            {submenuIsOpen && (
                <div className="catalog__subcatalog subcatalog">
                    <h3 className="subcatalog__subtitle">{currentProps.title}</h3>
                    {list.length > 0 && <List items={list} renderItem={(category: Category) => <SubmenuItem category={category} redirect={redirect} />} className="subcatalog" />}
                </div>
            )}
        </div>
    );
}
