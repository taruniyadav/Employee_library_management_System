import EditBook from "./EditBook";
import "../CSS/BookList.css";

function BookList({
  books,
  setBooks
}) {

  const deleteBook = (id) => {

    const book =
      books.find(
        (item) =>
          item.id === id
      );

    if (
      book &&
      book.available !==
        book.quantity
    ) {

      alert(
        "Return all issued copies before deleting this book."
      );

      return;
    }

    if (
      !window.confirm(
        `Delete "${book.title}"?`
      )
    ) {
      return;
    }

    setBooks((current) =>
      current.filter(
        (item) =>
          item.id !== id
      )
    );

  };

  return (

    <section className="table-card">

      <div className="section-header">

        <div>

          <h2>
            Library Books
          </h2>

          <p>
            Manage, update and remove
            library records.
          </p>

        </div>

        <span className="record-count">
          {books.length} records
        </span>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                Book ID
              </th>

              <th>
                Book Details
              </th>

              <th>
                Category
              </th>

              <th>
                Total
              </th>

              <th>
                Available
              </th>

              <th>
                Status
              </th>

              <th>
                Issued To
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {books.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="empty-row"
                >
                  No books found.
                </td>

              </tr>

            ) : (

              books.map((book) => (

                <tr key={book.id}>

                  <td>
                    <strong>
                      {book.id}
                    </strong>
                  </td>

                  <td>

                    <div className="book-info">

                      <strong>
                        {book.title}
                      </strong>

                      <span>
                        {book.author}
                      </span>

                    </div>

                  </td>

                  <td>
                    {book.category}
                  </td>

                  <td>
                    {book.quantity}
                  </td>

                  <td>
                    {book.available}
                  </td>

                  <td>

                    <span
                      className={`status ${
                        book.available > 0
                          ? "available"
                          : "unavailable"
                      }`}
                    >
                      {book.available > 0
                        ? "Available"
                        : "Issued"}
                    </span>

                  </td>

                  <td>
                    {book.issuedTo || "—"}
                  </td>

                  <td>

                    <div className="action-buttons">

                      <EditBook
                        book={book}
                        books={books}
                        setBooks={setBooks}
                      />

                      <button
                        className="danger-btn"
                        onClick={() =>
                          deleteBook(
                            book.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default BookList;
