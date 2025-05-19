import {  useAppSelector } from "../hooks/hooks";
import { Link } from "react-router";
import '../styles/categories.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


export default function Categories() {
    const { categoryList } = useAppSelector((state) => state.products);   
   
    return (
        <div className='page__categories categories'>
            <h2 className='categories__title'>Популярные категории</h2>
            <ul className="categories__list">
                {categoryList.map((cat, index) => {
                    if(index<=9){
                    return (
                        <li key={cat.id} className="categories__item">
                            <Link to={`category/${cat.id}`} className="categories__link">
                                <div className="categories__image">
                                    <img src={cat.src} alt={cat.name} />                           
                                </div>
                                <div className="categories__name-holder">
                                    <h3 className="categories__name">{cat.name[0].toUpperCase() + cat.name.slice(1)}</h3>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </Link>
                        </li>
                    );
                }
                })}
            </ul>
        </div>
    );
}
