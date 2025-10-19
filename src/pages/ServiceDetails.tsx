import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Check,
  User,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import BookingService from "../services/BookingService";
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

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [entrepreneur, setEntrepreneur] = useState<Entrepreneur | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

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

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime("");
    }
  };

  const handleBookingConfirm = async () => {
    if (selectedDate && selectedTime && user && service) {
      setIsBooking(true);
      try {
        const bookingService = BookingService.getInstance();

        const bookingData = {
          serviceId: service.id,
          userId: user.id,
          date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
          time: selectedTime,
          status: "confirmed" as const,
        };

        const newBooking = await bookingService.createBooking(bookingData);

        console.log("Booking created successfully:", newBooking);
        setBookingConfirmed(true);
        setShowCalendar(false);
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Erro ao criar agendamento. Tente novamente.");
      } finally {
        setIsBooking(false);
      }
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime("");
    setBookingConfirmed(false);
    setShowCalendar(false);
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    onClick={() => setShowCalendar(true)}
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
                      {selectedDate && formatDate(selectedDate)} às{" "}
                      {selectedTime}
                    </p>
                  </div>
                  <button
                    onClick={resetBooking}
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

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Agendar Serviço
                </h3>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    {currentMonth.toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1
                          )
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          )
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-500 p-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <button
                      key={index}
                      onClick={() => date && handleDateSelect(date)}
                      disabled={!date || !isDateAvailable(date)}
                      className={`
                        p-2 text-sm rounded hover:bg-indigo-100 transition-colors
                        ${!date ? "invisible" : ""}
                        ${
                          date && !isDateAvailable(date)
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:text-indigo-600"
                        }
                        ${
                          selectedDate &&
                          date &&
                          selectedDate.getTime() === date.getTime()
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : ""
                        }
                      `}
                    >
                      {date?.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Horário Disponível
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          p-2 text-sm rounded border transition-colors
                          ${
                            selectedTime === time
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Resumo do Agendamento
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Serviço:</strong> {service.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Data:</strong> {formatDate(selectedDate)}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Horário:</strong> {selectedTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Valor:</strong> R$ {service.price}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleBookingConfirm}
                  disabled={!selectedDate || !selectedTime || isBooking}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBooking ? "Criando..." : "Confirmar Agendamento"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
