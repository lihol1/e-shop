import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Submenu from "./Submenu";
import { useAppSelector } from "../../hooks/hooks";
import List from "../List";
import CatalogItem from "./CatalogItem";
import { useDispatch } from "react-redux";
import { getCategoryGroups } from "../../store/categorySlice";
import { setCatalogIsOpen, setSubmenuIsOpen } from "../../store/generalSlice";

export default function Catalog() {
    const { categoryGroups } = useAppSelector((state) => state.categories);
    const { catalogIsOpen, submenuIsOpen, currentProps } = useAppSelector((state) => state.general);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef(null);

    useEffect(() => {
        function checkIfClickedOutside(e: MouseEvent) {
            if (ref.current && ref.current === e.target) {
                dispatch(setCatalogIsOpen(false));
            }
        }
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);

    function redirect(id: number) {
        dispatch(setCatalogIsOpen(false));
        dispatch(setSubmenuIsOpen(false));
        navigate(`/category/${id}`);
    }

    useEffect(() => {
        dispatch(getCategoryGroups());
    }, [currentProps]);

    return (
        <>
            {catalogIsOpen && (
                <div className="header__catalog-wrapper" ref={ref}>
                    <aside className="header__catalog catalog">
                        <h2 className="catalog__title">Каталог</h2>
                        <nav className="catalog__nav">{categoryGroups.length > 0 && <List items={categoryGroups} renderItem={(group) => <CatalogItem group={group} />} className="catalog" />}</nav>
                        {submenuIsOpen && <Submenu redirect={redirect} />}
                    </aside>
                </div>
            )}
        </>
    );
}
