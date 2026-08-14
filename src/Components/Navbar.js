import "../CSS/Navbar.css";

function Navbar({
  userName,
  onLogout,
  onMenuClick
}) {

  return (

    <header className="navbar">

      <div className="navbar-left">

        <button
          className="mobile-menu"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <div>

          <h2>
            Employee Library
          </h2>

          <span>
            Management System
          </span>

        </div>

      </div>

      <div className="navbar-right">

        <div className="profile">

          <div className="avatar">
            
          </div>

          <div>

            <strong>
              {userName || "Admin"}
            </strong>

            <small>
               Librarian
            </small>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;

