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
} from "react-native";
import firebase from "../database/firebaseDB";

const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function login() {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signed in!");
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
        <Text style={styles.title}>Chatty</Text>
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
        <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
          <Text style={styles.signupText}>No account?
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.signupLink}> Sign up now!</Text>
            </TouchableOpacity>
          </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
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
    backgroundColor: "chocolate",
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
  signupText: {
    color: "blue",
    textAlign: "center",
    fontSize: 18,
  },
  signupLink: {
    color: "blue",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});