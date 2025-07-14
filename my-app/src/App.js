import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";


const Home = React.lazy(() => import("./assets/pages/Home"));
const Register = React.lazy(() => import("./assets/pages/Register"));
const Login = React.lazy(() => import("./assets/pages/Login"));
const ProtectedRoute = React.lazy(() => import("./assets/components/ProtectedRoute"));
const NotFound = React.lazy(() => import("./assets/pages/NotFound"));
const Candles = React.lazy(() => import("./assets/pages/Candles"));
const PlasterProducts = React.lazy(() => import("./assets/pages/PlasterProducts"));
const Articles = React.lazy(() => import("./assets/pages/Articles"));
const CartPage = React.lazy(() => import("./assets/pages/CartPage"));


function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Candles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:slug" element={<PlasterProducts />} />
        <Route path="/articles" element={<Articles />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />



      </Routes>
    </Suspense>


  );
}

export default App;
