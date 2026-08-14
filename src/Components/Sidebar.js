
import "../CSS/Sidebar.css";

const menuItems = [

  ["dashboard", "🏠", "Dashboard"],

  ["add", "➕", "Add Book"],

  ["books", "📚", "Book List"],

  ["issue", "📤", "Issue Book"],

  ["return", "📥", "Return Book"],

  ["statistics", "📊", "Statistics"]

];

function Sidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose
}) {

  return (

    <aside
      className={`sidebar ${
        isOpen
          ? "sidebar-open"
          : ""
      }`}
    >

      <div className="sidebar-title">

        <span>
          LIBRARY MENU
        </span>

        <button
          className="sidebar-close"
          onClick={onClose}
        >
          ×
        </button>

      </div>

      <nav>

        {menuItems.map(
          ([id, icon, label]) => (

            <button
              key={id}
              className={`sidebar-item ${
                activePage === id
                  ? "active"
                  : ""
              }`}
              onClick={() => {

                onNavigate(id);

                onClose();

              }}
            >

              <span>
                {icon}
              </span>

              {label}

            </button>

          )
        )}

      </nav>

    </aside>
  );
}

export default Sidebar;
