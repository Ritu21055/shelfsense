import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    purchaseDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          productName: res.data.productName,
          category: res.data.category,
          quantity: res.data.quantity,
          purchaseDate: res.data.purchaseDate.split("T")[0],
          expiryDate: res.data.expiryDate.split("T")[0],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

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

      await API.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Updated Successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
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
          <h2 className="text-center mb-4" style={{ color: "#0F766E" }}>
            Edit Product
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>

              <input
                type="text"
                name="productName"
                className="form-control"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>

              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>

              <input
                type="number"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Purchase Date</label>

              <input
                type="date"
                name="purchaseDate"
                className="form-control"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Expiry Date</label>

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
              style={{
                backgroundColor: "#0F766E",
              }}
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProduct;
