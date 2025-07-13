import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className=" text-white py-5 px-6 sm:px-12 md:px-24">
      <div className="bg-slate-900 p-3 border border-slate-800  rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo and Title */}
        <Link
          to={"/"}
          className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight uppercase"
        >
          <FaShoppingCart className="text-teal-400" />
          <span className="text-white hover:text-gray-300 transition-colors duration-200">
            Product Store
          </span>
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