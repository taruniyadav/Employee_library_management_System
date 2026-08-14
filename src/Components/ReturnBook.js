import { useState } from "react";

function ReturnBook({
  books,
  setBooks
}) {

  const [bookId, setBookId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const issuedBooks =
    books.filter(
      (book) =>
        book.issuedTo
    );

  const selectedBook =
    books.find(
      (book) =>
        book.id === bookId
    );

  const handleReturn = (e) => {

    e.preventDefault();

    setMessage("");

    if (!bookId) {

      setMessage(
        "Please select a book."
      );

      return;
    }

    if (!selectedBook) {

      setMessage(
        "Book not found."
      );

      return;
    }

    if (!selectedBook.issuedTo) {

      setMessage(
        "This book currently has no issue record."
      );

      return;
    }

    setBooks((current) =>

      current.map((book) =>

        book.id === bookId

          ? {

              ...book,

              available:
                Math.min(
                  book.quantity,
                  book.available + 1
                ),

              status:
                "Available",

              issuedTo: "",

              employeeId: "",

              issuedDate: ""

            }

          : book

      )

    );

    setMessage(
      "Book returned successfully."
    );

    setBookId("");

  };

  return (

    <section
      className="form-card operation-card"
    >

      <h2>
        Return Book
      </h2>

      <p>
        Record the return of
        an issued book.
      </p>

      <form
        className="book-form"
        onSubmit={handleReturn}
      >

        <div className="form-group">

          <label>
            Issued Book *
          </label>

          <select
            value={bookId}
            onChange={(e) =>
              setBookId(
                e.target.value
              )
            }
          >

            <option value="">
              Select issued book
            </option>

            {issuedBooks.map(
              (book) => (

                <option
                  key={book.id}
                  value={book.id}
                >

                  {book.id} -
                  {book.title} -
                  {book.issuedTo}

                </option>

              )
            )}

          </select>

        </div>

        {selectedBook?.issuedTo && (

          <div className="return-details">

            <p>
              <strong>
                Employee:
              </strong>{" "}
              {selectedBook.issuedTo}
            </p>

            <p>
              <strong>
                Employee ID:
              </strong>{" "}
              {selectedBook.employeeId || "—"}
            </p>

            <p>
              <strong>
                Issue Date:
              </strong>{" "}
              {selectedBook.issueDate || "—"}
            </p>

          </div>

        )}

        <div className="form-actions">

          <button
            type="submit"
            className="primary-btn"
          >
            Return Book
          </button>

        </div>

      </form>

      {message && (

        <p
          className={
            message.includes(
              "successfully"
            )
              ? "success-message"
              : "error-message"
          }
        >
          {message}
        </p>

      )}

    </section>
  );
}

export default ReturnBook;
