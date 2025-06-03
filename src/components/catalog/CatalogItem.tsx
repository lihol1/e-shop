import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Category, CategoryGroup } from "../../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getCategoryGroups } from "../../store/categorySlice";
import { useNavigate } from "react-router";
import { setCatalogIsOpen, setSubmenuIsOpen, setCurrentProps } from "../../store/generalSlice";

type CatalogListProps = {
    group: CategoryGroup;
};

export default function CatalogItem({ group }: CatalogListProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function redirect(id: number) {
        dispatch(setCatalogIsOpen(false));
        dispatch(setSubmenuIsOpen(false));
        navigate(`/category/${id}`);
    }

    function clickHandler(name: string, list: Category[]) {
        if (list.length === 1) {
            redirect(list[0].id);
        } else {
            dispatch(setSubmenuIsOpen(true));
            dispatch(setCurrentProps({ title: name, list: list }));
        }
    }

    useEffect(() => {
        dispatch(getCategoryGroups());
    }, []);

    return (
        <>
            <button onClick={() => clickHandler(group.groupName, group.categoriesList)} type="button" className="catalog__btn">
                {group.groupName}
                {group.categoriesList.length > 1 && <FontAwesomeIcon icon={faArrowRight} className="catalog__arrow" />}
            </button>
        </>
    );
}
