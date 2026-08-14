import { useEffect, useMemo, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddBook from "./Addbook";
import BookList from "./BookList";
import SearchBook from "./SearchBook";
import IssueBook from "./IssueBook";
import ReturnBook from "./ReturnBook";
import Statistics from "./Statistics";
import Footer from "./Footer";

import "../CSS/Dashboard.css";

const defaultBooks = [
  {
    id: "B101",
    title: "Java Programming",
    author: "James Gosling",
    category: "Programming",
    quantity: 5,
    available: 5,
    status: "Available",
    issuedTo: "",
    issuedDate: "",
  },
  {
    id: "B102",
    title: "Python Programming",
    author: "Ava jamson",
    category: "Programming",
    quantity: 5,
    available: 5,
    status: "Available",
    issuedTo: "",
    issuedDate: "",
  },
  {
    id: "B103",
    title: "React ",
    author: "John abrahim",
    category: "Programming",
    quantity: 5,
    available: 5,
    status: "Available",
    issuedTo: "",
    issuedDate: "",
  },
];

function Dashboard({ setIsLoggedIn }) {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("libraryBooks");
      return saved ? JSON.parse(saved) : defaultBooks;
    } catch {
      return defaultBooks;
    }
  });
  const [activePage, setActivePage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  }, [books]);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return books;
    }
    return books.filter((book) =>
      [book.id, book.title, book.author, book.category, book.issuedTo]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [books, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("libraryLoggedIn");
    localStorage.removeItem("libraryUser");

    setIsLoggedIn(false);
  };
  const renderPage = () => {
    switch (activePage) {
      case "add":
        return <AddBook books={books} setBooks={setBooks} />;

      case "books":
        return (
          <>
            <SearchBook
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resultCount={filteredBooks.length}
            />

            <BookList books={filteredBooks} setBooks={setBooks} />
          </>
        );

      case "issue":
        return <IssueBook books={books} setBooks={setBooks} />;

      case "return":
        return <ReturnBook books={books} setBooks={setBooks} />;


      default:
        return (
          <>
            <Statistics books={books} />

            <SearchBook
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resultCount={filteredBooks.length}
            />

            <BookList books={filteredBooks} setBooks={setBooks} />
          </>
        );
    }
  };

  const pageTitle = {
    Dashboard: "Dashboard",

    add: "Add New Book",

    books: "Booklist",

    issue: "Issue Book",

    return: "Return Book",

    Statistics: "Library Statistics",
  }[activePage];

  return (
    <div className="app-shell">
      <Navbar
        userName={localStorage.getItem("libraryUser") || "Admin"}
        onLogout={handleLogout}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="layout">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        ;
        <main className="dashboard-content">
          <div className="page-heading">
            <div>
              <p className="breakcrumb">Library / {pageTitle}</p>
              <h1>{pageTitle}</h1>
            </div>
            <button
              className="primary-btn"
              onClick={() => setActivePage("add")}
            >
              + Add Book
            </button>
          </div>
          {renderPage()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
export default Dashboard;
