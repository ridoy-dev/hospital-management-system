import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">

      <button
        type="button"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => {
          const page = index + 1;

          return (
            <button
              type="button"
              key={page}
              onClick={() => goToPage(page)}
              className={
                currentPage === page
                  ? "active"
                  : ""
              }
            >
              {page}
            </button>
          );
        }
      )}

      <button
        type="button"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;