import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#0F766E" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/dashboard">
          ShelfSense
        </Link>

        <div className="d-flex gap-3">
          <Link className="text-white text-decoration-none" to="/dashboard">
            Dashboard
          </Link>

          <Link className="text-white text-decoration-none" to="/products">
            Products
          </Link>

          <Link className="text-white text-decoration-none" to="/add-product">
            Add Product
          </Link>

          <button onClick={handleLogout} className="btn btn-sm btn-light">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
