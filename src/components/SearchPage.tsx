import { faArrowRight, faRubleSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { Product } from "../types";
import { Link } from "react-router";
import { arrangeByCategories } from "../store/productSlice";
import "../styles/search.scss";

export default function SearchPage() {
    const dispatch = useAppDispatch();
    const { searchList, categoryList, foundProducts } = useAppSelector(
        (state) => state.products
    );

    useEffect(() => {
        if(foundProducts.length > 0) dispatch(arrangeByCategories())
    },[foundProducts])

    useEffect(() => {
       console.log(searchList)
    },[searchList])

    return ( 
        <div className="page__search search">
            <ul className="search__list">            
                {searchList.length > 0 ? (
                    <>
                        {searchList.map((arr,i) => {
                            let targetCategory = categoryList?.find(cat=>cat.id === arr[0].categoryId)
                            let categoryName =   targetCategory?.name ?? ""             
                            return (
                                <li key={i} className="search__item">
                                    <div className="search__top">
                                        <h3 className="search__category-name">
                                            {categoryName[0].toUpperCase()+categoryName.slice(1)} 
                                            </h3>
                                        <Link to={`/category/${arr[0].categoryId}`} className="search__link">Посмотреть все товары <FontAwesomeIcon icon={faArrowRight} className="search__arrow" /></Link>
                                    </div>
                                    <ul className="search__category-list">                
                                        {arr.map((prod:Product)=>{
                                            return (
                                                <li key={prod.id} className="search__category-item">
                                                    {/* <Link to={`/category/${}}`} className="search__category-link"> */}
                                                        <div className="search__image">
                                                            <img src={prod.src} alt={prod.name} />
                                                        </div>
                                                        <div className="search__name">{prod.name}</div>                                       
                                                        <div className="search__price">
                                                                {prod.price.toLocaleString()}
                                                                <FontAwesomeIcon
                                                                    icon={faRubleSign}
                                                                    className="search__currency"
                                                                />
                                                        </div>
                                                    {/* </Link>   */}
                                                    </li>
                                                )}
                                                
                                            )}                    
                                    </ul>
                                    </li>
                            
                            )
                        
                        })}
                    </>
                ) : (
                    <>По вашему запросу ничего не найдено</>
                )}
            </ul>
        </div>)
}


