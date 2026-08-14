import { useState } from "react";
import "../CSS/AddBook.css";

const initialForm = {

  id: "",

  title: "",

  author: "",

  category: "",

  quantity: ""

};

function AddBook({
  books,
  setBooks
}) {

  const [form, setForm] =
    useState(initialForm);

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {

    setForm((current) => ({

      ...current,

      [e.target.name]:
        e.target.value

    }));

    setMessage("");

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const id =
      form.id
        .trim()
        .toUpperCase();

    const quantity =
      Number(form.quantity);

    if (
      !id ||
      !form.title.trim() ||
      !form.author.trim() ||
      !form.category ||
      quantity < 1
    ) {

      setMessage(
        "Please fill all fields with valid values."
      );

      return;
    }

    if (
      books.some(
        (book) =>
          book.id.toLowerCase() ===
          id.toLowerCase()
      )
    ) {

      setMessage(
        "Book ID already exists."
      );

      return;
    }

    const newBook = {

      id,

      title: form.title.trim(),

      author: form.author.trim(),

      category: form.category,

      quantity,

      available: quantity,

      status: "Available",

      issuedTo: "",

      issueDate: ""

    };

    setBooks((current) => [

      ...current,

      newBook

    ]);

    setForm(initialForm);

    setMessage(
      "Book added successfully."
    );

  };

  return (

    <section className="form-card">

      <div className="section-header">

        <div>

          <h2>
            Register a New Book
          </h2>

          <p>
            Add book information to
            the company library.
          </p>

        </div>

      </div>

      <form
        className="book-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Book ID *
          </label>

          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Example: B104"
          />

        </div>

        <div className="form-group">

          <label>
            Book Title *
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: JavaScript Guide"
          />

        </div>

        <div className="form-group">

          <label>
            Author *
          </label>

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author name"
          />

        </div>

        <div className="form-group">

          <label>
            Category *
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >

            <option value="">
              Select category
            </option>

            <option>
              Programming
            </option>

            <option>
              Frontend
            </option>

            <option>
              Backend
            </option>

            <option>
              Database
            </option>

            <option>
              Cloud
            </option>

            <option>
              Testing
            </option>

            <option>
              Soft Skills
            </option>

            <option>
              Other
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>
            Quantity *
          </label>

          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {

              setForm(initialForm);

              setMessage("");

            }}
          >
            Clear
          </button>

          <button
            type="submit"
            className="primary-btn"
          >
            Add Book
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
export default AddBook;