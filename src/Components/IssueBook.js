import {
  useMemo,
  useState
} from "react";

function IssueBook({
  books,
  setBooks
}) {

  const [bookId, setBookId] =
    useState("");

  const [employeeName, setEmployeeName] =
    useState("");

  const [employeeId, setEmployeeId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const selectedBook =
    useMemo(
      () =>
        books.find(
          (book) =>
            book.id === bookId
        ),
      [books, bookId]
    );

  const handleSubmit = (e) => {

    e.preventDefault();

    setMessage("");

    if (
      !bookId ||
      !employeeName.trim() ||
      !employeeId.trim()
    ) {

      setMessage(
        "Please fill all fields."
      );

      return;
    }

    if (!selectedBook) {

      setMessage(
        "Book ID not found."
      );

      return;
    }

    if (
      selectedBook.available < 1
    ) {

      setMessage(
        "No available copy for this book."
      );

      return;
    }

    setBooks((current) =>

      current.map((book) =>

        book.id === bookId

          ? {

              ...book,

              available:
                book.available - 1,

              status:
                book.available - 1 > 0
                  ? "Available"
                  : "Issued",

              issuedTo:
                employeeName.trim(),

              employeeId:
                employeeId.trim(),

              issueDate:
                new Date()
                  .toLocaleDateString()

            }

          : book

      )

    );

    setMessage(
      "Book issued successfully."
    );

    setBookId("");

    setEmployeeName("");

    setEmployeeId("");

  };

  return (

    <section
      className="form-card operation-card"
    >

      <h2>
        Issue Book to Employee
      </h2>

      <p>
        Record a book issue against
        an employee.
      </p>

      <form
        className="book-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Book *
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
              Select book
            </option>

            {books.map((book) => (

              <option
                key={book.id}
                value={book.id}
              >

                {book.id} -
                {book.title}
                {" "}
                (
                {book.available}
                available)

              </option>

            ))}

          </select>

        </div>

        <div className="form-group">

          <label>
            Employee Name *
          </label>

          <input
            value={employeeName}
            onChange={(e) =>
              setEmployeeName(
                e.target.value
              )
            }
            placeholder="Employee full name"
          />

        </div>

        <div className="form-group">

          <label>
            Employee ID *
          </label>

          <input
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(
                e.target.value
              )
            }
            placeholder="Example: EMP101"
          />

        </div>

        <div className="form-actions">

          <button
            type="submit"
            className="primary-btn"
          >
            Issue Book
          </button>

        </div>

      </form>

      {selectedBook && (

        <div className="info-box">

          <strong>
            {selectedBook.title}
          </strong>

          <span>
            Available copies:
            {" "}
            {selectedBook.available}
          </span>

        </div>

      )}

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

export default IssueBook;
