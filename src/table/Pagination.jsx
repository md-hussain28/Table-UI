import React from "react";

const PaginationButton = ({ type, onClick, disabled }) => {
  const buttonStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    fontSize: "18px",
    font: "Roboto",
    color: "#333",
  };

  const circleStyles = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "3px solid #333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button style={buttonStyles} onClick={onClick} disabled={disabled}>
      {type === "prev" ? (
        <>
          <div style={circleStyles} />
          <span>Prev</span>
        </>
      ) : (
        <>
          <span>Next</span>
          <div style={circleStyles} />
        </>
      )}
    </button>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Current page and adjacent
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            style={{
              padding: "8px 12px",
              margin: "0 4px",
              border: "none",
              background: currentPage === i ? "#1976D2" : "transparent",
              color: currentPage === i ? "white" : "#333",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} style={{ margin: "0 4px" }}>
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderTop: "1px solid #E0E0E0",
      }}
    >
      <PaginationButton
        type="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        {renderPageNumbers()}
      </div>

      <PaginationButton
        type="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
