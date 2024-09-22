import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up a new user
export const signUp = async (userId: string, email: string) => {
  console.log(auth.config)
  return await createUserWithEmailAndPassword(auth, email, generatePassword(userId));
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
