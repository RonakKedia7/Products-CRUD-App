import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const UpdateProductModal = ({
  isOpen,
  onClose,
  onUpdate,
  selectedProduct = {},
}) => {
  const [form, setForm] = useState({
    name: selectedProduct.name || "",
    price: selectedProduct.price || "",
    image: selectedProduct.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur-xl opacity-20"></div>

        {/* Modal */}
        <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="relative p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Update Product
                </h2>
                <p className="text-gray-400 mt-1">
                  Modify your product details
                </p>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200"
                onClick={onClose}
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
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
                  autoComplete="off"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={selectedProduct.name || "Product Name"}
                  className="relative w-full bg-slate-800/80 backdrop-blur-sm text-white rounded-xl p-4 text-lg border border-gray-600/50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 placeholder-gray-400"
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
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder={selectedProduct.price || "0.00"}
                    min="0"
                    step="0.01"
                    className="flex-1 bg-slate-800/80 backdrop-blur-sm text-white rounded-r-xl p-4 text-lg border border-gray-600/50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 placeholder-gray-400"
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
                  autoComplete="off"
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product-image.jpg"
                  className="relative w-full bg-slate-800/80 backdrop-blur-sm text-white rounded-xl p-4 text-lg border border-gray-600/50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Image Preview */}
            {form.image && (
              <div className="space-y-3">
                <label className="block text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Image Preview
                </label>
                <div className="relative rounded-xl overflow-hidden border border-gray-600/50 max-w-md">
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-xl transition-all duration-300 border border-gray-600/50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="relative flex-1 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform group-hover:scale-[1.02] border border-teal-500/20">
                Update Product
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
