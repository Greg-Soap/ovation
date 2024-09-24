import { UserData } from "@/models/all.model";
import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore'
import { Participant } from "./firebaseChatService";

// Sign up a new user
export const signUp = async (user: UserData) => {
  const data = await createUserWithEmailAndPassword(auth, user.email, generatePassword(user.userId));

  const userData = {
    displayName: user.displayName,
    email: user.email,
    image: user.profileImage,
    userId: user.userId,
    username: user.username,
    uid: data.user.uid
  } as Participant

  await signIn(user.userId, user.email)

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

const generatePassword = (userId: string) => {
  return userId.split('').reverse().join('');
}
