import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppM from "./AppM.jsx";
import ProductProvider from "./components/ProductContext";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import CartProvider from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
// import MobilAd from './components/mobileAd';

const client = new ApolloClient({
  link: new HttpLink({
    //uri: "https://financierab-production.up.railway.app/graphql",
    uri: "http://localhost:8000/graphql",
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
          <ApolloProvider client={client}>
            <App />
            <AppM />
          </ApolloProvider>
        </React.StrictMode>
      </ProductProvider>
    </CartProvider>
  </AuthProvider>
);

//--515
