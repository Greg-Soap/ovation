import { UserData } from "@/models/all.model";
import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore'
import { Participant, ParticipantMod } from "./firebaseChatService";
import { getUserId } from "./helper-func";

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

  await setUserData(userData)
};

// Sign in a user
export const signIn = async (userId: string, email: string) => {
  return await signInWithEmailAndPassword(auth, email, generatePassword(userId));
};

// Log out the user
export const logOut = async () => {
  return await signOut(auth);
};

export const setUserData = async (user: Participant) => {
  const userRef = doc(firestore, `auth_users/${user.userId}`);

  // Store chat details for both users (using merge to avoid overwriting)
  await setDoc(userRef, { ...user, createdAt: serverTimestamp() }, { merge: true });
}

export const updateUserData = async (user: ParticipantMod) => {
  const userRef = doc(firestore, `auth_users/${getUserId()}`);

  // Store chat details for both users (using merge to avoid overwriting)
  await setDoc(userRef, { ...user, updatedAt: serverTimestamp() }, { merge: true });
}

const generatePassword = (userId: string) => {
  return userId.split('').reverse().join('');
}
