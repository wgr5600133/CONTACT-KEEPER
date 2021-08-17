import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alert from "./components/layouts/Alert";
import setAuthToken from "./utils/SetAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <div className="App">
              <Navbar />
              <div className={"container"}>
                <Alert />
                <Switch>
                  <PrivateRoute
                    exact
                    path={"/"}
                    component={Home}
                    test={"test"}
                  />
                  <Route exact path={"/about"} component={About} />
                  <Route exact path={"/register"} component={Register} />
                  <Route exact path={"/login"} component={Login} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
