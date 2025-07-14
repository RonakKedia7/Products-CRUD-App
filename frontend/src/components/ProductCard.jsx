import { Edit2, Trash2, DollarSign, Package, MoreVertical } from "lucide-react";
import { useProductStore } from "../store/product.js";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, setShowUpdateModel, setSelectedProduct }) => {
  const { deleteProduct } = useProductStore();
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDeleteProduct = async (pid) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { success, message } = await deleteProduct(pid);
      if (success) {
        toast.success(message || "Product deleted successfully");
      } else {
        toast.error(message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditProduct = () => {
    setSelectedProduct(product);
    setShowUpdateModel(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400 font-medium">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2">
            <button
              onClick={handleEditProduct}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:bg-white hover:shadow-md transition-all duration-200"
              title="Edit product"
            >
              <Edit2 className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              disabled={isDeleting}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:bg-red-50 hover:shadow-md transition-all duration-200 disabled:opacity-50"
              title="Delete product"
            >
              <Trash2 className={`h-4 w-4 ${isDeleting ? 'text-gray-400' : 'text-red-600'}`} />
            </button>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Product ID</span>
            <span className="font-mono bg-gray-50 px-2 py-1 rounded-md">
              {product._id?.slice(-8)}
            </span>
          </div>
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex space-x-3">
          <button
            onClick={handleEditProduct}
            className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Last updated</span>
            <span>
              {product.updatedAt 
                ? new Date(product.updatedAt).toLocaleDateString()
                : 'Recently'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;