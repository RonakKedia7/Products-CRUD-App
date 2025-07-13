import { useState } from "react";
import { useProductStore } from "../store/product.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
    navigate("/");

    if (success) {
      toast.success(message, {
        style: {
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          border: "1px solid #14b8a6",
          borderRadius: "16px",
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#14b8a6",
          secondary: "#ffffff",
        },
      });
    } else {
      toast.error(message, {
        style: {
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          border: "1px solid #ef4444",
          borderRadius: "16px",
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="py-10 mt-24 px-8 sm:px-16 md:px-32 lg:px-40">
      <div className="text-white max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase mb-10 text-center">
          Create New Product
        </h1>
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-base font-semibold text-teal-300 mb-3"
            >
              Product Name
            </label>
            <input
              id="name"
              autoComplete="off"
              className="w-full bg-slate-800 text-white rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-base font-semibold text-teal-300 mb-3"
            >
              Price ($)
            </label>
            <input
              id="price"
              className="w-full bg-slate-800 text-white rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
              type="number"
              placeholder="Enter price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-base font-semibold text-teal-300 mb-3"
            >
              Image URL
            </label>
            <input
              id="image"
              className="w-full bg-slate-800 text-white rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
              type="text"
              placeholder="Enter image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleAddProduct}
              className="bg-teal-600 text-white font-semibold text-lg px-6 py-3 rounded-xl hover:bg-teal-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;