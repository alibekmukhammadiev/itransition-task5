import React, { useState } from "react";
import Book from "./Book";

const BookTable = ({ books }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleRow = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No books to display.
              </td>
            </tr>
          ) : (
            books.map((book, idx) => (
              <React.Fragment key={idx}>
                <Book
                  index={idx}
                  book={book}
                  isExpanded={expandedIndex === idx}
                  onClick={() => toggleRow(idx)}
                />

                {expandedIndex === idx && (
                  <tr>
                    <td colSpan="5">
                      <div className="p-3 bg-light border rounded">
                        <h5>{book.title}</h5>
                        <p>
                          <strong>Author(s):</strong> {book.authors.join(", ")}
                        </p>
                        <p>
                          <strong>Publisher:</strong> {book.publisher}
                        </p>
                        <p>
                          <strong>Reviews:</strong>
                        </p>
                        <ul className="list-group mb-2">
                          {book.reviews.map((r, i) => (
                            <li key={i} className="list-group-item">
                              <p className="mb-1">"{r.text}"</p>
                              <small className="text-muted">– {r.user}</small>
                            </li>
                          ))}
                        </ul>
                        <p>
                          <strong>Likes:</strong> <span style={{color:"red",fontWeight:"bold"}}>{book.likes}</span>
                          
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
