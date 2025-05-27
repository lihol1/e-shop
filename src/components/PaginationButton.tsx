type PaginationButtonProps = {
    page: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
};

export default function PaginationButton({ page, currentPage, handlePageChange }: PaginationButtonProps) {
    return (
        <button className={`pagination__button ${page === currentPage ? "active" : ""}`} key={page} disabled={page === currentPage} onClick={() => handlePageChange(page)}>
            {page}
        </button>
    );
}
