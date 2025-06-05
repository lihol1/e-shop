import { useAppSelector } from "../../hooks/hooks";
import { memo } from "react";

type PaginationButtonProps = {
    page: number;
    handlePageChange: (page: number) => void;
};

export default memo(function PaginationButton({ page, handlePageChange }: PaginationButtonProps) {
    const { currentPage } = useAppSelector(state=>state.general)
    return (
        <button className={`pagination__button ${page === currentPage ? "active" : ""}`} key={page} disabled={page === currentPage} onClick={() => handlePageChange(page)}>
            {page}
        </button>
    );
})
