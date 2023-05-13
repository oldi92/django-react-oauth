import { Suspense } from "react";

// components
import {
  BrowserRouter as Router,
  Route,
  Routes as BrowseRoutes,
} from "react-router-dom";
import { Events, Login } from "./components";

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowseRoutes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Events />} />
        </BrowseRoutes>
      </Suspense>
    </Router>
  );
};

export default Routes;
