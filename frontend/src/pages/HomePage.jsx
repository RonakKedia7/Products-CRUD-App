import { useEffect, useState } from "react";
import { Package, Plus, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";
import UpdateProductModal from "../components/UpdateModel.jsx";
import toast from "react-hot-toast";

const HomePage = () => {
  const { fetchProducts, products, updateProduct } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchProducts();
        if (!result.success) {
          setError(result.message || "Failed to load products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to connect to the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  const handleUpdate = async (updatedProduct) => {
    try {
      const { success, message } = await updateProduct(
        selectedProduct._id,
        updatedProduct
      );
      if (success) {
        toast.success(message || "Product updated successfully");
      } else {
        toast.error(message || "Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
    }
  };

  const handleRetry = () => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchProducts();
        if (!result.success) {
          setError(result.message || "Failed to load products");
        }
      } catch (error) {
        setError("Unable to connect to the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
              <p className="text-gray-600 mt-1">
                Manage your product catalog efficiently
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!loading && !error && (
                <div className="text-sm text-gray-500">
                  {products?.length || 0} products
                </div>
              )}
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors btn-primary"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Products</h3>
              <p className="text-gray-500">Please wait while we fetch your products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center max-w-md">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Products</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                setShowUpdateModel={setShowUpdateModel}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first product to the inventory.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors btn-primary"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Product</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModel && selectedProduct && (
        <UpdateProductModal
          isOpen={showUpdateModel}
          onClose={() => setShowUpdateModel(false)}
          onUpdate={handleUpdate}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default HomePage;