import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#F8FAFC" }}
    >
      <div
        className="card shadow border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "15px",
        }}
      >
        <div className="text-center mb-4">
          <h1 style={{ color: "#0F766E", fontWeight: "bold" }}>ShelfSense</h1>

          <p className="text-muted"> Track Expiry. Reduce Waste.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn w-100 text-white"
              style={{ backgroundColor: "#0F766E" }}
            >
              Login
            </button>
          </form>

          <p className="text-center mb-3">
            New User?{" "}
            <Link
              to="/register"
              style={{
                color: "#10B981",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
