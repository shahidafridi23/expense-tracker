import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryDetail from "./pages/CategoryDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category/:category" element={<CategoryDetail />} />
    </Routes>
  );
}

export default App;
