interface Booking {
  id: number;
  serviceId: number;
  userId: number;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  createdAt: string;
}

interface MockData {
  users: any[];
  entrepreneurs: any[];
  services: any[];
  categories: string[];
  bookings: Booking[];
}

class BookingService {
  private static instance: BookingService;
  private mockData: MockData | null = null;

  private constructor() {}

  public static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  private async loadMockData(): Promise<MockData> {
    if (this.mockData) {
      return this.mockData;
    }

    try {
      const response = await fetch("/mockData.json");
      this.mockData = await response.json();
      return this.mockData!;
    } catch (error) {
      console.error("Error loading mock data:", error);
      throw error;
    }
  }

  private async saveMockData(data: MockData): Promise<void> {
    try {
      // In a real application, this would be an API call to save to a database
      // For this demo, we'll simulate saving by updating our local copy
      this.mockData = data;

      // Store in localStorage as a backup
      localStorage.setItem("mockData", JSON.stringify(data));

      console.log("Mock data saved successfully");
    } catch (error) {
      console.error("Error saving mock data:", error);
      throw error;
    }
  }

  public async getBookingsByUserId(userId: number): Promise<Booking[]> {
    const data = await this.loadMockData();
    return data.bookings.filter((booking) => booking.userId === userId);
  }

  public async createBooking(
    bookingData: Omit<Booking, "id" | "createdAt">
  ): Promise<Booking> {
    const data = await this.loadMockData();

    // Generate new ID
    const newId = Math.max(...data.bookings.map((b) => b.id), 0) + 1;

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    // Add to bookings array
    data.bookings.push(newBooking);

    // Save updated data
    await this.saveMockData(data);

    return newBooking;
  }

  public async updateBookingStatus(
    bookingId: number,
    status: Booking["status"]
  ): Promise<Booking | null> {
    const data = await this.loadMockData();
    const bookingIndex = data.bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
      return null;
    }

    data.bookings[bookingIndex].status = status;
    await this.saveMockData(data);

    return data.bookings[bookingIndex];
  }

  public async deleteBooking(bookingId: number): Promise<boolean> {
    const data = await this.loadMockData();
    const bookingIndex = data.bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
      return false;
    }

    data.bookings.splice(bookingIndex, 1);
    await this.saveMockData(data);

    return true;
  }

  public async getAllBookings(): Promise<Booking[]> {
    const data = await this.loadMockData();
    return data.bookings;
  }

  // Method to restore from localStorage if needed
  public async restoreFromLocalStorage(): Promise<void> {
    try {
      const stored = localStorage.getItem("mockData");
      if (stored) {
        this.mockData = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error restoring from localStorage:", error);
    }
  }
}

export default BookingService;
export type { Booking };
