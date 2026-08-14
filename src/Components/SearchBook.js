function SearchBook({
  searchTerm,
  setSearchTerm,
  resultCount
}) {

  return (

    <section className="search-card">

      <div>

        <h3>
          Search Library
        </h3>

        <p>
          Search by ID, title,
          author, category or employee.
        </p>

      </div>

      <div className="search-control">

        <span>
          🔍
        </span>

        <input
          type="search"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        {searchTerm && (

          <button
            onClick={() =>
              setSearchTerm("")
            }
          >
            Clear
          </button>

        )}

      </div>

      <strong>
        {resultCount} result
        {resultCount !== 1
          ? "s"
          : ""}
      </strong>

    </section>
  );
}

export default SearchBook;
