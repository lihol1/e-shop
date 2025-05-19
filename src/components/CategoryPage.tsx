import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addItemToCart, filterByCategory, filterByParams } from "../store/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Spinner } from "react-bootstrap";
import { faCartShopping, faRubleSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
import Slider from "@mui/material/Slider";
import "../styles/category.scss";
import "../styles/sidebar.scss";
import { Feat, Product } from "../types";
import Toast from "./ToastComponent";

export default function CategoryPage() {
    const { filteredByCategory, filteredByParams, categoryList, maxPrice } = useAppSelector((state) => state.products);
    let params = useParams();
    const dispatch = useAppDispatch();
    const [isShown, setIsShown] = useState(false);

    type SearchParams = {
        min: number;
        max: number;
        features: {} | Feat;
    };
    type FilterFeature = {
        [string: string]: boolean;
    };

    const [searchValue, setSearchValue] = useState("");
    const [priceValues, setPriceValues] = useState<number[]>([0, maxPrice]);
    const [rangeValues, setRangeValues] = useState<number[]>([0, maxPrice]);
    const [featureValues, setFeatureValues] = useState<Feat>();
    const [filterFeatures, setFilterFeatures] = useState<{} | FilterFeature>({});
    const [searchFilter, setSearchFilter] = useState<FilterFeature>({
        цена: true,
        ...filterFeatures,
    });

    const defaultParams = {
        min: 0,
        max: maxPrice,
        features: {},
    };
    const [searchParams, setSearchParams] = useState<SearchParams>(defaultParams);
    const valuesArr: string[] = [];
    const categoryId = params.categoryId ? +params.categoryId : -1;
    const category = categoryList.find((cat) => cat.id === categoryId);
    const categoryName = category?.name ?? "";

    let list = filteredByParams == null ? filteredByCategory : filteredByParams.length > 0 ? filteredByParams : null;   

    useEffect(() => {
        if (filteredByCategory.length > 0) {
            const filterObj = Object.fromEntries(Object.entries(filteredByCategory[0].features).map(([key]) => [key.toLowerCase(), true]));
            setFilterFeatures(filterObj);
        }
    }, [filteredByCategory]);

    useEffect(() => {
        if (filterFeatures) {
            setSearchFilter({ ...searchFilter, ...filterFeatures });
        }
    }, [filterFeatures]);    

    useEffect(() => {
        if (filteredByCategory.length > 0 && searchParams.max > 0) {
            dispatch(filterByParams(searchParams));
        }
    }, [dispatch, searchParams, maxPrice]);

    useEffect(() => {
        setSearchParams({
            ...searchParams,
            min: priceValues[0],
            max: priceValues[1],
        });
    }, [priceValues]);
    useEffect(() => {
        setSearchParams({ ...searchParams, features: { ...featureValues } });
    }, [featureValues]);

    useEffect(() => {
        setPriceValues([0, maxPrice]);
        setRangeValues([0, maxPrice]);
        setSearchParams({ ...searchParams, max: maxPrice });
    }, [maxPrice]);

    useEffect(() => {
        setRangeValues(priceValues);
    }, [priceValues]);

    useEffect(() => {
        dispatch(filterByCategory(params.categoryId));
    }, [dispatch, params.categoryId]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value.toLowerCase());
    }
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchFilter({ ...searchFilter, ...changeFeatStatus(searchFilter, searchValue) });

        function changeFeatStatus(featuresObj: FilterFeature, value: string) {
            const copy = Object.assign({}, featuresObj);
            for (let key in copy) {
                if (key !== value) {
                    copy[key] = false;
                } else {
                    copy[key] = true;
                }
            }
            return copy;
        }
        setSearchValue("");
    }

    function clearFilter() {
        const copy = Object.assign({}, searchFilter);
        for (let key in copy) {
            copy[key] = true;
        }
        setSearchFilter({ ...searchFilter, ...copy });
        setSearchValue("");
    }

    const handleRangeChange = (event: Event, newValue: number[]) => {
        setRangeValues(newValue);
        setPriceValues(newValue);
    };

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "min_value") {
            setPriceValues(
                priceValues.map((el, i) => {
                    if (i == 0) return +e.target.value;
                    return el;
                })
            );
        }
        if (e.target.name === "max_value") {
            setPriceValues(
                priceValues.map((el, i) => {
                    if (i == 1) return +e.target.value;
                    return el;
                })
            );
        }
    }

    function handleFeatureChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.dataset.name) {
            if (e.target.checked) {
                if (featureValues && e.target.dataset.name in featureValues) {
                    setFeatureValues({
                        ...featureValues,
                        [e.target.dataset.name]: featureValues[e.target.dataset.name].concat(e.target.name),
                    });
                } else {
                    setFeatureValues({ ...featureValues, [e.target.dataset.name]: [e.target.name] });
                }
            } else {
                if (featureValues !== undefined) {
                    setFeatureValues({ ...featureValues, [e.target.dataset.name]: featureValues[e.target.dataset.name].filter((el) => el !== e.target.name) });
                }
            }
        }
    }
    function addToCart(item: Product){
        dispatch(addItemToCart(item))
        showToast()
    }
    function showToast(){
        setIsShown(true)
        setTimeout(()=>{setIsShown(false)}, 1500)
    }

    return (
        <div className="page__wrapper">
            <div className="page__category category">
                <h3 className="category__title">
                    {categoryName[0].toUpperCase() + categoryName.slice(1)} {list && <span className="category__amount">{list?.length} товаров</span>}
                </h3>
                {list == null ? (
                    <p>По вашему запросу ничего не найдено</p>
                ) : (
                    <ul className="category__list">
                        {list.map((prod) => {
                            return (
                                <li key={prod.id} className="category__item">
                                    <div className="category__item-holder">
                                        <div className="category__image">
                                            <img src={prod.src} alt={prod.name} />
                                        </div>
                                        <div className="category__description">
                                            <h3 className="category__name">{prod.name[0].toUpperCase() + prod.name.slice(1)}</h3>
                                            <div className="category__features">
                                                {Object.entries(prod.features).map((arr, ind) => {
                                                    return (
                                                        <p className="category__feature" key={ind}>
                                                            {arr[0]} {arr[1]}
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="category__button-block">
                                            <div className="category__price">
                                                {prod.price.toLocaleString()} <FontAwesomeIcon icon={faRubleSign} className="category__currency" />
                                            </div>
                                            <button type="button" className="category__btn" onClick={()=>addToCart(prod)}>
                                                <FontAwesomeIcon icon={faCartShopping} className="category__cart" />В корзину
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>                    
                )}
                {isShown && <Toast />}
            </div>

            <aside className="page__sidebar sidebar">
                <div className="sidebar__title-block">
                    <h3 className="sidebar__title">Фильтры</h3>
                    <button type="button" className="sidebar__clear-btn" onClick={clearFilter}>
                        Очистить
                    </button>
                </div>

                <form onSubmit={submit}>
                    <input type="search" id="filter-search" name="filter-search" value={searchValue} onChange={handleChange} placeholder="Поиск по фильтрам" className="sidebar__search" />
                </form>

                {searchFilter["цена"] && (
                    <fieldset className="sidebar__price-block">
                        <legend className="sidebar__price-title">
                            Цена,
                            <span>
                                <FontAwesomeIcon icon={faRubleSign} className="sidebar__currency" />
                            </span>
                        </legend>
                        <div className="sidebar__inputs-holder">
                            <input className="sidebar__price-input" type="text" id="min-price" name="min_value" value={priceValues[0]} onChange={handlePriceChange} />
                            <span> - </span>
                            <input className="sidebar__price-input" type="text" id="max-price" name="max_value" value={priceValues[1]} onChange={handlePriceChange} />
                        </div>
                        <div className="sidebar__range">
                            <Slider value={rangeValues} onChange={handleRangeChange} valueLabelDisplay="auto" min={0} max={maxPrice} step={500} />
                        </div>
                    </fieldset>
                )}

                {filteredByCategory.length > 0 ? (
                    <div className="sidebar__features-block">
                        <Accordion defaultActiveKey="0" alwaysOpen>
                            {Object.keys(filteredByCategory[0].features).map((feat, ind) => {
                                if (searchFilter[feat.toLowerCase()]) {
                                    return (
                                        <Accordion.Item eventKey={String(ind)} key={ind} className="sidebar__acc-item">
                                            <Accordion.Header className="sidebar__acc-header">{feat}</Accordion.Header>
                                            <Accordion.Body className="sidebar__acc-body">
                                                {filteredByCategory.map((prod, i) => {
                                                    if (!valuesArr.includes(prod.features[feat])) {
                                                        valuesArr.push(prod.features[feat]);
                                                        return (
                                                            <div key={i}>
                                                                <input type="checkbox" id={prod.features[feat]} name={prod.features[feat]} data-name={feat} onChange={handleFeatureChange} />

                                                                <label htmlFor={feat} className="sidebar__feat">
                                                                    {prod.features[feat]}
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                                    return;
                                                })}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                }
                            })}
                        </Accordion>
                    </div>
                ) : (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
            </aside>
        </div>
    );
}
