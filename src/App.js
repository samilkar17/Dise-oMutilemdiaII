import React from "react";
import Routes from "./Dominio/routes/Routes";
import { Provider } from "react-redux";
import {store} from './Dominio/app/store'

export default function App() {
  return (
    <>
    <div className="App">
      <Provider store={store}>
        <Routes />
      
      </Provider>
    </div>
    </>
  );
}
