import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthenticationProvider } from "./hooks";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

root.render(
  <ThemeProvider theme={darkTheme}>
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
