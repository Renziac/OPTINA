import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { firestore } from '../config/firebaseConfig';

export default function ChatListScreen() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    return (
        <FlatList
            data={chats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text>{item.name}</Text>}
        />
    );
}
