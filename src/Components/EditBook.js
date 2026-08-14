import {
  useEffect,
  useState
} from "react";

function EditBook({
  book,
  books,
  setBooks
}) {

  const [editing, setEditing] =
    useState(false);

  const [form, setForm] =
    useState(book);

  useEffect(() => {

    setForm(book);

  }, [book]);

  const handleChange = (e) => {

    setForm((current) => ({

      ...current,

      [e.target.name]:
        e.target.value

    }));

  };

  const saveChanges = () => {

    const quantity =
      Number(form.quantity);

    if (
      !form.title.trim() ||
      !form.author.trim() ||
      quantity < 1
    ) {

      alert(
        "Enter valid book details."
      );

      return;
    }

    const issuedCopies =
      book.quantity -
      book.available;

    if (
      quantity <
      issuedCopies
    ) {

      alert(
        `Quantity cannot be less than issued copies (${issuedCopies}).`
      );

      return;
    }

    const updatedBook = {

      ...form,

      title:
        form.title.trim(),

      author:
        form.author.trim(),

      quantity,

      available:
        quantity -
        issuedCopies

    };

    setBooks(

      books.map(
        (item) =>
          item.id === book.id
            ? updatedBook
            : item
      )

    );

    setEditing(false);

  };

  if (!editing) {

    return (

      <button
        className="edit-btn"
        onClick={() =>
          setEditing(true)
        }
      >
        Edit
      </button>

    );

  }

  return (

    <div className="edit-panel">

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
      />

      <input
        name="quantity"
        type="number"
        min="1"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />

      <div>

        <button
          className="save-btn"
          onClick={saveChanges}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            setEditing(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default EditBook;
