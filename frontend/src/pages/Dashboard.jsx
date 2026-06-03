import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    safe: 0,
    expiringSoon: 0,
    urgent: 0,
    expired: 0,
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/products/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const alertProducts = res.data.filter(
          (product) =>
            product.status === "Urgent" || product.status === "Expired",
        );
        setAlerts(alertProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
    fetchAlerts();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container mt-5"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <h1 className="mb-4" style={{ color: "#0F766E" }}>
          Dashboard
        </h1>

        {alerts.length > 0 && (
          <div className="mb-4">
            {alerts.map((product) => (
              <div
                key={product._id}
                className={
                  product.status === "Expired"
                    ? "alert alert-danger alert-dismissible fade show"
                    : "alert alert-warning alert-dismissible fade show"
                }
              >
                {product.status === "Expired"
                  ? `❌ ${product.productName} has expired`
                  : `⚠️ ${product.productName} expires in ${product.daysLeft} day(s)`}

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setAlerts(alerts.filter((item) => item._id !== product._id))
                  }
                ></button>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <button
            className="btn btn-success me-2"
            onClick={() => navigate("/add-product")}
          >
            + Add Product
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            View Products
          </button>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Total Products</h5>
              <h2>{stats.totalProducts}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Safe 🟢</h5>
              <h2>{stats.safe}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Expiring Soon 🟡</h5>
              <h2>{stats.expiringSoon}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Urgent 🟠</h5>
              <h2>{stats.urgent}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Expired 🔴</h5>
              <h2>{stats.expired}</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
