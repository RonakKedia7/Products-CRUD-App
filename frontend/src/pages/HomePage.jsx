import { useEffect, useState } from "react";
import { Package, Plus, AlertCircle, Loader2, Search, Filter } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter products based on search term
  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Product Inventory</h1>
              <p className="text-lg text-gray-600">
                Manage your product catalog efficiently and professionally
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {!loading && !error && (
                <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <Package className="h-4 w-4" />
                  <span className="font-medium">
                    {filteredProducts.length} of {products?.length || 0} products
                  </span>
                </div>
              )}
              
              <Link
                to="/create"
                className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {!loading && !error && products?.length > 0 && (
            <div className="mt-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md mx-auto">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Loading Products</h3>
              <p className="text-gray-600">Please wait while we fetch your product catalog...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-50 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Error Loading Products</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                setShowUpdateModel={setShowUpdateModel}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && products?.length > 0 && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                No products match your search criteria. Try adjusting your search terms.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Products Yet</h3>
              <p className="text-gray-600 mb-8">
                Get started by adding your first product to the inventory. Build your catalog and manage your products efficiently.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium shadow-sm"
              >
                <Plus className="h-5 w-5" />
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