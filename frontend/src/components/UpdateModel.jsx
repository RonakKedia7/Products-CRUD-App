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
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-semibold text-teal-300 mb-2"
            >
              Product Name
            </label>
            <input
              autoComplete="off"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={selectedProduct.name || "Product Name"}
              className="w-full bg-gray-800 text-white rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-base font-semibold text-teal-300 mb-2"
            >
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder={selectedProduct.price || "Price"}
              className="w-full bg-gray-800 text-white rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-base font-semibold text-teal-300 mb-2"
            >
              Image URL
            </label>
            <input
              autoComplete="off"
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Enter the Image URL"
              className="w-full bg-gray-800 text-white rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
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
