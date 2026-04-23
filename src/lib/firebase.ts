// Firebase initialization for Phone OTP auth.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// Note: `window.recaptchaVerifier` global type is declared in src/types/global.d.ts

const firebaseConfig = {
  apiKey: "AIzaSyAUNo12UOpPb49HVPPizD4FAQay-g37vfs",
  authDomain: "orvigo-2fb85.firebaseapp.com",
  projectId: "orvigo-2fb85",
  appId: "1:797051323614:web:04e643f9f37bf9ed0aae4f",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// Persist session across reloads — enables auto-login.
setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
  // ignore — falls back to default
});
