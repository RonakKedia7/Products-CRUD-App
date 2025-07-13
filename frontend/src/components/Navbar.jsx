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
          <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <span>Add Product</span>
            <CiSquarePlus className="size-7" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
