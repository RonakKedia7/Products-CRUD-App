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

        <div className="flex justify-end gap-4 mt-5">
          <button
            onClick={() => {
              setShowUpdateModel(true);
              setSelectedProduct(product);
            }}
            className="text-teal-500 hover:text-teal-300 transition-colors duration-200 transform hover:scale-110"
          >
            <FaEdit className="size-7" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product.id || product._id)}
            className="text-red-500 hover:text-red-400 transition-colors duration-200 transform hover:scale-110"
          >
            <MdDelete className="size-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
