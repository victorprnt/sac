import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Star,
  Clock,
  DollarSign,
  SlidersHorizontal,
} from "lucide-react";
import Header from "../components/Header";

interface Service {
  id: number;
  entrepreneurId: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  features: string[];
  rating: number;
  reviewCount: number;
}

interface Entrepreneur {
  id: number;
  name: string;
  email: string;
  bio: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  avatar: string;
}

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mockData.json");
        const data = await response.json();
        setServices(data.services);
        setEntrepreneurs(data.entrepreneurs);
        setCategories(data.categories);
        setFilteredServices(data.services);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...services];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((service) => service.rating >= minRating);
    }

    // Price filter
    if (maxPrice < 1000) {
      filtered = filtered.filter((service) => service.price <= maxPrice);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, minRating, maxPrice, sortBy]);

  const getEntrepreneur = (entrepreneurId: number) => {
    return entrepreneurs.find((ent) => ent.id === entrepreneurId);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinRating(0);
    setMaxPrice(1000);
    setSortBy("rating");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando serviços...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center text-gray-600 hover:text-gray-900"
                >
                  <SlidersHorizontal className="w-5 h-5 mr-1" />
                  <span>{showFilters ? "Ocultar" : "Mostrar"}</span>
                </button>
              </div>

              <div
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar serviços..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Todas as Categorias</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação Mínima
                  </label>
                  <div className="space-y-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={minRating === rating}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          {rating === 0 ? "Qualquer" : `${rating}+ estrelas`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço Máximo: R$ {maxPrice}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>R$ 50</span>
                    <span>R$ 1000</span>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="rating">Melhor Avaliado</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="price-high">Maior Preço</option>
                    <option value="reviews">Mais Avaliado</option>
                    <option value="name">Nome A-Z</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredServices.length} serviço(s) encontrado(s)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredServices.map((service) => {
                const entrepreneur = getEntrepreneur(service.entrepreneurId);
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {service.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {service.rating}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            ({service.reviewCount})
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {entrepreneur && (
                        <div className="flex items-center mb-4">
                          <img
                            src={entrepreneur.avatar}
                            alt={entrepreneur.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {entrepreneur.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {entrepreneur.specialties[0]}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                        <div className="flex items-center text-indigo-600 font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>R$ {service.price}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/service/${service.id}`)}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum serviço encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar seus critérios de busca ou filtro
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
