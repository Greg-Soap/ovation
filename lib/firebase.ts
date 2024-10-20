'use client'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { type Analytics, getAnalytics, isSupported } from 'firebase/analytics'

// ovation web app Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase (ensure it is only initialized once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize analytics only on the client side
let analytics: Analytics | undefined

if (typeof window !== 'undefined') {
  // Check if analytics is supported before initializing
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app)
      }
    })
    .catch((error) => {
      console.error('Error checking analytics support:', error)
    })
}

// Firebase services
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)

export { app, analytics }

export default app
