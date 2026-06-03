import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    purchaseDate: "",
    expiryDate: "",
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
      const token = localStorage.getItem("token");

      await API.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully");
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="container mt-5"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
          <h2 className="mb-4 text-center" style={{ color: "#0F766E" }}>
            Add Product
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                className="form-control"
                value={formData.productName}
                onChange={handleChange}
              />

              <div className="mb-3">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                />

                <div className="mb-3">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
                  />

                  <div className="mb-3">
                    <label>Purchase Date</label>
                    <input
                      type="date"
                      name="purchaseDate"
                      className="form-control"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      name="expiryDate"
                      className="form-control"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn text-white w-100"
                    style={{ backgroundColor: "#0F766E" }}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
