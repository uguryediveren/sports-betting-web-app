import axios from 'axios';

// API URL'leri
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const soccerSportsKeys: string[] = [];
const basketballSportsKeys: string[] = [];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// const EVENTS_ENDPOINT = `${API_BASE_URL}/events`;
// const EVENT_DETAILS_ENDPOINT = `${API_BASE_URL}/events`;

// API istek fonksiyonları
// export async function fetchSportsEvents(): Promise<Event[]> {
//   try {
//     // Gerçek API entegrasyonu için:
//     // const response = await axios.get(EVENTS_ENDPOINT)
//     // return response.data

//     // Şimdilik mock veri kullanıyoruz
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(mockEvents);
//       }, 1000);
//     });
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return [];
//   }
// }

// export async function fetchEventDetails(eventId: string): Promise<Event | null> {
//   try {
//     // Gerçek API entegrasyonu için:
//     // const response = await axios.get(`${EVENT_DETAILS_ENDPOINT}/${eventId}`)
//     // return response.data

//     // Şimdilik mock veri kullanıyoruz
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const event = mockEvents.find((e: any) => e.id === eventId) || null;
//         resolve(event);
//       }, 500);
//     });
//   } catch (error) {
//     console.error(`Error fetching event details for ID ${eventId}:`, error);
//     return null;
//   }
// }

// export async function fetchEventsByCategory(category: string): Promise<Event[]> {
//   try {
//     // Gerçek API entegrasyonu için:
//     // const response = await axios.get(`${EVENTS_ENDPOINT}?category=${category}`)
//     // return response.data

//     // Şimdilik mock veri kullanıyoruz
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const filteredEvents = mockEvents.filter((event) => event.sport_key === category);
//         resolve(filteredEvents);
//       }, 800);
//     });
//   } catch (error) {
//     console.error(`Error fetching events for category ${category}:`, error);
//     return [];
//   }
// }

// export async function searchEvents(query: string): Promise<Event[]> {
//   try {
//     // Gerçek API entegrasyonu için:
//     // const response = await axios.get(`${EVENTS_ENDPOINT}/search?q=${query}`)
//     // return response.data

//     // Şimdilik mock veri kullanıyoruz
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const searchResults = mockEvents.filter(
//           (event: any) =>
//             event.home_team.toLowerCase().includes(query.toLowerCase()) ||
//             event.away_team.toLowerCase().includes(query.toLowerCase()) ||
//             event.league.name.toLowerCase().includes(query.toLowerCase()),
//         );
//         resolve(searchResults);
//       }, 500);
//     });
//   } catch (error) {
//     console.error(`Error searching events with query ${query}:`, error);
//     return [];
//   }
// }

// Sporları çekmek için API çağrısı
export async function getSports(): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports`, {
      params: { apiKey: API_KEY },
    });
    // console.log(
    //   'Fetched sports:',
    //   response.data.filter((sport: any) => sport.group === 'Soccer'),
    // );

    // soccerSportsKeys.push(
    //   ...response.data
    //     .filter((sport: any) => sport.group === 'Soccer')
    //     .map((sport: any) => sport.key),
    // );

    // basketballSportsKeys.push(
    //   ...response.data
    //     .filter((sport: any) => sport.group === 'Basketball')
    //     .map((sport: any) => sport.key),
    // );

    // console.log('Basketball sports keys:', basketballSportsKeys);

    // console.log('Soccer sports keys:', soccerSportsKeys);
    console.log('getSports response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching sports:', error);
    return [];
  }
}

export async function getOdds(sport: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports/${sport}/odds3131`, {
      params: {
        apiKey: API_KEY,
        bookmakers: 'onexbet',
        oddsFormat: 'decimal',
        regions: 'eu',
        // markets: 'h2h',
      },
    });
    console.log('Fetched odds:', response.data);

    return response.data.filter((item: any) => item.bookmakers.length !== 0);
  } catch (error) {
    console.error('Error fetching odds:', error);
    return [];
  }
}
// export async function getAllFootballOdds(): Promise<any[]> {
//   // Fetch all soccer sports keys
//   await getSports();

//   const allOdds = await Promise.all(soccerSportsKeys.map((key) => getOdds(key)));

//   // Flatten all results into one array
//   console.log('allOdds:', allOdds.flat());

//   return allOdds.flat();
// }

export async function getAllFootballOdds(keys: string[]): Promise<any[]> {
  console.log('keysss:', keys);

  console.log('getAllFootballOdds function called');

  return Promise.all(keys.map((key) => getOdds(key))).then((results) => {
    console.log('allOdds:', results.flat());
    return results.flat();
  });
}

// export async function getAllBasketballOdds(): Promise<any[]> {
//   await getSports();
//   const allOdds: any[] = [];
//   const batchSize = 30; // Aynı anda kaç istek göndereceğinizi belirleyin
//   for (let i = 0; i < basketballSportsKeys.length; i += batchSize) {
//     const batch = basketballSportsKeys.slice(i, i + batchSize);
//     // Gruplar halinde istek gönder
//     const batchResults = await Promise.all(batch.map((key) => getOdds(key)));
//     allOdds.push(...batchResults);
//     // Her grup arasında bekleme ekle
//     await delay(1000);
//   }
//   console.log('allOddsBasketball:', allOdds.flat());
//   return allOdds.flat();
// }

export async function getEvents(sport: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports/${sport}/events3131`, {
      params: { apiKey: API_KEY },
    });
    console.log('Fetched events:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
// export async function getAllTennisOdds(): Promise<any[]> {
