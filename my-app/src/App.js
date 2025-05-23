import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import OrderForm from "./assets/pages/OrderForm";
import ProtectedRoute from "./assets/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <ProtectedRoute>
        <Route path="/order" element={<OrderForm />} />
      </ProtectedRoute>


    </Routes>

  );
}

export default App;
