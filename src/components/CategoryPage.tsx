import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { filterByCategory, filterByParams } from "../store/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import "../styles/category.scss";
import "../styles/sidebar.scss";
import { Feat, FilterFeature, Product, SParams } from "../types";
import Toast from "./ToastComponent";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import List from "./List";
import CategoryPageItem from "./CategoryPageItem";

export default function CategoryPage() {
    const { filteredByCategory, filteredByParams, categoryList, maxPrice } = useAppSelector((state) => state.products);
    let params = useParams();
    const dispatch = useAppDispatch();

    const [list, setList] = useState<Product[] | null>([]);
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const [categoryName, setCategoryName] = useState("");
    const [isShown, setIsShown] = useState(false);
    const [priceValues, setPriceValues] = useState<number[]>([0, maxPrice]);
    const [rangeValues, setRangeValues] = useState<number[]>([0, maxPrice]);
    const [featureValues, setFeatureValues] = useState<Feat | undefined>();
    const [filterFeatures, setFilterFeatures] = useState<{} | FilterFeature>({});
    const [searchFilter, setSearchFilter] = useState<FilterFeature>({
        price: true,
        ...filterFeatures,
    });
    const defaultParams = {
        min: 0,
        max: maxPrice,
        features: {},
    };
    const [sParams, setSParams] = useState<SParams>(defaultParams);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const itemsPerPage = 3;
    const totalPages = list === null ? 1 : Math.ceil(list.length / itemsPerPage);

    function setCategoryData() {
        const catId = params.categoryId ? +params.categoryId : -1;
        setCategoryId(catId);
        const category = categoryList.find((cat) => cat.id === catId);
        setCategoryName(category?.name ?? "");
    }

    useEffect(() => {
        console.log(searchParams.get("page"));
        setCurrentPage(Number(searchParams.get("page") || "1"));
        // if (!searchParams.get("page")) {
        //     setSearchParams({ page: "1" });
        // }
        setCategoryData();
    }, [searchParams.get("page")]);

    useEffect(() => {
        setCategoryData();
    }, [params.categoryId]);

    useEffect(() => {
        const filtered = (filteredByParams ?? []).length > 0 ? filteredByParams : null;
        setList(filteredByParams === null ? filteredByCategory : filtered);
    }, [params.categoryId, currentPage, filteredByParams]);

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
        if (filteredByCategory.length > 0 && sParams.max > 0) {
            dispatch(filterByParams(sParams));
        }
    }, [dispatch, sParams, maxPrice]);

    useEffect(() => {
        setSParams({
            ...sParams,
            min: priceValues[0],
            max: priceValues[1],
        });
    }, [priceValues]);

    useEffect(() => {
        setSParams({ ...sParams, features: { ...featureValues } });
    }, [featureValues]);

    useEffect(() => {
        setPriceValues([0, maxPrice]);
        setRangeValues([0, maxPrice]);
        setSParams({ ...sParams, max: maxPrice });
    }, [maxPrice]);

    useEffect(() => {
        setRangeValues(priceValues);
    }, [priceValues]);

    useEffect(() => {
        dispatch(filterByCategory(params.categoryId ?? ""));
    }, [dispatch, params.categoryId]);

    function paginate(arr: Product[]) {
        const endIndex = currentPage * itemsPerPage;
        const startIndex = endIndex - itemsPerPage;
        return arr.slice(startIndex, endIndex);
    }

    return (
        <div className="page__wrapper">
            <div className="page__category category">
                <h3 className="category__title">
                    {categoryName.length > 0 && categoryName[0].toUpperCase() + categoryName.slice(1)} {list && <span className="category__amount">{list?.length} товаров</span>}
                </h3>
                {list === null ? (
                    <p>По вашему запросу ничего не найдено</p>
                ) : (
                    <>
                        <List items={paginate(list)} renderItem={(prod: Product) => <CategoryPageItem prod={prod} setIsShown={setIsShown} />} className="category" />

                        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </>
                )}
                {isShown && <Toast />}
            </div>

            <Sidebar
                rangeValues={rangeValues}
                setRangeValues={setRangeValues}
                priceValues={priceValues}
                setPriceValues={setPriceValues}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                featureValues={featureValues}
                setFeatureValues={setFeatureValues}
            />
        </div>
    );
}
