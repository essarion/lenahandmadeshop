import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import OrderForm from "./assets/pages/OrderForm";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import NotFound from "./assets/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/order" element={<OrderForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />


    </Routes>

  );
}

export default App;
