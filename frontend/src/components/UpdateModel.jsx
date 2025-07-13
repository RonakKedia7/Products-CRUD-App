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
    <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-900/70 rounded-3xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-800">
        {/* Cancel Icon */}
        <button
          className="absolute top-4 right-4 text-teal-400 hover:text-teal-300 transition-colors duration-200"
          onClick={onClose}
        >
          <IoClose className="size-7" />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">
          Update Product
        </h2>

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

        {/* Update Button */}
        <button
          className="mt-8 w-full bg-teal-600 text-white font-semibold text-lg px-6 py-3 rounded-xl border border-teal-500 hover:bg-teal-700 hover:border-teal-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleUpdate}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProductModal;