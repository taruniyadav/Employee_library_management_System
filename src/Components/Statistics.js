import "../CSS/Statistics.css";

function Statistics({ books }) {

  const totalTitles =
    books.length;

  const totalCopies =
    books.reduce(
      (sum, book) =>
        sum + Number(book.quantity),
      0
    );

  const availableCopies =
    books.reduce(
      (sum, book) =>
        sum + Number(book.available),
      0
    );

  const issuedCopies =
    totalCopies -
    availableCopies;

  const stats = [

    {
      label: "Book Titles",
      value: totalTitles,
      icon: "📚",
      className: "blue"
    },

    {
      label: "Total Copies",
      value: totalCopies,
      icon: "📖",
      className: "purple"
    },

    {
      label: "Available",
      value: availableCopies,
      icon: "✅",
      className: "green"
    },

    {
      label: "Issued",
      value: issuedCopies,
      icon: "📤",
      className: "orange"
    }

  ];

  return (

    <section className="statistics-grid">

      {stats.map((item) => (

        <div
          className={`stat-card ${item.className}`}
          key={item.label}
        >

          <div className="stat-icon">
            {item.icon}
          </div>

          <div>

            <span>
              {item.label}
            </span>

            <strong>
              {item.value}
            </strong>

          </div>

        </div>

      ))}

    </section>
  );
}

export default Statistics;
