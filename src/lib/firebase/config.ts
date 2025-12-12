// Placeholder Firebase client init. Replace values with real credentials.
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export default app;
