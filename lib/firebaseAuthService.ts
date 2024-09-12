import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up a new user
export const signUp = (userId: string, password: string) => {
  return createUserWithEmailAndPassword(auth, userId, password);
};

// Sign in a user
export const signIn = (userId: string, password: string) => {
  return signInWithEmailAndPassword(auth, userId, password);
};

// Log out the user
export const logOut = () => {
  return signOut(auth);
};
