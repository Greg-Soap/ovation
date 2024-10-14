import type { UserData } from '@/models/all.model'
import { auth, firestore } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth'
import { doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import type { Participant, ParticipantMod } from './firebaseChatService'

// Sign up a new user
export const signUp = async (user: UserData) => {
  const data = await createUserWithEmailAndPassword(auth, user.googleId, generatePassword(user.userId))

  const userData = {
    displayName: user.displayName,
    email: user.email,
    image: user.profileImage,
    userId: user.userId,
    username: user.username,
    uid: data.user.uid,
  } as Participant

  await setUserData(userData)
}

// Sign in a user
export const signInOrSignUp = async (user: UserData) => {
  try {
    await signInWithEmailAndPassword(auth, user.googleId, generatePassword(user.userId))
  } catch (error: any) {
    await signUp(user)
  }
}

export const signIn = async (email: string, userId: string) => {
  try {
    const userr = await signInWithEmailAndPassword(auth, email, generatePassword(userId))
  } catch (error: any) {}
}

// Log out the user
export const logOut = async () => {
  return await signOut(auth)
}

export const setUserData = async (user: Participant) => {
  const userRef = doc(firestore, `auth_users/${user.userId}`)

  // Store chat details for both users (using merge to avoid overwriting)
  await setDoc(userRef, { ...user, createdAt: serverTimestamp() }, { merge: true })
}

export const updateUserData = async (user: Partial<ParticipantMod>, userId: string) => {
  const userRef = doc(firestore, `auth_users`, userId)

  try {
    await updateDoc(userRef, user);
    // await changeUserEmail(user.email!);
  } catch (error) {
    // console.error("Error updating user:", error);
  }

  // Store chat details for both users (using merge to avoid overwriting)
  // await setDoc(userRef, { ...user, updatedAt: serverTimestamp() }, { merge: true })
}

async function changeUserEmail(newEmail: string) {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateEmail(user, newEmail);
      console.log("Email updated successfully");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  } else {
    console.log("No user is currently signed in");
  }
}

const generatePassword = (userId: string) => {
  return userId.split('').reverse().join('')
}
