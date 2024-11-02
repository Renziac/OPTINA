import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { firestore } from '../config/firebaseConfig';

export default function ChatScreen({ route }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection('chats')
            .doc(route.params.chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    _id: doc.id,
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate(),
                    user: doc.data().user,
                })));
            });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user } = messages[0];
        firestore.collection('chats').doc(route.params.chatId).collection('messages').add({
            _id,
            createdAt,
            text,
            user
        });
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ _id: auth.currentUser.uid, name: auth.currentUser.displayName }}
        />
    );
}
