import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Check, User, Mail, Calendar } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

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

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [entrepreneur, setEntrepreneur] = useState<Entrepreneur | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mockData.json");
        const data = await response.json();

        const foundService = data.services.find(
          (s: Service) => s.id === parseInt(id || "0")
        );
        if (foundService) {
          setService(foundService);
          const foundEntrepreneur = data.entrepreneurs.find(
            (e: Entrepreneur) => e.id === foundService.entrepreneurId
          );
          setEntrepreneur(foundEntrepreneur);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookingConfirmed = () => {
    setBookingConfirmed(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service || !entrepreneur) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Service not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded">
                    {service.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{service.rating}</span>
                    <span className="ml-1 text-gray-500">
                      ({service.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What's Included
                </h3>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Service Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  ${service.price}
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {!bookingConfirmed ? (
                <>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium mb-4"
                  >
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Agendar Serviço
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <Mail className="w-5 h-5 inline mr-2" />
                    Contatar Prestador
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="text-green-600 font-semibold mb-2">
                      ✓ Agendamento Confirmado!
                    </div>
                    <p className="text-sm text-gray-600">
                      Seu agendamento foi confirmado com sucesso.
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Novo Agendamento
                  </button>
                </div>
              )}
            </div>

            {/* Entrepreneur Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-4">
                <img
                  src={entrepreneur.avatar}
                  alt={entrepreneur.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {entrepreneur.name}
                </h3>
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">
                    {entrepreneur.rating}
                  </span>
                  <span className="ml-1 text-gray-500">
                    ({entrepreneur.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{entrepreneur.bio}</p>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {entrepreneur.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center text-indigo-600 hover:text-indigo-700 transition-colors">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </button>
                <button className="w-full flex items-center justify-center text-indigo-600 hover:text-indigo-700 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {service && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={{
            id: service.id,
            title: service.title,
            price: service.price,
          }}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      <Footer />
    </div>
  );
};

export default ServiceDetails;
