import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../hooks/useAuth";
import BookingService from "../services/BookingService";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    title: string;
    price: number;
  };
  onBookingConfirmed?: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
  onBookingConfirmed,
}) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);

  if (!isOpen) return null;

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
    if (selectedDate && selectedTime && user) {
      setIsBooking(true);
      try {
        const bookingService = BookingService.getInstance();

        const bookingData = {
          serviceId: service.id,
          userId: user.id,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          status: "confirmed" as const,
        };

        const newBooking = await bookingService.createBooking(bookingData);

        console.log("Booking created successfully:", newBooking);

        // Reset form
        setSelectedDate(null);
        setSelectedTime("");

        // Close modal
        onClose();

        // Call callback if provided
        if (onBookingConfirmed) {
          onBookingConfirmed();
        }

        // Show success message
        alert("Agendamento confirmado com sucesso!");
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Erro ao criar agendamento. Tente novamente.");
      } finally {
        setIsBooking(false);
      }
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[9999]"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Agendar Serviço
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Service Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">{service.title}</h4>
            <p className="text-sm text-gray-600">
              Valor: {service.price === 0 ? "Gratuito" : `R$ ${service.price}`}
            </p>
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
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 p-2"
                >
                  {day}
                </div>
              ))}
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
                <strong>Valor:</strong>{" "}
                {service.price === 0 ? "Gratuito" : `R$ ${service.price}`}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
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
    </div>,
    document.body
  );
};

export default BookingModal;
