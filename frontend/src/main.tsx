import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.tsx";
import LoginPage from "./Components/LoginPage/LoginPage.tsx";
import ProtectedRoute from "@/Components/ProtectedRoute/ProtectedRoute.tsx";
import Register from "@/Components/Register/Register.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import type { } from "@mui/x-data-grid/themeAugmentation";
import Logout from "./Components/Logout/Logout.tsx";
import Landing from "./Components/Landing/Landing.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#e1f1f5",
      main: "#247fca",
    },
    error: {
      main: "#D48181",
    },
    success: {
      light: "#81c784",
      main: "#66bb6a",
      dark: "#388e3c",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#e1f1f5",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1e5d81",
        },
        caption: {
          color: "#71a5b3",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFCF5",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#386b86",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFCF5",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#386b86",
          //border: "2px solid #71a5b3",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          outline: "none",
          border: "none",
        },
        notchedOutline: {
          borderColor: "#71a5b3",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "#386b86",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: "#1e5d81",
        },
        cell: {
          ":focus-within": {
            outline: "none",
          },
        },
        columnHeader: {
          ":focus-within": {
            outline: "none",
          },
          backgroundColor: "#D8E8EB",
        },
        columnHeaderTitle: {
          fontWeight: "bold",
        },
        row: {
          ":hover": {},
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  </Provider>,
);
