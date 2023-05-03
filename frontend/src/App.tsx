import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import Users from "./Users";
import Login from "./Login";

function App() {
  const [isAuthenticatedLoading, setIsAuthenticatedLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticatedLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
    setIsAuthenticatedLoading(false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticatedLoading && <CircularProgress />}

        {isAuthenticated ? (
          <Users />
        ) : (
          <Login
            onLoginSuccess={() => {
              setIsAuthenticated(true);
            }}
          />
        )}
      </header>
    </div>
  );
}

export default App;
