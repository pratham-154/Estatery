"use client"
import { Provider } from "react-redux";
import ClientThemeProvider from "../components/ClientThemeProvider";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { store, persistor } from "./../../providers/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

export default function layout({ children }) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ClientThemeProvider>
                        <Navbar /> 
                        <ToastContainer autoClose={1000} hideProgressBar={true} limit={1}/>
                        {children}
                        <Footer/>
                    </ClientThemeProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
