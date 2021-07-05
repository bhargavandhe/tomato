import React from "react";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Explore from "./pages/Explore";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import AddData from "./pages/AddData";
import theme from "./theme";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={LandingPage} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/explore" component={Explore} />
              <PrivateRoute path="/favorites" component={Favorites} />
              <PrivateRoute path="/cart" component={Cart} />
              <PrivateRoute path="/orders" component={Orders} />
              {/* <Route path="/add" component={AddData} /> */}
              <Route path="" component={NotFound} />
            </Switch>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
