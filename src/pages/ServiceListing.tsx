import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Star, Clock, DollarSign, User } from "lucide-react";
import PopularServicesCarousel from "../components/PopularServicesCarousel";
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

const ServiceListing: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory]);

  const getEntrepreneur = (entrepreneurId: number) => {
    return entrepreneurs.find((ent) => ent.id === entrepreneurId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Conectando Talentos com Oportunidades
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Descubra uma plataforma onde empreendedores e freelancers oferecem
              serviços de qualidade. Desde design web até marketing digital,
              encontre o profissional ideal para impulsionar seu negócio.
            </p>
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona Nossa Plataforma
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Facilitamos a conexão entre clientes e prestadores de serviços
              através de uma experiência simples e segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                1. Explore
              </h4>
              <p className="text-gray-600">
                Navegue por nossa ampla seleção de serviços categorizados. Use
                filtros e busca para encontrar exatamente o que precisa.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                2. Conecte
              </h4>
              <p className="text-gray-600">
                Conheça o perfil completo do prestador de serviço, suas
                especialidades, avaliações e portfólio de trabalhos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                3. Contrate
              </h4>
              <p className="text-gray-600">
                Entre em contato diretamente com o profissional e inicie seu
                projeto com confiança e transparência.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Carousel */}
      <PopularServicesCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Buscar Serviços
          </h3>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Todas as Categorias</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span>{service.price}</span>
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
  );
};

export default ServiceListing;
