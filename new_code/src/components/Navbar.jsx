import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/VaishnaviTours.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Rates", to: "/rates" },
  { label: "Service Network", to: "/service-network" },
  { label: "Vehicle Info", to: "/vehicles" },
  { label: "Feedback", to: "/feedback" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Enquire Now", to: "/enquiry", isPrimary: true },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavigation = (to) => {
    navigate(to);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-black/95 py-1 shadow-md backdrop-blur-sm border-b border-amber-500/20"
          : "bg-black py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14 sm:h-12" : "h-16 sm:h-14"
          }`}
        >
          {/* Logo and Title */}
          <Link
            to="/"
            className={`flex items-center gap-2 transition-all duration-300 pr-2 ${
              scrolled ? "scale-90" : "scale-100"
            }`}
          >
            <div
              className={`flex items-center justify-center rounded-full border border-yellow-400 shadow-[0_4px_20px_0_rgba(255,228,97,0.15)] transition-all ${
                scrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <img
                src={logo}
                alt="Vaishnavi Tours Logo"
                className={`object-contain transition-all duration-300 ${
                  scrolled ? "w-12 h-12" : "w-16 h-16"
                }`}
              />
            </div>
            <span
              className={`font-semibold font-mono tracking-tight text-white transition-all ${
                scrolled ? "text-xs" : "text-sm"
              }`}
            >
              Vaishnavi Tours
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(
              (link) =>
                !link.isPrimary && (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => handleNavigation(link.to)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      location.pathname === link.to
                        ? "text-amber-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-500 after:rounded-full"
                        : "text-gray-300 hover:text-amber-300 hover:bg-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
            )}
            <Link
              to="/enquiry"
              onClick={() => handleNavigation("/enquiry")}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2 rounded-md ml-4 shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-amber-400 hover:bg-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 xs:w-[180px] max-w-xs bg-black shadow-2xl z-50 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } border-l border-amber-500/30`}
      >
        <div className="flex justify-between items-center p-3 border-b border-amber-500/30">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
            Vaishnavi Tours
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-900"
          >
            <X size={24} className="text-amber-400" />
          </button>
        </div>

        {/* Links */}
        <div className="py-2 px-1 overflow-y-auto h-full bg-gradient-to-b from-black to-gray-900">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleNavigation(link.to)}
              className={`block mx-3 my-1 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                link.isPrimary
                  ? "bg-amber-500 text-black text-center my-4 shadow-lg hover:bg-amber-400"
                  : `${
                      location.pathname === link.to
                        ? "text-amber-400 bg-gray-900/70 font-semibold border border-amber-500/30"
                        : "text-gray-300 hover:bg-gray-900 hover:text-amber-300"
                    }`
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
