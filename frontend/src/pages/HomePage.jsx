import { useEffect, useState } from "react";
import { TbShoppingCartX } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import UpdateProductModal from "../components/UpdateModel.jsx";
import toast from "react-hot-toast";

const HomePage = () => {
  const { fetchProducts, products, updateProduct } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  const handleUpdate = async (updatedProduct) => {
    const { success, message } = await updateProduct(
      selectedProduct._id,
      updatedProduct
    );
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-2xl opacity-20"></div>
            <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
              Product Collection
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover and manage your premium product inventory with style
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <AiOutlineLoading3Quarters className="text-teal-400 text-4xl animate-spin" />
                  <span className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Loading Products...
                  </span>
                </div>
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length !== 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id || product._id}
                product={product}
                setShowUpdateModel={setShowUpdateModel}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 text-center max-w-md">
                <div className="mb-8">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur opacity-50"></div>
                    <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-full">
                      <TbShoppingCartX className="text-white text-4xl" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                  No Products Found
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Start building your product collection by adding your first item
                </p>
                
                <Link to={"/create"}>
                  <button className="relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 ease-in-out transform group-hover:scale-105 border border-teal-500/20">
                      Create Your First Product
                    </div>
                  </button>
                </Link>
              </div>
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