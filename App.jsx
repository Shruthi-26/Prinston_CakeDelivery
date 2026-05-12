import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomCake from "./pages/CustomCake";
import SellerDashboard from "./pages/SellerDashboard";
import OrderHistory from "./pages/OrderHistory";
import TrackOrder from "./pages/TrackOrder";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUser, logoutUser } from "./utils/auth";

function App() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h2>CakeHub</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/custom-cake">Customize Cake</Link>
          <Link to="/seller">Seller</Link>
          {user && <Link to="/orders">My Orders</Link>}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/custom-cake"
          element={
            <ProtectedRoute>
              <CustomCake />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <TrackOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
