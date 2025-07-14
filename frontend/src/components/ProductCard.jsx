import { Edit2, Trash2, DollarSign } from "lucide-react";
import { useProductStore } from "../store/product.js";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, setShowUpdateModel, setSelectedProduct }) => {
  const { deleteProduct } = useProductStore();
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async (pid) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-50">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="image-placeholder h-full">
            <Package className="h-12 w-12" />
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              setShowUpdateModel(true);
              setSelectedProduct(product);
            }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Edit product"
          >
            <Edit2 className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            disabled={isDeleting}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Delete product"
          >
            <Trash2 className={`h-4 w-4 ${isDeleting ? 'text-gray-400' : 'text-red-600'}`} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {product.name}
          </h3>
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign className="h-4 w-4" />
            <span className="text-lg">{parseFloat(product.price).toFixed(2)}</span>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex space-x-2 sm:hidden">
          <button
            onClick={() => {
              setShowUpdateModel(true);
              setSelectedProduct(product);
            }}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>

        {/* Product Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Product ID</span>
            <span className="font-mono">{product._id?.slice(-8)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;