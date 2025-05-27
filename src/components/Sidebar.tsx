import { Spinner } from "react-bootstrap";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
import Slider from "@mui/material/Slider";
import { useAppSelector } from "../hooks/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { Feat, FilterFeature } from "../types";
import { ru } from "../aliases";

interface ISidebarProps {
    rangeValues: number[];
    setRangeValues: Dispatch<SetStateAction<number[]>>;
    priceValues: number[];
    setPriceValues: Dispatch<SetStateAction<number[]>>;
    searchFilter: FilterFeature;
    setSearchFilter: Dispatch<SetStateAction<FilterFeature>>;
    featureValues: Feat | undefined;
    setFeatureValues: Dispatch<SetStateAction<Feat | undefined>>;
}

export default function Sidebar({ rangeValues, setRangeValues, priceValues, setPriceValues, searchFilter, setSearchFilter, featureValues, setFeatureValues }: ISidebarProps) {
    const { filteredByCategory, maxPrice } = useAppSelector((state) => state.products);
    const [searchValue, setSearchValue] = useState("");
    const [emptyFilter, setEmptyFilter] = useState(false);

    const valuesArr: string[] = [];

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }
    const handleRangeChange = (event: Event, newValue: number[]) => {
        setRangeValues(newValue);
        setPriceValues(newValue);
    };

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "min_value") {
            setPriceValues(
                priceValues.map((el, i) => {
                    if (i === 0) return +e.target.value;
                    return el;
                })
            );
        }
        if (e.target.name === "max_value") {
            setPriceValues(
                priceValues.map((el, i) => {
                    if (i === 1) return +e.target.value;
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

    function clearFilter() {
        const copy = Object.assign({}, searchFilter);
        for (let key in copy) {
            copy[key] = true;
        }
        setSearchFilter({ ...searchFilter, ...copy });
        setSearchValue("");
        setEmptyFilter(false);
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchFilter({ ...changeFeatStatus(searchFilter, searchValue.toLowerCase()) });

        function changeFeatStatus(featuresObj: FilterFeature, value: string) {
            const copy = Object.assign({}, featuresObj);
            if (value === "цена") {
                value = "price";
            } else {
                for (let key in ru) {
                    if (value === ru[key]) {
                        value = key;
                        break;
                    }
                }
            }
            let i = 0;
            for (let key in copy) {
                if (key !== value) {
                    copy[key] = false;
                } else {
                    copy[key] = true;
                    i++;
                }
            }
            if (i === 0) {
                setEmptyFilter(true);
            } else {
                setEmptyFilter(false);
            }

            return copy;
        }
        setSearchValue("");
    }

    return (
        <aside className="page__sidebar sidebar">
            <div className="sidebar__title-block">
                <h3 className="sidebar__title">Фильтры</h3>
                <button type="button" className="sidebar__clear-btn" onClick={clearFilter}>
                    Очистить
                </button>
            </div>

            <form onSubmit={submit}>
                <input type="search" id="filter-search" name="filter-search" value={searchValue} onChange={handleChange} placeholder="Поиск по фильтрам" className="sidebar__search" />
                {emptyFilter && <p>Такого фильтра не существует</p>}
            </form>

            {searchFilter.price && (
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
                                        <Accordion.Header className="sidebar__acc-header">{ru[feat][0].toUpperCase() + ru[feat].slice(1)}</Accordion.Header>
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
    );
}
