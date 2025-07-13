import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <Link
            to={"/"}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl">
                <FaShoppingCart className="text-white text-xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-teal-400 group-hover:to-cyan-400 transition-all duration-300">
                Product Store
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                Management System
              </span>
            </div>
          </Link>

          {/* Add Product Button */}
          <Link to={"/create"}>
            <button className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform group-hover:scale-105 border border-teal-500/20">
                <span className="text-sm sm:text-base">Add Product</span>
                <CiSquarePlus className="text-xl sm:text-2xl" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;