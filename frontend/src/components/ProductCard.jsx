import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product.js";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, setShowUpdateModel, setSelectedProduct }) => {
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success(message, {
        style: {
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          border: "1px solid #14b8a6",
          borderRadius: "16px",
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "500",
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
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="bg-slate-900/70 rounded-3xl shadow-2xl overflow-hidden border border-gray-800 hover:border-teal-500 transition-all duration-300 max-w-md mx-auto">
      <div className="w-60 md:w-70 h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center px-1">
          <h1 className="text-2xl font-bold text-white truncate mb-2">
            {product.name}
          </h1>
          <h3 className="text-xl font-semibold text-slate-300">
            ${product.price}
          </h3>
        </div>

          {/* Mobile action buttons */}
          <div className="flex justify-center gap-4 sm:hidden">
            <button
              onClick={() => {
                setShowUpdateModel(true);
                setSelectedProduct(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300"
            >
              <FaEdit className="text-lg" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300"
            >
              <MdDelete className="text-lg" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;