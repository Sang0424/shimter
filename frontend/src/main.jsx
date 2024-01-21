import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index.js";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
