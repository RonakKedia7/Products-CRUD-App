import React, { useState, useEffect } from "react";
import { X, Upload, AlertCircle, Save, Image as ImageIcon } from "lucide-react";

const UpdateProductModal = ({
  isOpen,
  onClose,
  onUpdate,
  selectedProduct = {},
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct && isOpen) {
      setForm({
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        image: selectedProduct.image || "",
      });
      setErrors({});
      setImageError(false);
      setImageLoading(false);
    }
  }, [selectedProduct, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
    } else if (form.name.trim().length > 100) {
      newErrors.name = "Product name must be less than 100 characters";
    }

    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    } else if (parseFloat(form.price) > 999999) {
      newErrors.price = "Price must be less than $999,999";
    }

    if (!form.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(form.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Reset image states when URL changes
    if (name === "image") {
      setImageError(false);
      setImageLoading(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate({
        ...form,
        price: parseFloat(form.price),
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Update Product</h2>
            <p className="text-gray-600 mt-1">Modify product information and details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                errors.name ? 'border-red-300 shake' : 'border-gray-200'
              }`}
              placeholder="Enter product name"
              maxLength={100}
            />
            {errors.name && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.name}
              </div>
            )}
            <div className="mt-1 text-xs text-gray-500">
              {form.name.length}/100 characters
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-3">
              Price (USD) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-lg font-medium">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="999999"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                  errors.price ? 'border-red-300 shake' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.price}
              </div>
            )}
            {form.price && !errors.price && (
              <div className="mt-1 text-xs text-gray-500">
                Formatted: {formatPrice(parseFloat(form.price) || 0)}
              </div>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-900 mb-3">
              Image URL *
            </label>
            <div className="relative">
              <input
                type="url"
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                  errors.image ? 'border-red-300 shake' : 'border-gray-200'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.image && (
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.image}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Provide a direct link to a high-quality product image (JPG, PNG, WebP)
            </p>
          </div>

          {/* Image Preview */}
          {form.image && !errors.image && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Image Preview
              </label>
              <div className="border border-gray-200 rounded-xl overflow-hidden w-full h-64 bg-gray-50">
                {imageLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">Loading image...</p>
                    </div>
                  </div>
                )}
                {!imageError && !imageLoading && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                )}
                {imageError && !imageLoading && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 font-medium">Failed to load image</p>
                      <p className="text-xs text-gray-400 mt-1">Please check the URL and try again</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || imageLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? "Updating..." : "Update Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;