import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CreateTheme from "@material-ui/core/styles/createMuiTheme";

import jwtDecode from "jwt-decode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import Navbar from "./components/navbar";

import customTheme from "./utils/theme";
import AuthRoute from "./utils/authRoute";

//Context
import { GetScreamProvider } from "./context/getScreams";

const theme = CreateTheme(customTheme);

let authenticated;

const token = localStorage.FireToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
    localStorage.clear();
  } else {
    authenticated = true;
  }
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <GetScreamProvider>
            <div className="container">
              <Switch>
                <AuthRoute exact path="/" component={Home}></AuthRoute>
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                ></AuthRoute>
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                  authenticated={authenticated}
                ></AuthRoute>
              </Switch>
            </div>
          </GetScreamProvider>
        </Router>
        <ToastContainer></ToastContainer>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
