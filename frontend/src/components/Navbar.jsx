import React from "react";
import { LogIn, LogOut, ShoppingCart, UserPlus, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = false;
  const isAdmin = false;
  return (
    <header className="bg-gray-900">
      <div className="mx-auto px-3 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-100 items-center space-x-2 flex"
          >
            E-Commerce
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-gray-700"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -left-2 text-white bg-green-900 rounded-full px-2 py-0.5 text-xs group-hover:text-green-600 transition duration-300 ease-in-out">
                  3
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link className="bg-gray-200 hover:bg-slate-700 text-black px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button className="bg-blue-200 hover:bg-slate-700 text-black px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-green-200 hover:bg-slate-700 text-black px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-blue-200 hover:bg-slate-700 text-black px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
