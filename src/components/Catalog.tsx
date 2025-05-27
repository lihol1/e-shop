import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Submenu from "./Submenu";
import { Iprops } from "../types";

interface ICatalogProps {
    catalogIsOpen: boolean;
    setCatalogIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Catalog({ catalogIsOpen, setCatalogIsOpen }: ICatalogProps) {
    const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
    const [currentProps, setCurrentProps] = useState<Iprops>({ title: "", listId: [] });
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        function checkIfClickedOutside(e: MouseEvent) {
            if (ref.current && ref.current === e.target) {
                setCatalogIsOpen(false);
            }
        }
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);

    function redirect(id: number) {
        setCatalogIsOpen(false);
        setSubmenuIsOpen(false);
        navigate(`/category/${id}`);
    }
    function clickHandler(props: Iprops) {
        setSubmenuIsOpen(true);
        setCurrentProps(props);
    }

    return (
        <>
            {catalogIsOpen && (
                <div className="header__catalog-wrapper" ref={ref}>
                    <aside className="header__catalog catalog">
                        <h2 className="catalog__title">Каталог</h2>
                        <nav className="catalog__nav">
                            <ul className="catalog__list">
                                <li className="catalog__item">
                                    <button onClick={() => clickHandler({ title: "Ноутбуки, планшеты и аксессуары", listId: [2, 10, 11] })} type="button" className="catalog__btn">
                                        Ноутбуки, планшеты и аксессуары
                                        <FontAwesomeIcon icon={faArrowRight} className="catalog__arrow" />
                                    </button>
                                </li>
                                <li className="catalog__item">
                                    <button onClick={() => redirect(5)} type="button" className="catalog__btn">
                                        Телевизоры
                                    </button>
                                </li>
                                <li className="catalog__item">
                                    <button onClick={() => clickHandler({ title: "Смартфоны, гаджеты, аксессуары", listId: [1, 15] })} type="button" className="catalog__btn">
                                        Смартфоны, гаджеты, аксессуары
                                        <FontAwesomeIcon icon={faArrowRight} className="catalog__arrow" />
                                    </button>
                                </li>
                                <li className="catalog__item">
                                    <button onClick={() => clickHandler({ title: "Мониторы, проекторы", listId: [3, 4] })} type="button" className="catalog__btn">
                                        Мониторы, проекторы
                                        <FontAwesomeIcon icon={faArrowRight} className="catalog__arrow" />
                                    </button>
                                </li>
                                <li className="catalog__item">
                                    <button onClick={() => clickHandler({ title: "Аудио-техника", listId: [6, 8, 9] })} type="button" className="catalog__btn">
                                        Аудио-техника
                                        <FontAwesomeIcon icon={faArrowRight} className="catalog__arrow" />
                                    </button>
                                </li>
                                <li className="catalog__item">
                                    <button onClick={() => clickHandler({ title: "Комплектующие", listId: [12, 13, 14] })} type="button" className="catalog__btn">
                                        Комплектующие
                                        <FontAwesomeIcon icon={faArrowRight} className="catalog__arrow" />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        {submenuIsOpen && <Submenu submenuIsOpen={submenuIsOpen} currentProps={currentProps} redirect={redirect} />}
                    </aside>
                </div>
            )}
        </>
    );
}
