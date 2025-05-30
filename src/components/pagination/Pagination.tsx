import { useSearchParams } from "react-router";
import List from "../List";
import PaginationButton from "./PaginationButton";
import { useAppDispatch } from "../../hooks/hooks";
import { setCurrentPage } from "../../store/generalSlice";

type PaginationProps = {
    totalPages: number;   
}

function Pagination({ totalPages }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);    
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage))    
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div className="category__pagination pagination">
            <List items={pages} renderItem={(page) => <PaginationButton page={page} handlePageChange={handlePageChange} />} className="pagination" />
        </div>
    );
}
export default Pagination;
