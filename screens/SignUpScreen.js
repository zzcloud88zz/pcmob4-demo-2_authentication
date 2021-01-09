import { useLinkProps } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import firebase from "../database/firebaseDB";

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    function signup() {
        Keyboard.dismiss();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            navigation.navigate("Login");
            Alert.alert(
                'Sign Up Successful',
                'Welcome! =) Start typing something to begin...',
              );
        })
        .catch((error) => {
            console.log("Error!");
            console.log(error.message);
            setErrorText(error.message);
          });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Sign Up Page</Text>
            <Text style={styles.fieldTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={(input) => setEmail(input)}
            />
            <Text style={styles.fieldTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              value={password}
              onChangeText={(input) => setPassword(input)}
            />
            <TouchableOpacity onPress={ signup } style={styles.loginButton}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{errorText}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "lightblue",
        flex: 1,
        justifyContent: "center",
        padding: 24,
        opacity: 0.8,
      },
      title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
      },
      fieldTitle: {
        fontSize: 18,
        marginBottom: 12,
      },
      input: {
        borderColor: "#999",
        borderWidth: 1,
        marginBottom: 24,
        padding: 4,
        height: 36,
        fontSize: 18,
        backgroundColor: "whitesmoke",
      },
      loginButton: {
        backgroundColor: "brown",
        width: "100%",
        alignItems: "center",
        padding: 18,
        marginTop: 12,
        marginBottom: 36,
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
      },
      errorText: {
        color: "red",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 40,
      },
    });
