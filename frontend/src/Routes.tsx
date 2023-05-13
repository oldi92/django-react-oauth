import { Suspense } from "react";

// components
import {
  BrowserRouter as Router,
  Route,
  Routes as BrowseRoutes,
} from "react-router-dom";
import { Dashboard, Login } from "./components";

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowseRoutes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </BrowseRoutes>
      </Suspense>
    </Router>
  );
};

export default Routes;
