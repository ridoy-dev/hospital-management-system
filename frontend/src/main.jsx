import ReactDOM from "react-dom/client";
import { AppContextProvider } from "./Context/AppContext.jsx";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
  <AppContextProvider>
      <App />
  </AppContextProvider>
</BrowserRouter>
);