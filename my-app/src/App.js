import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Register from "./assets/pages/Register";
import Login from "./assets/pages/Login";
import OrderForm from "./assets/pages/OrderForm";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import NotFound from "./assets/pages/NotFound";
import Candles from "./assets/pages/Candles";
import PlasterProducts from "./assets/pages/PlasterProducts"
import Articles from "./assets/pages/Articles";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/candles" element={<Candles />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/plasterproducts" element={<PlasterProducts />} />
      <Route path="/articles" element={<Articles />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/order" element={<OrderForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />


    </Routes>

  );
}

export default App;
