import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { filterByCategory, filterByParams, getProducts, setRequestParams } from "../../store/productSlice";
import { getCategories, setCategoryId, setCategoryName } from "../../store/categorySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "../../styles/category.scss";
import "../../styles/sidebar.scss";
import { Product } from "../../common/types";
import Toast from "./ToastComponent";
import Sidebar from "./Sidebar";
import Pagination from "../pagination/Pagination";
import List from "../List";
import CategoryPageItem from "./CategoryPageItem";
import { setCurrentPage } from "../../store/generalSlice";
import { setPriceValues, setRangeValues, setFilterFeatures, setSearchFilter } from "../../store/filterSlice";
import { itemsPerPage } from "../../common/constants";

export default function CategoryPage() {
    const { filteredByCategory, filteredByParams, maxPrice, requestParams } = useAppSelector((state) => state.products);
    const { currentPage, isShown } = useAppSelector((state) => state.general);
    const { categoryName, categoryList } = useAppSelector((state) => state.categories);
    const { priceValues, featureValues, filterFeatures, searchFilter } = useAppSelector((state) => state.filter);

    let params = useParams();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [list, setList] = useState<Product[] | null>([]);

    const totalPages = list === null ? 1 : Math.ceil(list.length / itemsPerPage);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, []);

    function setCategoryData() {
        const catId = params.categoryId ? +params.categoryId : -1;
        dispatch(setCategoryId(catId));
        const category = categoryList.find((cat) => cat.id === catId);
        dispatch(setCategoryName(category?.name ?? ""));
    }

    useEffect(() => {
        const categoryId = params.categoryId ? +params.categoryId : -1;
        const page = searchParams.get("page");
        if (!page) {
            //заменяем запись в истории браузера
            window.history.replaceState({}, "", `/category/${categoryId}?page=1`);
        }
    }, []);

    useEffect(() => {
        const page = searchParams.get("page");
        if (page) {
            dispatch(setCurrentPage(Number(page)));
        } else {
            dispatch(setCurrentPage(1));
        }
        setCategoryData();
    }, [searchParams, params.categoryId]);

    useEffect(() => {
        setCategoryData();
    }, [params.categoryId]);

    useEffect(() => {
        const filtered = (filteredByParams ?? []).length > 0 ? filteredByParams : null;
        setList(filtered === null ? filteredByCategory : filtered);
    }, [params.categoryId, currentPage, filteredByParams]);

    useEffect(() => {
        if (filteredByCategory.length > 0) {
            const filterObj = Object.fromEntries(Object.entries(filteredByCategory[0].features).map(([key]) => [key.toLowerCase(), true]));
            dispatch(setFilterFeatures(filterObj));
        }
    }, [filteredByCategory]);

    useEffect(() => {
        if (filterFeatures) {
            dispatch(setSearchFilter({ ...searchFilter, ...filterFeatures }));
        }
    }, [filterFeatures]);

    useEffect(() => {
        if (filteredByCategory.length > 0 && requestParams.max > 0) {
            dispatch(filterByParams(requestParams));
        }
    }, [dispatch, requestParams, maxPrice]);

    useEffect(() => {
        dispatch(
            setRequestParams({
                features: requestParams.features,
                min: priceValues[0],
                max: priceValues[1],
            })
        );
    }, [priceValues]);

    useEffect(() => {
        dispatch(setRequestParams({ min: requestParams.min, max: requestParams.max, features: { ...featureValues } }));
    }, [featureValues]);

    useEffect(() => {
        dispatch(setPriceValues([0, maxPrice]));
        dispatch(setRangeValues([0, maxPrice]));
        dispatch(setRequestParams({ features: requestParams.features, min: requestParams.min, max: maxPrice }));
    }, [maxPrice]);

    useEffect(() => {
        dispatch(setRangeValues(priceValues));
    }, [priceValues]);

    useEffect(() => {
        dispatch(filterByCategory(params.categoryId ?? ""));
    }, [dispatch, params.categoryId]);

    function paginate(arr: Product[]) {
        if (arr.length <= itemsPerPage) {
            return arr;
        } else {
            const endIndex = currentPage * itemsPerPage;
            const startIndex = endIndex - itemsPerPage;
            return arr.slice(startIndex, endIndex);
        }
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
                        <List items={paginate(list)} renderItem={(product: Product) => <CategoryPageItem product={product} />} className="category" />

                        <Pagination totalPages={totalPages} />
                    </>
                )}
                {isShown && <Toast />}
            </div>

            <Sidebar />
        </div>
    );
}
