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
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 hover:border-teal-500/50 transition-all duration-500 transform group-hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Action buttons overlay */}
          <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={() => {
                setShowUpdateModel(true);
                setSelectedProduct(product);
              }}
              className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            >
              <FaEdit className="text-lg" />
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="p-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            >
              <MdDelete className="text-lg" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-xl sm:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h1>
            <div className="flex flex-col items-end">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <span className="text-xs text-gray-400 font-medium">USD</span>
            </div>
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