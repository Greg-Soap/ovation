// src/services/chatService.ts
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { firestore, auth } from './firebase'

/**
 * Sends a message from auth user to another user.
 *
 * @param senderId - The ID of the user sending the message
 * @param receiverId - The ID of the user receiving the message
 * @param messageText - The message content
 */
export const sendMessage = async (
  senderId: string,
  receiverId: string,
  messageText: string,
): Promise<void> => {
  const chatId = getChatId(senderId, receiverId)

  const message = {
    userId: senderId,
    message: messageText,
    timestamp: Timestamp.fromDate(new Date()),
  }

  await checkChatExists(chatId)

  const messagesRef = collection(firestore, `chats/${chatId}/messages`)
  await addDoc(messagesRef, message)

  let sender = await getUserDetails(senderId)
  let receiver = await getUserDetails(receiverId)

  await storeChatForUsers(sender!, receiver, message.message)
}

/**
 * Generates a unique chatId by combining the user IDs.
 * The user IDs are sorted to ensure that the chatId is consistent
 * regardless of which user initiates the chat.
 */
export const getChatId = (userAId: string, userBId: string): string => {
  return [userAId, userBId].sort().join('_')
}

export const storeChatForUsers = async (
  senderDetails: Participant,
  receiverDetails: Participant,
  lastMessage: string
) => {
  const chatId = getChatId(senderDetails.userId, receiverDetails.userId);

  // Create data for the chat
  const userAChatData: ChatData = {
    chatId,
    participants: [senderDetails, receiverDetails], // Store details of both users
    lastMessage,                                // Last message text
    lastMessageSentAt: new Date(),              // Timestamp for the last message
  };

  const userBChatData: ChatData = { ...userAChatData }; // Same data for userB

  // References to both users' activeChats documents
  const userARef = doc(firestore, `users/${senderDetails.userId}/activeChats/${chatId}`);
  const userBRef = doc(firestore, `users/${receiverDetails.userId}/activeChats/${chatId}`);

  // Store chat details for both users (using merge to avoid overwriting)
  await setDoc(userARef, { ...userAChatData, lastMessageSentAt: serverTimestamp() }, { merge: true });
  await setDoc(userBRef, { ...userBChatData, lastMessageSentAt: serverTimestamp() }, { merge: true });
};

/**
 * Listens for all messages in the active chats for the current user.
 * Filters messages server-side based on the chatId.
 */
// export const listenForUserMessages = (callback: (messages: any[]) => void) => {
//   const user = auth.currentUser

//   if (!user) {
//     return () => { }
//   }

//   const userChatsRef = collection(firestore, `users/${user.uid}/activeChats`)

//   return onSnapshot(userChatsRef, (chatSnapshot) => {
//     const allMessages: any[] = []

//     for (const chatDoc of chatSnapshot.docs) {
//       const chatId = chatDoc.id

//       const messagesRef = collection(firestore, `chats/${chatId}/messages`)
//       const messagesQuery = query(messagesRef)

//       onSnapshot(messagesQuery, (messagesSnapshot) => {
//         const chatMessages = messagesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           chatId,
//           ...doc.data(),
//         }))

//         allMessages.push(...chatMessages)
//         callback(allMessages)
//       })
//     }
//   })
// }

// export const getUserActiveChats = async (userId: string) => {
//   try {
//     // Reference to the user's activeChats subcollection
//     const activeChatsRef = collection(firestore, `users/${userId}/activeChats`);

//     // Perform the query to get all documents in the activeChats subcollection
//     const activeChatsSnapshot = await getDocs(query(activeChatsRef));

//     // Extract chat data from the query result
//     const activeChats = activeChatsSnapshot.docs.map(doc => ({
//       chatId: doc.id,
//       ...doc.data()
//     }));

//     console.log(activeChats)
//     return activeChats;  // Return the list of active chats
//   } catch (error) {
//     console.error('Error getting active chats: ', error);
//     return [];
//   }
// };

const getUserDetails = async (userId: string) => {
  const userRef = doc(firestore, `auth_users/${userId}`);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return userSnapshot.data() as Participant;
  } else {
    throw new Error("User not found");
  }
};

export const getActiveChatsForUser = async (userId: string): Promise<ChatData[]> => {
  try {
    // Reference to the user's activeChats subcollection
    const activeChatsRef = collection(firestore, `users/${userId}/activeChats`);

    // Query the activeChats, ordered by lastMessageSentAt in descending order
    const q = query(activeChatsRef, orderBy('lastMessageSentAt', 'desc'));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the query result to a list of ActiveChat objects
    const activeChats: ChatData[] = querySnapshot.docs.map(doc => {
      
      const data = doc.data();
      return {
        chatId: data.chatId,
        participants: data.participants,
        lastMessage: data.lastMessage,
        lastMessageSentAt: data.lastMessageSentAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
      };
    });
    // console.log(activeChats)
    return activeChats;
  } catch (error) {
    console.error('Error fetching active chats:', error);
    throw error;
  }
};

export interface Participant {
  userId: string;
  displayName: string;
  username: string;
  email: string;
  uid: string;
  image: string | null;
}

export interface ChatData {
  chatId: string;
  participants: Participant[];
  lastMessage: string;
  lastMessageSentAt: Date;
}

const checkChatExists = async (chatId: string) => {
  const chatDocRef = doc(firestore, `chats/${chatId}`);
  const chatDoc = await getDoc(chatDocRef);

  if (!chatDoc.exists()) {
    await setDoc(chatDocRef, { createdAt: new Date() });
  }
};

const isUsersActiveChatExists = async (chatId: string, senderId: string, receiverId: string) => {
  const senderDocRef = doc(firestore, `users/${senderId}/activeChats/${chatId}`);
  const senderDoc = await getDoc(senderDocRef);

  if (!senderDoc.exists()) {
    await setDoc(senderDocRef, { createdAt: new Date() });
  }

  const receiverDocRef = doc(firestore, `users/${receiverId}/activeChats/${chatId}`);
  const receiverDoc = await getDoc(receiverDocRef);

  if (!receiverDoc.exists()) {
    await setDoc(receiverDocRef, { createdAt: new Date() });
  }
};
