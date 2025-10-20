import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "./ServiceCard";

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
  const [cardsPerView, setCardsPerView] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(5); // Desktop: 5 cards
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          .slice(0, 10); // Take top 10 services

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
    const maxIndex = services.length - cardsPerView;
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = services.length - cardsPerView;
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsPerView)
                }%)`,
                width: `${(services.length / cardsPerView) * 100}%`,
              }}
            >
              {services.map((service) => {
                const entrepreneur = getEntrepreneur(service.entrepreneurId);
                return (
                  <div
                    key={service.id}
                    className={`flex-shrink-0 px-3 ${
                      cardsPerView === 1
                        ? "w-full"
                        : cardsPerView === 2
                        ? "w-1/2"
                        : "w-1/5"
                    }`}
                  >
                    <ServiceCard
                      service={service}
                      entrepreneur={entrepreneur}
                      variant="carousel"
                      showProvider={true}
                      showActions={true}
                    />
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
          {Array.from({
            length: Math.ceil(services.length / cardsPerView),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === Math.floor(currentIndex / cardsPerView)
                  ? "bg-indigo-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
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
