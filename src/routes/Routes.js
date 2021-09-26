import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { loginSuccess, logoutSuccess } from "../feactures/user/userSlice";
import { auth } from "../firebase/config";
import IniciarSesion from "../paginas/IniciarSesion";
import Planificador from "../paginas/Planificador";
import Principal from "../paginas/Principal";
import Registrar from "../paginas/Registrar";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) { 
        dispatch(
          loginSuccess({
            email: userAuth.email,
            user: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logoutSuccess());
      }
    });
  });
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={IniciarSesion} />
        <PublicRoute path="/registrar" component={Registrar} />
        <PrivateRoute exact path="/principal" component={Principal} />
        <PrivateRoute exact path="/planificador" component={Planificador} />
      </Switch>
    </Router>
  );
}

export default Routes;
