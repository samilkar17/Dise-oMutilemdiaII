import React from "react";
import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import {store} from './Dominio/app/store'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
}