// firebaseConfig.js

// TODO: paste your actual Firebase config values below
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "1234567890",
  appId: "YOUR_APP_ID"
};

// Firebase initialization (use ES Modules CDN for frontend apps)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Initialize app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export if you're using modules elsewhere
export { app, auth };
