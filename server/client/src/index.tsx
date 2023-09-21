import axios, { AxiosStatic } from "axios";
import "materialize-css/dist/css/materialize.min.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./app/store";
import App from "./components/App";

declare global {
  interface Window {
    axios: AxiosStatic;
  }
}

window.axios = axios;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
