import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebaseDB";
import { AntDesign } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';

const db = firebase.firestore();
const auth = firebase.auth();

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  // Handle logging in and out
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // logged in
        navigation.navigate("Chat");
      } else {
        // logged out, get kicked back to Login page
        navigation.navigate("Login");
      }
    });

    // Put the logout button in the header
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={logout}>
        <AntDesign name="logout" size={24} color="black" style={{ marginRight: 20 }} />
      </TouchableOpacity>
    ),
  });

  setMessages([
    {
      _id: 2,
      text: "Hello this is someone else",
      createdAt: new Date(),
      user: {
        _id: 14515151,
        name: "Someone else",
        avatar: "https://placeimg.com/141/140/any",
      },
    },
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2194891849184,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);
  }, []);

  function logout() {
    firebase.auth().signOut();
  }

  function sendMessages(newMessages) {
    console.log(newMessages);
    setMessages([...newMessages, ...messages]);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "#666",
        },
      }}
      user={{
        _id: 1,
      }}
    />
  );
}
