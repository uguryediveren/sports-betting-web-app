import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';

let firebaseApp: FirebaseApp | undefined;
let isFirebaseInitialized = false;

export function initializeFirebase() {
  // If Firebase is already initialized, return the existing app
  if (getApps().length > 0) {
    return getApps()[0];
  }

  try {
    // In a real application, you would use environment variables for these values
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    // Only initialize if we have an API key
    if (firebaseConfig.apiKey) {
      firebaseApp = initializeApp(firebaseConfig);
      isFirebaseInitialized = true;
      return firebaseApp;
    }

    console.warn(
      'Firebase configuration is missing or incomplete. Firebase features will be disabled.',
    );
    return null;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return null;
  }
}

export function isFirebaseAvailable() {
  return isFirebaseInitialized;
}

export async function logAnalyticsEvent(eventName: string, eventParams: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && isFirebaseInitialized) {
      const app = getApps()[0];
      if (!app) return;

      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        const analytics = getAnalytics(app);
        logEvent(analytics, eventName, eventParams);
      }
    }
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
}
