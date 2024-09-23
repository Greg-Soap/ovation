import { UserData } from "@/models/all.model";
import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import {
  doc,
  setDoc,

  serverTimestamp
} from 'firebase/firestore'

// Sign up a new user
export const signUp = async (user: UserData) => {
  const data = await createUserWithEmailAndPassword(auth, user.email, generatePassword(user.userId));

  const userData = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: true,
    photoURL: user.profileImage,
    providerId: user.userId,
    phoneNumber: user.username
  } as User
  await auth.updateCurrentUser(userData)

  const userRef = doc(firestore, `auth_users/${user.userId}`);

  // Store chat details for both users (using merge to avoid overwriting)
  await setDoc(userRef, { ...userData, createdAt: serverTimestamp() }, { merge: true });
};

// Sign in a user
export const signIn = async (userId: string, email: string) => {
  return await signInWithEmailAndPassword(auth, email, generatePassword(userId));
};

// Log out the user
export const logOut = async () => {
  return await signOut(auth);
};

const generatePassword = (userId : string) =>{
    return userId.split('').reverse().join('');
}
