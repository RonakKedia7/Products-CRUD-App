import { useState } from "react";
import { useProductStore } from "../store/product.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, AlertCircle, Package } from "lucide-react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();
  const { createProduct } = useProductStore();

  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (newProduct.name.trim().length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
    }

    if (!newProduct.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(newProduct.price) || parseFloat(newProduct.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!newProduct.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(newProduct.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Reset image error when URL changes
    if (name === "image") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { success, message } = await createProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
      });

      if (success) {
        toast.success(message || "Product created successfully");
        setNewProduct({ name: "", price: "", image: "" });
        navigate("/");
      } else {
        toast.error(message || "Failed to create product");
      }
    } catch (error) {
      toast.error("An error occurred while creating the product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">
            Create a new product entry for your inventory
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name ? 'border-red-300 shake' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.price ? 'border-red-300 shake' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.price}
                </div>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.image ? 'border-red-300 shake' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                <Upload className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.image && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.image}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Provide a direct link to a high-quality product image
              </p>
            </div>

            {/* Image Preview */}
            {newProduct.image && !errors.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden w-full h-48">
                  {!imageError ? (
                    <img
                      src={newProduct.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="image-placeholder h-full">
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Failed to load image</p>
                        <p className="text-xs text-gray-400">Please check the URL</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-primary"
              >
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;