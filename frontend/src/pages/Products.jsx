import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="container mt-4"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <h1 className="mb-4" style={{ color: "#0F766E" }}>
          My Products
        </h1>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {products.length === 0 ? (
          <div className="text-center mt-5">
            <h3>No Products Found</h3>

            <p className="text-muted">
              Add your first product to start tracking expiry dates.
            </p>
          </div>
        ) : (
          <div className="row">
            {products
              .filter((product) =>
                product.productName
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div
                    className="card shadow-sm h-100 border-0"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body">
                      <h5>{product.productName}</h5>

                      <p>Category: {product.category}</p>

                      <p>Quantity: {product.quantity}</p>

                      <p>Days Left: {product.daysLeft}</p>

                      <p>
                        Status:{" "}
                        <span
                          style={{
                            backgroundColor:
                              product.status === "Safe"
                                ? "#10B981"
                                : product.status === "Expiring Soon"
                                  ? "#EAB308"
                                  : product.status === "Urgent"
                                    ? "#F97316"
                                    : "#EF4444",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "14px",
                          }}
                        >
                          {product.status}
                        </span>
                      </p>

                      <button
                        className="btn btn-warning me-2"
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?",
                            )
                          ) {
                            handleDelete(product._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Products;
