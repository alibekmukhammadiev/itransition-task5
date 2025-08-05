import React from "react";

const Book = ({ index, book, onClick }) => {
  const { isbn, title, authors, publisher } = book;

  return (
    <tr style={{ cursor: "pointer" }} onClick={onClick}>
      <td>{index + 1}</td>
      <td>{isbn}</td>
      <td>{title}</td>
      <td>{authors.join(", ")}</td>
      <td>{publisher}</td>
    </tr>
  );
};

export default Book;


