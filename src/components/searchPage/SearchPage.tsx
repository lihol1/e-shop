import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { arrangeByCategories } from "../../store/productSlice";
import "../../styles/search.scss";
import SearchItem from "./SearchItem";

export default function SearchPage() {
    const dispatch = useAppDispatch();
    const { searchList, foundProducts } = useAppSelector((state) => state.products);
    const { categoryList } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(arrangeByCategories());
    }, [foundProducts]);

    return (
        <div className="page__search search">
            <ul className="search__list-main">
                {searchList.length > 0 ? (
                    <>
                        {searchList.map((arr, i) => {
                            const targetCategory = categoryList?.find((cat) => cat.id === arr[0].categoryId);
                            const categoryName = targetCategory?.name ?? "";
                            return <SearchItem categoryName={categoryName} arr={arr} key={i} />;
                        })}
                    </>
                ) : (
                    <>По вашему запросу ничего не найдено</>
                )}
            </ul>
        </div>
    );
}
