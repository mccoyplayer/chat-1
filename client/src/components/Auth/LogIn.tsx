import React from "react";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import Custom_Input from "../Common/Custom_Input";
import LogInButton from "../Common/LogInButton";

const LogIn = () => {

  const [fontsLoaded, fontError] = useFonts({
    'Gilroy-ExtraBold': require('../../../assets/fonts/Gilroy-ExtraBold.otf'),
    'Gilroy-Light': require('../../../assets/fonts/Gilroy-Light.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // Logo
    // Let's ge you started!

    // Email
    // Password
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <Text>Welcome back!</Text>
        </View>
        <View style={styles.input_container}>
          <Custom_Input height={Dimensions.get('window').height * 0.06} width={Dimensions.get('window').width * 0.75} placeholder="Email" />
          <Custom_Input
            height={Dimensions.get('window').height * 0.06}
            width={Dimensions.get('window').width * 0.75}
            placeholder="Password"
          />
        </View>
        <View style={styles.button_container}>
          <LogInButton />
        </View>
      </View>
    </KeyboardAvoidingView>

    // Log In

    // Make an account with Google (TEMP)
  );
};

const styles = StyleSheet.create({
  main_container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input_container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.2,
  },

  button_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderColor: "blue",
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.4,
  },

  header_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get('window').height * 0.4,
    borderColor: "green",
    borderWidth: 1,
    flex: 1,
  },
});

export default LogIn;
