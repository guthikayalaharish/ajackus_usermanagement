import React from "react";

const Pagination = ({ totalUsers, usersPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];

  // Calculate the total number of pages
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1} // Disable if on the first page
      >
        &laquo; Prev
      </button>

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === pageNumbers.length} // Disable if on the last page
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
