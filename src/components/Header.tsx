import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Search, User, LogOut, Menu, X, Star } from "lucide-react";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigationItems = [
    { label: "INÍCIO", path: "/" },
    { label: "SERVIÇOS", path: "/services" },
    { label: "CATEGORIAS", path: "/services" },
    { label: "SOBRE", path: "/about" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SAC</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive(item.path)
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Buscar serviços..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm("");
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block text-sm">Sair</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">ENTRAR</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                    isActive(item.path)
                      ? "text-indigo-600 bg-indigo-50 rounded-lg"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
