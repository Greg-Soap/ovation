// src/services/chatService.ts
import { collection, addDoc, Timestamp, doc, setDoc, onSnapshot, query, collectionGroup } from "firebase/firestore";
import { firestore, auth } from "./firebase";


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
    messageText: string
): Promise<void> => {
    const chatId = getChatId(senderId, receiverId);

    const message = {
        userId: senderId,
        message: messageText,
        timestamp: Timestamp.fromDate(new Date()),
    };

    const messagesRef = collection(firestore, `chats/${chatId}/messages`);
    await addDoc(messagesRef, message);

    await storeChatForUsers(senderId, receiverId);
};


/**
 * Generates a unique chatId by combining the user IDs.
 * The user IDs are sorted to ensure that the chatId is consistent
 * regardless of which user initiates the chat.
 */
export const getChatId = (userAId: string, userBId: string): string => {
    return [userAId, userBId].sort().join("_");
};

/**
 * Stores the chatId in each user's activeChats collection.
 * This ensures that both users are aware of the active chat.
 */
export const storeChatForUsers = async (userAId: string, userBId: string) => {
    var chatId = getChatId(userAId, userBId);
    const userARef = doc(firestore, `users/${userAId}/activeChats/${chatId}`);
    const userBRef = doc(firestore, `users/${userBId}/activeChats/${chatId}`);

    await setDoc(userARef, { chatId }, { merge: true });
    await setDoc(userBRef, { chatId }, { merge: true });
};

/**
 * Listens for all messages in the active chats for the current user.
 * Filters messages server-side based on the chatId.
 */
export const listenForUserMessages = (callback: (messages: any[]) => void) => {
    const user = auth.currentUser;

    if (!user) {
        return () => { };
    }

    const userChatsRef = collection(firestore, `users/${user.uid}/activeChats`);

    return onSnapshot(userChatsRef, (chatSnapshot) => {
        const allMessages: any[] = [];

        chatSnapshot.docs.forEach((chatDoc) => {
            const chatId = chatDoc.id;

            const messagesRef = collection(firestore, `chats/${chatId}/messages`);
            const messagesQuery = query(messagesRef);

            onSnapshot(messagesQuery, (messagesSnapshot) => {
                const chatMessages = messagesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    chatId,
                    ...doc.data(),
                }));

                allMessages.push(...chatMessages);
                callback(allMessages);
            });
        });
    });
};