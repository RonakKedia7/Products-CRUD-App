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
          background: "#1e293b",
          color: "#ffffff",
          border: "1px solid #2dd4bf",
          borderRadius: "12px",
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#2dd4bf",
          secondary: "#ffffff",
        },
      });
    } else {
      toast.error(message, {
        style: {
          background: "#1e293b",
          color: "#ffffff",
          border: "1px solid #f87171",
          borderRadius: "12px",
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#f87171",
          secondary: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="py-10 mt-24 px-6 lg:px-24">
      <div className="text-white mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase mb-10 text-center">
          Current Products
        </h1>

        {loading && (
          <div className="flex flex-col min-h-[300px] items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl sm:text-3xl font-semibold text-teal-300">
                Loading...
              </span>
            </div>
            <AiOutlineLoading3Quarters className="text-teal-400 size-9 sm:size-10 animate-spin" />
          </div>
        )}

        {!loading && products.length !== 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 bg-slate-900 border border-slate-800 rounded-xl p-8 sm:p-10">
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

        {!loading && products.length === 0 && (
          <div className="flex flex-col min-h-[300px] items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl sm:text-3xl font-semibold text-teal-300">
                No Products Found...
              </span>
              <TbShoppingCartX className="text-teal-400 size-9 sm:size-10" />
            </div>
            <Link to={"/create"}>
              <button className="text-white cursor-pointer font-semibold text-lg px-6 py-3 rounded-xl hover:border hover:border-teal-500">
                Create a Product
              </button>
            </Link>
          </div>
        )}
      </div>
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
