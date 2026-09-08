import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  onSnapshot 
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDRtNVHvQNq5Wm7IRG128VknFPGfOa8KoY",
  authDomain: "oakshow-433e4.firebaseapp.com",
  projectId: "oakshow-433e4",
  storageBucket: "oakshow-433e4.firebasestorage.app",
  messagingSenderId: "843276063125",
  appId: "1:843276063125:web:0b6198c799b585a1bfe69c",
  measurementId: "G-YS862347Y3"
};

// Initialize or reuse Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

/**
 * Sync / upsert user profile in Firestore 'users' collection
 * so the site owner can track registered users and their details
 */
export async function syncUserProfile(user, additionalData = {}) {
  if (!user || !user.uid) return;
  const userRef = doc(db, 'users', user.uid);
  try {
    const snap = await getDoc(userRef);
    const baseData = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || additionalData.displayName || '',
      photoURL: user.photoURL || '',
      lastLoginAt: serverTimestamp(),
      ...additionalData
    };

    if (!snap.exists()) {
      baseData.createdAt = serverTimestamp();
      baseData.watchlistCount = 0;
      await setDoc(userRef, baseData);
    } else {
      await updateDoc(userRef, baseData);
    }
  } catch (error) {
    console.warn('Could not sync user profile to Firestore:', error);
  }
}

/**
 * Sign in with Google Popup
 */
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  if (result.user) {
    await syncUserProfile(result.user);
  }
  return result.user;
}

/**
 * Sign in with Email and Password
 */
export async function loginWithEmail(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (result.user) {
    await syncUserProfile(result.user);
  }
  return result.user;
}

/**
 * Register with Email and Password
 */
export async function registerWithEmail(email, password, displayName) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (result.user) {
    if (displayName) {
      try {
        await updateProfile(result.user, { displayName });
      } catch (e) {}
    }
    await syncUserProfile(result.user, { displayName });
  }
  return result.user;
}

/**
 * Send Password Reset Email
 */
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

/**
 * Sign Out
 */
export async function logoutUser() {
  return signOut(auth);
}

/**
 * Subscribe to Auth State Changes
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await syncUserProfile(user);
      } catch (e) {}
    }
    callback(user);
  });
}

/**
 * Save / Update User's Watchlist in Cloud Firestore
 * Creates/updates a document in 'watchlists' collection with user's saved movies
 */
export async function saveWatchlistToCloud(userId, bookmarks = []) {
  if (!userId) return;
  try {
    const watchlistRef = doc(db, 'watchlists', userId);
    await setDoc(watchlistRef, {
      userId,
      items: bookmarks,
      updatedAt: serverTimestamp(),
      count: bookmarks.length
    }, { merge: true });

    // Also update count in users collection for easy admin viewing
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { watchlistCount: bookmarks.length }, { merge: true });
  } catch (err) {
    console.warn('Error saving watchlist to cloud:', err);
  }
}

/**
 * Fetch Watchlist from Cloud Firestore
 */
export async function fetchWatchlistFromCloud(userId) {
  if (!userId) return [];
  try {
    const watchlistRef = doc(db, 'watchlists', userId);
    const snap = await getDoc(watchlistRef);
    if (snap.exists()) {
      const data = snap.data();
      return Array.isArray(data.items) ? data.items : [];
    }
  } catch (err) {
    console.warn('Error fetching cloud watchlist:', err);
  }
  return [];
}
