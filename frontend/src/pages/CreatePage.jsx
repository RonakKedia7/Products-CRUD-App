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
          fontWeight: "600",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
          fontWeight: "600",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-2xl opacity-20"></div>
            <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
              Create New Product
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Add a new product to your collection with detailed information
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur-xl opacity-10"></div>
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-8 sm:p-12">
            <div className="space-y-8">
              {/* Product Name */}
              <div className="space-y-3">
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  Product Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
                  <input
                    id="name"
                    autoComplete="off"
                    className="relative w-full bg-slate-800/80 backdrop-blur-sm text-white rounded-xl p-4 text-lg border border-gray-600/50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 placeholder-gray-400"
                    type="text"
                    placeholder="Enter a compelling product name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <label
                  htmlFor="price"
                  className="block text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  Price (USD)
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-4 text-gray-300 bg-slate-700/80 border border-r-0 border-gray-600/50 rounded-l-xl text-lg font-semibold">
                      $
                    </span>
                    <input
                      id="price"
                      className="flex-1 bg-slate-800/80 backdrop-blur-sm text-white rounded-r-xl p-4 text-lg border border-gray-600/50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 placeholder-gray-400"
                      type="number"
                      placeholder="0.00"
                      name="price"
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-3">
                <label
                  htmlFor="image"
                  className="block text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  Product Image URL
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
                  <input
                    id="image"
                    className="relative w-full bg-slate-800/80 backdrop-blur-sm text-white rounded-xl p-4 text-lg border border-gray-600/50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 placeholder-gray-400"
                    type="url"
                    placeholder="https://example.com/product-image.jpg"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Provide a high-quality image URL for the best presentation
                </p>
              </div>

              {/* Image Preview */}
              {newProduct.image && (
                <div className="space-y-3">
                  <label className="block text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Image Preview
                  </label>
                  <div className="relative rounded-xl overflow-hidden border border-gray-600/50 max-w-md">
                    <img
                      src={newProduct.image}
                      alt="Product preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={handleAddProduct}
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative px-12 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 ease-in-out transform group-hover:scale-105 border border-teal-500/20 min-w-[200px]">
                    Create Product
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;