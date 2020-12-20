import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebaseDB";
import { AntDesign } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const db = firebase.firestore().collection("messages");
const auth = firebase.auth();

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  // Handle logging in and out, and setting up the db
  useEffect(() => {
    // This is the listener for authentication
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // logged in
        navigation.navigate("Chat", { id: user.id, email: user.email });
      } else {
        // logged out, get kicked back to Login page
        navigation.navigate("Login");
      }
    });

    // Put the logout button in the header
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <AntDesign
            name="logout"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });

    // This loads data from firebase
    const unsubscribeSnapshot = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const serverMessages = collectionSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          // Above shows us that createdAt is now an object, with "seconds"
          // and "nanoseconds". If we just take the former x 1000, we can recreate a JS date...
          const returnData = {
            ...doc.data(),
            createdAt: new Date(data.createdAt.seconds * 1000), // convert convert to JS date object in ms
          };
          return returnData;
        });
        setMessages(serverMessages);
      });
    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  function logout() {
    auth.signOut();
  }

  function sendMessages(newMessages) {
    // let's see what's inside
    console.log(newMessages);
    const newMessage = newMessages[0];
    // send the message in there to our db
    db.add(newMessage);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "lightgrey",
        },
      }}
      user={{
        _id: auth.currentUser ?  auth.currentUser.uid : "unknown user",
        name: auth.currentUser ?  auth.currentUser.email : "unknown user",
      }}
    />
  );
}
