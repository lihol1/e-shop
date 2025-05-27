import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router";
import List from "./List";
import PaginationButton from "./PaginationButton";

interface IPaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

function Pagination({ totalPages, currentPage, setCurrentPage }: IPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div className="category__pagination pagination">
            <List items={pages} renderItem={(page) => <PaginationButton page={page} currentPage={currentPage} handlePageChange={handlePageChange} />} className="pagination" />
        </div>
    );
}
export default Pagination;
