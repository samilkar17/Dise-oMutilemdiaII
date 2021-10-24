import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  loginSuccess,
  logoutSuccess,
} from "../../Puertos/feactures/user/userSlice";
import { auth } from "../../Puertos/firebase/config";
import IniciarSesion from "../../Adaptadores/paginas/IniciarSesion";
import Planificador from "../../Adaptadores/paginas/Planificador";
import Registrar from "../../Adaptadores/paginas/Registrar";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Menuprincipal from "../../Adaptadores/paginas/MenuPrincipal";
import Avatar from "../../Adaptadores/paginas/Avatar";
import Historia from "../../Adaptadores/paginas/Historia";
import Calendario from "../../Adaptadores/paginas/Calendario";
import Presentacion from "../../Adaptadores/paginas/Presentacion";
import Logro from "../../Adaptadores/paginas/Logro";
import OrdenarCuarto from "../../Adaptadores/paginas/Ordenarcuarto";
import CuartoOrdenado from "../../Adaptadores/paginas/CuartoOrdenado";
import Logro2 from "../../Adaptadores/paginas/Logro2";
import Respiracion from "../../Adaptadores/paginas/Respiracion";

function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          loginSuccess({
            email: userAuth.email,
            user: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
        console.log(userAuth)
      } else {
        dispatch(logoutSuccess());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={IniciarSesion} />
        <PublicRoute exact path="/registrar" component={Registrar} />
        <PrivateRoute exact path="/avatar" component={Avatar} />
        <PrivateRoute exact path="/respiracion" component={Respiracion} />
        <PrivateRoute exact path="/historia" component={Historia} />
        <PrivateRoute exact path="/menu" component={Menuprincipal} />
        <PrivateRoute exact path="/planificador" component={Planificador} />
        <PrivateRoute exact path="/calendario" component={Calendario} />
        <PrivateRoute exact path="/presentacion" component={Presentacion} />
        <PrivateRoute exact path="/logro" component={Logro} />
        <PrivateRoute exact path="/ordenarcuarto" component={OrdenarCuarto} />
        <PrivateRoute exact path="/cuartoOrdenado" component={CuartoOrdenado} />
        <PrivateRoute exact path="/logro2" component={Logro2} />
      </Switch>
    </Router>
  );
}

export default Routes;
