import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("libraryLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem(
      "libraryLoggedIn",
      String(isLoggedIn)
    );
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Dashboard setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;