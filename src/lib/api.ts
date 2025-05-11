import type { Event } from '../types/events';
import { mockEvents } from './mock-data';

// API URL'leri
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
const EVENTS_ENDPOINT = `${API_BASE_URL}/events`;
const EVENT_DETAILS_ENDPOINT = `${API_BASE_URL}/events`;

// API istek fonksiyonları
export async function fetchSportsEvents(): Promise<Event[]> {
  try {
    // Gerçek API entegrasyonu için:
    // const response = await axios.get(EVENTS_ENDPOINT)
    // return response.data

    // Şimdilik mock veri kullanıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEvents);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function fetchEventDetails(eventId: string): Promise<Event | null> {
  try {
    // Gerçek API entegrasyonu için:
    // const response = await axios.get(`${EVENT_DETAILS_ENDPOINT}/${eventId}`)
    // return response.data

    // Şimdilik mock veri kullanıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = mockEvents.find((e: any) => e.id === eventId) || null;
        resolve(event);
      }, 500);
    });
  } catch (error) {
    console.error(`Error fetching event details for ID ${eventId}:`, error);
    return null;
  }
}

export async function fetchEventsByCategory(category: string): Promise<Event[]> {
  try {
    // Gerçek API entegrasyonu için:
    // const response = await axios.get(`${EVENTS_ENDPOINT}?category=${category}`)
    // return response.data

    // Şimdilik mock veri kullanıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredEvents = mockEvents.filter((event) => event.sport_key === category);
        resolve(filteredEvents);
      }, 800);
    });
  } catch (error) {
    console.error(`Error fetching events for category ${category}:`, error);
    return [];
  }
}

export async function searchEvents(query: string): Promise<Event[]> {
  try {
    // Gerçek API entegrasyonu için:
    // const response = await axios.get(`${EVENTS_ENDPOINT}/search?q=${query}`)
    // return response.data

    // Şimdilik mock veri kullanıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchResults = mockEvents.filter(
          (event: any) =>
            event.home_team.toLowerCase().includes(query.toLowerCase()) ||
            event.away_team.toLowerCase().includes(query.toLowerCase()) ||
            event.league.name.toLowerCase().includes(query.toLowerCase()),
        );
        resolve(searchResults);
      }, 500);
    });
  } catch (error) {
    console.error(`Error searching events with query ${query}:`, error);
    return [];
  }
}

// Bahis yapma API fonksiyonu
export async function placeBet(betData: any): Promise<{ success: boolean; message: string }> {
  try {
    // Gerçek API entegrasyonu için:
    // const response = await axios.post(`${API_BASE_URL}/bets`, betData)
    // return response.data

    // Şimdilik başarılı yanıt dönüyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Bahis başarıyla alındı!',
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Error placing bet:', error);
    return {
      success: false,
      message: 'Bahis yapılırken bir hata oluştu. Lütfen tekrar deneyin.',
    };
  }
}
