import axios from 'axios';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firebaseApp } from './firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchUserBets(userId: string) {
  console.log('userId:', userId);
  const db = getFirestore(firebaseApp);
  const betsRef = collection(db, 'bets');
  const userBets = await getDocs(betsRef);
  const userBetsData = userBets.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log('userBetsData:', userBetsData);
  return userBetsData.filter((bet) => bet.userId === userId);
}

export async function saveBet(userId: string, bet: any) {
  const db = getFirestore(firebaseApp);

  try {
    const existingBetsQuery = query(
      collection(db, 'bets'),
      where('userId', '==', userId),
      where('eventId', '==', bet.eventId),
    );

    const existingBets = await getDocs(existingBetsQuery);
    if (!existingBets.empty) {
      console.log('Bet already exists for this event and user.');
      const betDocRef = existingBets.docs[0].ref;
      await updateDoc(betDocRef, bet);
      return { docId: betDocRef.id, ...bet };
    }

    const docRef = await addDoc(collection(db, 'bets'), {
      userId,
      ...bet,
    });

    return { docId: docRef.id, ...bet };
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function deleteBet(userId: string, eventId: string) {
  const db = getFirestore(firebaseApp);
  const betsRef = collection(db, 'bets');
  const userBetsQuery = query(
    betsRef,
    where('userId', '==', userId),
    where('eventId', '==', eventId),
  );
  const userBets = await getDocs(userBetsQuery);
  console.log(
    'userBets:',
    userBets.docs.map((doc) => doc.data()),
  );

  if (!userBets.empty) {
    await deleteDoc(doc(db, 'bets', userBets.docs[0].id));
  }

  return userBets.docs[0].id;
}

export const clearUsersBets = async (userId: string) => {
  const db = getFirestore(firebaseApp);
  const betsRef = collection(db, 'bets');
  const userBetsQuery = query(betsRef, where('userId', '==', userId));
  const userBets = await getDocs(userBetsQuery);
  if (!userBets.empty) {
    userBets.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
  return userBets.docs.map((doc) => doc.id);
};

export async function getSports(): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports`, {
      params: { apiKey: API_KEY },
    });

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
    return response.data.filter((item: any) => item.bookmakers.length !== 0);
  } catch (error) {
    console.error('Error fetching odds:', error);
    return [];
  }
}

export async function getOdds2(sport: string, eventId: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports/${sport}/events/${eventId}/odds`, {
      params: {
        apiKey: API_KEY,
        bookmakers: 'onexbet',
        oddsFormat: 'decimal',
        regions: 'eu',
        // markets: 'h2h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching odds:', error);
    return [];
  }
}

export async function getAllFootballOdds(keys: string[]): Promise<any[]> {
  console.log('keysss:', keys);

  console.log('getAllFootballOdds function called');

  return Promise.all(keys.map((key) => getEvents(key))).then((results) => {
    console.log('allOdds:', results.flat());
    return results.flat();
  });
}

export async function getEvents(sport: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports/${sport}/events`, {
      params: { apiKey: API_KEY },
    });
    console.log('Fetched events:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
