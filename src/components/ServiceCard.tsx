import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";
import BookingModal from "./BookingModal";

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

interface ServiceCardProps {
  service: Service;
  entrepreneur?: Entrepreneur;
  variant?: "default" | "carousel" | "compact";
  showProvider?: boolean;
  showActions?: boolean;
  onViewDetails?: (serviceId: number) => void;
  onSchedule?: (serviceId: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  entrepreneur,
  variant = "default",
  showProvider = true,
  showActions = true,
  onViewDetails,
  onSchedule,
}) => {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const isVolunteer = service.price === 0;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(service.id);
    } else {
      navigate(`/service/${service.id}`);
    }
  };

  const handleSchedule = () => {
    if (onSchedule) {
      onSchedule(service.id);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const getCardClasses = () => {
    const baseClasses =
      "bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden";

    switch (variant) {
      case "carousel":
        return `${baseClasses} h-full flex flex-col`;
      case "compact":
        return `${baseClasses} h-full`;
      default:
        return `${baseClasses} h-full flex flex-col`;
    }
  };

  const getImageClasses = () => {
    switch (variant) {
      case "carousel":
        return "w-full h-48 sm:h-52 object-cover";
      case "compact":
        return "w-full h-40 object-cover";
      default:
        return "w-full h-48 sm:h-52 object-cover";
    }
  };

  const getContentPadding = () => {
    switch (variant) {
      case "carousel":
        return "p-4 sm:p-6 flex-1 flex flex-col";
      case "compact":
        return "p-4";
      default:
        return "p-4 sm:p-6 flex-1 flex flex-col";
    }
  };

  const getTitleClasses = () => {
    const baseClasses = "font-bold text-gray-900 mb-2 line-clamp-2";

    switch (variant) {
      case "carousel":
        return `${baseClasses} text-lg sm:text-xl`;
      case "compact":
        return `${baseClasses} text-base`;
      default:
        return `${baseClasses} text-lg sm:text-xl`;
    }
  };

  const getDescriptionClasses = () => {
    const baseClasses = "text-gray-600 mb-4 line-clamp-2";

    switch (variant) {
      case "carousel":
        return `${baseClasses} text-sm sm:text-base flex-1`;
      case "compact":
        return `${baseClasses} text-sm line-clamp-1`;
      default:
        return `${baseClasses} text-sm sm:text-base flex-1`;
    }
  };

  return (
    <>
      <div
        className={getCardClasses()}
        style={variant === "carousel" ? { maxWidth: "calc(100vw - 3rem)" } : {}}
      >
        {/* Service Image */}
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={service.image}
            alt={service.title}
            className={getImageClasses()}
          />
        </div>

        <div className={getContentPadding()}>
          {/* Service Title */}
          <h3 className={getTitleClasses()}>{service.title}</h3>

          {/* Status Tag */}
          <div className="mb-3">
            <span
              className={`inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                isVolunteer
                  ? "bg-green-100 text-green-800"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              {isVolunteer ? "Voluntário" : "Pago"}
            </span>
          </div>

          {/* Description */}
          <p className={getDescriptionClasses()}>{service.description}</p>

          {/* Provider */}
          {showProvider && entrepreneur && (
            <div className="flex items-center mb-4">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
              <span className="text-sm sm:text-base text-gray-600">
                Por {entrepreneur.name}
              </span>
            </div>
          )}

          {/* Price and Duration */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <span className="text-sm sm:text-base">{service.duration}</span>
            </div>
            <div className="text-right">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {isVolunteer ? "Gratuito" : `R$ ${service.price}`}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={handleViewDetails}
                className="flex-1 border border-indigo-300 text-indigo-600 py-3 px-4 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                Ver Detalhe
              </button>
              <button
                onClick={handleSchedule}
                className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                Agendar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={{
          id: service.id,
          title: service.title,
          price: service.price,
        }}
        onBookingConfirmed={() => {
          console.log("Booking confirmed for service:", service.id);
        }}
      />
    </>
  );
};

export default ServiceCard;
