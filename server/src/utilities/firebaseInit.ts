import { initializeApp } from 'firebase/app'
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore'
import 'dotenv/config'

// Make sure that config is up to date in /.env
export const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
})

export const firestore = getFirestore()

// Helper function for fetching firebase collections to be saved locally
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

// Import types
import { Message } from '../types/Message'
import { User } from '../types/User'

// Export collections
export const messages = createCollection<Message>('messages')
export const users = createCollection<User>('users')

console.log("Database synced")
