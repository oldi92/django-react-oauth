import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const CLIENT_ID =
  "481802958488-49fhrkir8j0jri6940p4gjjd081dcl85.apps.googleusercontent.com";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <GoogleOAuthProvider
        clientId={
          "481802958488-49fhrkir8j0jri6940p4gjjd081dcl85.apps.googleusercontent.com"
        }
      >
        <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
