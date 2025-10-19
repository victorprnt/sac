import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";

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

const PopularServicesCarousel: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mockData.json");
        const data = await response.json();

        // Get most popular services (highest rated with most reviews)
        const popularServices = data.services
          .sort((a: Service, b: Service) => {
            // Sort by rating first, then by review count
            if (a.rating !== b.rating) {
              return b.rating - a.rating;
            }
            return b.reviewCount - a.reviewCount;
          })
          .slice(0, 6); // Take top 6 services

        setServices(popularServices);
        setEntrepreneurs(data.entrepreneurs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getEntrepreneur = (entrepreneurId: number) => {
    return entrepreneurs.find((ent) => ent.id === entrepreneurId);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 3 : prevIndex - 1
    );
  };

  const goToServices = () => {
    navigate("/services");
  };

  if (services.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Serviços Mais Populares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra os serviços mais bem avaliados e procurados pelos nossos
            clientes
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {services.map((service) => {
                const entrepreneur = getEntrepreneur(service.entrepreneurId);
                return (
                  <div key={service.id} className="w-1/3 flex-shrink-0 px-3">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
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

                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(services.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === Math.floor(currentIndex / 3)
                    ? "bg-indigo-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            )
          )}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <button
            onClick={goToServices}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
          >
            Ver Todos os Serviços
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularServicesCarousel;
