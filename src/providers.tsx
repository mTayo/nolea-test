import { Provider as ReduxProvider } from "react-redux";
import React from "react";
import store from "redux-store";
import { ToastContainer } from "react-toastify";



const Providers = ({ children }: { children: JSX.Element }) => {
  return (
      <ReduxProvider store={store}>
          <ToastContainer theme="dark" />
          {children}
      </ReduxProvider>
  );
};

export default Providers;
