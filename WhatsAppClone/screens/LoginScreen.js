import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { auth } from '../config/firebaseConfig';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => console.log('User logged in'))
            .catch(error => console.error(error));
    };

    return (
        <View>
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
