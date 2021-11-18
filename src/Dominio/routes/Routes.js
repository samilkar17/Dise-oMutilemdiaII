import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  loginSuccess,
  logoutSuccess,
} from "../../Puertos/feactures/user/userSlice";
import {
  setGender,
} from "../../Puertos/feactures/gender/genderSlices";
import { auth, db } from "../../Puertos/firebase/config";
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
import Puzzle from "../../Adaptadores/paginas/Puzzle";
import Consejos from "../../Adaptadores/paginas/Consejos";
import { readActivities } from "../../Puertos/feactures/activity/activitySlice";

function Routes() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection("user").doc(userAuth.uid).get().then((doc) => {
          console.log('unsuscribe routes');
          dispatch(setGender(doc.data().gender));
          dispatch(
            loginSuccess({
              email: userAuth.email,
              user: userAuth.uid,
              displayName: userAuth.displayName,
              data: doc.data(),
            })
          )
          dispatch(readActivities());
          setChecked(true);
        });
      } else {
        dispatch(logoutSuccess());
        setChecked(true);
      }
      return unsubscribe;
    });
  }, [dispatch]);

  if (!checked) return <div>Cargando...</div>

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={IniciarSesion} />
        <PublicRoute exact path="/registrar" component={Registrar} />
        <Route exact path="/puzzle" component={Puzzle} />
        <PrivateRoute exact path="/avatar/:edit?" component={Avatar} />
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
        <PrivateRoute exact path="/consejos" component={Consejos} />

      </Switch>
    </Router>
  );
}

export default Routes;
